import React from "react";
import { Link } from "react-router-dom";

import "./Header.module.scss";

const Header = () => {
  return (
    <header>
      <Link to={""}>Test task for JSNinjas</Link>
      <Link to={"add"}>Add new</Link>
    </header>
  );
};

export default Header;
