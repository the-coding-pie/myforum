import express from "express";
import { homeFeed } from "../controllers/post";
import { semiAuthMiddlware } from "../middleware/auth";

const router = express.Router();

router.get("/", semiAuthMiddlware ,homeFeed);

export default router;