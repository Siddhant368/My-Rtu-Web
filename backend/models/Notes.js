import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({

  branch: { type: String, required: true },
  semester: { type: String, required: true },
  subject: { type: String, required: true },
  unit: { type: String, required: true },
  title: { type: String, required: true },
  pdf: { type: String, required: true },

});

const Notes = mongoose.model("Notes", notesSchema);

export default Notes;