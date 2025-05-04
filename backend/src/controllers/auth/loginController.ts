import asyncHandler from "express-async-handler";
import User from "../../models/User.model";
import { Request, Response } from "express";
import * as argon2 from "argon2";
import { generateToken } from "../../utils/generateToken";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const users = await User.findOne({ email });
  if (!users) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  const isValidpassword = await argon2.verify(users.password, password);

  if (!isValidpassword) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  const token = generateToken(users._id as string, users.role);
  const refresh_token = token.refresh_token;

  if (users && isValidpassword) {
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({
      status: res.statusCode,
      message: "Login Success",
      access_token: token.access_token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
