// src/components/partiels/Menu/MenuHam.tsx
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

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div
      className="menu-ham-container"
      ref={menuRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="menu-ham-icon">
        <MenuIcon />
      </div>

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
            
            <li className="divider"></li>
            
            <li className="dropdown">
              <Link to="/Accueil">Accueil</Link>
            </li>
            <li className="dropdown">
              <Link to="/À-propos">À propos</Link>
            </li>
            <li className="dropdown">
              <Link to="/Contact">Nous joindre</Link>
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
