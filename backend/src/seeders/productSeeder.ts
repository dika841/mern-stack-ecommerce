import { fakerID_ID } from "@faker-js/faker";
import Product from "../models/Product.model";
import Category from "../models/Category.model";

const sizes = ["S", "M", "L", "XL"];
const colors = ["Black", "White", "Blue", "Red", "Green"];

export const seedProducts = async (count = 50) => {
  await Product.deleteMany();

  const categories = await Category.find();
  if (categories.length === 0) {
    throw new Error("No categories found. Seed categories first");
  }

  const products = [];

  for (let i = 0; i < count; i++) {
    const variants = [];
    const variantCount = Math.floor(Math.random() * 3) + 1; // 1-3 variants

    for (let j = 0; j < variantCount; j++) {
      variants.push({
        size: sizes[Math.floor(Math.random() * sizes.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        price: parseFloat(
          fakerID_ID.commerce.price({ min: 60000, max: 100000 })
        ),
        stock: Math.floor(Math.random() * 100),
        sku: fakerID_ID.string.alphanumeric(8).toUpperCase(),
      });
    }

    products.push({
      name: fakerID_ID.commerce.productName(),
      description: fakerID_ID.commerce.productDescription(),
      brand: fakerID_ID.company.name(),
      category: categories[Math.floor(Math.random() * categories.length)]._id,
      variants,
      images: Array.from({ length: 3 }, () =>
        fakerID_ID.image.urlLoremFlickr({ category: "fashion" })
      ),
      ratings: {
        average: parseFloat((Math.random() * 5).toFixed(1)),
        count: Math.floor(Math.random() * 100),
      },
    });
  }

  await Product.insertMany(products);
  console.log(`${count} products seeded successfully`);
};
