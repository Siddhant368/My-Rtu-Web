import mongoose from "mongoose";

const syllabusSchema = new mongoose.Schema({
  branch: {
    type: String,
    required: true,
  },

  semester: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  pdf: {
    type: String,
    required: true,
  },
});

const Syllabus = mongoose.model("Syllabus", syllabusSchema);

export default Syllabus;