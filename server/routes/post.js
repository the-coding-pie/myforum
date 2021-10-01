import express from "express";
import { addComment, getComments } from "../controllers/comment";
import { createPost, deletePost, getPosts } from "../controllers/post";
import { authMiddleware, semiAuthMiddlware } from "../middleware/auth";

const router = express.Router();

router.get("/", semiAuthMiddlware, getPosts);
router.post("/", authMiddleware, createPost);

router.get("/:id/comments", getComments);
router.post("/:id/comments", authMiddleware, addComment);

router.delete("/:id", authMiddleware, deletePost);

export default router;
