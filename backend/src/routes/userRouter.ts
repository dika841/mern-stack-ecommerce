import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/userController";
import { adminOnly } from "../middlewares/admin";
import { verifyToken } from "../middlewares/auth";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/", verifyToken, adminOnly, createUser);
userRouter.put("/:id", verifyToken, adminOnly, updateUser);
userRouter.delete("/:id", verifyToken, adminOnly, deleteUser);
export default userRouter;
