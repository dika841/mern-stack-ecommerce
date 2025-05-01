import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryDetails,
  updateCategory,
} from "../controllers/categoryController";

const categoryRouter = Router();

categoryRouter.route("/").get(getAllCategories).post(createCategory);
categoryRouter
  .route("/:id")
  .get(getCategoryDetails)
  .put(updateCategory)
  .delete(deleteCategory);

export default categoryRouter;
