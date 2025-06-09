// 📁 Builder/blocks/BlockWrapper/BlockWrapper.tsx

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import "./BlockWrapper.css";
import { BlockStyle } from "../../types/blockStyles";
import ContextMenu from "../../components/ContextMenu/ContextMenu";
import "../../components/ContextMenu/ContextMenu.css";

interface BlockWrapperProps {
  id: string;
  style: BlockStyle;
  children: ReactNode;
  onDelete: (id: string) => void;
  onUpdateStyle: (id: string, newStyle: Partial<BlockStyle>) => void;
}

type ResizeDirection = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const BlockWrapper: React.FC<BlockWrapperProps> = ({
  id,
  style,
  children,
  onDelete,
  onUpdateStyle,
}) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [resizing, setResizing] = useState<ResizeDirection | null>(null);
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });

  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
  }>({ visible: false, x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setDragStart({ x: e.clientX - style.left, y: e.clientY - style.top });
    setContextMenu({ visible: false, x: 0, y: 0 });
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      onUpdateStyle(id, {
        top: e.clientY - dragStart.y,
        left: e.clientX - dragStart.x,
      });
    }

    if (resizing) {
      const dx = e.clientX - resizeStart.x;
      const dy = e.clientY - resizeStart.y;
      const newStyle: Partial<BlockStyle> = {};

      if (resizing.includes("right"))
        newStyle.width = Math.max(50, resizeStart.width + dx);
      if (resizing.includes("left")) {
        const newWidth = Math.max(50, resizeStart.width - dx);
        newStyle.width = newWidth;
        newStyle.left = resizeStart.left + (resizeStart.width - newWidth);
      }

      if (resizing.includes("bottom"))
        newStyle.height = Math.max(30, resizeStart.height + dy);
      if (resizing.includes("top")) {
        const newHeight = Math.max(30, resizeStart.height - dy);
        newStyle.height = newHeight;
        newStyle.top = resizeStart.top + (resizeStart.height - newHeight);
      }

      onUpdateStyle(id, newStyle);
    }
  }, [isDragging, resizing, dragStart, resizeStart, id, onUpdateStyle]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setResizing(null);
  }, []);

  const handleResizeStart = (e: React.MouseEvent, direction: ResizeDirection) => {
    e.stopPropagation();
    e.preventDefault();
    setResizing(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: style.width,
      height: style.height,
      top: style.top,
      left: style.left,
    });
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <>
     <div
        ref={blockRef}
        className={`block-wrapper`}
        style={{
          position: style.position || "absolute",
          top: style.top,
          left: style.left,
          width: style.width,
          height: style.height,
          zIndex: style.zIndex,
          transform: style.rotation ? `rotate(${style.rotation}deg)` : undefined,
          opacity: style.opacity,
          borderRadius: style.borderRadius,
          boxShadow: style.boxShadow,
        }}
        onMouseDown={handleMouseDown}
        onContextMenu={handleContextMenu}
      >

        <button className="delete-button" onClick={() => onDelete(id)}>❌</button>
        <div className="block-content">{children}</div>

        <div className="resize-handle top-left" onMouseDown={(e) => handleResizeStart(e, "top-left")} />
        <div className="resize-handle top-right" onMouseDown={(e) => handleResizeStart(e, "top-right")} />
        <div className="resize-handle bottom-left" onMouseDown={(e) => handleResizeStart(e, "bottom-left")} />
        <div className="resize-handle bottom-right" onMouseDown={(e) => handleResizeStart(e, "bottom-right")} />
      </div>

      {contextMenu.visible && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          blockId={id}
          onClose={() => setContextMenu({ visible: false, x: 0, y: 0 })}
          onUpdateStyle={onUpdateStyle}
          onDelete={onDelete}
        />
      )}
    </>
  );
};

export default BlockWrapper;
