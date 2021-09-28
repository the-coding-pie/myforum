import express from "express";
import dotenv from "dotenv";
import rootRouter from "./routes";
import { BASE_PATH } from "./config/constants";
import { connectDB } from "./config/db";

// dotenv config
dotenv.config();

// connect to db
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
// parse JSON bodies
app.use(express.json());

// routes
// /api/v1
app.use(`${BASE_PATH}`, rootRouter);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
