// src/components/pages/Errors/Forbidden403.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";

const Forbidden403: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      sx={{ backgroundColor: "#f5f5f5", padding: "2rem" }}
    >
      <LockIcon sx={{ fontSize: 80, color: "#d32f2f" }} />
      <Typography variant="h3" color="error" gutterBottom>
        403 - Accès interdit
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Désolé, vous n'avez pas la permission d'accéder à cette page.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/Accueil")}>
        Retour à l’accueil
      </Button>
    </Box>
  );
};

export default Forbidden403;
