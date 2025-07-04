// 📁 src/components/pages/auth/Login/mui_sign_in.tsx

import React from "react";
import {
  Box, Button, CssBaseline, Divider, FormControl,
  FormLabel, TextField, Typography, IconButton, Link, InputAdornment
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import AppTheme from "../../../../theme/AppTheme";
import SitemarkIcon from "../../../../assets/images/logos/Alx_logo_long2.png";
import { GoogleIcon } from "../../../../theme/CustomIcons";
import { useUserContext } from "../../../../contexts/UserContext";
import { useAuthApi } from "../../../../api/authApi";
import "../../auth/authStyles.css";

// ✅ Bouton de fermeture
const CloseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <IconButton className="auth-close-btn" onClick={onClick}>
    <CloseIcon />
  </IconButton>
);

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate();
  const { login: loginApi } = useAuthApi(); // 🔥 login de l'API
  const { login: loginUserContext } = useUserContext(); // 🔥 login du contexte utilisateur

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setMessage("");

    try {
      const data = await loginApi({
        email: email.toLowerCase().trim(),
        password,
      });

      loginUserContext(
        {
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email,
          id: data.id || "",
          roles: data.roles || [],
          createdAt: data.createdAt || new Date().toISOString(),
        },
        data.token
      );

      navigate("/Accueil"); // ✅ Rediriger après connexion
    } catch (err: any) {
      const errMsg = (err?.message || "").toLowerCase();

      if (errMsg.includes("unauthorized") || errMsg.includes("incorrect")) {
        setMessage("❌ Email ou mot de passe incorrect.");
      } else if (errMsg.includes("not found")) {
        setMessage("❌ Utilisateur non trouvé.");
      } else if (errMsg.includes("le serveur a retourné")) {
        setMessage("❌ Réponse invalide du serveur.");
      } else if (errMsg.includes("réseau")) {
        setMessage("❌ Erreur réseau. Vérifiez votre connexion.");
      } else {
        setMessage(`❌ ${err.message || "Erreur inconnue lors de la connexion."}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline />
      <div className="auth-container">
        <div className="auth-card">
          <div className="close-header">
            <CloseButton onClick={() => navigate(-1)} />
          </div>

          <div className="logo-header">
            <img src={SitemarkIcon} alt="Logo AlxMultimedia" className="auth-logo" />
          </div>

          <div className="auth-content">
            <Typography variant="h4">Connexion</Typography>

            <Box component="form" onSubmit={handleSubmit} className="auth-form">
              <FormControl>
                <FormLabel>Email</FormLabel>
                <TextField
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>Mot de passe</FormLabel>
                <TextField
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

              {message && (
                <Typography sx={{ mt: 2, color: "red" }}>{message}</Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                disabled={loading}
              >
                {loading ? "Connexion..." : "Connexion"}
              </Button>
            </Box>
          </div>

          <div className="auth-content"><Divider>ou</Divider></div>

          <div className="auth-content">
            <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
              Connexion avec Google
            </Button>
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
