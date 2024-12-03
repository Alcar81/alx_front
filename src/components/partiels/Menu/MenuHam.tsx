import React, { useState } from "react";
import MenuLeft from "./MenuLeft";
import MenuRight from "./MenuRight";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const MenuHam: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="menu-ham">
      {/* Icône du menu hamburger */}
      <div className="menu-ham-icon" onClick={toggleMenu}>
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="menu-ham-dropdown">
          <MenuLeft />
          <MenuRight />
        </div>
      )}
    </div>
  );
};

export default MenuHam;
