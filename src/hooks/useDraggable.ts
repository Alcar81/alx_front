import { useRef, useEffect } from "react";

/**
 * Hook permettant de rendre un panneau draggable à l'intérieur d'une surface donnée.
 * @param surfaceRef Référence à la zone dans laquelle le panneau est autorisé à se déplacer (ex: `.surface-active`)
 * @returns ref à attacher à l'élément draggable
 */
export function useDraggable(surfaceRef: React.RefObject<HTMLElement>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const surface = surfaceRef.current;
    if (!element || !surface) return;

    let pos = { x: 0, y: 0 };

    const onMouseDown = (e: Event) => {
      const evt = e as MouseEvent;
      evt.preventDefault();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const bounds = surface.getBoundingClientRect();
      const elemRect = element.getBoundingClientRect();

      // Position du clic par rapport au coin supérieur gauche du panneau
      pos = {
        x: evt.clientX - elemRect.left,
        y: evt.clientY - elemRect.top,
      };

      document.addEventListener("mousemove", onMouseMove as EventListener);
      document.addEventListener("mouseup", onMouseUp as EventListener);
    };

    const onMouseMove = (e: Event) => {
      const evt = e as MouseEvent;
      const bounds = surface.getBoundingClientRect();
      const elemWidth = element.offsetWidth;
      const elemHeight = element.offsetHeight;

      // Nouvelle position relative à la surface
      const x = evt.clientX - bounds.left - pos.x;
      const y = evt.clientY - bounds.top - pos.y;

      const maxX = bounds.width - elemWidth;
      const maxY = bounds.height - elemHeight;

      element.style.left = `${Math.min(Math.max(0, x), maxX)}px`;
      element.style.top = `${Math.min(Math.max(0, y), maxY)}px`;
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove as EventListener);
      document.removeEventListener("mouseup", onMouseUp as EventListener);
    };

    // On autorise le drag uniquement via l'en-tête (ex: .floating-header)
    const header = element.querySelector(".floating-header");
    if (header) header.addEventListener("mousedown", onMouseDown as EventListener);

    return () => {
      if (header) header.removeEventListener("mousedown", onMouseDown as EventListener);
    };
  }, [surfaceRef]);

  return ref;
}
