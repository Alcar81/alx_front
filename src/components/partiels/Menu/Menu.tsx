import React from "react";
import "./Menu.css";
import logo from "../../images/Logo_ALX_XL_v1.png"; // Exemple d'import dynamique

const Menu = () => {
  return (
    <header className="menu-container">
      <nav className="menu">
        <div className="menu-left">
          <a href="/" className="menu-item">Accueil</a>
        </div>
        <div className="menu-logo">
          <img src={logo} alt="Logo" className="menu-logo-img" />
        </div>
        <div className="menu-right">
          <a href="/register" className="menu-item">S'inscrire</a>
          <a href="/login" className="menu-item">Se connecter</a>
        </div>
      </nav>
    </header>
  );
};

export default Menu;
