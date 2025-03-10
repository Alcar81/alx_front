// 📌 src/components/pages/auth/Login/mui_sign_in.tsx
import * as React from "react";
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

import { Card, AuthContainer } from "../../../../theme/styles/authStyles";
import ForgotPassword from "../ForgotPassword";
import AppTheme from "../../../../theme/AppTheme";
import ColorModeSelect from "../../../../theme/ColorModeSelect";
import { GoogleIcon } from "../../../../theme/CustomIcons";

import SitemarkIcon from "../../../../assets/images/logos/Alx_logo_long2.png";

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validateInputs = () => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Veuillez entrer une adresse e-mail valide.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Le mot de passe doit contenir au moins 6 caractères.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs()) return;

    console.log({ email, password });
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AuthContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
        <Card variant="outlined">
          {/* 📌 Logo */}
          <img src={SitemarkIcon} alt="Logo AlxMultimedia" width="200" />

          {/* 📌 Titre */}
          <Typography component="h1" variant="h4">
            Connexion
          </Typography>

          {/* 📌 Formulaire */}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="email">E-mail</FormLabel>
              <TextField
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Mot de passe</FormLabel>
              <TextField
                id="password"
                type="password"
                name="password"
                placeholder="••••••"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Se souvenir de moi"
            />
            <ForgotPassword open={open} handleClose={handleClose} />

            <Button type="submit" fullWidth variant="contained">
              Connexion
            </Button>

            <Link component="button" type="button" onClick={handleClickOpen} variant="body2">
              Mot de passe oublié ?
            </Link>
          </Box>

          {/* 📌 Séparateur */}
          <Divider>ou</Divider>

          {/* 📌 Bouton Google */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
              Connexion avec Google
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Pas encore de compte ?{" "}
              <Link href="/register" variant="body2">
                Inscription
              </Link>
            </Typography>
          </Box>
        </Card>
      </AuthContainer>
    </AppTheme>
  );
}
