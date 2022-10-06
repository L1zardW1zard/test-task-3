import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Hero = ({ hero }) => {
  useEffect(() => {
    console.log();
  }, []);

  return (
    <div className="hero-item">
      <div className="image-prewiev">
        <img src={hero.images ? hero.images[0] : ""} alt="empty" />
      </div>
      <div className="hero-name">
        <h3>
          <Link to={"/superhero/" + hero._id}>{hero.nickname}</Link>
        </h3>
      </div>
    </div>
  );
};

export default Hero;
