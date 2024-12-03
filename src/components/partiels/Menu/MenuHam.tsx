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

  return (
    <div className="menu-ham">
      {/* Icone Hamburger */}
      <div className="menu-ham-icon" onClick={toggleDropdown}>
        <MenuIcon />
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="menu-ham-dropdown">
          <ul>
            <li>
              <AccountCircleIcon />
              <Link to="/account">Mon Compte</Link>
            </li>
            <li>
              <Link to="/Connexion">Connexion</Link>
            </li>
            <li>
              <Link to="/Inscription">Inscription</Link>
            </li>
            <li className="divider"></li> {/* Ligne de séparation */}
            <li>
              <Link to="/home">Accueil</Link>
            </li>
            <li>
              <Link to="/about">À propos</Link>
            </li>
            <li>
              <Link to="/contact">Nous joindre</Link>
            </li>
            <li>
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
