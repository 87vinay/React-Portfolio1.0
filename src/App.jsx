import React, { useState } from "react";
import "./global.css";
import Loader from "./Components/Loader";
import MainPage from "./Components/MainPage";
import AboutMe from "./Components/AboutMe";
import ProjectSection from "./Components/ProjectSection";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [showMainPage, setShowMainPage] = useState(false);

  return (
    <Router>
      {!showMainPage ? (
        <Loader onComplete={() => setShowMainPage(true)} />
      ) : (
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/project" element={<ProjectSection />} />
          <Route path="/about" element={<AboutMe />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
