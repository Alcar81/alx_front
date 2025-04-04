// 📌 src/hooks/useAuth.ts
import { useUserContext } from "../contexts/UserContext";

export const useAuth = () => {
  const { user, login, logout } = useUserContext();

  const isLoggedIn = !!user;

  return {
    user,
    login,
    logout,
    isLoggedIn,
  };
};
