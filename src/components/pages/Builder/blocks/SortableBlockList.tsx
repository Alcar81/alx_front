// 📁 src/components/pages/Builder/blocks/SortableBlockList.tsx

import React from "react";
import { usePageBuilderStore } from "../store/pageBuilderStore";
import SortableBlock from "./SortableBlock";

import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

const SortableBlockList: React.FC = () => {
  const blocks = usePageBuilderStore((state) => state.blocks);
  const setBlocks = usePageBuilderStore.setState;

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor)
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over?.id);
      const reordered = arrayMove(blocks, oldIndex, newIndex);
      setBlocks({ blocks: reordered });
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
        {blocks.map((block, index) => (
          <SortableBlock key={block.id} block={block} index={index} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default SortableBlockList;
