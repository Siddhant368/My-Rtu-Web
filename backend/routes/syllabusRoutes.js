import express from "express";
import fs from "fs";
import path from "path";

import { upload } from "../multer.js";

import {
  uploadSyllabus,
  getSyllabus,
} from "../controllers/syllabusController.js";

import Syllabus from "../models/Syllabus.js";

const router = express.Router();

// UPLOAD
router.post("/upload", upload.single("pdf"), uploadSyllabus);

// GET
router.get("/", getSyllabus);

// DELETE (ADMIN)
router.delete("/:id", async (req, res) => {
  try {
    const syllabus = await Syllabus.findById(req.params.id);

    if (!syllabus) {
      return res.status(404).json({ message: "Syllabus not found" });
    }

    const filePath = path.join(
      process.cwd(),
      "uploads",
      "syllabus",
      syllabus.pdf
    );

    fs.unlink(filePath, (err) => {
      if (err) console.log(err.message);
    });

    await Syllabus.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;