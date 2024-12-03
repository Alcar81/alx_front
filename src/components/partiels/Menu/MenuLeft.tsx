// src/components/partiels/Menu/MenuLeft.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

const MenuLeft: React.FC = () => {
  return (
    <div id="menu-left" className="light">
        <div className="container">        
            <nav>
                {/* Left menu */}
                <div className="container-left"></div>
                    <ul>
                    <li className="dropdown">
                        <Link to="/Accueil">Accueil</Link>                        
                    </li>
                    <li className="dropdown">
                        <a href="#"></a>                        
                    </li>
                    <li className="dropdown">
                        <a href="#"></a>                        
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  );
};

export default MenuLeft;
