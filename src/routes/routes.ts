// src/routes/routes.ts
import LandingPage from "../component/pages/LandingPage";
import Home from "../component/pages/Home";
import About from "../component/pages/About";
import Contact from "../component/pages/Contact";

import Login from "../component/pages/auth/mui_sign_in";
import Register from "../component/pages/auth/mui_sign_up";

import Dashboard from "../component/pages/admin/Dashbord";
import Settings from "../component/pages/admin/Settings";

import NotFound from "../component/pages/pages/Notfound";
import AdminNotFound from "../component/pages/admin/AdminNotFound";



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
