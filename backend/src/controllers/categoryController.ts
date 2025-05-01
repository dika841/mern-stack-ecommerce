import asyncHandler from "express-async-handler";
import Category from "../models/Category.model";
import { Request, Response } from "express";

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const category = new Category(req.body);
    const createCategory = await category.save();
    res.status(201).json({
      status: res.statusCode,
      message: "Category created",
    });
  }
);

export const getAllCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await Category.find();
    res.json(categories);
  }
);

export const getCategoryDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404);
      throw new Error("Category not found");
    }
  }
);

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }
    res.json({ message: "Category removed" });
  }
);

export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    const updateCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.json({
      status: res.statusCode,
      message: "Category updated",
    });
  }
);
