/* 📌 src/component/Layout/Layout.tsx */
import React from "react";
import "./Layout.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "../partiels/Footer/Footer";
import PublicRoutes from "../../routes/PublicRoutes";
import AdminRoutes from "../../routes/AdminRoutes";
import Header from "../partiels/Header/Header";
import AuthModal from "../pages/auth/AuthModal"; // ✅ Modal global pour Auth

const Layout: React.FC = () => {
  return (
    <Router>
      <div className="layout">
        {/* ✅ Header fixe */}
        <Header />

        {/* ✅ Contenu principal sous le header */}
        <main className="main">
          <div className="content-container">
            <Routes>
              {/* Routes publiques */}
              <Route path="/*" element={<PublicRoutes />} />

              {/* Routes admin */}
              <Route path="/admin/*" element={<AdminRoutes />} />
            </Routes>
          </div>

          {/* ✅ Modal d'auth toujours accessible */}
          <AuthModal />
        </main>

        {/* ✅ Footer toujours bien placé */}
        <Footer />
      </div>
    </Router>
  );
};

export default Layout;
