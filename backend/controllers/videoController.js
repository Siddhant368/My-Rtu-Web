import Video from "../models/Video.js";

// UPLOAD VIDEO
export const uploadVideo = async (req, res) => {
  try {
    const { branch, semester, subject, title, youtubeUrl } = req.body;

    const newVideo = new Video({
      branch,
      semester,
      subject,
      title,
      youtubeUrl,
    });

    await newVideo.save();

    res.status(201).json({
      message: "Video Uploaded Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET VIDEOS
export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};