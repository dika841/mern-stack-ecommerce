import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryDetails,
  updateCategory,
} from "../controllers/categoryController";
import { adminOnly } from "../middlewares/admin";
import { verifyToken } from "../middlewares/auth";

const categoryRouter = Router();

categoryRouter
  .route("/")
  .get(getAllCategories)
  .post(verifyToken, adminOnly, createCategory);
categoryRouter
  .route("/:id")
  .get(getCategoryDetails)
  .put(verifyToken, adminOnly, updateCategory)
  .delete(verifyToken, adminOnly, deleteCategory);

export default categoryRouter;
