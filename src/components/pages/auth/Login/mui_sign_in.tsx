// 📌 src/components/pages/auth/Login/mui_sign_in.tsx
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
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

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ email, password });
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <div className="auth-container">
        <div className="auth-card">
          {/* 🔹 En-tête avec logo et bouton de fermeture */}          
          <div className="close-header">
            <CloseButton onClick={() => navigate(-1)} />
          </div>
          <div className="logo-header">
            <img src={SitemarkIcon} alt="Logo AlxMultimedia" className="auth-logo" />
          </div>        
          

          <div className="auth-content">
            {/* 📌 Titre */}
            <Typography component="h1" variant="h4" className="auth-section">
              Connexion
            </Typography>
          </div>


          {/* 📌 Formulaire */}
          <div className="auth-content">
            <Box component="form" onSubmit={handleSubmit} className="auth-form">
              <FormControl>
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <TextField id="email" type="email" fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password">Mot de passe</FormLabel>
                <TextField id="password" type="password" fullWidth required value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>

              <FormControlLabel control={<Checkbox />} label="Se souvenir de moi" />
              <Button type="submit" fullWidth variant="contained">
                Connexion
              </Button>

              <Link href="/forgot-password">Mot de passe oublié ?</Link>
            </Box>
          </div>

          <div className="auth-content">
            {/* 📌 Séparateur */}
            <Divider>ou</Divider>
          </div>

          <div className="auth-content">
            {/* 📌 Bouton Google */}
            <Button fullWidth variant="outlined" className="auth-google-btn" startIcon={<GoogleIcon />}>
              Connexion avec Google
            </Button>
          </div>
          
          <div className="auth-content">
            <Typography>
              Pas encore de compte ? <Link href="/register">Inscription</Link>
            </Typography>
          </div>
        </div>
      </div>
    </AppTheme>
  );
}
