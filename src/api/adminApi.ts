// 📁 src/api/adminApi.ts

import { useSafeFetch } from "./safeFetch";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  createdAt: string;
}

export function useAdminApi() {
  const { safeFetch, buildUrl } = useSafeFetch();

  const getAllUsers = async (token: string, filters = {}) => {
    const params = new URLSearchParams(filters as any).toString();
    return safeFetch(buildUrl(`/admin/users?${params}`), {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const getUserById = async (id: string, token: string) =>
    safeFetch(buildUrl(`/admin/users/${id}`), {
      headers: { Authorization: `Bearer ${token}` },
    });

  const updateUser = async (id: string, updates: Partial<User>, token: string) =>
    safeFetch(buildUrl(`/admin/users/${id}`), {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updates, roles: updates.roles || [] }),
    });

  const deleteUserById = async (id: string, token: string) =>
    safeFetch(buildUrl(`/admin/users/${id}`), {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

  return {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUserById,
  };
}
