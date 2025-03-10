// src/components/theme/ColorModeSelect.tsx

import React, { useContext } from "react";
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { ThemeContext } from "./AppTheme";
import { SxProps } from "@mui/system";

interface ColorModeSelectProps {
  sx?: SxProps;
}

const ColorModeSelect: React.FC<ColorModeSelectProps> = ({ sx }) => {
  const { mode, toggleColorMode } = useContext(ThemeContext);

  return (
    <IconButton
      onClick={toggleColorMode}
      color="inherit"
      sx={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        backgroundColor: mode === "dark" ? "#fff" : "#000", // Fond contrasté
        color: mode === "dark" ? "#000" : "#fff", // Icône contrastée
        borderRadius: "50%",
        boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
        "&:hover": {
          backgroundColor: mode === "dark" ? "#ddd" : "#333",
        },
        ...sx,
      }}
    >
      {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ColorModeSelect;
