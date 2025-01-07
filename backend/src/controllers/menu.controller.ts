import { Request, Response } from "express";
import mongoose from "mongoose";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Menu } from "../models/menu.model";
import { Resturant } from "../models/resturant.model";

export const addMenu = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }
    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
    const menu = await Menu.create({
      name,
      description,
      price,
      image: imageUrl,
    });

    const resturant = await Resturant.findOne({ user: req.id });
    if (resturant) {
      (resturant.menus as mongoose.Schema.Types.ObjectId[]).push(menu._id);
      await resturant.save();
    }

    return res.status(201).json({
      success: true,
      message: "Menu Added successfully !!!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const file = req.file;
    const menu = await Menu.findById(id);
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not Found",
      });
    }
    if (name) menu.name = name;
    if (description) menu.description = description;
    if (price) menu.price = price;

    if (file) {
      const imageUrl = await uploadImageOnCloudinary(
        file as Express.Multer.File
      );
      menu.image = imageUrl;
    }
    await menu.save();

    return res.status(200).json({
      success: true,
      message: "Menu Updated",
      menu,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
