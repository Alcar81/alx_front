import LandingPage from "../components/pages/LandingPage/LandingPage";
import Home from "../components/pages/Home/Home";
import About from "../components/pages/About/About";
import Contact from "../components/pages/Contact/Contact";

import Login from "../components/pages/auth/Login/mui_sign_in";
import Register from "../components/pages/auth/Register/mui_sign_up";

import Dashboard from "../components/pages/admin/Dashbord/Dashbord";
import Settings from "../components/pages/admin/Settings/Settings";

import NotFound from "../components/pages/NotFound/NotFound";
import AdminNotFound from "../components/pages/admin/AdminNotFound/AdminNotFound";

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
