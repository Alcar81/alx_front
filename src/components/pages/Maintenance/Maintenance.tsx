// src/component/pages/Maintenance/Maintenance.tsx
import React from 'react';
import "./Maintenance.css";

const Maintenance: React.FC = () => {
  return (
    <div className="maintenance-mode" data-testid="maintenance-mode">
        <div className="maintenance">            
            <h1>Site en Construction 🚧</h1>
            <p>
                Nous travaillons actuellement sur une nouvelle version du site.<br />
                Revenez bientôt pour découvrir nos nouveautés !
            </p>
            <a href="mailto:contact@alxmultimedia.com" className="button">
                Contactez-nous
            </a>            
        </div>
    </div>
  );
};

export default Maintenance;


