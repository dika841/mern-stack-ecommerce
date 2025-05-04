import { Router } from "express";
import { registerUser } from "../controllers/auth/registerController";
import { login } from "../controllers/auth/loginController";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", login);
export default authRouter;
