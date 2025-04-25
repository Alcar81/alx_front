// 📁 src/routes/AdminRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "../components/pages/auth/RequireAuth";

import Dashboard from "../components/pages/admin/AdminDashboard/AdminDashboard";
import Settings from "../components/pages/admin/Settings/Settings";
import AdminNotFound from "../components/pages/admin/AdminNotFound/AdminNotFound";
import Forbidden403 from "../components/pages/Errors/Forbidden403";
import Unauthorized from "../components/pages/Errors/Unauthorized";
import UserManager from "../components/pages/admin/UserManager/UserManager";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* ✅ Toutes les routes ici sont protégées par RequireAuth */}
      <Route element={<RequireAuth roles={["admin"]} fallback={<Unauthorized />} />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
        <Route path="users" element={<UserManager />} />
      </Route>

      <Route path="/403" element={<Forbidden403 />} />
      <Route path="*" element={<AdminNotFound />} />
    </Routes>
  );
};

export default AdminRoutes;