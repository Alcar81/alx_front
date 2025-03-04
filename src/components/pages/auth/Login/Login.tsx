// src/pages/Login.tsx
import React from 'react';
import AuthForm from '../AuthForm';

const Login: React.FC = () => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Utilisateur enregistré!');
    // Ajoutez ici la logique de connexion (appel API, validation, etc.)
  };

  return (
    <div className="login">
        <section className="login-form"> 
          <AuthForm
            title="Connexion"
            onSubmit={handleLogin}
            buttonText="Connexion"
            showGoogle={true} // Active uniquement Google
          />
        </section>
    </div>
  );
};

export default Login;
