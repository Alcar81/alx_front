// 📁 src/components/utils/DraggableBox.tsx

import React, { useState, useRef } from "react";
import { useSnapping } from "@/hooks/useSnapping";
import "./DraggableBox.css";

const DraggableBox: React.FC = () => {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 100, y: 100 });

  const surfaceWidth = 1200;
  const surfaceHeight = 800;

  const snapped = useSnapping(pos.x, pos.y, surfaceWidth, surfaceHeight);

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = surfaceRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPos({ x, y });
  };

  return (
    <div
      className="snapping-surface"
      ref={surfaceRef}
      style={{ width: surfaceWidth, height: surfaceHeight }}
      onMouseMove={handleDrag}
    >
      <div
        className="draggable-box"
        style={{ left: `${snapped.x}px`, top: `${snapped.y}px` }}
      >
        📦
      </div>
    </div>
  );
};

export default DraggableBox;
