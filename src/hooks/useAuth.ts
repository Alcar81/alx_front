// 📁 src/hooks/useAuth.ts
import { useUserContext } from "../contexts/UserContext";

export const useAuth = () => {
  return useUserContext();
};