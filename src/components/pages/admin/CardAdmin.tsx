// 📁 src/components/admin/CardAdmin.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardAdmin.css";

// ✅ Interface des props attendues
interface CardAdminProps {
  icon: string;
  title: string;
  description: string;
  to?: string;
}

const CardAdmin: React.FC<CardAdminProps> = ({ icon, title, description, to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) navigate(to);
  };

  return (
    <div className="admin-card" onClick={handleClick}>
      <h2>{icon} {title}</h2>
      <p>{description}</p>
      {to && <button className="admin-card-button">Ouvrir</button>}
    </div>
  );
};

export default CardAdmin;
