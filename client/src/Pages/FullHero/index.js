import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { decrementHeroAmount } from "../../redux/slices/heroSlice";

import styles from "./FullHero.module.scss";

const FullHero = () => {
  const [hero, setHero] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/superhero/" + id).then((res) => {
      setHero(res.data);
    });
  }, [id]);

  const onClickDelete = async () => {
    await axios.delete("/api/superhero/" + id); // change to redux-toolkit
    navigate("/");
    dispatch(decrementHeroAmount());
  };

  const onClickEdit = () => {
    navigate("/superhero/" + id + "/edit");
  };

  return (
    <div className={styles.heroItemFull}>
      <div className={styles.buttonContainer}>
        <div className={styles.buttonWrapper}>
          <button
            type="button"
            className={styles.editBtn}
            onClick={onClickEdit}
          >
            Edit
          </button>
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={onClickDelete}
          >
            Delete
          </button>
        </div>
      </div>
      <div className={styles.heroImageWrapper}>
        {hero.images &&
          hero.images.map((img, i) => {
            return <img src={img} alt="empty" key={i} />;
          })}
      </div>
      <div className={styles.heroInfo}>
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
