import { connectDB } from "../config/db";
import { seedCategories } from "./categorySeeder";
import { seedProducts } from "./productSeeder";

const runSeeders = async () => {
  try {
    await connectDB();

    console.log("Running seeders...");
    await seedCategories();
    await seedProducts(40); // Seed 100 produk

    console.log("All seeders completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeder error:", error);
    process.exit(1);
  }
};

runSeeders();
