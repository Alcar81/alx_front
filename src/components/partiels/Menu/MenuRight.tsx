// 📁 src/components/partiels/Menu/MenuRight.tsx

import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useMaintenance } from "../../../hooks/useMaintenance"; // 🔥 Ajouté
import AccountMenu from "./AccountMenu";
import "./Menu.css";
import "./AccountMenu.css";

const MenuRight: React.FC = () => {
  const [showSearch, setShowSearch] = React.useState(false);
  const { isMaintenanceActive } = useMaintenance(); // 🔥 Ajouté

  if (isMaintenanceActive) return null; // 🔥 Menu caché si maintenance active

  return (
    <div id="menu-right" className="light">
      <div className="container-right">
        <nav className="menu-items">
          <ul className="menu-list">
            <li><Link to="/À-propos">À propos</Link></li>
            <li><Link to="/Contact">Nous joindre</Link></li>
          </ul>
        </nav>

        <div className="menu-search" onClick={() => setShowSearch(!showSearch)}>
          <SearchIcon style={{ fontSize: "25px", color: "#007bff", cursor: "pointer" }} />
        </div>
        {showSearch && (
          <div className="search-box" onMouseLeave={() => setShowSearch(false)}>
            <input type="text" placeholder="Rechercher..." className="search-input" />
          </div>
        )}

        <AccountMenu mode="right" />
      </div>
    </div>
  );
};

export default MenuRight;
