// 📌 src/components/pages/auth/Register/mui_sign_up.tsx
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AppTheme from "../../../../theme/AppTheme";
import SitemarkIcon from "../../../../assets/images/logos/Alx_logo_long2.png";
import { GoogleIcon } from "../../../../theme/CustomIcons";
import "../authStyles.css";

const CloseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <IconButton className="auth-close-btn" onClick={onClick}>
    <CloseIcon />
  </IconButton>
);

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate();
  const [nom, setNom] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [motDePasse, setMotDePasse] = React.useState("");
  const [confirmationMotDePasse, setConfirmationMotDePasse] = React.useState("");

  const [erreur, setErreur] = React.useState({
    nom: "",
    email: "",
    motDePasse: "",
    confirmation: "",
  });

  const [message, setMessage] = React.useState("");

  const validateForm = () => {
    const nouvellesErreurs = {
      nom: nom.trim() ? "" : "Le nom est requis.",
      email: /\S+@\S+\.\S+/.test(email) ? "" : "Adresse email invalide.",
      motDePasse: motDePasse.length >= 6 ? "" : "Mot de passe trop court.",
      confirmation:
        confirmationMotDePasse === motDePasse ? "" : "Les mots de passe ne correspondent pas.",
    };

    setErreur(nouvellesErreurs);
    return Object.values(nouvellesErreurs).every((v) => v === "");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    if (!validateForm()) return;

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, email, motDePasse }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Une erreur est survenue.");
      } else {
        setMessage("✅ Inscription réussie ! Redirection...");
        setTimeout(() => navigate("/Connexion"), 2000);
      }
    } catch (error) {
      console.error("Erreur d'inscription :", error);
      setMessage("❌ Erreur lors de la connexion au serveur.");
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <div className="auth-container">
        <div className="auth-card">
          <div className="close-header">
            <CloseButton onClick={() => navigate(-1)} />
          </div>

          <div className="logo-header">
            <img src={SitemarkIcon} alt="Logo AlxMultimedia" className="auth-logo" />
          </div>

          <div className="auth-content">
            <Typography component="h1" variant="h4">
              Inscription
            </Typography>
          </div>

          <div className="auth-content">
            <Box component="form" onSubmit={handleSubmit} className="auth-form">
              <FormControl>
                <FormLabel htmlFor="nom">Nom complet</FormLabel>
                <TextField
                  id="nom"
                  type="text"
                  fullWidth
                  required
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  error={!!erreur.nom}
                  helperText={erreur.nom}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <TextField
                  id="email"
                  type="email"
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!erreur.email}
                  helperText={erreur.email}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="motDePasse">Mot de passe</FormLabel>
                <TextField
                  id="motDePasse"
                  type="password"
                  fullWidth
                  required
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  error={!!erreur.motDePasse}
                  helperText={erreur.motDePasse}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="confirmation">Confirmez le mot de passe</FormLabel>
                <TextField
                  id="confirmation"
                  type="password"
                  fullWidth
                  required
                  value={confirmationMotDePasse}
                  onChange={(e) => setConfirmationMotDePasse(e.target.value)}
                  error={!!erreur.confirmation}
                  helperText={erreur.confirmation}
                />
              </FormControl>

              {message && (
                <Typography sx={{ color: message.includes("✅") ? "green" : "red", mt: 2 }}>
                  {message}
                </Typography>
              )}

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                S'inscrire
              </Button>
            </Box>
          </div>

          <div className="auth-content">
            <Divider>ou</Divider>
          </div>

          <div className="auth-content">
            <Button fullWidth variant="outlined" className="google-button" startIcon={<GoogleIcon />}>
              S'inscrire avec Google
            </Button>
          </div>

          <div className="auth-content">
            <Typography sx={{ textAlign: "center" }}>
              Vous avez déjà un compte ? <Link href="/connexion">Se connecter</Link>
            </Typography>
          </div>
        </div>
      </div>
    </AppTheme>
  );
}
