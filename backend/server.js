import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import syllabusRoutes from "./routes/syllabusRoutes.js";
import oldPaperRoutes from "./routes/oldPaperRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors({
  origin: "*", // production me tu frontend URL dal sakta hai
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= HEALTH CHECK (RENDER IMPORTANT) =================
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

// ================= ROUTES =================
app.use("/api/syllabus", syllabusRoutes);
app.use("/api/oldpapers", oldPaperRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);

// ================= STATIC FILES =================
app.use("/uploads", express.static("uploads"));

// ================= HOME ROUTE =================
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ================= DATABASE CONNECTION =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error ❌", err));

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT} 🚀`);
});