import express from "express";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// USER PROTECTED ROUTE
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Profile data",
    user: req.user
  });
});

// ADMIN ONLY ROUTE
router.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin Panel" });
});

export default router;