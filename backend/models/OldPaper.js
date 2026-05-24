import mongoose from "mongoose";

const oldPaperSchema =
new mongoose.Schema({

  branch: {
    type: String,
    required: true,
  },

  semester: {
    type: String,
    required: true,
  },

  subject: {
    type: String,
    required: true,
  },

  year: {
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

const OldPaper =
mongoose.model(
  "OldPaper",
  oldPaperSchema
);

export default OldPaper;