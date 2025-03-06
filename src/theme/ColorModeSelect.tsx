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
    <IconButton onClick={toggleColorMode} color="inherit" sx={sx}>
      {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ColorModeSelect;
