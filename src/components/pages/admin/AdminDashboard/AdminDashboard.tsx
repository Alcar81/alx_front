// 📁 src/components/pages/admin/AdminDashboard/AdminDashboard.tsx
import React from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Header from "../../../partiels/Header/Header";
import Footer from "../../../partiels/Footer/Footer";
import CardAdmin from "../../admin/CardAdmin";
import "./AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <main className="main page-with-header admin-dashboard-main">
        <div className="admin-dashboard-page">
          <header className="admin-header">
            <h1>🛠️ <span className="highlight">Tableau de bord Admin</span></h1>
            <p>👋 Bonjour {user?.firstName} {user?.lastName}</p>
          </header>

          <div className="admin-cards">
          <CardAdmin
            icon="👥"
            title="Gestionnaire d'utilisateurs"
            description="Voir, modifier et supprimer les comptes utilisateurs."
            to="/admin/users"
          />
            {/* Tu pourras ajouter d'autres cartes ici plus tard */}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminDashboard;
