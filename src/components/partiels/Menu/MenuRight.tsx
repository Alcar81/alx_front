// src/components/partiels/Menu/MenuRight.tsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Menu.css";

const MenuRight: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null); // Utilisez useRef pour éviter les dépendances inutiles

  const toggleAccountMenu = () => {
    setShowAccountMenu((prev) => !prev);

    if (!showAccountMenu) {
      closeTimeout.current = setTimeout(() => {
        setShowAccountMenu(false);
      }, 3000); // 3 secondes
    }
  };

  const clearCloseTimeout = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  useEffect(() => {
    // Nettoyage lors du démontage
    return () => clearCloseTimeout();
  }, []); // Pas besoin de dépendances supplémentaires grâce à useRef

  return (
    <div id="menu-right" className="light">
      <div className="container">
        <nav>
          <div className="container-right">
            <ul>
              <li className="dropdown">
                <Link to="/À-propos">À propos</Link>
              </li>
              <li className="dropdown">
                <Link to="/Contact">Nous joindre</Link>
              </li>
            </ul>

            {/* Search Icon */}
            <div
              id="top-search"
              className="menu-search"
              onClick={() => setShowSearch(!showSearch)}
            >
              <SearchIcon
                style={{ fontSize: "25px", color: "#007bff", cursor: "pointer" }}
              />
            </div>

            {/* Search Box */}
            {showSearch && (
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="search-input"
                />
              </div>
            )}

            {/* Account Icon with Dropdown */}
            <div
              id="account-icon"
              className={`menu-account ${showAccountMenu ? "active" : ""}`}
              onClick={toggleAccountMenu}
              onMouseEnter={clearCloseTimeout} // Annule le délai si la souris est sur l'icône
            >
              <AccountCircleIcon
                style={{ fontSize: "25px", color: "#007bff", cursor: "pointer" }}
              />
              {showAccountMenu && (
                <ul
                  className="dropdown-menu account-dropdown"
                  onMouseEnter={clearCloseTimeout} // Annule le délai si la souris est sur le menu
                  onMouseLeave={() => setShowAccountMenu(false)} // Ferme le menu si la souris quitte
                >
                  <li className="dropdown">
                    <Link to="/Connexion">Connexion</Link>
                  </li>
                  <li className="dropdown">
                    <Link to="/Inscription">Inscription</Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MenuRight;
