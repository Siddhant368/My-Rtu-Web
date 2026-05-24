import express from "express";
import { upload } from "../multer.js";


import {
  uploadNotes,
  getNotes,
  getSubjects,
  getUnits,
  deleteNote,
  downloadNote,
} from "../controllers/notesController.js";

const router = express.Router();


// =======================
// ROUTES
// =======================

// 📤 Upload Notes
router.post("/upload", upload.single("pdf"), uploadNotes);

// 📄 Get all notes
router.get("/", getNotes);

// 📚 Get subjects
router.get("/subjects/:branch/:sem", getSubjects);

// 📂 Get units
router.get("/units/:branch/:sem/:subject", getUnits);

// 🗑️ Delete note
router.delete("/notes/:id", deleteNote);

// ⬇️ Download note
router.get("/notes/download/:id", downloadNote);

export default router;