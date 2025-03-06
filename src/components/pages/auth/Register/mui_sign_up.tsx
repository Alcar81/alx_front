import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AppTheme from "@/theme/AppTheme";
import ColorModeSelect from "@/theme/ColorModeSelect";
import { GoogleIcon } from "@/theme/CustomIcons";
import { Card, AuthContainer } from "../styles/authStyles";
import alxLogo from "@/components/images/logo/alx_logo_long.png";

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const [nom, setNom] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [motDePasse, setMotDePasse] = React.useState("");
  const [nomErreur, setNomErreur] = React.useState("");
  const [emailErreur, setEmailErreur] = React.useState("");
  const [motDePasseErreur, setMotDePasseErreur] = React.useState("");

  const validerChamps = () => {
    let estValide = true;

    setNomErreur(nom.trim() ? "" : "Le nom est requis.");
    setEmailErreur(
      /\S+@\S+\.\S+/.test(email) ? "" : "Veuillez entrer une adresse e-mail valide."
    );
    setMotDePasseErreur(
      motDePasse.length >= 6 ? "" : "Le mot de passe doit contenir au moins 6 caractères."
    );

    return nom.trim() && /\S+@\S+\.\S+/.test(email) && motDePasse.length >= 6;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validerChamps()) return;

    console.log({ nom, email, motDePasse });
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <AuthContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <img src={alxLogo} alt="Logo AlxMultimedia" width="200" />
          <Typography component="h1" variant="h4">
            Inscription
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="nom">Nom complet</FormLabel>
              <TextField fullWidth id="nom" placeholder="Jean Dupont" value={nom} onChange={(e) => setNom(e.target.value)} error={!!nomErreur} helperText={nomErreur} required />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">E-mail</FormLabel>
              <TextField fullWidth id="email" placeholder="votre@email.com" value={email} onChange={(e) => setEmail(e.target.value)} error={!!emailErreur} helperText={emailErreur} required />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="motDePasse">Mot de passe</FormLabel>
              <TextField fullWidth id="motDePasse" placeholder="••••••" type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} error={!!motDePasseErreur} helperText={motDePasseErreur} required />
            </FormControl>
            <FormControlLabel control={<Checkbox value="recevoirMisesAJour" color="primary" />} label="Je souhaite recevoir des mises à jour par e-mail." />
            <Button type="submit" fullWidth variant="contained">
              S'inscrire
            </Button>
          </Box>
          <Divider />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
              S'inscrire avec Google
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Vous avez déjà un compte ? <Link href="/sign-in">Se connecter</Link>
            </Typography>
          </Box>
        </Card>
      </AuthContainer>
    </AppTheme>
  );
}
