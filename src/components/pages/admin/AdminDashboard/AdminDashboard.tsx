// 📁 src/components/pages/admin/AdminDashboard/AdminDashboard.tsx
import React from "react";
import { useAuth } from "../../../../hooks/useAuth";
import CardAdmin from "../../admin/CardAdmin";
import "./AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="admin-dashboard-page">
        <header className="admin-dashboard-header">
          <h1>🛠️ <span className="highlight">Tableau de bord Admin</span></h1>
          <p>👋 Bonjour {user?.firstName} {user?.lastName}</p>
        </header>

        <section id="cards" className="admin-dashboard-cards">
          <div className="admin-cards">
          <CardAdmin
            icon="👥"
            title="Gestionnaire d'utilisateurs"
            description="Voir, modifier et supprimer les comptes utilisateurs."
            to="/admin/users"
          />
            {/* Tu pourras ajouter d'autres cartes ici plus tard */}
          </div>
        </section>
      </div>
      
    </>
  );
};

export default AdminDashboard;
