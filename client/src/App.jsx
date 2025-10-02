import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./components/Contact/Contact";
import AboutENexus from './components/About/AboutENexus'; 
import React from "react";
import "./App.css"; 
import EnexusLanding from "./components/EnexusLanding";

function App() {
  return (
    <>
      <EnexusLanding />
      <Router>
        <Routes>
          <Route path="/contact" element={<Contact />} />
          {/* ✅ Fixed the component name */}
          <Route path="/About" element={<AboutENexus />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
