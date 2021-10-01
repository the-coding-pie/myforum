import express from "express";
import { getUser, getUsersPosts } from "../controllers/user";

const router = express.Router();

router.get("/:username/posts", getUsersPosts);
router.get("/:username", getUser);

export default router;
