// LandingPage.tsx
import React from "react";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <section className="landing-header">
        <h1>Bienvenue sur notre plateforme</h1>
        <p>Découvrez nos services innovants et développez vos projets avec nous.</p>
        <a href="/register" className="cta-button">Inscrivez-vous maintenant</a>
      </section>

      <section id="features" className="landing-features">
        <h2>Pourquoi nous choisir ?</h2>
        <ul>
          <li>Innovation</li>
          <li>Expertise</li>
          <li>Résultats garantis</li>
        </ul>
      </section>
    </div>
  );
};

export default LandingPage;
