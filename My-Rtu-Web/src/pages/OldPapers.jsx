import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./OldPapers.css";

function OldPapers() {
  const { branch, sem } = useParams();

  const [papers, setPapers] = useState([]);
  const [year, setYear] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/oldpapers");

        console.log("API DATA:", res.data);

        const normalizedSem = sem.replace("sem", "").trim();

        const filtered = res.data.filter((p) => {
          return (
            (p.branch || "").toLowerCase() === (branch || "").toLowerCase() &&
            (p.semester || "")
              .toString()
              .toLowerCase()
              .includes(normalizedSem)
          );
        });

        console.log("FILTERED:", filtered);

        setPapers(filtered);
        setLoading(false);
      } catch (err) {
        console.log("ERROR:", err);
        setLoading(false);
      }
    };

    fetchPapers();
  }, [branch, sem]);

  const years = [...new Set(papers.map((p) => p.year))];

  const filteredPapers = papers.filter((p) => {
    return (
      (year ? p.year === year : true) &&
      (p.subject || "").toLowerCase().includes(search.toLowerCase())
    );
  });

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="papers-page">
      <h1>
        {branch} Semester {sem} – Old RTU Papers
      </h1>

      {/* DEBUG MESSAGE */}
      {papers.length === 0 && (
        <h3 style={{ textAlign: "center", color: "red" }}>
          No matching papers found (check console)
        </h3>
      )}

      {/* YEAR FILTER BUTTONS */}
      <div className="year-buttons">
        {years.map((y, i) => (
          <button
            key={i}
            onClick={() => setYear(y)}
            className={year === y ? "active-year" : ""}
          >
            {y}
          </button>
        ))}
      </div>

      {/* SEARCH INPUT */}
      {year && (
        <input
          type="text"
          placeholder="Search subject..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}

      {/* PAPERS LIST */}
      {year && (
        <div className="subjects-container">
          {filteredPapers.map((p) => {
            const fileUrl = `http://localhost:5000/uploads/oldpapers/${p.pdf}`;

            return (
              <div key={p._id} className="subject-card">
                <h3>{p.subject}</h3>

                <p>
                  {p.year} | {p.title}
                </p>

                <iframe src={fileUrl} title={p.subject}></iframe>

                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="download-btn"
                >
                  Download
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default OldPapers;