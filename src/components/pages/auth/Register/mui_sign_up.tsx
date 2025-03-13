// src/components/pages/auth/Register/mui_sign_up.tsx 
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

// 🔹 Bouton de fermeture (X)
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ nom, email, motDePasse });
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <div className="auth-container">
        <div className="auth-card">         
          
          <div className="close-header">
            {/* 🔹 Bouton de fermeture */}
            <CloseButton onClick={() => navigate(-1)} />
          </div>
          <div className="logo-header">
            {/* 📌 Logo aligné à gauche */}
            <img src={SitemarkIcon} alt="Logo AlxMultimedia" className="auth-logo" />
          </div>            
          
          
          <div className="auth-content">
            {/* 📌 Titre */}
            <Typography component="h1" variant="h4">
              Inscription
            </Typography>
          </div>

          <div className="auth-content">
            {/* 📌 Formulaire */}
            <Box component="form" onSubmit={handleSubmit} className="auth-form">
              <FormControl>
                <FormLabel htmlFor="nom">Nom complet</FormLabel>
                <TextField id="nom" type="text" fullWidth required value={nom} onChange={(e) => setNom(e.target.value)} />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <TextField id="email" type="email" fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="motDePasse">Mot de passe</FormLabel>
                <TextField id="motDePasse" type="password" fullWidth required value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} />
              </FormControl>

              <Button type="submit" fullWidth variant="contained">
                S'inscrire
              </Button>
            </Box>
          </div>

          <div className="auth-content">
            {/* 📌 Séparateur */}
            <Divider>ou</Divider>
          </div>

          <div className="auth-content">
            {/* 📌 Bouton Google */}
            <Button fullWidth variant="outlined" className="google-button" startIcon={<GoogleIcon />}>
              S'inscrire avec Google
            </Button>
          </div>

          <div className="auth-content">
            {/* 📌 Lien vers la connexion */}
            <Typography sx={{ textAlign: "center" }}>
              Vous avez déjà un compte ? <Link href="/connexion">Se connecter</Link>
            </Typography>
          </div>
        </div>
      </div>
    </AppTheme>
  );
}
