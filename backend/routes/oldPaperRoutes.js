import express from "express";
import fs from "fs";
import path from "path";

import { upload } from "../multer.js";
import {
  uploadOldPaper,
  getOldPapers,
} from "../controllers/oldPaperController.js";

import OldPaper from "../models/OldPaper.js";

const router = express.Router();

// UPLOAD
router.post("/upload", upload.single("pdf"), uploadOldPaper);

// GET
router.get("/", getOldPapers);

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const paper = await OldPaper.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    const filePath = path.join(
      process.cwd(),
      "uploads",
      "oldpapers",
      paper.pdf
    );

    fs.unlink(filePath, (err) => {
      if (err) console.log(err.message);
    });

    await OldPaper.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;