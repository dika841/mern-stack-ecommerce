import asyncHandler from "express-async-handler";
import User from "../models/User.model";
import { Request, Response } from "express";
import * as argon2 from "argon2";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const user = new User(req.body);
  const hashPassword = await argon2.hash(user.password, {
    type: argon2.argon2id,
    timeCost: 3,
    parallelism: 2,
    memoryCost: 65536,
  });
  user.password = hashPassword;
  await user.save();
  res.status(201).json({
    status: res.statusCode,
    message: "User created",
  });
});

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, per_page = 10, sort, search } = req.query;
  const pageNumber = parseInt(page as string);
  const limitNumber = parseInt(per_page as string);
  const skip = (pageNumber - 1) * limitNumber;

  const filter: any = {};
  if (search) {
    filter.$or = [
      { fullname: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const sortOptions: any = {};
  if (Object.keys(sortOptions).length === 0) {
    sortOptions.createdAt = -1;
  }
  const [users, total] = await Promise.all([
    User.find(filter).skip(skip).limit(limitNumber).sort(sortOptions),
    User.countDocuments(filter),
  ]);
  const totalPage = Math.ceil(total / limitNumber);

  res.json({
    status: res.statusCode,
    message: "success",
    data: users,
    metadata: {
      totalItems: total,
      totalPage,
      page: pageNumber,
      perPage: limitNumber,
      hasNextPage: pageNumber < totalPage,
      hasPrevPage: pageNumber > 1,
    },
  });
});

export const getUserDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json({ status: res.statusCode, message: "success", data: user });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
);
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  await User.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  res.json({
    status: res.statusCode,
    message: "User updated",
  });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json({ message: "User removed" });
});
