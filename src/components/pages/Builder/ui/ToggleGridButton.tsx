// 📁 src/components/pages/Builder/ui/ToggleGridButton.tsx

import React from "react";
import Grid4x4Icon from "@mui/icons-material/Grid4x4";
import "./ToggleGridButton.css"; // réutilise le CSS existant

interface Props {
  onClick: () => void;
  isVisible: boolean;
}

const ToggleGridButton: React.FC<Props> = ({ onClick, isVisible }) => {
  return (
    <button
      className={`toggle-grid-button ${isVisible ? "active" : ""}`}
      onClick={onClick}
    >
      <Grid4x4Icon />
    </button>
  );
};

export default ToggleGridButton;
