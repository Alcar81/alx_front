import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/pages/admin/Dashbord/Dashbord";
import Settings from "../components/pages/admin/Settings/Settings";
import AdminNotFound from "../components/pages/admin/AdminNotFound/AdminNotFound";


const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/settings" element={<Settings />} />      
      <Route path="*" element={<AdminNotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
