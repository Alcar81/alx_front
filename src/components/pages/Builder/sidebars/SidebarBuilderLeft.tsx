// 📁 src/components/pages/Builder/sidebars/SidebarBuilderLeft.tsx

import React from "react";
import "./SidebarBuilder.css";

const SidebarBuilderLeft: React.FC = () => {
  return (
    <aside className="sidebar-builder sidebar-left">
      <h2 className="sidebar-title">🛠️ Menu latéral gauche</h2>
      <p>Ajoutez ici des outils, composants ou contrôles personnalisés.</p>
    </aside>
  );
};

export default SidebarBuilderLeft;
