import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { getAllUsers, deleteUserById } from "../../../../utils/requests";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const { user, token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return; // ✅ Ajout important pour TypeScript
  
      setLoading(true);
      setError("");
  
      const response = await getAllUsers(token); // ✅ Type now guaranteed
  
      if (response?.success) {
        setUsers(response.users);
      } else {
        setError("❌ Impossible de récupérer les utilisateurs.");
      }
  
      setLoading(false);
    };
  
    fetchUsers();
  }, [token]);

  const handleDelete = async (id: string) => {
    if (!token) return;
  
    const target = users.find((u) => u.id === id);
    const confirmDelete = window.confirm(
      `🗑️ Supprimer l'utilisateur ${target?.firstName} ${target?.lastName} ?`
    );
    if (!confirmDelete) return;
  
    const res = await deleteUserById(id, token); // ✅ Type validé ici
    if (res?.success) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } else {
      alert("❌ Échec de la suppression.");
    }
  };

  if (!user) {
    return <div>🔐 Accès réservé aux utilisateurs connectés.</div>;
  }

  return (
    <div>
      <h1>🛠️ Tableau de bord Admin</h1>
      <p>👋 Bonjour {user.firstName} {user.lastName}</p>

      {loading ? (
        <p>⏳ Chargement des utilisateurs...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : users.length === 0 ? (
        <p>Aucun utilisateur à afficher.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Créé le</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.firstName}</td>
                <td>{u.lastName}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{new Date(u.createdAt).toLocaleDateString("fr-CA")}</td>
                <td>
                  <button onClick={() => handleDelete(u.id)} title="Supprimer">
                    🗑️ Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
