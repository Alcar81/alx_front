// src/routes/routes.ts
import LandingPage from "@pages/LandingPage/LandingPage"; //
import Home from "@pages/Home/Home";
import About from "@pages/About/About";
import Contact from "@pages/Contact/Contact";
import Login from "@auth/Login/mui_sign_in";
import Register from "@auth/Register/mui_sign_up";
import Dashboard from "@admin/Dashbord/Dashbord";
import Settings from "@admin/Settings/Settings";
import NotFound from "@pages/Notfound/Notfound";
import AdminNotFound from "@admin/AdminNotFound/AdminNotFound";



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
