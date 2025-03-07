// src/routes/PublicRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";

import NotFound from "../pages/Notfound";

import Login from "../pages/auth/mui_sign_in";
import Register from "../pages/auth/mui_sign_up";


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
