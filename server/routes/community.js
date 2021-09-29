import express from "express";
import { createCommunity, getCommunities } from "../controllers/community";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

// GET /communities
router.get("/", getCommunities);

// POST /communities
router.post("/", authMiddleware, createCommunity);

export default router;
