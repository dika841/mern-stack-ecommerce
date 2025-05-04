import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { JwtPayload } from "jsonwebtoken";

export const adminOnly = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;
    if (!user?.role || user.role !== "admin") {
      res.status(403);
      throw new Error("Access denied");
    }
    next();
  }
);
