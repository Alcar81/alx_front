// 📁 Builder/panels/floatingBuilderPanel/TabTreeView.tsx

import React from "react";
import { useBuilderStore } from "../../store/builderStore";
import { usePageBuilderStore } from "../../store/pageBuilderStore";

const TabTreeView: React.FC = () => {
  const selectedZone = useBuilderStore((s) => s.selectedZone);
  const blocks = usePageBuilderStore((s) =>
    s.blocks.filter((b) => b.zone === selectedZone)
  );

  if (!selectedZone) return <div className="panel-content">Aucune zone sélectionnée</div>;

  const grouped = blocks.reduce<Record<string, typeof blocks>>((acc, block) => {
    const group = block.group || "🔓 Autonomes";
    if (!acc[group]) acc[group] = [];
    acc[group].push(block);
    return acc;
  }, {});

  return (
    <div className="block-tree">
      <div className="tree-zone-title">Zone : {selectedZone}</div>
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

export default TabTreeView;
