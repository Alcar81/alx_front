// 📁 src/components/pages/Builder/blocks/MenuLeftBlock.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./MenuBlock.css"; // commun aux deux menus

const MenuLeftBlock: React.FC = () => {
  return (
    <nav className="menu-block left">
      <ul>
        <li><Link to="/Accueil">Accueil</Link></li>
        <li><Link to="/À-propos">À propos</Link></li>
        <li><Link to="/Contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default MenuLeftBlock;
