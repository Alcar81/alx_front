// 📁 src/routes/paths.ts

export const PATHS = {
  // 🌐 Pages publiques
  landing: "/",
  accueil: "/Accueil",
  aPropos: "/À-propos",
  contact: "/Contact",
  login: "/Connexion",
  register: "/Inscription",

  // 👤 Utilisateur
  profile: "/profile",
  user: (id: string) => `/user/${id}`,

  // 🔒 Administration
  adminRoot: "/admin",
  adminDashboard: "/admin/dashboard",
  adminSettings: "/admin/settings",
  adminUsers: "/admin/users",

  // ❌ Pages d’erreur
  notFound: "*",
  unauthorized: "/unauthorized",
  forbidden: "/403",
};
