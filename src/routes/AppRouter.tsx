// 📌 src/routes/AppRouter.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import AdminRoutes from "./AdminRoutes";
import FlexibleLayout from "../components/Layouts/FlexibleLayout";

const AppRouterContent: React.FC = () => {
  return (
    <FlexibleLayout>
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </FlexibleLayout>
  );
};

const AppRouter: React.FC = () => {
  return (
    <Router>
      <AppRouterContent />
    </Router>
  );
};

export default AppRouter;
