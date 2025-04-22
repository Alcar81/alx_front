import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Menu.css";
import { ThemeContext } from "../../../theme/ThemeContext";
import { useUserContext } from "../../../contexts/UserContext";

const MenuRight: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const { mode, toggleColorMode } = useContext(ThemeContext);
  const { user, logout } = useUserContext();

  const handleLogout = () => {
    try {
      logout();
      window.location.href = "/Accueil";
    } catch (error) {
      console.error("❌ Erreur lors de la déconnexion :", error);
      alert("Une erreur est survenue lors de la déconnexion.");
    }
  };

  return (
    <div id="menu-right" className="light">
      <div className="container-right">
        <nav className="menu-items">
          <ul className="menu-list">
            <li><Link to="/À-propos">À propos</Link></li>
            <li><Link to="/Contact">Nous joindre</Link></li>
          </ul>
        </nav>

        {/* Recherche */}
        <div className="menu-search" onClick={() => setShowSearch(!showSearch)}>
          <SearchIcon style={{ fontSize: "25px", color: "#007bff", cursor: "pointer" }} />
        </div>
        {showSearch && (
          <div className="search-box" onMouseLeave={() => setShowSearch(false)}>
            <input type="text" placeholder="Rechercher..." className="search-input" />
          </div>
        )}

        {/* Compte */}
        <div
          id="account-icon"
          className={`menu-account ${showAccountMenu ? "active" : ""}`}
          onClick={() => setShowAccountMenu(!showAccountMenu)}
        >
          <AccountCircleIcon style={{ fontSize: "25px", color: "#007bff", cursor: "pointer" }} />
          {showAccountMenu && (
            <ul className="dropdown-menu account-dropdown" onMouseLeave={() => setShowAccountMenu(false)}>
              {user ? (
                <>
                  <li><strong>{user.firstName}</strong></li>
                  {user.role === "ADMIN" && (
                    <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
                  )}
                  <li><span onClick={handleLogout}>Déconnexion</span></li>
                </>
              ) : (
                <>
                  <li><Link to="/Inscription">Inscription</Link></li>
                  <li><Link to="/Connexion">Connexion</Link></li>
                </>
              )}
              <li>
                <span onClick={toggleColorMode}>
                  {mode === "light" ? "🌙 Mode sombre" : "☀️ Mode clair"}
                </span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuRight;
