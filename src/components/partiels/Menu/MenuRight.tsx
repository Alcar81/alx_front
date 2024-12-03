// src/components/partiels/Menu/MenuRight.tsx
import React, { useState} from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Menu.css";

const MenuRight: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const toggleAccountMenu = () => {
    setShowAccountMenu((prev) => !prev); // Inverse l'état actuel
  };

  return (
    <div id="menu-right" className="light">
      <div className="container">        
        <nav>
            {/* Right Menu */}
            <div className="container-right">
                {/* Menu items */}
                <ul>
                    <li className="dropdown">
                        <Link to="/À-propos">
                            <a href="#">À propos</a>
                        </Link>                      
                    </li>
                    <li className="dropdown">
                        <Link to="/Contact">
                            <a href="#">Nous joindre</a> 
                        </Link>                       
                    </li>                    
                </ul>

                {/* Top Search Icon */}
                <div
                    id="top-search"
                    className="menu-search"
                    onClick={() => setShowSearch(!showSearch)}
                    >
                    <SearchIcon style={{ fontSize: "25px", color: "#007bff", cursor: "pointer" }} />
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
                    className="menu-account"
                    onClick={toggleAccountMenu} // Affiche/masque le menu au clic
                    >
                    <AccountCircleIcon
                        style={{ fontSize: "25px", color: "#007bff", cursor: "pointer" }}
                    />
                    {showAccountMenu && (
                        <ul
                        className="dropdown-menu account-dropdown"
                        onMouseLeave={() => setShowAccountMenu(false)} // Masque le menu si la souris quitte le menu
                        >
                        <li className="dropdown">
                            <Link to="/login">
                            Connexion
                            </Link>
                        </li>
                        <li className="dropdown">
                            <Link to="/register">
                            Inscription
                            </Link>
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
