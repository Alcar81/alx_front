// 📁 Builder/panels/floatingBuilderPanel/TabTreeView.tsx

import React, { useEffect, useRef } from "react";
import { useBuilderPanelsStore } from "../../store/builderPanelsStore";
import { useLayoutStore } from "../../store/layoutStore";
import type { PageBlock } from "../../types/blockTypes";
import type { LayoutZoneKey } from "../../types/zoneTypes";

const TreeBlockItem: React.FC<{
  block: PageBlock;
  depth: number;
  isLast: boolean;
}> = ({ block, depth, isLast }) => {
  const {
    selectedBlockId,
    setSelectedBlock,
    setSelectedZone,
    blocks,
  } = useBuilderPanelsStore();

  const isSelected = selectedBlockId === block.id;
  const indentation = Array(depth).fill("│  ").join("") + (isLast ? "└─" : "├─");

  const blockRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isSelected && blockRef.current) {
      blockRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isSelected]);

  return (
    <li
      ref={blockRef}
      className={`tree-block-line ${isSelected ? "selected-block" : ""}`}
      onClick={() => {
        setSelectedBlock(block.id);
        setSelectedZone(block.zone);
      }}
    >
      <span className="tree-label">
        {indentation} {block.label || block.type}
      </span>

      {Array.isArray(block.childrenIds) &&
        block.childrenIds.map((childId, idx) => {
          const child = blocks.find((b) => b.id === childId);
          return child ? (
            <TreeBlockItem
              key={child.id}
              block={child}
              depth={depth + 1}
              isLast={idx === block.childrenIds!.length - 1}
            />
          ) : null;
        })}
    </li>
  );
};

const TabTreeView: React.FC = () => {
  const {
    blocks,
    selectedZone,
    setSelectedZone,
  } = useBuilderPanelsStore();

  const layout = useLayoutStore((s) => s.layout);

  const blocksByZone: Record<LayoutZoneKey, PageBlock[]> = {
    header: [],
    main: [],
    footer: [],
  };

  blocks.forEach((block) => {
    if (blocksByZone[block.zone]) {
      blocksByZone[block.zone].push(block);
    }
  });

  const baseZones: LayoutZoneKey[] = ["header", "main"];
  const shouldShowFooter = layout.footerMode === "fixed" && layout.footer.visible;
  const zonesToShow: LayoutZoneKey[] = shouldShowFooter
    ? [...baseZones, "footer"]
    : baseZones;

  return (
    <div className="block-tree panel-content">
      <ul className="tree-zones-list">
        {zonesToShow.map((zone: LayoutZoneKey) => {
          const zoneBlocks = blocksByZone[zone];
          const isSelected = selectedZone === zone;
          const zoneIsVisible = layout[zone]?.visible !== false;
          if (!zoneIsVisible) return null;

          return (
            <li key={zone} className="tree-zone">
              <div
                className={`tree-zone-title ${isSelected ? "selected-zone" : ""}`}
                onClick={() => setSelectedZone(zone)}
              >
                📁 {zone}
              </div>
              <ul className="tree-list">
                {zoneBlocks.map((block, index) => (
                  <TreeBlockItem
                    key={block.id}
                    block={block}
                    depth={1}
                    isLast={index === zoneBlocks.length - 1}
                  />
                ))}
              </ul>
            </li>
          );
        })}

        {/* Footer inline */}
        {layout.footerMode === "inline" && layout.footer.visible && (
          <li className="tree-zone">
            <div
              className={`tree-zone-title ${
                selectedZone === "footer" ? "selected-zone" : ""
              }`}
              onClick={() => setSelectedZone("footer")}
            >
              └─ footer
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default TabTreeView;
