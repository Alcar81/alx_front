// src/components/theme/AppTheme.tsx
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React, { createContext, useState, useMemo, ReactNode } from "react";

// 🎨 Contexte pour la gestion du mode clair/sombre
interface ThemeContextProps {
  mode: "light" | "dark";
  toggleColorMode: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  mode: "light",
  toggleColorMode: () => {},
});

interface AppThemeProps {
  children: ReactNode;
}

const AppTheme: React.FC<AppThemeProps> = ({ children }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  // 🎨 Création dynamique du thème
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#1976d2" },
          secondary: { main: "#dc004e" },
        },
      }),
    [mode]
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default AppTheme;
