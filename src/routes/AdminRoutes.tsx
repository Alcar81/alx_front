// 📁 src/routes/AdminRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "../components/pages/auth/RequireAuth"; // ✅ À ajouter

import Dashboard from "../components/pages/admin/AdminDashboard/AdminDashboard";
import Settings from "../components/pages/admin/Settings/Settings";
import AdminNotFound from "../components/pages/admin/AdminNotFound/AdminNotFound";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* ✅ Toutes les routes ici sont protégées par RequireAuth */}
      <Route element={<RequireAuth />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Route>

      {/* ✅ Route d'erreur visible même sans être connecté */}
      <Route path="*" element={<AdminNotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
