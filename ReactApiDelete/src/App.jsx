import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Character from "./Components/Character";
import Update from './Components/Update'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character" element={<Character />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </Router>
  );
}

export default App;
