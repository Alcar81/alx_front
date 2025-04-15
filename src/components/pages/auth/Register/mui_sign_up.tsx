import React from "react";
import {
  Box, Button, CssBaseline, Divider, FormControl,
  FormLabel, TextField, Typography, IconButton, Link
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import AppTheme from "../../../../theme/AppTheme";
import SitemarkIcon from "../../../../assets/images/logos/Alx_logo_long2.png";
import { GoogleIcon } from "../../../../theme/CustomIcons";
import { post } from "../../../../utils/requests";
import "../../auth/authStyles.css";

const CloseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <IconButton className="auth-close-btn" onClick={onClick}>
    <CloseIcon />
  </IconButton>
);

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [motDePasse, setMotDePasse] = React.useState("");
  const [confirmationMotDePasse, setConfirmationMotDePasse] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setMessage("");

    if (motDePasse !== confirmationMotDePasse) {
      setMessage("❌ Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      await post("/register", {
        firstName,
        lastName,
        email,
        password: motDePasse,
      });

      setMessage("✅ Inscription réussie !");
      setTimeout(() => navigate("/Connexion"), 10000); // 10s pour tests
    } catch (err: any) {
      setMessage(`❌ ${err.message || "Erreur lors de l'inscription."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline />
      <div className="auth-container">
        <div className="auth-card">
          <div className="close-header"><CloseButton onClick={() => navigate(-1)} /></div>
          <div className="logo-header">
            <img src={SitemarkIcon} alt="Logo AlxMultimedia" className="auth-logo" />
          </div>
          <div className="auth-content">
            <Typography variant="h4">Inscription</Typography>
            <Box component="form" onSubmit={handleSubmit} className="auth-form">
              <FormControl><FormLabel>Prénom</FormLabel><TextField value={firstName} onChange={e => setFirstName(e.target.value)} required /></FormControl>
              <FormControl><FormLabel>Nom</FormLabel><TextField value={lastName} onChange={e => setLastName(e.target.value)} required /></FormControl>
              <FormControl><FormLabel>Email</FormLabel><TextField type="email" value={email} onChange={e => setEmail(e.target.value)} required /></FormControl>
              <FormControl><FormLabel>Mot de passe</FormLabel><TextField type="password" value={motDePasse} onChange={e => setMotDePasse(e.target.value)} required /></FormControl>
              <FormControl><FormLabel>Confirmer</FormLabel><TextField type="password" value={confirmationMotDePasse} onChange={e => setConfirmationMotDePasse(e.target.value)} required /></FormControl>

              {message && (
                <Typography sx={{ mt: 2, color: message.includes("✅") ? "green" : "red" }}>
                  {message}
                </Typography>
              )}

              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={loading}>
                {loading ? "Création..." : "S'inscrire"}
              </Button>
            </Box>
          </div>

          <div className="auth-content"><Divider>ou</Divider></div>
          <div className="auth-content">
            <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>S'inscrire avec Google</Button>
          </div>
          <div className="auth-content">
            <Typography sx={{ textAlign: "center" }}>
              Déjà un compte ? <Link href="/connexion">Se connecter</Link>
            </Typography>
          </div>
        </div>
      </div>
    </AppTheme>
  );
}
