import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <div className="main-footer">
      <footer className="footer">
        <div className="footer-container">
          <div className="about">
            <h4>À propos de nous</h4>
            <p>
              AlxMultimedia est une entreprise dédiée à la création de solutions
              numériques innovantes. Nous combinons créativité et technologie pour
              vous offrir des expériences uniques.
            </p>
          </div>
          <div className="contact">
            <h4>Contactez-nous</h4>
            <ul>
              <li>📍 Québec, QC, Canada</li>
              <li>📞 +1 418-440-5010</li>
              <li>
                📧{" "}
                <a href="mailto:contact@alxmultimedia.com">
                  contact@alxmultimedia.com
                </a>
              </li>
            </ul>
          </div>
          <div className="link">
            <h4>Liens rapides</h4>
            <ul>
              <li>
                <Link to="/Accueil">
                  <a>Accueil</a>
                </Link>
              </li>
              <li>
                <Link to="/À-propos">
                  <a>À propos</a>
                </Link>
              </li>
              <li>
                <Link to="/À-propos">
                  <a>Service</a>
                </Link>
              </li>
              <li>
                <Link to="/À-propos">
                  <a>Contact</a>
                </Link>
              </li>
              <li>
                <Link to="/À-propos">
                  <a>FAQ</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} AlxMultimedia.com Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
