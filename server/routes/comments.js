import express from "express";
import { deleteComment } from "../controllers/comment";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.delete("/:id", authMiddleware, deleteComment);

export default router;