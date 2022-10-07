import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./css/app.scss";
import { useSelector, useDispatch } from "react-redux";
import { setHeroAmount } from "./redux/slices/heroSlice";

import Home from "./Pages/Home";
import FullHero from "./Pages/FullHero";
import Header from "./components/Header";
import Create from "./Pages/Create";

function App() {
  const dispatch = useDispatch();
  const amount = Number(useSelector((state) => state.hero.totalAmount));

  useEffect(() => {
    fetch(`/api/superheroes/amount`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setHeroAmount(data));
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Home heroAmount={amount} />} />
        <Route path="/superhero/:id" element={<FullHero />} />
        <Route path="/superhero/:id/edit" element={<Create />} />
        <Route path="/add" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
