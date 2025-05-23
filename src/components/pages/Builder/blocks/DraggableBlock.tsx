// 📁 src/components/pages/Builder/blocks/DraggableBlock.tsx

import React, { useRef, useState, useEffect } from "react";
import { getSnappedPosition } from "../../../../utils/snapping";
import "./BuilderBlock.css"; // ✅ Import centralisé

interface DraggableBlockProps {
  surfaceRef: React.RefObject<HTMLDivElement>;
  snapTargetsX: number[];
  snapTargetsY: number[];
  tolerance: number;
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({
  surfaceRef,
  snapTargetsX,
  snapTargetsY,
  tolerance,
}) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [position, setPosition] = useState({ x: 120, y: 80 });

  // ✅ Centrage automatique initial
  useEffect(() => {
    if (surfaceRef.current) {
      const rect = surfaceRef.current.getBoundingClientRect();
      const centerX = rect.width / 2 - 50;
      const centerY = rect.height / 2 - 25;

      const snapLines = [...new Set([...snapTargetsX, ...snapTargetsY])];
      const snapped = getSnappedPosition(centerX, centerY, snapLines, {
        threshold: tolerance,
      });

      setPosition(snapped);
    }
  }, [surfaceRef, snapTargetsX, snapTargetsY, tolerance]);

  // ✅ Drag events
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    isDragging.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !surfaceRef.current) return;

    const surfaceRect = surfaceRef.current.getBoundingClientRect();
    const newX = e.clientX - surfaceRect.left - 50;
    const newY = e.clientY - surfaceRect.top - 25;

    const snapLines = [...new Set([...snapTargetsX, ...snapTargetsY])];
    const snapped = getSnappedPosition(newX, newY, snapLines, {
      threshold: tolerance,
    });

    setPosition(snapped);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={blockRef}
      className="builder-block draggable"
      style={{ left: position.x, top: position.y, position: "absolute" }}
      onMouseDown={handleMouseDown}
    >
      📦
    </div>
  );
};

export default DraggableBlock;
