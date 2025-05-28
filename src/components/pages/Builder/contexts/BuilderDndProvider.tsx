// 📁 Builder/contexts/BuilderDndProvider.tsx

import React, { useState } from "react";
import {
  DndContext,
  DragStartEvent,
  useSensors,
  useSensor,
  PointerSensor
} from "@dnd-kit/core";
import { DragOverlay } from "@dnd-kit/react";

import GhostBlock from "../ghost/GhostBlock";

interface Props {
  children: React.ReactNode;
}

export const BuilderDndProvider: React.FC<Props> = ({ children }) => {
  const sensors = useSensors(useSensor(PointerSensor));
  const [draggedType, setDraggedType] = useState<string | null>(null);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event: DragStartEvent) => {
        const type = event.active?.data?.current?.type;
        if (type) setDraggedType(type);
      }}
      onDragEnd={() => setDraggedType(null)}
      onDragCancel={() => setDraggedType(null)}
    >
      {children}

      <DragOverlay>
        {draggedType && <GhostBlock />}
      </DragOverlay>
    </DndContext>
  );
};
