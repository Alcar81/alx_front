// src/components/partiels/Menu/Menu.tsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logos/logo-desktop.png";
import MenuRight from "./MenuRight";
import MenuLeft from "./MenuLeft";
import MenuHam from "./MenuHam";
import useIsMobile from "../../../hooks/useIsMobile";
import "./Menu.css";

const Menu: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <nav className="menu">  {/* ✅ Remplace menu-container par menu */}
      <div className="menu-left">
        {!isMobile && <MenuLeft />}
      </div>
      
      <div className="menu-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="menu-logo-img" />
        </Link>
      </div>
      
      <div className="menu-right">
        {!isMobile && <MenuRight />}
      </div>

      {/* ✅ Menu hamburger en mobile */}
      {isMobile && <MenuHam />}
    </nav>
  );
};

export default Menu;
