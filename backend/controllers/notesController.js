import fs from "fs";
import path from "path";
import Notes from "../models/Notes.js";


// =======================
// UPLOAD NOTES
// =======================
export const uploadNotes = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const branch = req.body.branch;
    const semester = req.body.semester;
    const subject = req.body.subject;
    const unit = req.body.unit;
    const title = req.body.title;
    const pdf = req.file.filename;

    const newNote = new Notes({
      branch,
      semester,
      subject,
      unit,
      title,
      pdf,
    });

    await newNote.save();

    res.status(201).json({
      message: "Note Uploaded Successfully",
      note: newNote,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};


// =======================
// GET ALL NOTES
// =======================
export const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find();
    res.status(200).json(notes);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};


// =======================
// GET SUBJECTS
// =======================
export const getSubjects = async (req, res) => {
  try {
    const { branch, sem } = req.params;

    const subjects = await Notes.distinct("subject", {
      branch,
      semester: sem,
    });

    res.status(200).json(subjects);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};


// =======================
// GET UNITS
// =======================
export const getUnits = async (req, res) => {
  try {
    const { branch, sem, subject } = req.params;

    const units = await Notes.distinct("unit", {
      branch,
      semester: sem,
      subject,
    });

    res.status(200).json(units);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};


// =======================
// 🗑️ DELETE NOTE (IMPROVED SAFE VERSION)
// =======================
export const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;

    const note = await Notes.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // SAFE PATH (IMPORTANT FIX)
   const filePath = path.resolve("uploads", note.pdf);

    console.log("Deleting file:", filePath);

    // delete file if exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // delete from DB
    await Notes.findByIdAndDelete(id);

    res.json({
      message: "Note deleted successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};


// =======================
// ⬇️ DOWNLOAD NOTE (IMPROVED SAFE VERSION)
// =======================
export const downloadNote = async (req, res) => {
  try {
    const id = req.params.id;

    const note = await Notes.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

   const filePath = path.resolve("uploads", note.pdf);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found on server" });
    }

    res.download(filePath, note.pdf);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};