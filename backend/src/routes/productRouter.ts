import { Router } from "express";
// import { protect, admin } from '../middleware/authMiddleware';
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductDetails,
  updateProduct,
} from "../controllers/productController";

const productRouter = Router();

productRouter.route("/").get(getAllProduct).post(createProduct);
productRouter
  .route("/:id")
  .get(getProductDetails)
  .put(updateProduct)
  .delete(deleteProduct);

export default productRouter;
