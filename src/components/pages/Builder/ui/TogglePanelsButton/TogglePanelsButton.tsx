// 📁 src/components/builder/ui/TogglePanelsButton.tsx

import React from "react";
import "../CanvasControls.css";

interface Props {
  onClick: () => void;
  isVisible: boolean;
}

const TogglePanelsButton: React.FC<Props> = ({ onClick, isVisible }) => (
  <button className="toggle-panels-button" onClick={onClick}>
    {isVisible ? "👁️‍🗨️" : "🧰"}
  </button>
);

export default TogglePanelsButton;
