import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import syllabusRoutes from "./routes/syllabusRoutes.js";
import oldPaperRoutes
from "./routes/oldPaperRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";

import notesRoutes from "./routes/notesRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/syllabus", syllabusRoutes);
app.use("/api/oldpapers",oldPaperRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/notes", notesRoutes);

app.use("/uploads", express.static("uploads")); 

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT} 🚀`);
});