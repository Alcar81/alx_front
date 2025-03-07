// src/routes/routes.ts
import LandingPage from "../pages/LandingPage";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";

import Login from "../pages/auth/mui_sign_in";
import Register from "../pages/auth/mui_sign_up";

import Dashboard from "../pages/admin/Dashbord";
import Settings from "../pages/admin/Settings";

import NotFound from "../pages/pages/Notfound";
import AdminNotFound from "../pages/admin/AdminNotFound";



const routes = {
  publicRoutes: [
    { path: "/", component: LandingPage, exact: true }, // La landing page devient la route par défaut
    { path: "/home", component: Home }, // Route pour la page d'accueil classique
    { path: "/about", component: About },
    { path: "/contact", component: Contact },
    { path: "/login", component: Login },    
    { path: "/register", component: Register },
    { path: "*", component: NotFound }, // Catch-all pour les erreurs 404
    
  ],
  adminRoutes: [
    { path: "/admin", component: Dashboard },
    { path: "/admin/settings", component: Settings },    
    { path: "*", component: AdminNotFound }, // Catch-all spécifique à l'admin
  ],
};

export default routes;
