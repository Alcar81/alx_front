// src/components/Auth/AuthForm.tsx
import React from 'react';
import './AuthForm.css';

interface AuthFormProps {
  title: string; // Titre du formulaire (Connexion ou Inscription)
  onSubmit: (e: React.FormEvent) => void; // Fonction de soumission du formulaire
  buttonText: string; // Texte du bouton principal
  isSignup?: boolean; // Détermine si c'est un formulaire d'inscription
  showGoogle?: boolean; // Afficher ou non le bouton Google
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  onSubmit,
  buttonText,
  isSignup = false, // Par défaut, ce n'est pas un formulaire d'inscription
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
            <span>{isSignup ? 'S’inscrire avec Google' : 'Se connecter avec Google'}</span>
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
        {isSignup && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmez le mot de passe *"
            className="auth-input"
            required
          />
        )}

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
