// 📁 src/components/pages/Builder/sidebars/SidebarBuilderRight.tsx

import React from "react";
import "./SidebarBuilder.css";
import { useLayoutStore } from "../../../../store/layoutStore";

const SidebarBuilderRight: React.FC = () => {
  const width = useLayoutStore((state) => state.layout.sidebarRight.width);
  const setSidebarWidth = useLayoutStore((state) => state.setSidebarWidth);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSidebarWidth("sidebarRight", `${e.target.value}px`);
  };

  return (
    <aside className="sidebar-builder sidebar-right">
      <h2 className="sidebar-title">🔧 Options</h2>
      <p>Zone de configuration des blocs, templates, etc.</p>

      <div className="option-group">
        <label htmlFor="sidebar-width">📏 Largeur : {width}</label>
        <input
          type="range"
          id="sidebar-width"
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

export default SidebarBuilderRight;
