// 📁 src/components/pages/Layouts/GridLayoutTest.tsx

import React from "react";
import PageTitleBlock from "../pages/Builder/blocks/PageTitleBlock";
import UserActionsBlock from "../pages/Builder/blocks/UserActionsBlock";
import FooterBlock from "../pages/Builder/blocks/FooterBlock";
import LogoHeaderBlock from "../pages/Builder/blocks/LogoHeaderBlock"; // 🧩 Import du bloc Logo
import "./GridLayoutTest.css";
import "../pages/Builder/blocks/BuilderBlock.css"; // 🧩 Import des styles blocs

const GridLayoutTest: React.FC = () => {
  return (
    <div className="grid-layout">
      <div className="grid-header">
        <LogoHeaderBlock />
        <PageTitleBlock />
        <UserActionsBlock />
      </div>

      <div className="grid-main">
        <p>🎯 Ceci est la zone principale (main content)</p>
        <p>Tu peux insérer ici n’importe quel contenu de page.</p>
      </div>

      <div className="grid-footer">
        <FooterBlock />
      </div>
    </div>
  );
};

export default GridLayoutTest;
