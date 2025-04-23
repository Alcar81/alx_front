// 📌 src/components/pages/admin/AdminDashboard/AdminDashboard.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import {
  getAllUsers,
  deleteUserById,
  updateUser,
} from "../../../../utils/requests";
import "./AdminDashboard.css";

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
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<keyof User>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;
      setLoading(true);
      setError("");

      const response = await getAllUsers(token);
      if (response?.success) {
        setUsers(response.users);
        setFilteredUsers(response.users);
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

    const res = await deleteUserById(id, token);
    if (res?.success) {
      const updated = users.filter((u) => u.id !== id);
      setUsers(updated);
      setFilteredUsers(updated);
    } else {
      alert("❌ Échec de la suppression.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, id: string, key: keyof User) => {
    setFilteredUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, [key]: e.target.value } : user
      )
    );
  };

  const handleUpdate = async (u: User) => {
    if (!token) return;
    const confirmed = window.confirm(`📝 Appliquer les modifications à ${u.firstName} ${u.lastName} ?`);
    if (!confirmed) return;

    const response = await updateUser(u.id, u, token);
    if (response?.success) {
      alert("✅ Mise à jour réussie !");
    } else {
      alert("❌ Échec de la mise à jour.");
    }
  };

  const handleSort = (key: keyof User) => {
    const newOrder = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(newOrder);

    const sorted = [...filteredUsers].sort((a, b) => {
      const aVal = a[key]?.toString().toLowerCase();
      const bVal = b[key]?.toString().toLowerCase();
      return newOrder === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });

    setFilteredUsers(sorted);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredUsers(
      users.filter(
        (u) =>
          u.firstName.toLowerCase().includes(term) ||
          u.lastName.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term) ||
          u.role.toLowerCase().includes(term)
      )
    );
  };

  if (!user || user.role.toUpperCase() !== "ADMIN") {
    return <div>🔒 Accès réservé aux administrateurs.</div>;
  }

  return (
    <div>
      <h1>🛠️ Tableau de bord Admin</h1>
      <p>👋 Bonjour {user.firstName} {user.lastName}</p>

      <input
        type="text"
        placeholder="🔍 Rechercher un utilisateur..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ margin: "1rem 0", padding: "0.5rem", width: "100%" }}
      />

      {loading ? (
        <p>⏳ Chargement des utilisateurs...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : filteredUsers.length === 0 ? (
        <p>Aucun utilisateur trouvé.</p>
      ) : (
        <table className="admin-dashboard">
          <thead>
            <tr>
              <th onClick={() => handleSort("firstName")}>Prénom</th>
              <th onClick={() => handleSort("lastName")}>Nom</th>
              <th onClick={() => handleSort("email")}>Email</th>
              <th onClick={() => handleSort("role")}>Rôle</th>
              <th onClick={() => handleSort("createdAt")}>Créé le</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>
                  <input
                    type="text"
                    value={u.firstName}
                    onChange={(e) => handleChange(e, u.id, "firstName")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={u.lastName}
                    onChange={(e) => handleChange(e, u.id, "lastName")}
                  />
                </td>
                <td>
                  <input
                    type="email"
                    value={u.email}
                    onChange={(e) => handleChange(e, u.id, "email")}
                  />
                </td>
                <td>
                  <select
                    value={u.role}
                    onChange={(e) => handleChange(e, u.id, "role")}
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
                <td>{new Date(u.createdAt).toLocaleDateString("fr-CA")}</td>
                <td>
                  <button onClick={() => handleUpdate(u)}>💾 Modifier</button>
                  <button onClick={() => handleDelete(u.id)}>🗑️ Supprimer</button>
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
