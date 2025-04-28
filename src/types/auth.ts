// 📁 src/types/auth.ts

/**
 * Payload envoyé pour l'inscription
 */
export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/**
 * Payload envoyé pour la connexion
 */
export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Réponse reçue après connexion
 */
export interface LoginResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  createdAt: string;
  token: string;
}

/**
 * Profil utilisateur
 */
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  createdAt: string;
}

/**
 * Payload pour changer son mot de passe
 */
export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}
