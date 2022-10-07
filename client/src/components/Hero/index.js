import React from "react";
import { Link } from "react-router-dom";

import styles from "./Hero.module.scss";

const Hero = ({ hero, index }) => {
  return (
    <div className={styles.heroItem} data-testid="hero">
      <Link to={"/superhero/" + hero._id}>
        <div className={styles.imagePrewiev}>
          {hero.images.length !== 0 ? (
            <img src={hero.images[0]} alt="empty" />
          ) : (
            <></>
          )}
        </div>
        <div className={styles.heroName}>
          <h3>{hero.nickname}</h3>
        </div>
      </Link>
    </div>
  );
};

export default Hero;
