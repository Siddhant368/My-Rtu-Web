import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

// TEST ROUTE
router.get("/", (req, res) => {
  res.send("AI Route Working 🚀");
});

// CHAT ROUTE
router.post("/chat", async (req, res) => {

  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message required",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result =
      await model.generateContent(message);

    const response =
      result.response.text();

    res.status(200).json({
      reply: response,
    });

  } catch (err) {

    console.log("AI ERROR:", err);

    res.status(500).json({
      message: "AI Error",
      error: err.message,
    });
  }
});

export default router;