// 📁 src/components/pages/Builder/blocks/MenuRightBlock.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./MenuBlock.css"; // commun aux deux menus

const MenuRightBlock: React.FC = () => {
  return (
    <nav className="menu-block right">
      <ul>
        <li><Link to="/Connexion">Connexion</Link></li>
        <li><Link to="/Inscription">Inscription</Link></li>
        <li><Link to="/FAQ">FAQ</Link></li>
      </ul>
    </nav>
  );
};

export default MenuRightBlock;
