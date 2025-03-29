// src/components/pages/Home/Home.tsx
import React from "react";
import "./Home.css";
import Header from "../../partiels/Header/Header"; // ✅ Import du Header
import Footer from "../../partiels/Footer/Footer"; // ✅ Import du Footer

const Home: React.FC = () => {
  return (
    <>
      {/* ✅ Intégration du Header */}
      <Header />

      {/* ✅ Conteneur principal de la page */}
      <main className="main">
        <div className="home-page">
          <header className="home-header">
            <h1>Bienvenue chez AlxMultimedia</h1>
            <p>Créations. Visions. Web. Nous façonnons le numérique pour donner vie à vos idées.</p>
            <a href="#services" className="cta-button">
              Découvrir nos services
            </a>
          </header>

          <section id="about" className="home-about">
            <h2>À propos de nous</h2>
            <p>
              AlxMultimedia est une entreprise dédiée à la création de solutions numériques innovantes. Nous combinons créativité et technologie pour vous offrir des expériences uniques.
            </p>
          </section>

          <section id="services" className="home-services">
            <h2>Nos services</h2>
            <div className="services-list">
              <div className="service-item">
                <h3>Design créatif</h3>
                <p>Transformez vos idées en réalité avec des designs captivants.</p>
              </div>
              <div className="service-item">
                <h3>Développement Web</h3>
                <p>Des applications performantes et sécurisées pour votre succès.</p>
              </div>
              <div className="service-item">
                <h3>Stratégies numériques</h3>
                <p>Boostez votre présence en ligne avec des solutions sur mesure.</p>
              </div>
            </div>
          </section>

          <section id="footer" className="home-footer">
            <Footer />:
          </section>
        </div>        
      </main>
    </>
  );
};

export default Home;
