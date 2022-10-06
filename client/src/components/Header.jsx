import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h3>
        <Link to={""}>Test task for JSNinjas</Link>
      </h3>
      <Link to={"add"}>Add new</Link>
    </header>
  );
};

export default Header;
