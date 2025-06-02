// 📁 Builder/components/BuilderRenderer/BuilderRenderer.tsx

import React from "react";
import homeTemplate from "../../data/pageTemplates/homeTemplate";
import "./BuilderBlocks.css";
import BuilderToolbar from "../BuilderToolbar/BuilderToolbar";

// Dynamique : mapping des blocs
import LogoHeaderBlock from "../../blocks/LogoHeaderBlock";
import PageTitleBlock from "../../blocks/PageTitleBlock";
import UserActionsBlock from "../../blocks/UserActionsBlock";
import FooterBlock from "../../blocks/FooterBlock";
import MainBlock from "../../blocks/MainBlock";

const componentMap: any = {
  LogoHeaderBlock,
  PageTitleBlock,
  UserActionsBlock,
  MainBlock,
  FooterBlock,
};

const BuilderRenderer: React.FC = () => {
  const headerBlocks = homeTemplate.blocks.filter((b) => b.position === "header");
  const mainBlocks = homeTemplate.blocks.filter((b) => b.position === "main");
  const footerBlocks = homeTemplate.blocks.filter((b) => b.position === "footer");

  return (
    <div className="grid-layout">
      <BuilderToolbar />

      <div className="grid-header">
        {headerBlocks.map((block) => {
          const Comp = componentMap[block.component];
          return <Comp key={block.id} />;
        })}
      </div>

      <div className="grid-main">
        {mainBlocks.map((block) => {
          const Comp = componentMap[block.component];
          return <Comp key={block.id} />;
        })}
      </div>

      <div className="grid-footer">
        {footerBlocks.map((block) => {
          const Comp = componentMap[block.component];
          return <Comp key={block.id} />;
        })}
      </div>
    </div>
  );
};

export default BuilderRenderer;
