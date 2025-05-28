// 📁 src/components/pages/Builder/components/BuilderToolbar/BuilderToolbar.tsx

import React from "react";
import "./BuilderToolbar.css";

const BuilderToolbar: React.FC = () => {
  const handleSave = () => {
    console.log("💾 Enregistrer...");
  };

  const handleReset = () => {
    console.log("🔄 Réinitialiser...");
  };

  return (
    <div className="builder-toolbar">
      <button onClick={handleSave}>💾 Enregistrer</button>
      <button onClick={handleReset}>🔄 Réinitialiser</button>
    </div>
  );
};

export default BuilderToolbar;
