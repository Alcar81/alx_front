// 📌 src/routes/AppRouter.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import AdminRoutes from "./AdminRoutes";
import LandingPage from "../components/pages/LandingPage/LandingPage";
import FlexibleLayout from "../components/Layouts/FlexibleLayout";
import GridLayoutBuilder from "../components/pages/Builder/GridLayoutBuilder";

const AppRouterContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<FlexibleLayout showHeader={false} showFooter={false}><LandingPage /></FlexibleLayout>} />
      <Route path="/*" element={<FlexibleLayout><PublicRoutes /></FlexibleLayout>} />
      <Route path="/admin/*" element={<FlexibleLayout><AdminRoutes /></FlexibleLayout>} />

      <Route path="/test-grid" element={<GridLayoutBuilder />} />
    </Routes>
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
