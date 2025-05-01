import { Schema, model, Document } from "mongoose";

interface ICategory extends Document {
  name: string;
  slug: string;
  description: string;
  parent?: Schema.Types.ObjectId;
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: String,
  parent: { type: Schema.Types.ObjectId, ref: "Category" },
  featured: { type: Boolean, default: false },
});
const Category = model<ICategory>("Category", categorySchema);

export default Category;
