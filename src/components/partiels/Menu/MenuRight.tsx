// 📁 src/components/partiels/Menu/MenuRight.tsx

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useMaintenance } from "../../../hooks/useMaintenance";
import AccountMenu from "./AccountMenu";
import "./Menu.css";

const MenuRight: React.FC = () => {
  const [showSearch, setShowSearch] = React.useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { isMaintenanceActive } = useMaintenance();

  if (isMaintenanceActive) return null;

  // Gère l'ouverture prolongée du champ de recherche
  const handleMouseEnterSearch = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowSearch(true);
  };

  const handleMouseLeaveSearch = () => {
    timeoutRef.current = setTimeout(() => setShowSearch(false), 300); // 300ms de délai
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

        <div
          className="menu-search"
          onMouseEnter={handleMouseEnterSearch}
          onMouseLeave={handleMouseLeaveSearch}
        >
          <SearchIcon style={{ fontSize: "25px", color: "#007bff", cursor: "pointer" }} />
          {showSearch && (
            <div className="search-box">
              <input type="text" placeholder="Rechercher..." className="search-input" />
            </div>
          )}
        </div>

        <div className="account-wrapper">
          <AccountMenu mode="right" />
        </div>
      </div>
    </div>
  );
};

export default MenuRight;
