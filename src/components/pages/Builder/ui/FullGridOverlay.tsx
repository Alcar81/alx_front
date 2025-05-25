// 📁 src/components/pages/Builder/ui/FullGridOverlay.tsx

import React from "react";
import "./FullGridOverlay.css"; // on réutilise la même classe `.grid-overlay`
import { Z_INDEX } from "../../../../constants/zIndexes";


interface Props {
  surfaceRef: React.RefObject<HTMLDivElement>;
}

const FullGridOverlay: React.FC<Props> = ({ surfaceRef }) => {
  if (!surfaceRef.current) return null;

  const surfaceBounds = surfaceRef.current.getBoundingClientRect();

  const style: React.CSSProperties = {    
    width: surfaceBounds.width,
    height: surfaceBounds.height,
    zIndex: Z_INDEX.grid,  
  };

  return <div className="grid-overlay" style={style} />;
};

export default FullGridOverlay;
