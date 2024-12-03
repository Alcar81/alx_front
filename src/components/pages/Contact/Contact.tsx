// Contact.tsx
import React from "react";
import "./Contact.css";

const Contact: React.FC = () => {
  return (
    <div className="contact-page">
      <header className="contact-header">
        <h1>Nous contacter</h1>
        <p>
          Vous avez des questions ou des préoccupations ?
          <br/>
          <br/>
          Écrivez-nous!
        </p>
      </header>

      <div className="contact-content">
        <section className="contact-form">
          <h2>Formulaire de contact</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input type="text" id="name" name="name" placeholder="Votre nom complet" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Votre adresse email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="Votre message" required></textarea>
            </div>
            <button type="submit" className="submit-button">Envoyer</button>
          </form>
        </section>

        <section className="contact-info">
          <h2>Nos Coordonnées</h2>
          <ul>
            <li><strong>Adresse :</strong> 123 Rue Exemple, Québec, QC, Canada</li>
            <li><strong>Téléphone :</strong> +1 418-440-5010</li>
            <li><strong>Email :</strong> <a href="mailto:contact@alxmultimedia.com">contact@alxmultimedia.com</a></li>
          </ul>

          <h3>Suivez-nous</h3>
          <div className="social-icons">
            <a href="#" className="social-icon facebook">Facebook</a>
            <a href="#" className="social-icon twitter">Twitter</a>
            <a href="#" className="social-icon linkedin">LinkedIn</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;