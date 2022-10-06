import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FullHero = () => {
  const [hero, setHero] = useState({});
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/superhero/" + id)
      .then((res) => res.json())
      .then((data) => {
        setHero(data);
      });
  }, []);

  useEffect(() => {
    console.log(hero);
  }, [hero]);

  const onClickDelete = async () => {
    await axios.delete("/api/superhero/" + id); // change to redux-toolkit
    navigate("/");
    alert("Superhero deleted");
  };

  return (
    <div className="hero-item-full">
      <div className="button-container">
        <div className="button-wrapper">
          <button type="button" className="edit-btn">
            Edit
          </button>
          <button type="button" className="delete-btn" onClick={onClickDelete}>
            Delete
          </button>
        </div>
      </div>
      <div className="hero-image-wrapper">
        {!!hero.images && <img src={hero.images[0]} alt="empty" />}
      </div>
      <div className="hero-info">
        <h3>{hero.nickname}</h3>
        <h5>{hero.real_name}</h5>
        <p>origin description: {hero.origin_description}</p>
        <p>superpowers: {hero.superpowers}</p>
        <p>catch phrase: {hero.catch_phrase}</p>
      </div>
    </div>
  );
};

export default FullHero;
