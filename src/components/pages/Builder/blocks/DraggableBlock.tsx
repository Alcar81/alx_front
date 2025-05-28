// 📁 src/components/pages/Builder/blocks/DraggableBlock.tsx

import React, { useRef, useState, useEffect } from "react";
import { getSnappedPosition } from "../utils/snapping";
import "./BuilderBlock.css";

interface DraggableBlockProps {
  surfaceRefZone: React.RefObject<HTMLDivElement>; // ✅ Plus explicite
  snapTargetsX: number[];
  snapTargetsY: number[];
  tolerance: number;
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({
  surfaceRefZone,
  snapTargetsX,
  snapTargetsY,
  tolerance,
}) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [position, setPosition] = useState({ x: 120, y: 80 });

  // ✅ Centrage automatique à l'initialisation
  useEffect(() => {
    if (surfaceRefZone.current) {
      const rect = surfaceRefZone.current.getBoundingClientRect();
      const centerX = rect.width / 2 - 50;
      const centerY = rect.height / 2 - 25;

      const snapLines = [...new Set([...snapTargetsX, ...snapTargetsY])];
      const snapped = getSnappedPosition(centerX, centerY, snapLines, {
        threshold: tolerance,
      });

      setPosition(snapped);
    }
  }, [surfaceRefZone, snapTargetsX, snapTargetsY, tolerance]);

  // ✅ Gestion des événements de drag
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    isDragging.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !surfaceRefZone.current) return;

    const surfaceRect = surfaceRefZone.current.getBoundingClientRect();
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
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: "absolute",
      }}
      onMouseDown={handleMouseDown}
    >
      📦
    </div>
  );
};

export default DraggableBlock;
