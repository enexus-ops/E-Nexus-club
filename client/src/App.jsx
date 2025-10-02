import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css"; 

import Contact from "./components/Contact/Contact";
import EnexusLanding from "./components/EnexusLanding";
import AboutPage from "./components/About/AboutPage";
import EventsPage from "./components/Event/EventsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<EnexusLanding />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
