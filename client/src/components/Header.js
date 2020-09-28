import { KEEP } from "../constants/appConstants";
import keepIcon from "./../assets/keepIcon.png";
import React from "react";

const Header = () => {
  return (
    <nav className="header">
      <img src={keepIcon} alt="Keep-Logo" className="header-icon" />
      <h2 className="header-title">{KEEP}</h2>
      <br />
    </nav>
  );
};

export default Header;
