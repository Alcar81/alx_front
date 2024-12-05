import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../components/pages/LandingPage/LandingPage";
import Home from "../components/pages/Home/Home";
import About from "../components/pages/About/About";
import Contact from "../components/pages/Contact/Contact";
import Login from "../components/pages/Login/Login";
import Register from "../components/pages/auth/Register/Register";
import NotFound from "../components/pages/Notfound/Notfound";

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} /> {/* Landing page */}
      <Route path="/Accueil" element={<Home />} />
      <Route path="/À-propos" element={<About />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Connexion" element={<Login />} />
      <Route path="/Inscription" element={<Register />} />      
      <Route path="*" element={<NotFound />} />
      
    </Routes>
  );
};


export default PublicRoutes;
