import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminNotes() {
  const API = "http://localhost:5000/api/notes";

  const [notes, setNotes] = useState([]);

  const [form, setForm] = useState({
    branch: "",
    semester: "",
    subject: "",
    unit: "",
    title: "",
    pdf: null,
  });

  // FETCH NOTES
  const fetchNotes = async () => {
    const res = await axios.get(API);
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // INPUT HANDLER
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, pdf: e.target.files[0] });
  };

  // UPLOAD
  const handleUpload = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("branch", form.branch);
    data.append("semester", form.semester);
    data.append("subject", form.subject);
    data.append("unit", form.unit);
    data.append("title", form.title);
    data.append("pdf", form.pdf);

    await axios.post(`${API}/upload`, data);

    alert("Uploaded Successfully");
    fetchNotes();
  };

  // DELETE
  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    setNotes(notes.filter((n) => n._id !== id));
  };

  // DOWNLOAD
  const handleDownload = (file) => {
    window.open(`http://localhost:5000/uploads/${file}`, "_blank");
  };

  return (
    <div>

      <h2>📚 Manage Notes</h2>

      {/* UPLOAD FORM */}
      <form onSubmit={handleUpload} style={{ marginBottom: "20px" }}>

        <input name="branch" placeholder="Branch" onChange={handleChange} />
        <input name="semester" placeholder="Semester" onChange={handleChange} />
        <input name="subject" placeholder="Subject" onChange={handleChange} />
        <input name="unit" placeholder="Unit" onChange={handleChange} />
        <input name="title" placeholder="Title" onChange={handleChange} />

        <input type="file" onChange={handleFile} />

        <button type="submit">Upload</button>

      </form>

      {/* NOTES LIST */}
      {notes.map((n) => (
        <div
          key={n._id}
          style={{
            padding: "10px",
            border: "1px solid #ddd",
            marginBottom: "10px",
          }}
        >
          <h3>{n.title}</h3>
          <p>{n.subject} - {n.unit}</p>

          <button onClick={() => handleDownload(n.pdf)}>
            ⬇ Download
          </button>

          <button onClick={() => handleDelete(n._id)}>
            🗑 Delete
          </button>
        </div>
      ))}

    </div>
  );
}

export default AdminNotes;