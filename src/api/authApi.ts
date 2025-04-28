// 📁 src/api/authApi.ts

import { useSafeFetch } from "./safeFetch";
import {
  RegisterPayload,
  LoginPayload,
  LoginResponse,
  UserProfile,
  ChangePasswordPayload
} from "@/types"; // ✅ import des types propres

/**
 * Gestion de l'authentification : login, register, profil.
 */
export function useAuthApi() {
  const { safeFetch, buildUrl } = useSafeFetch();

  const register = async (body: RegisterPayload) =>
    safeFetch(buildUrl("/register"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

  const login = async (body: LoginPayload): Promise<LoginResponse> =>
    safeFetch(buildUrl("/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

  const getProfile = async (token: string): Promise<UserProfile> =>
    safeFetch(buildUrl("/me"), {
      headers: { Authorization: `Bearer ${token}` },
    });

  const changePassword = async (
    id: string,
    passwordData: ChangePasswordPayload,
    token: string
  ) =>
    safeFetch(buildUrl(`/users/${id}/password`), {
      method: "PATCH",
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordData),
    });

  return {
    register,
    login,
    getProfile,
    changePassword,
  };
}
