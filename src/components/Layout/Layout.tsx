// 📌 src/components/Layout/Layout.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoutes from "../../routes/PublicRoutes";
import AdminRoutes from "../../routes/AdminRoutes";

import "./Layout.css";

const LayoutContent: React.FC = () => {
  // 🔥 Vérifie si la page actuelle a une classe spéciale pour cacher le header
  const hideHeader = document.body.classList.contains("no-header");

  return (
    <div className="layout">
      <main className="main" style={{ paddingTop: hideHeader ? "0px" : "210px" }}>
        <div className="content-container">
          <Routes>
            {/* Routes publiques */}
            <Route path="/*" element={<PublicRoutes />} />

            {/* Routes admin */}
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </div>
        
      </main>
    </div>
  );
};

const Layout: React.FC = () => {
  return (
    <Router>
      <LayoutContent />
    </Router>
  );
};

export default Layout;
