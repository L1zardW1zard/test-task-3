import React from "react";
import { Route, Routes } from "react-router-dom";
import "./css/app.scss";

import Home from "./Pages/Home";
import FullHero from "./Pages/FullHero";
import Header from "./components/Header";
import Create from "./Pages/Create";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/superhero/:id" element={<FullHero />} />
        <Route path="/superhero/:id/edit" element={<Create />} />
        <Route path="/add" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
