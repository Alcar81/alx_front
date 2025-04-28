// // 📁 src/routes/PublicRoutes.tsx

import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "../components/pages/LandingPage/LandingPage";
import Home from "../components/pages/Home/Home";
import About from "../components/pages/About/About";
import Contact from "../components/pages/Contact/Contact";

import Login from "../components/pages/auth/Login/mui_sign_in";
import Register from "../components/pages/auth/Register/mui_sign_up";

import UserProfile from "../components/pages/user/UserProfile/UserProfile";
import NotFound from "../components/pages/NotFound/NotFound";

import ProtectedRoute from "./ProtectedRoute";

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/Accueil" element={<Home />} />
      <Route path="/À-propos" element={<About />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Connexion" element={<Login />} />
      <Route path="/Inscription" element={<Register />} />

      {/* 🔒 Routes sécurisées */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowSelf>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/:userId"
        element={
          <ProtectedRoute allowSelf>
            <UserProfile />
          </ProtectedRoute>
        }
      />

      {/* 🌐 Page 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
