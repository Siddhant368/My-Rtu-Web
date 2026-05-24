import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wrapper">

   
        <div className="footer-col brand">
          <h2>RTU StudyVerse</h2>
          <p>
            A professional academic platform for RTU B.Tech students.
            Access semester-wise notes, video lectures, previous year
            papers, and AI-powered learning support.
          </p>
        </div>

      
        <div className="footer-col">
          <h4>Academics</h4>
          <ul>
            <li>B.Tech Notes</li>
            <li>Semester-wise Syllabus</li>
            <li>Old RTU Papers</li>
            <li>Video Lectures</li>
            <li>AI Assistant</li>
          </ul>
        </div>


        <div className="footer-col">
          <h4>Resources</h4>
          <ul>
            <li>RTU Updates</li>
            <li>Exam Guidelines</li>
            <li>Internship Help</li>
            <li>Project Ideas</li>
            <li>Placement Prep</li>
          </ul>
        </div>

       
        <div className="footer-col">
          <h4>Contact</h4>
          <p>Email: siddhantsingh56773@gmail.com</p>
          <p>Rajasthan Technical University StudyVerse</p>
          <p>Rajasthan</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} RTU StudyVerse · Built for RTU Students
      </div>
    </footer>
  );
}

export default Footer;
