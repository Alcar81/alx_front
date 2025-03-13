// src/components/partiels/Header/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logos/logo-desktop.png";
import MenuRight from "../Menu/MenuRight";
import MenuLeft from "../Menu/MenuLeft";
import MenuHam from "../Menu/MenuHam"; // ✅ Gestion unique du menu hamburger
import useIsMobile from "../../../hooks/useIsMobile"; // 🔥 Import du hook
import "./Header.css";

const Header: React.FC = () => {
  const isMobile = useIsMobile(); // ✅ Utilisation du hook

  return (
    <header className="header">
      <div className="header-container">
        {/* ✅ Afficher le menu hamburger UNIQUEMENT en mobile */}
        {isMobile && <MenuHam />}

        {/* ✅ Masquer MenuLeft en mobile */}
        {!isMobile && <MenuLeft />}

        {/* ✅ Logo centré */}
        <div className="menu-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="header-logo-img" />
          </Link>
        </div>

        {/* ✅ Masquer MenuRight en mobile */}
        {!isMobile && <MenuRight />}
      </div>
    </header>
  );
};

export default Header;
