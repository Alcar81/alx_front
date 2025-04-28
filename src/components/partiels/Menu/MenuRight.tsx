// 📁 src/components/partiels/Menu/MenuRight.tsx

import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import "./Menu.css";
import AccountMenu from "./AccountMenu"; // 🔥 nouveau import

const MenuRight: React.FC = () => {
  const [showSearch, setShowSearch] = React.useState(false);

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

        {/* Compte utilisateur */}
        <AccountMenu mode="right" />
      </div>
    </div>
  );
};

export default MenuRight;
