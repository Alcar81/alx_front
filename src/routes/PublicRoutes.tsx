// src/routes/PublicRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "../components/pages/LandingPage";
import Home from "../components/pages/Home";
import About from "../components/pages/About";
import Contact from "../components/pages/Contact";

import NotFound from "../components/pages/Notfound";

import Login from "../components/pages/auth/Login/mui_sign_in";
import Register from "../components/pages/auth/Register/mui_sign_up";


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
