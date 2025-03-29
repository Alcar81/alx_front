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
    <main className="main">
      <div className="not-found-page">
        <header className="not-found-header">
          <h1>404</h1>
          <h2>Oups! Page non trouvée</h2>
          <p>
            La page que vous recherchez n'existe pas ou a été déplacée. <br />
            Veuillez vérifier l'URL ou revenir à la page d'accueil. (NF)
          </p>
          <button className="not-found-button" onClick={() => navigate("/Accueil")}>
            Retour à l'accueil
          </button>
        </header>
      </div>
   </main> 
  );
};

export default NotFound;
