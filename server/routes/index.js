import express from "express";
import authRouter from "./auth";
import communityRouter from "./community";
import postRouter from "./post";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/communities", communityRouter);
rootRouter.use("/posts", postRouter);

export default rootRouter;
