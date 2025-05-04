// src/components/partiels/Header/Header.tsx

import React from "react";
import Menu from "../Menu/Menu";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="menu-container">
          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Header;
