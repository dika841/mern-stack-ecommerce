import asyncHandler from "express-async-handler";
import User from "../../models/User.model";
import * as argon2 from "argon2";

import { Request, Response } from "express";
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
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
  }
);
