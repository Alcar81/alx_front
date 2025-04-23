// 📌 src/components/pages/admin/AdminDashboard/AdminDashboard.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import {
  getAllUsers,
  deleteUserById,
  updateUserById,
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
  const [sortKey, setSortKey] = useState<keyof User>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");

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
      `🗑️ Supprimer ${target?.firstName} ${target?.lastName} ?`
    );
    if (!confirmDelete) return;

    const res = await deleteUserById(id, token);
    if (res?.success) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setFilteredUsers((prev) => prev.filter((u) => u.id !== id));
    } else {
      alert("❌ Échec de la suppression.");
    }
  };

  const handleUpdate = async (u: User) => {
    if (!token) return;

    const newFirstName = prompt("Prénom :", u.firstName);
    const newLastName = prompt("Nom :", u.lastName);
    const newEmail = prompt("Email :", u.email);
    const newRole = prompt("Rôle :", u.role);

    if (!newFirstName || !newLastName || !newEmail || !newRole) return;

    const updated = await updateUserById(u.id, {
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail.toLowerCase(),
      role: newRole.toUpperCase(),
    }, token);

    if (updated?.success) {
      setUsers((prev) =>
        prev.map((usr) => (usr.id === u.id ? { ...usr, ...updated.user } : usr))
      );
      setFilteredUsers((prev) =>
        prev.map((usr) => (usr.id === u.id ? { ...usr, ...updated.user } : usr))
      );
    } else {
      alert("❌ Échec de la mise à jour.");
    }
  };

  const handleSort = (key: keyof User) => {
    const newOrder = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(newOrder);
    const sorted = [...filteredUsers].sort((a, b) => {
      const valA = a[key].toString().toLowerCase();
      const valB = b[key].toString().toLowerCase();
      return newOrder === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
    setFilteredUsers(sorted);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter((u) =>
      [u.firstName, u.lastName, u.email, u.role].some((f) =>
        f.toLowerCase().includes(term)
      )
    );
    setFilteredUsers(filtered);
  };

  if (!user) return <div>🔐 Accès réservé aux utilisateurs connectés.</div>;

  return (
    <div className="admin-dashboard">
      <h1>🛠️ Tableau de bord Admin</h1>
      <p>👋 Bonjour {user.firstName} {user.lastName}</p>

      <input
        type="text"
        placeholder="🔍 Rechercher un utilisateur..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
      />

      {loading ? (
        <p>⏳ Chargement...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : filteredUsers.length === 0 ? (
        <p>Aucun utilisateur trouvé.</p>
      ) : (
        <table className="admin-dashboard">
          <thead>
            <tr>
              {["firstName", "lastName", "email", "role", "createdAt"].map((k) => (
                <th key={k} onClick={() => handleSort(k as keyof User)} style={{ cursor: "pointer" }}>
                  {k} {sortKey === k && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.firstName}</td>
                <td>{u.lastName}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{new Date(u.createdAt).toLocaleDateString("fr-CA")}</td>
                <td>
                  <button onClick={() => handleUpdate(u)}>✏️ Modifier</button>
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
