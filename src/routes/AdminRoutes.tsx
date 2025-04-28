// 📁 src/routes/AdminRoutes.tsx

import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../components/pages/admin/AdminDashboard/AdminDashboard";
import Settings from "../components/pages/admin/Settings/Settings";
import UserManager from "../components/pages/admin/UserManager/UserManager";

import Forbidden403 from "../components/pages/Errors/Forbidden403";
import Unauthorized from "../components/pages/Errors/Unauthorized";
import AdminNotFound from "../components/pages/admin/AdminNotFound/AdminNotFound";

import ProtectedRoute from "./ProtectedRoute"; // ✅ Utilise ProtectedRoute maintenant

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* ✅ Toutes les routes ici sont protégées par ProtectedRoute */}
      <Route
        path="dashboard"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="settings"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="users"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <UserManager />
          </ProtectedRoute>
        }
      />

      {/* 🌐 Routes d'erreurs */}
      <Route path="/403" element={<Forbidden403 />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<AdminNotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
