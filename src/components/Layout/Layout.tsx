// 📌 src/components/Layout/Layout.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoutes from "../../routes/PublicRoutes";
import AdminRoutes from "../../routes/AdminRoutes";
import "./Layout.css";

const LayoutContent: React.FC = () => {
  return (
    <div className="layout">
      <div className="content-container">
        <Routes>
          <Route path="/*" element={<PublicRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </div>
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
