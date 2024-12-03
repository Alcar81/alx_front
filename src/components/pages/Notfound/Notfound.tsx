// src/components/pages/notfound/NotFound.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Oups! Page non trouvée</h2>
        <p className="not-found-message">
          La page que vous recherchez n'existe pas ou a été déplacée. <br />
          Veuillez vérifier l'URL ou revenir à la page d'accueil. (NF)
        </p>
        <button className="not-found-button" onClick={handleGoHome}>
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default NotFound;
