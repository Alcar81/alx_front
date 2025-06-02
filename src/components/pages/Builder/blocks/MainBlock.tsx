// 📁 Builder/blocks/MainBlock.tsx

import React from "react";

const MainBlock: React.FC = () => {
  return (
    <div style={{ padding: "2rem", backgroundColor: "#eef3f8", textAlign: "center" }}>
      <h2>📦 Bloc principal de contenu</h2>
      <p>Ici s'affichera le contenu central de la page.</p>
    </div>
  );
};

export default MainBlock;
