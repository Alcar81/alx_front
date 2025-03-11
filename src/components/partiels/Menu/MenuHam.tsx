// 📌 src/components/partiels/Menu/MenuHam.tsx
import React, { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import "./Menu.css";
import { ThemeContext } from "../../../theme/ThemeContext";

const MenuHam: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { mode, toggleColorMode } = useContext(ThemeContext);
  const menuRef = useRef<HTMLDivElement>(null);

  // 🔹 Ouvrir/fermer le menu
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  // 🔹 Fermer le menu seulement si la souris quitte TOUTE la zone du menu
  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    if (menuRef.current && !menuRef.current.contains(event.relatedTarget as Node)) {
      setIsDropdownOpen(false);
    }
  };

  const handleOpenAuthModal = (type: "signIn" | "signUp") => {
    const event = new CustomEvent("openAuthModal", { detail: { type } });
    window.dispatchEvent(event);
  };

  return (
    <div className="menu-ham-container" ref={menuRef}>
      {/* 📌 Icône Hamburger à droite */}
      <div className="menu-ham-icon" onClick={toggleDropdown}>
        <MenuIcon />
      </div>

      {/* 📌 Dropdown Menu */}
      {isDropdownOpen && (
        <div className="menu-ham-dropdown" onMouseLeave={handleMouseLeave}>
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
            <li className="divider"></li>
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
            <li className="dropdown">
              <span className="popup-link" onClick={toggleColorMode}>
                {mode === "light" ? "🌙 Mode sombre" : "☀️ Mode clair"}
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuHam;
