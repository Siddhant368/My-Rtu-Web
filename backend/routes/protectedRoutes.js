import express from "express";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// 👤 USER PROFILE (LOGIN REQUIRED)
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "User profile access granted",
    user: req.user,
  });
});

// 🔐 ADMIN ONLY ROUTE
router.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Admin access granted",
  });
});

export default router;