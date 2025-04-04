// 📌 src/components/pages/auth/Login/mui_sign_in.tsx
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
import { useAuth } from "../../../../hooks/useAuth";
import "../../../auth/authStyles.css";

const CloseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <IconButton className="auth-close-btn" onClick={onClick}>
    <CloseIcon />
  </IconButton>
);

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur de connexion.");

      login({ email: data.email, token: data.token });
      navigate("/");
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
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
            <Typography variant="h4">Connexion</Typography>
            <Box component="form" onSubmit={handleSubmit} className="auth-form">
              <FormControl><FormLabel>Email</FormLabel><TextField value={email} onChange={e => setEmail(e.target.value)} /></FormControl>
              <FormControl><FormLabel>Mot de passe</FormLabel><TextField type="password" value={password} onChange={e => setPassword(e.target.value)} /></FormControl>

              {message && <Typography sx={{ mt: 2, color: "red" }}>{message}</Typography>}

              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Connexion</Button>
            </Box>
          </div>

          <div className="auth-content"><Divider>ou</Divider></div>
          <div className="auth-content">
            <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>Connexion avec Google</Button>
          </div>
          <div className="auth-content">
            <Typography sx={{ textAlign: "center" }}>
              Pas encore de compte ? <Link href="/register">Inscription</Link>
            </Typography>
          </div>
        </div>
      </div>
    </AppTheme>
  );
}
