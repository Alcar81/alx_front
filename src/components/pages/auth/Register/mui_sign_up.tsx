// Code: frontend/src/components/pages/auth/Register/mui_sign_up.tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AppTheme from '../../../theme/AppTheme';
import ColorModeSelect from '../../../theme/ColorModeSelect';
import { GoogleIcon } from '../../../theme/CustomIcons';
import { Card, AuthContainer } from '../styles/authStyles';
import { Alx_logo_long } from '../../../../images/Alx_logo_long';

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const [nom, setNom] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [motDePasse, setMotDePasse] = React.useState('');
  const [nomErreur, setNomErreur] = React.useState('');
  const [emailErreur, setEmailErreur] = React.useState('');
  const [motDePasseErreur, setMotDePasseErreur] = React.useState('');

  const validerChamps = () => {
    let estValide = true;

    if (!nom.trim()) {
      setNomErreur('Le nom est requis.');
      estValide = false;
    } else {
      setNomErreur('');
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setEmailErreur('Veuillez entrer une adresse e-mail valide.');
      estValide = false;
    } else {
      setEmailErreur('');
    }

    if (!motDePasse.trim() || motDePasse.length < 6) {
      setMotDePasseErreur('Le mot de passe doit contenir au moins 6 caractères.');
      estValide = false;
    } else {
      setMotDePasseErreur('');
    }

    return estValide;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validerChamps()) return;

    console.log({
      nom,
      email,
      motDePasse,
    });
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <AuthContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Alx_logo_long />
          <Typography component="h1" variant="h4">
            Inscription
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="nom">Nom complet</FormLabel>
              <TextField
                required
                fullWidth
                id="nom"
                placeholder="Jean Dupont"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                error={!!nomErreur}
                helperText={nomErreur}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">E-mail</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailErreur}
                helperText={emailErreur}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="motDePasse">Mot de passe</FormLabel>
              <TextField
                required
                fullWidth
                id="motDePasse"
                placeholder="••••••"
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                error={!!motDePasseErreur}
                helperText={motDePasseErreur}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="recevoirMisesAJour" color="primary" />}
              label="Je souhaite recevoir des mises à jour par e-mail."
            />
            <Button type="submit" fullWidth variant="contained">
              S'inscrire
            </Button>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
              S'inscrire avec Google
            </Button>            
            <Typography sx={{ textAlign: 'center' }}>
              Vous avez déjà un compte ?{' '}
              <Link href="/sign-in">
                Se connecter
              </Link>
            </Typography>
          </Box>
        </Card>
      </AuthContainer>
    </AppTheme>
  );
}
