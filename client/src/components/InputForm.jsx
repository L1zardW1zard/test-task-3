import React, { useState } from "react";

const InputForm = () => {
  const [nickname, setNickname] = useState("");

  const NicknameOnChange = (e) => {
    setNickname(e.target.value);
  };

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={NicknameOnChange}
        />
        <input type="text" placeholder="Real Name" />
        <input type="text" />
      </form>
    </>
  );
};

export default InputForm;
