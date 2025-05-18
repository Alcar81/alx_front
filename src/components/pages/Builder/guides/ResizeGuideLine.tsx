// 📁 src/components/pages/Builder/guides/ResizeGuideLine.tsx
import React from "react";
import "./ResizeGuideLine.css";

interface ResizeGuideLineProps {
  y: number;
}

const ResizeGuideLine: React.FC<ResizeGuideLineProps> = ({ y }) => {
  return (
    <div
      className="resize-guide-line"
      style={{ top: `${y}px` }}
    />
  );
};

export default ResizeGuideLine;
