import express from "express";
import { createPost, deletePost, homeFeed } from "../controllers/post";
import { authMiddleware, semiAuthMiddlware } from "../middleware/auth";

const router = express.Router();

router.get("/", semiAuthMiddlware, homeFeed);
router.post("/", authMiddleware, createPost);

router.delete("/:id", authMiddleware, deletePost);

export default router;
