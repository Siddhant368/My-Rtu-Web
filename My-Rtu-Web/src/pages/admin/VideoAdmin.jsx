import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VideoAdmin.css";

function VideoAdmin() {
  const [form, setForm] = useState({
    branch: "",
    semester: "",
    subject: "",
    title: "",
    youtubeUrl: "",
  });

  const [videos, setVideos] = useState([]);

  // ================= FETCH VIDEOS =================
  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/videos");
      setVideos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // ================= INPUT HANDLER =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= UPLOAD VIDEO =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/videos/upload",
        form
      );

      alert("Video Uploaded Successfully 🎬");

      setForm({
        branch: "",
        semester: "",
        subject: "",
        title: "",
        youtubeUrl: "",
      });

      fetchVideos();
    } catch (err) {
      console.log(err);
      alert("Upload Failed ❌");
    }
  };

  // ================= DELETE VIDEO (ADMIN ONLY) =================
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/videos/${id}`,
        {
          headers: { role: "admin" }, // simple admin check
        }
      );

      setVideos((prev) => prev.filter((v) => v._id !== id));

      alert("Deleted successfully 🗑️");
    } catch (err) {
      console.log(err);
      alert("Delete failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎬 Video Admin Panel</h2>

      {/* ================= FORM ================= */}
      <form onSubmit={handleSubmit}>
        <input
          name="branch"
          placeholder="Branch"
          value={form.branch}
          onChange={handleChange}
        />
        <br />

        <input
          name="semester"
          placeholder="Semester"
          value={form.semester}
          onChange={handleChange}
        />
        <br />

        <input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
        />
        <br />

        <input
          name="title"
          placeholder="Video Title"
          value={form.title}
          onChange={handleChange}
        />
        <br />

        <input
          name="youtubeUrl"
          placeholder="YouTube Embed URL"
          value={form.youtubeUrl}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Upload Video</button>
      </form>

      <hr />

      {/* ================= VIDEO LIST ================= */}
      <h3>📺 Uploaded Videos</h3>

      {videos.map((v) => (
        <div
          key={v._id}
          style={{
            marginBottom: "20px",
            border: "1px solid #ddd",
            padding: "10px",
          }}
        >
          <h4>{v.title}</h4>

          <p>
            {v.branch} | Sem {v.semester} | {v.subject}
          </p>

          <iframe
            width="300"
            height="180"
            src={v.youtubeUrl}
            title={v.title}
            frameBorder="0"
            allowFullScreen
          />

          {/* ================= DELETE BUTTON ================= */}
          <br />

          <button
            onClick={() => handleDelete(v._id)}
            style={{
              background: "red",
              color: "white",
              marginTop: "10px",
              padding: "5px 10px",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default VideoAdmin;