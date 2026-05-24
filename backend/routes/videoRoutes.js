import express from "express";
import fs from "fs";
import path from "path";

import { upload } from "../multer.js";
import {
  uploadVideo,
  getVideos,
} from "../controllers/videoController.js";

import Video from "../models/Video.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

// UPLOAD
router.post("/upload", upload.single("video"), uploadVideo);

// GET
router.get("/", getVideos);

// DELETE (ADMIN ONLY)
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const filePath = path.join(
      process.cwd(),
      "uploads",
      "videos",
      video.file
    );

    fs.unlink(filePath, (err) => {
      if (err && err.code !== "ENOENT") {
        console.log(err.message);
      }
    });

    await Video.findByIdAndDelete(req.params.id);

    res.json({ message: "Video deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;