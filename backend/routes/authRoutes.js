import express from "express";
import { registerUser, loginUser, logoutUser, checkAuth } from "../controllers/authController.js";
import { protectedRoute } from "../config/authMiddleware.js";

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login an existing user
router.post("/login", loginUser);

// Logout a user
router.post("/logout",protectedRoute, logoutUser);
router.get('/check',protectedRoute,checkAuth)

export default router;