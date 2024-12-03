// Header.tsx
import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../../images/Logo/Logo_ALX_XL_v3.png";
import MenuRight from "../Menu/MenuRight";
import MenuLeft from "../Menu/MenuLeft";
import MenuHam from "../Menu/MenuHam"; // Import du menu hamburger
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
            // Menu hamburger pour petits écrans
            <MenuHam />
          ) : (
            <>
              {/* Menu gauche */}
              <div className="header-menu menu-left">
                <MenuLeft />
              </div>

              {/* Menu droit */}
              <div className="header-menu menu-right">
                <MenuRight />
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
