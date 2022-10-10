import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementHeroAmount,
  setSelectedHero,
  setDefaultHero,
} from "../../redux/slices/heroSlice";

import styles from "./Create.module.scss";
import UploadedImages from "../../components/UploadedImages";

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const heroRedux = useSelector((state) => state.hero.selectedHero);

  const [hero, setHero] = useState({
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: "",
    catch_phrase: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef(null);
  const { id } = useParams();
  const isEditing = Boolean(id);

  const NicknameOnChange = (e) => {
    setHero({ ...hero, nickname: e.target.value });
    //dispatch(setHeroNickname(e.target.value));
  };
  const RealNameOnChange = (e) => {
    setHero({ ...hero, real_name: e.target.value });
    //dispatch(setHeroRealName(e.target.value));
  };
  const originDescriptionOnChange = (e) => {
    setHero({ ...hero, origin_description: e.target.value });
    //dispatch(setHeroOriginDescription(e.target.value));
  };
  const superpowersOnChange = (e) => {
    setHero({ ...hero, superpowers: e.target.value });
    //dispatch(setHeroSuperpowers(e.target.value));
  };
  const catchPhraseOnChange = (e) => {
    setHero({ ...hero, catch_phrase: e.target.value });
    //dispatch(setHeroCatchPhrase(e.target.value));
  };

  const changeFileHandler = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0]; // inputFileRef.current.files[0]
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      // dispatch(setHeroImages([...hero.images, data.url]));
      setHero({ ...hero, images: [...hero.images, data.url] });
    } catch (error) {
      console.log(error);
    }
  };

  const onClickRemoveFile = (e) => {
    // dispatch(
    //   setHeroImages(
    //     hero.images.filter((img) => img !== hero.images[e.target.id])
    //   )
    // );

    setHero({
      ...hero,
      images: hero.images.filter((img) => img !== hero.images[e.target.id]),
    });
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      console.log("Submit event");

      const superhero = hero;
      const { data } = isEditing
        ? await axios.put("/api/superhero", superhero)
        : await axios.post("/api/superhero", superhero);

      if (data) {
        setLoading(false);
        dispatch(setDefaultHero({}));
        navigate("/");
        if (!isEditing) dispatch(incrementHeroAmount());
      }
    } catch (error) {}
  };

  useEffect(() => {
    setHero(heroRedux);
    if (id) {
      axios.get("/api/superhero/" + id).then(({ data }) => {
        dispatch(setSelectedHero(data));
        setHero(data);
      });
    }
  }, [id]);

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          required
          type="text"
          placeholder="Nickname"
          value={hero.nickname}
          onChange={NicknameOnChange}
        />
        <input
          type="text"
          placeholder="Real Name"
          value={hero.real_name}
          onChange={RealNameOnChange}
        />
        <textarea
          placeholder="Origin description"
          value={hero.origin_description}
          onChange={originDescriptionOnChange}
        ></textarea>
        <input
          type="text"
          placeholder="Superpowers"
          value={hero.superpowers}
          onChange={superpowersOnChange}
        />
        <input
          type="text"
          placeholder="Catch phrase"
          value={hero.catch_phrase}
          onChange={catchPhraseOnChange}
        />
        <div className={styles.uploadWrapper}>
          <button type="button" onClick={() => inputFileRef.current.click()}>
            Upload Image
          </button>
        </div>
        {hero.images && (
          <>
            <div className={styles.uploadedImagesWrapper}>
              {hero.images.map((img, i) => {
                return (
                  <UploadedImages
                    img={img}
                    key={i}
                    i={i}
                    onClickRemoveFile={onClickRemoveFile}
                  />
                );
              })}
            </div>
          </>
        )}

        <input
          onChange={changeFileHandler}
          ref={inputFileRef}
          type="file"
          accept="image/png, image/gif, image/jpeg"
          hidden
        />
        <button type="submit" disabled={loading}>
          {isEditing ? "Save" : "Add"}
        </button>
      </form>
    </>
  );
};

export default Create;
