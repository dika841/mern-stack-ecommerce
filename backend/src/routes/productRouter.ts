import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductDetails,
  updateProduct,
} from "../controllers/productController";
import { verifyToken } from "../middlewares/auth";
import { adminOnly } from "../middlewares/admin";

const productRouter = Router();

productRouter.route("/").get(getAllProduct);
productRouter.route("/:id").get(getProductDetails);

productRouter.post("/", verifyToken, adminOnly, createProduct);
productRouter
  .route("/:id")
  .put(verifyToken, adminOnly, updateProduct)
  .delete(verifyToken, adminOnly, deleteProduct);

export default productRouter;
