// src/pages/Register.tsx
import React from 'react';
import AuthForm from '../auth/AuthForm';

const Register: React.FC = () => {
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Utilisateur enregistré!');
    // Ajoutez ici la logique d'enregistrement (appel API, validation, etc.)
  };

  return (
    <div className="register">      
        <section className="register-form"> 
          <AuthForm
            title="Inscription"
            onSubmit={handleRegister}
            buttonText="Enregistrer"
            showGoogle={true} // Activer ou désactiver le bouton Google
          />
        </section>    
    </div>
  );
};

export default Register;
