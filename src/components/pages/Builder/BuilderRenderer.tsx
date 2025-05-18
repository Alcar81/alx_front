// 📁 src/components/pages/Builder/BuilderRenderer.tsx
import React from "react";
import homeTemplate from "../../../data/pageTemplates/homeTemplate";
import LogoHeaderBlock from "./blocks/LogoHeaderBlock";
import PageTitleBlock from "./blocks/PageTitleBlock";
import UserActionsBlock from "./blocks/UserActionsBlock";
import FooterBlock from "./blocks/FooterBlock";
import "./BuilderBlocks.css";

const componentMap: any = {
  LogoHeaderBlock,
  PageTitleBlock,
  UserActionsBlock,
  FooterBlock,
};

const BuilderRenderer: React.FC = () => {
  const headerBlocks = homeTemplate.blocks.filter(b => b.position === "header");
  const footerBlocks = homeTemplate.blocks.filter(b => b.position === "footer");

  return (
    <div className="grid-layout">
      <div className="grid-header">
        {headerBlocks.map(block => {
          const Comp = componentMap[block.component];
          return <Comp key={block.id} />;
        })}
      </div>

      <div className="grid-main">
        <p>📦 Contenu central</p>
      </div>

      <div className="grid-footer">
        {footerBlocks.map(block => {
          const Comp = componentMap[block.component];
          return <Comp key={block.id} />;
        })}
      </div>
    </div>
  );
};

export default BuilderRenderer;
