import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Menu.css";
import { ThemeContext } from "../../../theme/ThemeContext"; // ✅ Ajoute cette ligne

const MenuRight: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const { mode, toggleColorMode } = useContext(ThemeContext); // ✅ Utilise ton contexte ici

  const toggleAccountMenu = () => {
    setShowAccountMenu((prev) => !prev);
    if (!showAccountMenu) {
      closeTimeout.current = setTimeout(() => {
        setShowAccountMenu(false);
      }, 3000);
    }
  };

  const clearCloseTimeout = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  useEffect(() => {
    return () => clearCloseTimeout();
  }, []);

  const handleOpenAuthModal = (type: "signIn" | "signUp") => {
    const event = new CustomEvent("openAuthModal", { detail: { type } });
    window.dispatchEvent(event);
  };

  return (
    <>
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

              <div
                id="top-search"
                className="menu-search"
                onClick={() => setShowSearch(!showSearch)}
              >
                <SearchIcon style={{ fontSize: "25px", color: "#007bff", cursor: "pointer" }} />
              </div>

              {showSearch && (
                <div className="search-box">
                  <input type="text" placeholder="Rechercher..." className="search-input" />
                </div>
              )}

              <div
                id="account-icon"
                className={`menu-account ${showAccountMenu ? "active" : ""}`}
                onClick={toggleAccountMenu}
                onMouseEnter={clearCloseTimeout}
              >
                <AccountCircleIcon
                  style={{ fontSize: "25px", color: "#007bff", cursor: "pointer" }}
                />
                {showAccountMenu && (
                  <ul
                    className="dropdown-menu account-dropdown"
                    onMouseEnter={clearCloseTimeout}
                    onMouseLeave={() => setShowAccountMenu(false)}
                  >
                    <li className="dropdown">
                      <Link to="/Inscription">Inscription</Link>
                    </li>
                    <li className="dropdown">
                      <Link to="/Connexion">Connexion</Link>
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
                    <li className="dropdown">
                      <span className="popup-link" onClick={toggleColorMode}>
                        {mode === "light" ? "🌙 Mode sombre" : "☀️ Mode clair"}
                      </span>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MenuRight;
