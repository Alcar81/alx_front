import React from "react";
import MenuLeft from "./MenuLeft";
import MenuRight from "./MenuRight";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logos/Logo_ALX_XL_v3.png";
import "./Menu.css";

const Menu: React.FC = () => {
  return (
    <div className="header-container">
      <div className="menu-left">
        <MenuLeft />
      </div>

      <div className="header-logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="menu-right">
        <MenuRight />
      </div>
    </div>
  );
};

export default Menu;
