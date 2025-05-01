import Product, { IProduct } from "../models/Product.model";
import { IUpdateProductData } from "./type";

export const searchProductService = async (query: string) => {
  return Product.find(
    { $text: { $search: query } },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .limit(20);
};

export const updateProductService = async (
  id: string,
  data: IUpdateProductData
): Promise<IProduct> => {
  const product = await Product.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  ).lean();
  if (!product) throw new Error("Product not found");
  return product;
};
