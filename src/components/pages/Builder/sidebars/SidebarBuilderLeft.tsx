// 📁 src/components/pages/Builder/sidebars/SidebarBuilderLeft.tsx

import React from "react";
import "./SidebarBuilder.css";

const SidebarBuilderLeft: React.FC = () => {
  
  return (
    <aside className="sidebar-builder sidebar-left">
      <h2 className="sidebar-title">🛠️ Menu latéral gauche</h2>
      <p>Ajoutez ici des outils, composants ou contrôles personnalisés.</p>

      <div className="option-group">
        <label htmlFor="sidebar-left-width">📏 Largeur : {width}</label>
        <input
          type="range"
          id="sidebar-left-width"
          min="100"
          max="500"
          step="10"
          value={parseInt(width)}
          onChange={handleWidthChange}
        />
      </div>
    </aside>
  );
};

export default SidebarBuilderLeft;
