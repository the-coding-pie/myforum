import express from "express";
import {
  getUser,
  loginUser,
  refreshToken,
  registerUser,
} from "../controllers/auth";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

// GET /auth/getUser - get current user
router.get("/getUser", authMiddleware, getUser);

// POST /auth/register - register new user
router.post("/register", registerUser);

// POST /auth/login - login user
router.post("/login", loginUser);

// POST /auth/refresh - get new access token using refresh token
router.post("/refresh", refreshToken);

// default export
export default router;
