// 📁 Builder/ghost/GhostBlock.tsx

import React from "react";
import { usePageBuilderStore } from "../store/pageBuilderStore";
import type { GhostBlock as GhostBlockType } from "../types/GhostBlockTypes";
import "./GhostBlock.css";

const GhostBlock: React.FC = () => {
  const ghost = usePageBuilderStore((state) => state.ghostBlock) as GhostBlockType | null;

  if (!ghost || !ghost.position) return null;

  const { x, y } = ghost.position;
  const width = ghost.size?.width || 100;
  const height = ghost.size?.height || 50;

  const className = `ghost-block ghost-${ghost.status ?? "default"}`;

  const style: React.CSSProperties = {
    position: "fixed",         // ✅ garanti que c’est relatif au viewport
    top: y,
    left: x,
    width,
    height,
    pointerEvents: "none",
    zIndex: 99999,             // ✅ au-dessus de tous les panels flottants
  };

  return (
    <div className={className} style={style}>
      {ghost.label || "Bloc"}
    </div>
  );
};

export default GhostBlock;
