import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./css/app.scss";

import Home from "./Pages/Home";
import FullHero from "./Pages/FullHero";
import Header from "./components/Header";
import Crate from "./Pages/Crate";

function App() {
  const [amount, setAmount] = useState(1); // Change to Redux-toolkit + check amount every change

  useEffect(() => {
    fetch(`/api/superheroes/amount`)
      .then((res) => res.json())
      .then((data) => {
        setAmount(data);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Home pageAmount={amount} />} />
        <Route path="/superhero/:id" element={<FullHero />} />
        <Route path="/superhero/:id/edit" element={<Crate />} />
        <Route path="/add" element={<Crate />} />
      </Routes>
    </div>
  );
}

export default App;
