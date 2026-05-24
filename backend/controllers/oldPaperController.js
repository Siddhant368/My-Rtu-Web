import OldPaper from "../models/OldPaper.js";


// ================= UPLOAD =================

export const uploadOldPaper =
async (req, res) => {

  try {

    const {
      branch,
      semester,
      subject,
      year,
      title,
    } = req.body;

    const pdf = req.file.filename;

    const newPaper =
    new OldPaper({

      branch,
      semester,
      subject,
      year,
      title,
      pdf,
    });

    await newPaper.save();

    res.status(201).json({
      message:
      "Old Paper Uploaded",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:error.message
    });
  }
};


// ================= GET =================

export const getOldPapers =
async (req, res) => {

  try {

    const papers =
    await OldPaper.find();

    res.status(200).json(papers);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:error.message
    });
  }
};