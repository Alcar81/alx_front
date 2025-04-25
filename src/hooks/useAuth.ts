// 📁 src/hooks/useAuth.ts
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import type { AuthContextType } from "../contexts/UserContext";

// ✅ Hook centralisé pour accéder au contexte utilisateur
export const useAuth = (): AuthContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans <UserProvider>");
  }
  return context;
};
