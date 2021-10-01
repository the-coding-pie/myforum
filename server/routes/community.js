import express from "express";
import { createCommunity, getCommunities, getCommunity, updateSubscribers } from "../controllers/community";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

// GET /communities
router.get("/", getCommunities);

// POST /communities
router.post("/", authMiddleware, createCommunity);

// PUT /communities/:name/subscribers
router.put("/:name/subscribers", authMiddleware, updateSubscribers)

// GET /communities/:name
router.get("/:name", getCommunity)

export default router;
