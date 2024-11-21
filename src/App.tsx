import React from 'react';
import './App.css';
import config from './config/config';

const App: React.FC = () => {
  const isMaintenance = config.REACT_APP_MAINTENANCE_MODE;

  if (isMaintenance) {
    return (
      <div className="App" data-testid="maintenance-mode">
        <div className="container">
          <h1>Site en Construction 🚧</h1>
          <p>
            Nous travaillons actuellement sur une nouvelle version du site.<br />
            Revenez bientôt pour découvrir nos nouveautés !
            Vérification du succès!
          </p>
          <a href="mailto:contact@alxmultimedia.com" className="button">
            Contactez-nous
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="App" data-testid="main-container">
      <h1>Bienvenue sur notre application web!</h1>
      <a
        href="/learn-react"
        className="learn-more"
        data-testid="learn-react-link"
      >
        Learn React
      </a>
    </div>
  );
};

export default App;
