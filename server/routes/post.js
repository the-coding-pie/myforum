import express from "express";
import { addComment, getComments } from "../controllers/comment";
import { createPost, deletePost, getPost, getPosts } from "../controllers/post";
import { authMiddleware, semiAuthMiddlware } from "../middleware/auth";

const router = express.Router();

router.get("/", semiAuthMiddlware, getPosts);
router.post("/", authMiddleware, createPost);

router.get("/:id/comments", getComments);
router.post("/:id/comments", authMiddleware, addComment);

router.get("/:id", getPost);
router.delete("/:id", authMiddleware, deletePost);

export default router;
