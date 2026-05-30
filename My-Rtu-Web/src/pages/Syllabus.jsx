import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import "./Syllabus.css";

// PDF WORKER
pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function Syllabus() {

  const { branch, sem } = useParams();

  const [syllabus, setSyllabus] = useState(null);

  const [numPages, setNumPages] =
    useState(null);

  const [pageNumber, setPageNumber] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  // ================= FETCH =================
  const fetchSyllabus = async () => {

    try {

      const res = await axios.get(
        "https://my-rtu-web0319.onrender.com/api/syllabus"
      );

      const normalize = (str) =>
        (str || "")
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-");

      const filtered = res.data.find(
        (s) =>
          normalize(s.branch) === normalize(branch) &&
          normalize(s.semester) === normalize(sem)
      );

      setSyllabus(filtered);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSyllabus();
  }, [branch, sem]);

  // ================= PDF LOAD =================
  const onDocumentLoadSuccess = ({
    numPages,
  }) => {

    setNumPages(numPages);
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>

        <h2>Loading Syllabus...</h2>
      </div>
    );
  }

  // ================= NO DATA =================
  if (!syllabus) {
    return (
      <div className="syllabus-page">

        <div className="error-card">

          <h2>
            Syllabus Not Available
          </h2>

          <p>
            Admin has not uploaded syllabus yet.
          </p>

        </div>

      </div>
    );
  }

  // PDF URL
  const pdfUrl =
    `https://my-rtu-web0319.onrender.com/uploads/syllabus/${syllabus.pdf}`;

  return (

    <div className="syllabus-page">

      {/* HEADER */}
      <div className="syllabus-header">

        <h1>
          {branch.toUpperCase()} Semester{" "}
          {sem.replace("sem", "")}
        </h1>

        <p>
          Rajasthan Technical University
          Official Syllabus
        </p>

      </div>

      {/* ACTIONS */}
      <div className="top-actions">

        <a
          href={pdfUrl}
          target="_blank"
          rel="noreferrer"
          className="action-btn"
        >
          Open PDF
        </a>

        <a
          href={pdfUrl}
          download
          className="action-btn"
        >
          Download
        </a>

      </div>

      {/* PDF VIEWER */}
      <div className="pdf-container">

        <Document
          file={pdfUrl}
          onLoadSuccess={
            onDocumentLoadSuccess
          }
        >

          <Page
            pageNumber={pageNumber}
            width={
              window.innerWidth < 768
                ? 320
                : 900
            }
          />

        </Document>

      </div>

      {/* CONTROLS */}
      <div className="pagination">

        <button
          disabled={pageNumber <= 1}
          onClick={() =>
            setPageNumber(pageNumber - 1)
          }
        >
          Previous
        </button>

        <span>
          Page {pageNumber} of {numPages}
        </span>

        <button
          disabled={pageNumber >= numPages}
          onClick={() =>
            setPageNumber(pageNumber + 1)
          }
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default Syllabus;