import express from "express";
import authRouter from "./auth";
import communityRouter from "./community";
import postRouter from "./post";
import commentRouter from "./comments";
import userRouter from "./user";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/communities", communityRouter);
rootRouter.use("/posts", postRouter);
rootRouter.use("/comments", commentRouter);
rootRouter.use("/users", userRouter);

export default rootRouter;
