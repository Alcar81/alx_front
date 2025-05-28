// 📁 Builder/index.tsx

import React from "react";
import { BuilderDndProvider } from "./contexts/BuilderDndProvider";
import GridLayoutBuilder from "./layouts/GridLayoutBuilder";

const BuilderPage: React.FC = () => {
  return (
    <BuilderDndProvider>
      <GridLayoutBuilder />
    </BuilderDndProvider>
  );
};

export default BuilderPage;
