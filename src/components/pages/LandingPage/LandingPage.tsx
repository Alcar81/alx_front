import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import videoIntro from "../../../assets/videos/intro.mp4";

const LandingPage: React.FC = () => {
  const [videoEnded, setVideoEnded] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Redirection automatique après la fin de la vidéo
  useEffect(() => {
    if (videoEnded) {
      setTimeout(() => {
        navigate("/Accueil"); // 🔄 Redirige après la vidéo
      }, 1000); // Petit délai pour la transition
    }
  }, [videoEnded, navigate]);

  return (
    <div className={`landing-container ${videoEnded ? "fade-out" : ""}`}>
      <video 
        ref={videoRef}
        className="landing-video"
        src={videoIntro}
        autoPlay 
        muted
        onEnded={() => setVideoEnded(true)}
      />
      
      {/* Bouton "Passer" */}
      <button className="skip-button" onClick={() => navigate("/Accueil")}>
        Passer ➝
      </button>
    </div>
  );
};

export default LandingPage;
