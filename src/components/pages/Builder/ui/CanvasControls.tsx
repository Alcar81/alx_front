// 📁 Builder/ui/CanvasControls.tsx

import ToggleGridButton from "./ToggleGridButton/ToggleGridButton";
import TogglePanelsButton from "./TogglePanelsButton/TogglePanelsButton";

interface CanvasControlsProps {
  surfaceRef: React.RefObject<HTMLDivElement>;
  panelsVisible: boolean;
  setPanelsVisible: (visible: boolean) => void;
  showGrid: boolean;
  setShowGrid: (visible: boolean) => void;
}

const CanvasControls: React.FC<CanvasControlsProps> = ({
  surfaceRef,
  panelsVisible,
  setPanelsVisible,
  showGrid,
  setShowGrid,
}) => {
  return (
    <div className="canvas-controls bottom-right">
      <TogglePanelsButton onClick={() => setPanelsVisible(!panelsVisible)} isVisible={panelsVisible} />
      <ToggleGridButton onClick={() => setShowGrid(!showGrid)} isVisible={showGrid} />
    </div>
  );
};

export default CanvasControls;
