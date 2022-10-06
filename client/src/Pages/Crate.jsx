import React, { useState, useRef } from "react";
import axios from "axios";

const Crate = () => {
  const [nickname, setNickname] = useState("");
  const [realName, setRealName] = useState("");
  const [originDescription, setOriginDescription] = useState("");
  const [superpowers, setSuperpowers] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");
  const [imageURL, setImageURL] = useState();
  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef(null);

  const [images, setImages] = useState([]);

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
      const file = e.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageURL(data.url);
      setImages((images) => [...images, data.url]);
    } catch (error) {
      console.log(error);
      alert("Can't load file");
    }
  };

  const onClickRemoveFile = (e) => {
    setImages((images) => images.splice(-1));
    setImageURL("");
  };

  const clearData = () => {
    setNickname("");
    setRealName("");
    setOriginDescription("");
    setSuperpowers("");
    setCatchPhrase("");
    setImageURL("");
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      console.log("Submit event");

      //setImages((images) => [...images, data.url]);

      const superhero = {
        nickname,
        real_name: realName,
        origin_description: originDescription,
        superpowers,
        catch_phrase: catchPhrase,
        images,
      };
      const { data } = await axios.post("/api/superhero", superhero);
      if (data) {
        setLoading(false);
        clearData();
      }
    } catch (error) {}
  };

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
        {imageURL && (
          <>
            <div className="upload-image">
              <img src={`http://localhost:5000${imageURL}`} alt="uploaded" />
              <button type="button" onClick={onClickRemoveFile}>
                Delete
              </button>
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
          Add
        </button>
      </form>
    </>
  );
};

export default Crate;
