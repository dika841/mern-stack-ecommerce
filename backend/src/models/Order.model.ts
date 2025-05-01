import { Schema, model, Document } from "mongoose";

interface IOrderItem {
  product: Schema.Types.ObjectId;
  quantity: number;
  variant: {
    color: string;
    size: string;
  };
  price: number;
}

interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  items: IOrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "cancelled" | "delivered";
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentStatus: "paid" | "pending" | "refunded" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  variant: {
    color: { type: String, required: true },
    size: { type: String, required: true },
  },
  price: { type: Number, required: true },
});

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [orderItemSchema], required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "cancelled", "delivered"],
      default: "pending",
    },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ["paid", "pending", "refunded", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = model<IOrder>("Order", orderSchema);

export default Order;
