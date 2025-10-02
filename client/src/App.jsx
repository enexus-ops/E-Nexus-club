import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./components/Contact/Contact";
import React from "react";
import "./App.css"; 
import EnexusLanding from "./components/EnexusLanding";

function App() {
  return (
    <>
      
      <Router>
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<EnexusLanding />} />
          <Route path="/About" element={<AboutENexus />} />
          <Route path="/events" element={<EventsPage />} /> 
        </Routes>
      </Router>
    </>
  );
}

export default App;