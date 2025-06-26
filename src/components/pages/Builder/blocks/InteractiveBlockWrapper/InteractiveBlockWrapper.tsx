// 📁 Builder/blocks/InteractiveBlockWrapper/InteractiveBlockWrapper.tsx

import React from "react";
import "./InteractiveBlockWrapper.css";
import { useBuilderPanelsStore } from "../../store/builderPanelsStore";

interface Props {
  id: string;
  style: React.CSSProperties;
  isSelected: boolean;
  onDelete: () => void;
  onSelect: () => void;
  children: React.ReactNode;
}

const InteractiveBlockWrapper: React.FC<Props> = ({
  id,
  style,
  isSelected,
  onDelete,
  onSelect,
  children,
}) => {
  const startDragging = useBuilderPanelsStore((s) => s.startDragging);
  const startResizing = useBuilderPanelsStore((s) => s.startResizing);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
    startDragging(id, e.clientX, e.clientY);
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    startResizing(id, e.clientX, e.clientY);
  };

  return (
    <div
      className={`block-wrapper ${isSelected ? "selected" : ""}`}
      style={{ ...style, position: "absolute" }}
      onMouseDown={handleMouseDown}
    >
      {children}

      {isSelected && (
        <>
          <button className="delete-button" onClick={onDelete}>
            ✖
          </button>
          <div className="resize-handle" onMouseDown={handleResizeMouseDown} />
        </>
      )}
    </div>
  );
};

export default InteractiveBlockWrapper;

