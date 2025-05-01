import { Schema, model, Document } from "mongoose";
interface IProductVariant {
  size: string | null;
  color: string | null;
  stock: number;
  price: number;
  discount?: number | null;
  sku: string;
}
export interface IProduct extends Document {
  name: string;
  description: string;
  brand?: string;
  category?: Schema.Types.ObjectId;
  variants: IProductVariant[];
  images: string[];
  ratings: {
    average: number;
    count: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const productVariantSchema = new Schema<IProductVariant>({
  size: { type: String },
  color: { type: String },
  stock: { type: Number, min: 0, required: true },
  price: { type: Number, min: 0, required: true },
  sku: { type: String, required: true },
  discount: { type: Number, default: 0 },
});

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    variants: [productVariantSchema],
    images: { type: [String], required: true },
    ratings: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0, min: 0 },
    },
  },
  { timestamps: true }
);

productSchema.index({
  name: "text",
  description: "text",
  brand: "text",
  "variants.color": "text",
});
productSchema.index({ "variants.price": 1 });
productSchema.index({ category: 1, brand: 1 });

const Product = model<IProduct>("Product", productSchema);

export default Product;
