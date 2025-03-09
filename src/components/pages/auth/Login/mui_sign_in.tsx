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
import ForgotPassword from "../ForgotPassword";
import AppTheme from "../../../../theme/AppTheme";
import ColorModeSelect from "../../../../theme/ColorModeSelect";
import { GoogleIcon } from "../../../../theme/CustomIcons";
import { Card, AuthContainer } from "../../../../theme/styles/authStyles";
import alxLogo from "../../../images/logos/alx_logo_long.png";

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validateInputs = () => {
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    setEmailError(/\S+@\S+\.\S+/.test(email) ? "" : "Veuillez entrer une adresse e-mail valide.");
    setPasswordError(password.length >= 6 ? "" : "Le mot de passe doit contenir au moins 6 caractères.");

    return /\S+@\S+\.\S+/.test(email) && password.length >= 6;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs()) return;

    console.log({ email: emailRef.current?.value, password: passwordRef.current?.value });
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AuthContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
        <Card variant="outlined">
          <img src={alxLogo} alt="Logo AlxMultimedia" width="200" />
          <Typography component="h1" variant="h4">
            Connexion
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField inputRef={emailRef} error={!!emailError} helperText={emailError} id="email" type="email" placeholder="your@email.com" required fullWidth />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Mot de passe</FormLabel>
              <TextField inputRef={passwordRef} error={!!passwordError} helperText={passwordError} type="password" placeholder="••••••" required fullWidth />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Connexion
            </Button>
          </Box>
        </Card>
      </AuthContainer>
    </AppTheme>
  );
}
