import express from "express";
import authRouter from "./auth";
import communityRouter from "./community";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/communities", communityRouter);

export default rootRouter;
