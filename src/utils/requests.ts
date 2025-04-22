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

export const getAllUsers = async (token: string) => {
  try {
    const res = await fetch("/api/admin/users", {
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

export const deleteUserById = async (id: string, token: string) => {
  try {
    const res = await fetch(`/api/admin/users/${id}`, {
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


