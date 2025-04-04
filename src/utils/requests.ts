// 📁 src/utils/requests.ts

const API_URL = process.env.REACT_APP_API_URL || "/api";

export async function post(endpoint: string, body: any) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erreur lors de la requête.");
    }

    return data;
  } catch (error: any) {
    console.error("❌ Requête échouée :", error);
    throw error;
  }
}
