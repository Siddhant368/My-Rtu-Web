import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    if (req.originalUrl.includes("notes")) {
      cb(null, "uploads/notes/");
    }

    else if (req.originalUrl.includes("syllabus")) {
      cb(null, "uploads/syllabus/");
    }

    // ✅ OLD PAPERS FIXED
    else if (req.originalUrl.includes("oldpapers")) {
      cb(null, "uploads/oldpapers/");
    }

    else {
      cb(null, "uploads/");
    }
  },

  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/\s/g, "_");
    cb(null, Date.now() + "-" + cleanName);
  }
});

export const upload = multer({ storage });