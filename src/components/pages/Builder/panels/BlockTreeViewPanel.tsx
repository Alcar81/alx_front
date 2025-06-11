// 📁 Builder/panels/BlockTreeViewPanel.tsx

import React, { useState } from "react";
import "./BlockTreeView.css";

interface PageBlock {
  id: string;
  type: string;
  label?: string;
  zone: string;
  group?: string;
}

interface Props {
  zone: string;
  blocks: PageBlock[];
}

const BlockTreeView: React.FC<Props> = ({ zone, blocks }) => {
  const grouped = blocks.reduce<Record<string, PageBlock[]>>((acc, block) => {
    const group = block.group || "🔓 Autonomes";
    if (!acc[group]) acc[group] = [];
    acc[group].push(block);
    return acc;
  }, {});

  return (
    <div className="block-tree">
      <div className="tree-zone-title">Zone : {zone}</div>
      <ul className="tree-list">
        {Object.entries(grouped).map(([groupName, groupBlocks]) => (
          <li key={groupName}>
            <div className="tree-group-name">{groupName}</div>
            <ul>
              {groupBlocks.map((block) => (
                <li key={block.id} className="tree-block-line">
                  <span className="tree-icon">🧱</span>
                  <span className="tree-label">{block.label || block.type}</span>
                  <span className="tree-actions">
                    <button title="Masquer">👁️</button>
                    <button title="Propriétés">🛠️</button>
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlockTreeView;
