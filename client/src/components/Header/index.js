import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDefaultHero } from "../../redux/slices/heroSlice";

import "./Header.module.scss";

const Header = () => {
  const dispatch = useDispatch();

  const onClickClearSelectedHero = () => {
    dispatch(setDefaultHero({}));
  };

  return (
    <header>
      <Link to={""} onClick={onClickClearSelectedHero}>
        Test task for JSNinjas
      </Link>
      <Link to={"add"} onClick={onClickClearSelectedHero}>
        Add new
      </Link>
    </header>
  );
};

export default Header;
