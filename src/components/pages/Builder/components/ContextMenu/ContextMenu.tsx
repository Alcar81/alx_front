// Builder/components/ContextMenu/ContextMenu.tsx

import React from "react";
import "./ContextMenu.css";
import type { BlockStyle } from "../../types/blockStyles";

interface ContextMenuProps {
  x: number;
  y: number;
  blockId: string;
  onClose: () => void;
  onUpdateStyle?: (id: string, updates: Partial<BlockStyle>) => void;
  onDelete?: (id: string) => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  blockId,
  onClose,
  onUpdateStyle,
  onDelete,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (onUpdateStyle) {
      const parsed =
        name === "rotation" || name === "opacity" || name === "borderRadius"
          ? parseFloat(value)
          : name === "zIndex"
          ? parseInt(value)
          : value;
      onUpdateStyle(blockId, { [name]: parsed } as Partial<BlockStyle>);
    }
  };

  return (
    <div className="context-menu" style={{ top: y, left: x }} onMouseLeave={onClose}>
      <div className="menu-title">🎛️ Propriétés</div>

      <label>
        Rotation (°)
        <input type="range" min="0" max="360" name="rotation" onChange={handleChange} />
      </label>

      <label>
        Opacité
        <input type="range" min="0" max="1" step="0.05" name="opacity" onChange={handleChange} />
      </label>

      <label>
        zIndex
        <input type="number" name="zIndex" defaultValue={1} onChange={handleChange} />
      </label>

      <label>
        Rayon (bord)
        <input type="range" min="0" max="40" step="1" name="borderRadius" onChange={handleChange} />
      </label>

      <label>
        Couleur fond
        <input type="color" name="backgroundColor" onChange={handleChange} />
      </label>

      <button className="delete-menu" onClick={() => onDelete?.(blockId)}>❌ Supprimer</button>
    </div>
  );
};

export default ContextMenu;
