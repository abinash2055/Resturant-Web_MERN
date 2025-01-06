import { Request, Response } from "express";
import { Resturant } from "../models/resturant.model";
import { Multer } from "multer";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Order } from "../models/order.model";

export const createResturant = async (req: Request, res: Response) => {
  try {
    const { resturantName, city, country, deliveryTime, cuisines } = req.body;
    const file = req.file;

    const resturant = await Resturant.findOne({ user: req.id });
    if (resturant) {
      return res.status(400).json({
        success: false,
        message: "Resturant already exist for this user !!!",
      });
    }

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image is required !!!",
      });
    }

    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
    await Resturant.create({
      user: req.id,
      resturantName,
      city,
      country,
      deliveryTime,
      cuisines: JSON.parse(cuisines),
      imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Resturant Added !!!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal serve error !!!" });
  }
};

export const getResturant = async (req: Request, res: Response) => {
  try {
    const resturant = await Resturant.find({ user: req.id });
    if (!resturant) {
      return res.status(404).json({
        success: false,
        message: "Resturant not found. Try again !!!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal serve error !!!" });
  }
};

export const updateResturant = async (req: Request, res: Response) => {
  try {
    const { resturantName, city, country, deliveryTime, cuisines } = req.body;
    const file = req.file;
    const resturant = await Resturant.findOne({ user: req.id });

    if (!resturant) {
      return res.status(404).json({
        success: false,
        message: "Resturant not found !!!",
      });
    }

    resturant.resturantName = resturantName;
    resturant.city = city;
    resturant.country = country;
    resturant.deliveryTime = deliveryTime;
    resturant.cuisines = JSON.parse(cuisines);

    if (file) {
      const imageUrl = await uploadImageOnCloudinary(
        file as Express.Multer.File
      );
      resturant.imageUrl = imageUrl;
    }

    await resturant.save();
    return res.status(200).json({
      success: true,
      message: "Resturant Updated !!!",
      resturant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal serve error !!!" });
  }
};

export const getResturantOrder = async (req: Request, res: Response) => {
  try {
    const resturant = await Resturant.findOne({ user: req.id });
    if (!resturant) {
      return res.status(404).json({
        success: false,
        message: "Resturant not Found !!!",
      });
    }
    const orders = await Order.find({ resturant: resturant._id })
      .populate("resturant")
      .populate("user");

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal serve error !!!" });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not Found !!!",
      });
    }
    order.status = status;
    await order.save();
    return res.status(200).json({
      success: true,
      message: "Status updated !!!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal serve error !!!" });
  }
};

export const searchResturant = async (req: Request, res: Response) => {
  try {
    const searchText = req.params.searchText || "";
    const searchQuery = (req.params.searchQuery as string) || "";
    const selectedCuisines = ((req.query.selectedCuisines as string) || "")
      .split(",")
      .filter((cuisine) => cuisine);
    const query: any = {};

    // For search Based on searchQuery
    if (searchText) {
      query.$or = [
        { resturantName: { $regex: searchText, $options: "i" } },
        { country: { $regex: searchText, $options: "i" } },
        { city: { $regex: searchText, $options: "i" } },
      ];
    }
    // Filter on the basis of SearchQuery
    if (searchQuery) {
      query.$or = [
        { resturantName: { $regex: searchText, $options: "i" } },
        { cuisines: { $regex: searchText, $options: "i" } },
      ];
    }
    // console.log(query)
    ["momos", "burger"];
    if (selectedCuisines.length > 0) {
      query.cuisines = { $in: selectedCuisines };
    }

    const resturants = await Resturant.find(query);
    return res.status(200).json({
      success: true,
      data: resturants,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal serve error !!!" });
  }
};

export const getSingleResturant = async (req: Request, res: Response) => {
  try {
    const resturantId = req.params.id;
    const resturant = await Resturant.findById(resturantId).populate({
      path: "menus",
      options: { createdAt: -1 },
    });

    if (!resturant) {
      return res.status(400).json({
        success: false,
        message: "Resturant not Found !!!",
      });
    }

    return res.status(200).json(resturant);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal serve error !!!" });
  }
};
