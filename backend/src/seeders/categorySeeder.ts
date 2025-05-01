import { fakerID_ID } from "@faker-js/faker";
import Category from "../models/Category.model";

const categories = [
  "T-Shirts",
  "Jeans",
  "Dresses",
  "Jackets",
  "Shoes",
  "Accessories",
  "Sportswear",
  "Underwear",
];

export const seedCategories = async () => {
  await Category.deleteMany();
  const desc = fakerID_ID.commerce.productDescription();
  const categoryPromises = categories.map((name) =>
    new Category({
      name,
      slug: name.toLowerCase().replace(" ", "-"),
      description: desc,
      featured: Math.random() > 0.7,
    }).save()
  );

  await Promise.all(categoryPromises);
  console.log("Categories seeded successfully");
};
