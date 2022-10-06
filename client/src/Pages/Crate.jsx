import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import UploadedImage from "../components/UploadedImage";

const Crate = () => {
  const [nickname, setNickname] = useState("");
  const [realName, setRealName] = useState("");
  const [originDescription, setOriginDescription] = useState("");
  const [superpowers, setSuperpowers] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");
  //const [imageURL, setImageURL] = useState();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const inputFileRef = useRef(null);

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const NicknameOnChange = (e) => {
    setNickname(e.target.value);
  };
  const RealNameOnChange = (e) => {
    setRealName(e.target.value);
  };
  const originDescriptionOnChange = (e) => {
    setOriginDescription(e.target.value);
  };
  const superpowersOnChange = (e) => {
    setSuperpowers(e.target.value);
  };
  const catchPhraseOnChange = (e) => {
    setCatchPhrase(e.target.value);
  };

  const changeFileHandler = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0]; // inputFileRef.current.files[0]
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      //setImageURL(data.url);
      setImages((images) => [...images, data.url]);
    } catch (error) {
      console.log(error);
      alert("Can't load file");
    }
  };

  const onClickRemoveFile = (e) => {
    console.log(images[e.target.id]);
    setImages(images.filter((img) => img !== images[e.target.id]));
  };

  const clearData = () => {
    // change to redux
    setNickname("");
    setRealName("");
    setOriginDescription("");
    setSuperpowers("");
    setCatchPhrase("");
    //setImageURL("");
    setImages([]);
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      console.log("Submit event");

      const superhero = {
        _id: id,
        nickname,
        real_name: realName,
        origin_description: originDescription,
        superpowers,
        catch_phrase: catchPhrase,
        images,
      };
      const { data } = isEditing
        ? await axios.put("/api/superhero", superhero)
        : await axios.post("/api/superhero", superhero);

      if (data) {
        setLoading(false);
        clearData();
        navigate("/");
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (id) {
      axios.get("/api/superhero/" + id).then(({ data }) => {
        setNickname(data.nickname);
        setRealName(data.real_name);
        setOriginDescription(data.origin_description);
        setSuperpowers(data.superpowers);
        setCatchPhrase(data.catch_phrase);
        setImages(data.images);
      });
    }
  }, []);

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          required
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={NicknameOnChange}
        />
        <input
          type="text"
          placeholder="Real Name"
          value={realName}
          onChange={RealNameOnChange}
        />
        <textarea
          placeholder="Origin description"
          value={originDescription}
          onChange={originDescriptionOnChange}
        ></textarea>
        <input
          type="text"
          placeholder="Superpowers"
          value={superpowers}
          onChange={superpowersOnChange}
        />
        <input
          type="text"
          placeholder="Catch phrase"
          value={catchPhrase}
          onChange={catchPhraseOnChange}
        />
        <div className="upload-wrapper">
          {/* <div className="empty-block"></div> */}
          <button type="button" onClick={() => inputFileRef.current.click()}>
            Upload Image
          </button>
        </div>
        {images && (
          <>
            <div className="uploaded-images-wrapper">
              {images.map((img, i) => {
                return (
                  <UploadedImage
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

export default Crate;
