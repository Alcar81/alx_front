// 📌 src/components/partiels/Menu/MenuHam.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import "./Menu.css";

const MenuHam: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  // 🔹 Fonction pour ouvrir le modal (via événement global)
  const handleOpenAuthModal = (type: "signIn" | "signUp") => {
    const event = new CustomEvent("openAuthModal", { detail: { type } });
    window.dispatchEvent(event);
  };

  return (
    <div className="menu-ham">
      {/* 📌 Icône Hamburger */}
      <div className="menu-ham-icon" onClick={toggleDropdown}>
        <MenuIcon />
      </div>

      {/* 📌 Dropdown Menu */}
      {isDropdownOpen && (
        <div className="menu-ham-dropdown">
          <ul>
            <li className="dropdown">
              <AccountCircleIcon />
              <Link to="/account">Mon Compte</Link>
            </li>
            <li className="dropdown">
              <Link to="/Connexion">Connexion</Link>
            </li>
            <li className="dropdown">
              <Link to="/Inscription">Inscription</Link>
            </li>
            <li className="dropdown">
              <span onClick={() => handleOpenAuthModal("signUp")} className="popup-link">
                Inscription (Popup)
              </span>
            </li>
            <li className="dropdown">
              <span onClick={() => handleOpenAuthModal("signIn")} className="popup-link">
                Connexion (Popup)
              </span>
            </li>
            <li className="divider"></li> {/* 📌 Ligne de séparation */}
            <li className="dropdown">
              <Link to="/home">Accueil</Link>
            </li>
            <li className="dropdown">
              <Link to="/about">À propos</Link>
            </li>
            <li className="dropdown">
              <Link to="/contact">Nous joindre</Link>
            </li>
            <li className="dropdown">
              <SearchIcon />
              <Link to="/search">Rechercher</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuHam;
