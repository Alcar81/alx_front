// About.tsx
import React from "react";
import "./About.css";
import Header from "../../partiels/Header/Header"; // ✅ Import du Header


const About: React.FC = () => {
  return (
    <>
      {/* ✅ Intégration du Header */}
      <Header />
      
      {/* ✅ Conteneur principal de la page */}
      <main className="main">
        <div className="about-page">
          <header className="about-header">
            <h1>À propos de nous</h1>
          </header>

          <section className="about-section">
            <div className="about-content">
              <h2>Notre mission</h2>
              <p>
                Chez AlxMultimedia, notre mission est de transformer vos idées en
                réalité grâce à des solutions numériques innovantes et
                personnalisées.<br/>Nous nous engageons à fournir des services de
                qualité qui répondent à vos besoins uniques.
              </p>
            </div>

            <div className="about-content">
              <h2>Notre histoire</h2>
              <p>
                Fondée en 2024, AlxMultimedia a vu le jour avec une vision claire :
                révolutionner le monde numérique en combinant créativité et
                technologie.<br/>Au fil des ans, nous avons aidé de nombreuses
                entreprises et particuliers à atteindre leurs objectifs grâce à nos
                services de pointe.
              </p>
            </div>

            <div className="about-content">
              <h2>Nos valeurs</h2>
              <div className="about-list">
                <div className="about-item">              
                  <h3>Innovation</h3>
                  <p>Nous cherchons constamment à innover.</p>
                </div>
                <div className="about-item">
                  <h3>Qualité</h3>
                  <p>Nous ne faisons aucun compromis sur la qualité.</p>
                </div>
                <div className="about-item">
                  <h3>Transparence</h3>
                  <p>Nous croyons en une communication ouverte.</p>
                </div>
                <div className="about-item">
                  <h3>Engagement</h3>
                  <p>Votre succès est notre priorité.</p>
                </div>  
              </div>  
            </div>

          </section>

          <section className="about-team">
            <h2>Rencontrez notre équipe</h2>
            <div className="team-container">
              <div className="team-member">
                <img
                  src="/assets/team-member1.jpg"
                  alt="Membre de l'équipe"
                  className="team-photo"
                />
                <h3>Alexandre Carignan</h3>
                <p>Fondateur et visionnaire</p>
              </div>
              <div className="team-member">
                <img
                  src="/assets/team-member2.jpg"
                  alt="Membre de l'équipe"
                  className="team-photo"
                />
                <h3>Marie Dupont</h3>
                <p>Designer UX/UI</p>
              </div>
              <div className="team-member">
                <img
                  src="/assets/team-member3.jpg"
                  alt="Membre de l'équipe"
                  className="team-photo"
                />
                <h3>Jean Tremblay</h3>
                <p>Développeur Web</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default About;