import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminNotesPanel() {
  const API = "https://my-rtu-web.onrender.com/api/notes";

  const [notes, setNotes] = useState([]);

  const [form, setForm] = useState({
    branch: "",
    semester: "",
    subject: "",
    unit: "",
    title: "",
    pdf: null,
  });

  const [loading, setLoading] = useState(false);

  // ================= FETCH NOTES =================
  const fetchNotes = async () => {
    const res = await axios.get(API);
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // ================= INPUT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, pdf: e.target.files[0] });
  };

  // ================= UPLOAD =================
  const handleUpload = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("branch", form.branch);
    data.append("semester", form.semester);
    data.append("subject", form.subject);
    data.append("unit", form.unit);
    data.append("title", form.title);
    data.append("pdf", form.pdf);

    try {
      setLoading(true);

      await axios.post(`${API}/upload`, data);

      alert("Uploaded Successfully");

      setForm({
        branch: "",
        semester: "",
        subject: "",
        unit: "",
        title: "",
        pdf: null,
      });

      await fetchNotes();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);

      setNotes((prev) =>
        prev.filter((n) => n._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // ================= DOWNLOAD =================
  const handleDownload = (file) => {
    const url = `https://my-rtu-web.onrender.com/uploads/${file}`;
    const a = document.createElement("a");
    a.href = url;
    a.download = file;
    a.click();
  };

  return (
    <div>

      {/* ================= UPLOAD FORM ================= */}
      <h2>Upload Notes</h2>

      <form onSubmit={handleUpload}>
        <input name="branch" placeholder="Branch" onChange={handleChange} />
        <input name="semester" placeholder="Semester" onChange={handleChange} />
        <input name="subject" placeholder="Subject" onChange={handleChange} />
        <input name="unit" placeholder="Unit" onChange={handleChange} />
        <input name="title" placeholder="Title" onChange={handleChange} />

        <input type="file" onChange={handleFile} />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <hr />

      {/* ================= TABLE ================= */}
      <h2>All Notes</h2>

      {notes.map((n) => (
        <div
          key={n._id}
          style={{
            padding: "10px",
            margin: "10px",
            border: "1px solid #ccc",
          }}
        >
          <h3>{n.title}</h3>
          <p>{n.subject} - {n.unit}</p>

          {/* DOWNLOAD */}
          <button onClick={() => handleDownload(n.pdf)}>
            Download
          </button>

          {/* DELETE */}
          <button onClick={() => handleDelete(n._id)}>
            Delete
          </button>
        </div>
      ))}

    </div>
  );
}

export default AdminNotesPanel;