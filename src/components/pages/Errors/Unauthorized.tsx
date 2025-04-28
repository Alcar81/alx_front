// src/components/pages/Errors/Unauthorized.tsx
import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      px={3}
    >
      <LockIcon sx={{ fontSize: 64, color: "#f44336", mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        Accès refusé
      </Typography>
      <Typography variant="body1" mb={4}>
        Vous n’avez pas l’autorisation d’accéder à cette page.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/Accueil")}>
        Retour à l’accueil
      </Button>
    </Box>
  );
};

export default Unauthorized;
