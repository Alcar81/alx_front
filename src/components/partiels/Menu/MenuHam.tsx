// 📌 src/components/partiels/Menu/MenuHam.tsx
import React, { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import "./Menu.css";
import { ThemeContext } from "../../../theme/ThemeContext";
import { useUserContext } from "../../../contexts/UserContext";

const MenuHam: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { mode, toggleColorMode } = useContext(ThemeContext);
  const { user, logout } = useUserContext();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => setIsDropdownOpen(false);

  const handleLogout = () => {
    try {
      logout();
      window.location.href = "/Accueil";
    } catch (error) {
      console.error("❌ Erreur lors de la déconnexion :", error);
      alert("Une erreur est survenue lors de la déconnexion.");
    }
  };

  // ✅ Vérifie si l'utilisateur est admin
  const isAdmin = user?.roles?.some((r) => r.toLowerCase() === "admin");

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
            <li>
              <AccountCircleIcon />
              {user ? (
                <span>{user.firstName}</span>
              ) : (
                <Link to="/account">Mon Compte</Link>
              )}
            </li>

            {!user && (
              <>
                <li><Link to="/Connexion">Connexion</Link></li>
                <li><Link to="/Inscription">Inscription</Link></li>
              </>
            )}

            {user && (
              <>
                {isAdmin && 
                  <li><Link to="/admin/dashboard">Admin</Link></li>
                }
                <li>
                  <span className="popup-link" onClick={handleLogout}>
                    Déconnexion
                  </span>
                </li>
              </>
            )}

            <li className="divider"></li>
            <li><Link to="/Accueil">Accueil</Link></li>
            <li><Link to="/À-propos">À propos</Link></li>
            <li><Link to="/Contact">Nous joindre</Link></li>
            <li>
              <SearchIcon />
              <Link to="/search">Rechercher</Link>
            </li>
            <li>
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
