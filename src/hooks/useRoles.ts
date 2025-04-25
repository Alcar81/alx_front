import { useUserContext } from "../contexts/UserContext";

// 🧠 Hook pour vérifier les rôles d'un utilisateur
const useRoles = () => {
  const { user } = useUserContext();
  const roles = user?.roles?.map((r) => r.toLowerCase()) || [];

  return {
    // ✅ Vérifie si l'utilisateur a un rôle exact
    hasRole: (role: string) => roles.includes(role.toLowerCase()),

    // ✅ Vérifie si l'utilisateur a un des rôles fournis
    hasAnyRole: (...targetRoles: string[]) =>
      targetRoles.some((role) => roles.includes(role.toLowerCase())),

    // ✅ Vérifications explicites pratiques
    isAdmin: roles.includes("admin"),
    isEditor: roles.includes("editor"),
    isUser: roles.includes("user"),

    // ✅ Liste brute utilisable pour debug ou affichage
    allRoles: roles,
  };
};

export default useRoles;