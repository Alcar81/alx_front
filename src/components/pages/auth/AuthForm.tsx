// src/components/Auth/AuthForm.tsx
import React from 'react';
import './AuthForm.css';

interface AuthFormProps {
  title: string; // Titre du formulaire (Connexion ou Inscription)
  onSubmit: (e: React.FormEvent) => void; // Fonction de soumission du formulaire
  buttonText: string; // Texte du bouton principal
  showGoogle?: boolean; // Afficher ou non le bouton Google
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  onSubmit,
  buttonText,
  showGoogle = true, // Par défaut, Google est activé
}) => {
  return (
    <div className="auth-container">
      <h1 className="auth-title">{title}</h1>
      <p className="auth-subtitle">
        {title === 'Connexion'
          ? 'Bienvenue, veuillez vous connecter pour continuer'
          : 'Créer un compte pour commencer'}
      </p>

      {showGoogle && (
        <>
          <button type="button" className="google-btn">
            <span>Se connecter avec Google</span>
          </button>
          <div className="divider">
            <span>ou</span>
          </div>
        </>
      )}

      <form onSubmit={onSubmit} className="auth-form">
        <input
          type="email"
          name="email"
          placeholder="Courriel *"
          className="auth-input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe *"
          className="auth-input"
          required
        />

        <div className="auth-remember-me">
          <label>
            <input type="checkbox" name="remember" />
            Se souvenir de moi
          </label>
        </div>

        <button type="submit" className="auth-submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
