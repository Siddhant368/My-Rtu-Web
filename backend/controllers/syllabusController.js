import Syllabus from "../models/Syllabus.js";


// ================= UPLOAD =================
export const uploadSyllabus = async (req, res) => {
  try {
    const { branch, semester, title } = req.body;

    const pdf = req.file.filename;

    const newSyllabus = new Syllabus({
      branch,
      semester,
      title,
      pdf,
    });

    await newSyllabus.save();

    res.status(201).json({
      message: "Syllabus Uploaded Successfully",
      syllabus: newSyllabus,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= GET =================
export const getSyllabus = async (req, res) => {
  try {
    const syllabus = await Syllabus.find();

    res.status(200).json(syllabus);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};