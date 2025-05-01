import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  role: "admin" | "user";
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  wishlist?: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
const userSchema = new Schema<IUser>(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);
const User = model<IUser>("User", userSchema);

export default User;
