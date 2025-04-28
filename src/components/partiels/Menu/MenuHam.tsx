// 📁 src/components/partiels/Menu/MenuHam.tsx

import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import "./Menu.css";
import AccountMenu from "./AccountMenu"; // 🔥 nouveau import

const MenuHam: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => setIsDropdownOpen(false);

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
            <li><AccountMenu mode="ham" /></li>
            <li className="divider"></li>
            <li><Link to="/Accueil">Accueil</Link></li>
            <li><Link to="/À-propos">À propos</Link></li>
            <li><Link to="/Contact">Nous joindre</Link></li>
            <li>
              <SearchIcon />
              <Link to="/search">Rechercher</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuHam;
