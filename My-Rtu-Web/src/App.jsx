import React, { useState } from "react";

import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Branch from "./pages/Branch";
import Semester from "./pages/Semester";
import Subject from "./pages/Subject";
import SubjectsList from "./pages/SubjectsList";
import Units from "./pages/Units";
import Notes from "./pages/Notes";
import AIAssistant from "./pages/AIAssistant";
import Video from "./pages/Video";
import Syllabus from "./pages/Syllabus";
import BranchDashboard from "./pages/BranchDashboard";
import OldPapers from "./pages/oldpapers";
import Admin from "./pages/Admin";
import UploadSyllabus from "./pages/admin/uploadSyllabus";
import UploadOldPaper from "./pages/admin/UploadOldPaper";
import VideoAdmin from "./pages/admin/VideoAdmin";
function App() {

  const [isLoggedIn, setIsLoggedIn] =
    useState(
      !!localStorage.getItem("token")
    );

  const location = useLocation();

  const hideLayout =
    location.pathname === "/login";



  return (
    <>

      {!hideLayout && <Navbar />}



      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <Login
                onLogin={() =>
                  setIsLoggedIn(true)
                }
              />
            )
          }
        />



        {/* HOME */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Home />
            ) : (
              <Navigate to="/login" />
            )
          }
        />



        {/* BRANCH */}
        <Route
          path="/branch/:branch"
          element={
            isLoggedIn ? (
              <Branch />
            ) : (
              <Navigate to="/login" />
            )
          }
        />



        {/* SEMESTER */}
        <Route
          path="/semester/:branch/:sem"
          element={
            isLoggedIn ? (
              <Semester />
            ) : (
              <Navigate to="/login" />
            )
          }
        />



        {/* SUBJECT MAIN PAGE */}
        <Route
          path="/subject/:branch/:sem/:subject"
          element={
            isLoggedIn ? (
              <Subject />
            ) : (
              <Navigate to="/login" />
            )
          }
        />



        {/* SUBJECTS LIST */}
        <Route
          path="/subjects/:branch/:sem"
          element={
            isLoggedIn ? (
              <SubjectsList />
            ) : (
              <Navigate to="/login" />
            )
          }
        />



        {/* UNITS */}
        <Route
          path="/units/:branch/:sem/:subject"
          element={
            isLoggedIn ? (
              <Units />
            ) : (
              <Navigate to="/login" />
            )
          }
        />



        {/* NOTES */}
        <Route
          path="/notes/:branch/:sem/:subject/:unit"
          element={
            isLoggedIn ? (
              <Notes />
            ) : (
              <Navigate to="/login" />
            )
          }
        />



        {/* DASHBOARD */}
        <Route
          path="/dashboard/:branch/:sem"
          element={
            isLoggedIn ? (
              <BranchDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />



        {/* VIDEOS */}
        <Route
          path="/videos/:branch/:sem"
          element={
            isLoggedIn ? (
              <Video />
            ) : (
              <Navigate to="/login" />
            )
          }
        />



        {/* AI */}
        <Route
          path="/ai-assistant/:branch/:sem"
          element={
            isLoggedIn ? (
              <AIAssistant />
            ) : (
              <Navigate to="/login" />
            )
          }
        />



        {/* SYLLABUS */}
        <Route
          path="/syllabus/:branch/:sem"
          element={
            isLoggedIn ? (
              <Syllabus />
            ) : (
              <Navigate to="/login" />
            )
          }
        />



        {/* OLD PAPERS */}
        <Route
          path="/old-papers/:branch/:sem"
          element={
            isLoggedIn ? (
              <OldPapers />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
  path="/admin"
  element={
    isLoggedIn ? (
      <Admin />
    ) : (
      <Navigate to="/login" />
    )
  }
/>

<Route
  path="/admin/upload-syllabus"
  element={
    isLoggedIn ? (
      <UploadSyllabus />
    ) : (
      <Navigate to="/login" />
    )
  }
/>

<Route
  path="/admin/upload-oldpapers"
  element={
    isLoggedIn ? (
      <UploadOldPaper />
    ) : (
      <Navigate to="/login" />
    )
  }
/> 
<Route
  path="/admin/videos"
  element={
    isLoggedIn ? (
      <VideoAdmin />
    ) : (
      <Navigate to="/login" />
    )
  }
/>

      </Routes>



      {!hideLayout && <Footer />}

    </>
  );
}

export default App;