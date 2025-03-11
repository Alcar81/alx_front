/* 📌 src/component/Layout/Layout.tsx */
import React from "react";
import "./Layout.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "../partiels/Footer/Footer";
import PublicRoutes from "../../routes/PublicRoutes";
import AdminRoutes from "../../routes/AdminRoutes";
import Header from "../partiels/Header/Header";
import AuthModal from "../pages/auth/AuthModal"; // ✅ Import ajouté ici

const Layout: React.FC = () => {
  return (
    <Router>
      <div className="layout">        
        {/* Header */}
        <Header />

        {/* Contenu principal */}
        <main className="main">
          <div className="content-container">          
            <Routes>
              {/* Routes publiques */}
              <Route path="/*" element={<PublicRoutes />} />

              {/* Routes admin */}
              <Route path="/admin/*" element={<AdminRoutes />} />
            </Routes>          
          </div>
        </main>

        {/* Footer */}
        <Footer />

        {/* ✅ Modal global pour Auth */}
        <AuthModal />
      </div>
    </Router>
  );
};

export default Layout;
