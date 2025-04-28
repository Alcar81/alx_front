// 📁 src/utils/requests.ts

const API_URL = process.env.REACT_APP_API_URL || "/api";

export async function post(endpoint: string, body: any) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      if (contentType?.includes("application/json")) {
        const data = await response.json();
        throw new Error(data.message || "Erreur lors de la requête.");
      } else {
        throw new Error("Le serveur a retourné une réponse inattendue.");
      }
    }

    if (contentType?.includes("application/json")) {
      return await response.json();
    } else {
      throw new Error("Le serveur a retourné un format invalide.");
    }
  } catch (error: any) {
    console.error("❌ Requête échouée :", error);
    throw new Error(error.message || "Erreur réseau ou serveur.");
  }
}

// ✅ GET tous les utilisateurs
export const getAllUsers = async (token: string, filters = {}) => {
  try {
    const params = new URLSearchParams(filters as any).toString();
    const res = await fetch(`${API_URL}/users?${params}`, {  // <-- Corrigé ici
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Test-Request": "true",
      },
    });
    if (!res.ok) throw new Error("Échec récupération utilisateurs");
    const data = await res.json();
    return { success: true, users: data };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

// ✅ PATCH utilisateur (avec rôles en tableau)
export const updateUser = async (id: string, updates: any, token: string) => {
  try {
    const payload = {
      ...updates,
      roles: updates.roles || [],
    };

    const res = await fetch(`${API_URL}/users/${id}`, {  // <-- Corrigé ici
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Échec de la mise à jour de l'utilisateur");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

// ✅ PATCH - changer son mot de passe
export const changePassword = async (
  id: string,
  passwordData: { currentPassword: string; newPassword: string },
  token: string
) => {
  try {
    const res = await fetch(`${API_URL}/users/${id}/password`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordData),
    });

    if (!res.ok) throw new Error("Échec du changement de mot de passe");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

// ✅ DELETE utilisateur
export const deleteUserById = async (id: string, token: string) => {
  try {
    const res = await fetch(`${API_URL}/users/${id}`, {  // <-- Corrigé ici
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Échec suppression utilisateur");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

// ✅ Export CSV local
export const exportUsersToCSV = (users: any[]) => {
  const csvHeader = ["Prénom", "Nom", "Email", "Rôles", "Créé le"];
  const csvRows = users.map(u => [
    u.firstName,
    u.lastName,
    u.email,
    (u.roles || []).join(", "),  // 🔥 sécuritaire
    new Date(u.createdAt).toLocaleDateString("fr-CA"),
  ]);
  const csvContent = [csvHeader, ...csvRows]
    .map(e => e.map(v => `"${v}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "utilisateurs.csv");
  link.click();
};
