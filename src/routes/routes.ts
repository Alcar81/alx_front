import LandingPage from "../components/pages/LandingPage";
import Home from "../components/pages/Home";
import About from "../components/pages/About";
import Contact from "../components/pages/Contact";

import Login from "../components/pages/auth/mui_sign_in";
import Register from "../components/pages/auth/mui_sign_up";

import Dashboard from "../components/pages/admin/Dashboard";
import Settings from "../components/pages/admin/Settings";

import NotFound from "../components/pages/Notfound";
import AdminNotFound from "../components/pages/admin/AdminNotFound";

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
