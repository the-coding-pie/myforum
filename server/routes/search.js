import express from "express";
import { search } from "../controllers/search";

const router = express.Router();

// GET /search?q=hello
router.get("/", search);

export default router;
