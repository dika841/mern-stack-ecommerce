import express from "express";
import cors from "cors";
import productRouter from "./routes/productRouter";
import categoryRouter from "./routes/categoryRouter";
import authRouter from "./routes/authenticationRouter";
import userRouter from "./routes/userRouter";
import bodyParser from "body-parser";
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/auth", authRouter);

export default app;
