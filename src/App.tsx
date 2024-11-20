import React from 'react';
import './App.css';
import config from '../config/config';

function App() {
  const isMaintenance = config.REACT_APP_MAINTENANCE_MODE;

  if (isMaintenance) {
    return (
      <div className="App">
        <div className="container">
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
  }

  return (
    <div className="App">
      <h1>Bienvenue sur notre application !</h1>
      {/* Le contenu principal de votre application */}
    </div>
  );
}

export default App;

