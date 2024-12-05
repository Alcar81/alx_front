import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Menu.css";

const MenuRight: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  let closeTimeout: NodeJS.Timeout | null = null;

  const toggleAccountMenu = () => {
    setShowAccountMenu((prev) => !prev);

    // Ajoute un délai pour refermer le menu
    if (!showAccountMenu) {
      closeTimeout = setTimeout(() => {
        setShowAccountMenu(false);
      }, 3000); // 3 secondes
    }
  };

  // Annule le délai si la souris revient
  const clearCloseTimeout = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      closeTimeout = null;
    }
  };

  useEffect(() => {
    // Nettoie le délai au démontage
    return () => clearCloseTimeout();
  }, []);

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
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MenuRight;
