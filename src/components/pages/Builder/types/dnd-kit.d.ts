// 📁 Builder/types/dnd-kit.d.ts

declare module "@dnd-kit/core" {
  import * as React from "react";

  export const DndContext: React.FC<any>;
  export const closestCenter: any;
  export const useSensor: (sensor: any, options?: any) => any;
  export const useSensors: (...sensors: any[]) => any;
  export const MouseSensor: any;
  export const TouchSensor: any;
  export const PointerSensor: any;

  export interface DragStartEvent {
    active: {
      id: string;
      data: {
        current: {
          type: string;
        };
      };
    };
  }

  export interface DragEndEvent {
    active: {
      id: string;
    };
    over: {
      id: string;
    } | null;
  }
}

declare module "@dnd-kit/sortable" {
  import * as React from "react";

  export function useSortable(props: { id: string }): {
    attributes: any;
    listeners: any;
    setNodeRef: (node: HTMLElement | null) => void;
    transform: any;
    transition: string | undefined;
  };

  export interface SortableContextProps {
    id?: string;
    items: string[];
    children?: React.ReactNode;
    strategy?: () => any;
  }

  export const SortableContext: React.FC<SortableContextProps>;
  export function arrayMove<T = any>(array: T[], from: number, to: number): T[];
  export const verticalListSortingStrategy: () => any;
}

declare module "@dnd-kit/utilities" {
  export namespace CSS {
    function TransformToString(transform: any): string;
    const Transform: {
      toString(transform: any): string;
    };
  }
}

declare module "@dnd-kit/react" {
  import * as React from "react";
  export const DragOverlay: React.FC<any>;
}
