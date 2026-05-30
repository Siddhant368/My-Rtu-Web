import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Video.css";

function Video() {
  const { branch, sem } = useParams();

  const [videos, setVideos] = useState([]);
  const [activeSubject, setActiveSubject] = useState(null);

  // FETCH FROM BACKEND
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          "https://my-rtu-web.onrender.com/api/videos"
        );

        // filter by branch & sem
        const filtered = res.data.filter(
          (v) =>
            v.branch === branch &&
            v.semester === sem
        );

        setVideos(filtered);
      } catch (err) {
        console.log(err);
      }
    };

    fetchVideos();
  }, [branch, sem]);

  // UNIQUE SUBJECTS
  const subjects = [
    ...new Map(
      videos.map((v) => [v.subject, v])
    ).values(),
  ];

  return (
    <div className="video-layout">
      {/* LEFT SIDEBAR */}
      <div className="video-sidebar">
        <h3>Subjects</h3>

        {subjects.length === 0 && (
          <p>No videos available</p>
        )}

        {subjects.map((sub, index) => (
          <div
            key={index}
            className={`video-item ${
              activeSubject?.subject === sub.subject
                ? "active"
                : ""
            }`}
            onClick={() => setActiveSubject(sub)}
          >
            📘 {sub.subject}
          </div>
        ))}
      </div>

      {/* RIGHT PLAYER */}
      <div className="video-player">
        {!activeSubject ? (
          <p className="hint">
            Select a subject to watch video
          </p>
        ) : activeSubject.youtubeUrl ? (
          <iframe
            src={activeSubject.youtubeUrl}
            title={activeSubject.subject}
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <p>Video coming soon…</p>
        )}
      </div>
    </div>
  );
}

export default Video;