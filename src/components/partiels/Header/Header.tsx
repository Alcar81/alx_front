// src/components/partiels/Header/Header.tsx 
import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logos/Logo_ALX_XL_v3.png";
import MenuRight from "../Menu/MenuRight";
import MenuLeft from "../Menu/MenuLeft";
import MenuHam from "../Menu/MenuHam";
import { useState, useEffect } from "react";

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header id="header" className="header">
      <div id="header-wrap" className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <Link to="/">
            <img src={logo} alt="Logo" className="header-logo-img" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="header-nav">
          {isMobile ? (
            <MenuHam /> // Menu hamburger visible uniquement sur petits écrans
          ) : (
            <div className="header-menu">
              {/* Menu gauche */}
              <div className="menu-left">
                <MenuLeft />
              </div>

              {/* Menu droit */}
              <div className="menu-right">
                <MenuRight />
              </div>
            </div>
          )}
        </nav>       
      </div>
    </header>
  );
};

export default Header;
