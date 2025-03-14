// src/components/partiels/Header/Header.tsx
import React from "react";
import Menu from "../Menu/Menu";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="menu-container">  {/* ✅ On garde ce conteneur ici */}
          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Header;
