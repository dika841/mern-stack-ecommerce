import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user";
import productRouter from "./routes/productRouter";
import categoryRouter from "./routes/categoryRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);

export default app;
