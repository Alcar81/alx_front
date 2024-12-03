import './Header.css';
import { Link } from "react-router-dom";
import logo from "../../../images/Logo/Logo_ALX_XL_v3.png";
import MenuRight from '../Menu/MenuRight';
import MenuLeft from '../Menu/MenuLeft';

const Header: React.FC = () => {
  return (
    <header id="header" className="header">
      <div id="header-wrap" className="header-container">

        {/* Logo */}
        <div className="header-logo">
          <Link to="/">
            <img src={logo} alt="Logo" className="header-logo-img" />
          </Link>
        </div>
        <nav className="header-nav">
          {/* Menu Left */}
          <div className="header-menu menu-left">
            <MenuLeft />
          </div>         

          {/* Menu Right */}
          <div className="header-menu menu-right">
            <MenuRight />
          </div>                  
        </nav>
      </div>
    </header>
  );
};

export default Header;
