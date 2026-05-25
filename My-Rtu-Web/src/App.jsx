import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AIChatbot from "./components/AIChatbot";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Branch from "./pages/Branch";
import Semester from "./pages/Semester";
import Subject from "./pages/Subject";
import SubjectsList from "./pages/SubjectsList";
import Units from "./pages/Units";
import Notes from "./pages/Notes";

import Video from "./pages/Video";
import Syllabus from "./pages/Syllabus";

import OldPapers from "./pages/oldpapers";

import Admin from "./pages/Admin";
import UploadSyllabus from "./pages/admin/uploadSyllabus";
import UploadOldPaper from "./pages/admin/UploadOldPaper";
import VideoAdmin from "./pages/admin/VideoAdmin";

import { AuthContext } from "./context/AuthContext";

function App() {
  const { user, loading } = useContext(AuthContext) ;
  const location = useLocation();
  

  const hideLayout = ["/login", "/signup"].includes(location.pathname);
       if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
   {!hideLayout && user && <Navbar />}

   
      <Routes>

        {/* AUTH ROUTES */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />

        {/* HOME */}
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
        />

        {/* BRANCH */}
        <Route
          path="/branch/:branch"
          element={user ? <Branch /> : <Navigate to="/login" />}
        />

        {/* SEMESTER */}
        <Route
          path="/semester/:branch/:sem"
          element={user ? <Semester /> : <Navigate to="/login" />}
        />

        {/* SUBJECT */}
        <Route
          path="/subject/:branch/:sem/:subject"
          element={user ? <Subject /> : <Navigate to="/login" />}
        />

        {/* SUBJECT LIST */}
        <Route
          path="/subjects/:branch/:sem"
          element={user ? <SubjectsList /> : <Navigate to="/login" />}
        />

        {/* UNITS */}
        <Route
          path="/units/:branch/:sem/:subject"
          element={user ? <Units /> : <Navigate to="/login" />}
        />

        {/* NOTES */}
        <Route
          path="/notes/:branch/:sem/:subject/:unit"
          element={user ? <Notes /> : <Navigate to="/login" />}
        />

        

        {/* VIDEOS */}
        <Route
          path="/videos/:branch/:sem"
          element={user ? <Video /> : <Navigate to="/login" />}
        />

        {/* SYLLABUS */}
        <Route
          path="/syllabus/:branch/:sem"
          element={user ? <Syllabus /> : <Navigate to="/login" />}
        />

        {/* OLD PAPERS */}
        <Route
          path="/old-papers/:branch/:sem"
          element={user ? <OldPapers /> : <Navigate to="/login" />}
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={user ? <Admin /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin/upload-syllabus"
          element={user ? <UploadSyllabus /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin/upload-oldpapers"
          element={user ? <UploadOldPaper /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin/videos"
          element={user ? <VideoAdmin /> : <Navigate to="/login" />}
        />

      </Routes>

      {!hideLayout && user && <Footer />}

      {/* Optional chatbot always visible */}
      {user && <AIChatbot />}
    </>
  );
}

export default App;