import { Request, Response } from "express";
import { Resturant } from "../models/resturant.model";
import { Order } from "../models/order.model";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
type CheckoutSessionRequest = {
  cartItems: {
    menuId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  deliveryDetails: {
    name: string;
    email: string;
    address: string;
    city: string;
  };
  resturantId: string;
};

export const getOrders = async (req:Request, res:Response) => {
  try {
    const order = await Order.find({user:req.id}).populate('user').populate('resturant');
    return res.status(200).json({
      success: true,
      order,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message:"Internal Server error",
    })
  }
};


export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequest = req.body;
    const resturant = await Resturant.findById(
      checkoutSessionRequest.resturantId
    ).populate("menu");

    if (!resturant) {
      return res.status(404).json({
        success: false,
        message: "Resturant not Found !!!",
      });
    }

    const order = new Order({
      resturant: resturant._id,
      user: req.id,
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems,
      status: "pending",
    });

    // Line Items
    const menuItems = resturant.menus;
    const lineItems = createLineItems(checkoutSessionRequest, menuItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["GB", "US", "CA"],
      },
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/order/status`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      metadata: {
        orderId: order._id.toString(),
        images: JSON.stringify(menuItems.map((item: any) => item.image)),
      },
    });

    if (!session.url) {
      return res.status(400).json({
        success: false,
        message: "Error while creating session",
      });
    }
      await order.save();
      return res.status(200).json({
        success: true,
        session,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      success: false,
      message: "Internal Server error !!!" });
  }
};

export const createLineItems = (
  checkoutSessionRequest: CheckoutSessionRequest,
  menuItems: any[]
) => {
  const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
    const menuItem = menuItems.find(
      (item: any) => item._id === cartItem.menuId
    );

    if (!menuItem) {
      throw new Error(`Menu item id not Found !!!`)
    };

    return {
      price_data: {
        currency: "npr",
        product_data: {
          name: menuItem.name,
          image: [menuItem.image],
        },
        unit_amount: menuItem.price * 100,
      },
      quantity: cartItem.quantity,
    };
  });
  return lineItems;
};
