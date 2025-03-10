// 📌 src/components/pages/auth/AuthModal.tsx
import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SignIn from "../auth/Login/mui_sign_in";
import SignUp from "../auth/Register/mui_sign_up";

// 🔹 Interface pour typer l'événement de l'auth modal
interface AuthModalEventDetail {
  type: "signIn" | "signUp";
}

const AuthModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");

  useEffect(() => {
    const handleAuthEvent = (event: Event) => {
      const customEvent = event as CustomEvent<AuthModalEventDetail>;
      setMode(customEvent.detail.type);
      setOpen(true);
    };

    window.addEventListener("openAuthModal", handleAuthEvent);
    return () => {
      window.removeEventListener("openAuthModal", handleAuthEvent);
    };
  }, []);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          margin: "auto",
          padding: 2,
          borderRadius: 3,
          width: "100%",
          maxWidth: "450px", // 🛠️ Ajustement de la largeur max
          boxShadow: "var(--box-shadow)", // Réutilisation de la variable CSS
        },
      }}
    >
      {/* 📌 Bouton de fermeture */}
      <IconButton
        onClick={() => setOpen(false)}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "grey.500",
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* 📌 Contenu du modal */}
      <DialogContent
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px", // 🛠️ Assure une taille minimale cohérente
        }}
      >
        {mode === "signIn" ? <SignIn /> : <SignUp />}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
