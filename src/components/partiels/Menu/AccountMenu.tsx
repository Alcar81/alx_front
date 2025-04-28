// 📁 src/components/partiels/Menu/AccountMenu.tsx

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ThemeContext } from "../../../theme/ThemeContext";
import { useUserContext } from "../../../contexts/UserContext";
import "./Menu.css"; // 📌 important : pour garder les styles

interface AccountMenuProps {
  mode: "right" | "ham"; // right = menu desktop / ham = menu hamburger
}

const AccountMenu: React.FC<AccountMenuProps> = ({ mode }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, logout } = useUserContext();
  const { mode: themeMode, toggleColorMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
      navigate("/Accueil");
    } catch (error) {
      console.error("❌ Erreur lors de la déconnexion :", error);
      alert("Une erreur est survenue lors de la déconnexion.");
    }
  };

  const isAdmin = user?.roles?.some((r) => r.toLowerCase() === "admin");

  return (
    <div
      className={`account-menu ${mode}`}
      onClick={() => setShowMenu(!showMenu)}
      onMouseLeave={() => setShowMenu(false)}
    >
      {/* Affichage prénom ou icône */}
      <div className="account-label">
        {user ? (
          <span className="account-name">{user.firstName}</span>
        ) : (
          <AccountCircleIcon style={{ fontSize: "25px", color: "#007bff" }} />
        )}
      </div>

      {/* Dropdown */}
      {showMenu && (
        <ul className="dropdown-menu account-dropdown">
          {user ? (
            <>
              <li>
                <Link to="/profile">👤 Mon Profil</Link>
              </li>
              {isAdmin && (
                <li>
                  <Link to="/admin/dashboard">⚙️ Admin</Link>
                </li>
              )}
              <li>
                <span onClick={handleLogout}>🚪 Déconnexion</span>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/Connexion">Connexion</Link>
              </li>
              <li>
                <Link to="/Inscription">Inscription</Link>
              </li>
            </>
          )}
          <li className="divider"></li>
          <li>
            <span onClick={toggleColorMode}>
              {themeMode === "light" ? "🌙 Mode sombre" : "☀️ Mode clair"}
            </span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default AccountMenu;
