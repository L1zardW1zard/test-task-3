import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteHero, fetchOneHeroById } from "../../redux/slices/heroSlice";

import styles from "./FullHero.module.scss";

const FullHero = () => {
  const hero = useSelector((state) => state.hero.selectedHero);
  const { id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOneHeroById(id));
  }, [id, dispatch]);

  const onClickDelete = async () => {
    dispatch(deleteHero(id));
    navigate("/");
  };

  const onClickEdit = () => {
    navigate("/superhero/" + id + "/edit");
  };

  return (
    <div className={styles.heroItemFull}>
      <div className={styles.buttonContainer}>
        <div className={styles.buttonWrapper}>
          <button type="button" className={styles.editBtn} onClick={onClickEdit}>
            Edit
          </button>
          <button type="button" className={styles.deleteBtn} onClick={onClickDelete}>
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
