import { Request, RequestHandler, Response } from "express";
import Product from "../models/Product.model";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import {
  searchProductService,
  updateProductService,
} from "../services/productService";
export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = new Product(req.body);
    const createProduce = await product.save();
    if (!createProduce) {
      res.status(400);
      throw new Error("Product not created");
    }

    res.status(201).json({
      status: res.statusCode,
      message: "Product created",
    });
  }
);

export const getAllProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      page = 1,
      per_page = 10,
      category,
      min_price,
      max_price,
      sort,
    } = req.query;
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(per_page as string);
    const skip = (pageNumber - 1) * limitNumber;

    const filter: any = {};
    if (category) filter.category = category;
    if (min_price || max_price) {
      filter["variants.price"] = {};
      if (min_price) filter["variants.price"].$gte = Number(min_price);
      if (max_price) filter["variants.price"].$lte = Number(max_price);
    }
    const sortOptions: any = {};
    if (Object.keys(sortOptions).length === 0) {
      sortOptions.createdAt = -1;
    }
    if (sort === "price_asc") sortOptions["variants.price"] = 1;
    if (sort === "price_desc") sortOptions["variants.price"] = -1;
    if (sort === "newest") sortOptions.createdAt = -1;

    const [product, total] = await Promise.all([
      Product.find(filter)
        .skip(skip)
        .limit(limitNumber)
        .sort(sortOptions)
        .populate("category", "name slug"),
      Product.countDocuments(filter),
    ]);
    const totalPage = Math.ceil(total / limitNumber);

    res.status(200).json({
      status: res.statusCode,
      message: "success",
      data: product,
      metadata: {
        totalItems: total,
        totalPage,
        page: pageNumber,
        perPage: limitNumber,
        hasNextPage: pageNumber < totalPage,
        hasPrevPage: pageNumber > 1,
      },
    });
  }
);

export const getProductDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name slug"
    );

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  }
);

export const getRecommendedProducts: RequestHandler = asyncHandler(
  async (req, res) => {
    const { categoryId } = req.params;

    const products = await Product.aggregate([
      { $match: { category: new mongoose.Types.ObjectId(categoryId) } },
      { $sample: { size: 4 } },
      { $project: { name: 1, "variants.price": 1, images: { $slice: 1 } } },
    ]);

    res.json(products);
  }
);

export const getProductVariant = asyncHandler(
  async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return; // Tanpa return value
    }

    const variant = product.variants.slice(
      (Number(page) - 1) * Number(limit),
      Number(page) * Number(limit)
    );

    res.status(200).json({
      status: res.statusCode,
      message: "success",
      data: variant,
      metadata: {
        totalItems: product.variants.length,
        totalPages: Math.ceil(product.variants.length / Number(limit)),
        currentPage: Number(page), // Perbaikan typo: currenPage -> currentPage
        itemsPerPage: Number(limit),
      },
    });
  }
);

export const searchProducts: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { q } = req.query;
    if (!q) {
      res.status(400).json({ error: "Please enter search query" });
      return;
    }
    const products = await searchProductService(q as string);
    res.json({ status: res.statusCode, message: "found", data: products });
  }
);

export const updateProduct: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    const updateProduct = await updateProductService(id, updateData);
    res.json({
      status: res.statusCode,
      message: "Product updated",
    });
  }
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.json({ message: "Product removed" });
  }
);
