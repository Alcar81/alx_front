import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "@pages/LandingPage/LandingPage";
import Home from "@pages/Home/Home";
import About from "@pages/About/About";
import Contact from "@pages/Contact/Contact";
import Login from "@auth/Login/mui_sign_in";
import Register from "@auth/Register/mui_sign_up";
import NotFound from "@pages/Notfound/Notfound";

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
