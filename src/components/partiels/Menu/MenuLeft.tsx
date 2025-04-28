// src/components/partiels/Menu/MenuLeft.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useMaintenance } from "../../../hooks/useMaintenance"; // 🔥 Ajouté
import "./Menu.css";

const MenuLeft: React.FC = () => {
  const { isMaintenanceActive } = useMaintenance(); // 🔥 Ajouté

  if (isMaintenanceActive) return null; // 🔥 Menu caché si maintenance active

  return (
    <div id="menu-left" className="light">
      <div className="container-left">
        <nav className="menu-items">
          <ul>
            <li><Link to="/Accueil">Accueil</Link></li>
          </ul>
        </nav>    
      </div>
    </div>
  );
};

export default MenuLeft;
