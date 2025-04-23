// 📌 src/components/pages/admin/AdminDashboard/AdminDashboard.tsx
// 📁 src/components/pages/admin/AdminDashboard/AdminDashboard.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { getAllUsers, deleteUserById } from "../../../../utils/requests";
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
  const [sortBy, setSortBy] = useState<keyof User>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");

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

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = users.filter((u) =>
      `${u.firstName} ${u.lastName} ${u.email} ${u.role}`.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleSort = (field: keyof User) => {
    const direction = sortBy === field && sortDirection === "asc" ? "desc" : "asc";
    setSortBy(field);
    setSortDirection(direction);

    const sorted = [...filteredUsers].sort((a, b) => {
      const aField = a[field]?.toString().toLowerCase();
      const bField = b[field]?.toString().toLowerCase();

      if (aField < bField) return direction === "asc" ? -1 : 1;
      if (aField > bField) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredUsers(sorted);
  };

  const handleDelete = async (id: string) => {
    if (!token) return;

    const target = users.find((u) => u.id === id);
    const confirmDelete = window.confirm(
      `🗑️ Supprimer ${target?.firstName} ${target?.lastName} ?`
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

  const handleEdit = (u: User) => {
    const updatedFirstName = prompt("Prénom :", u.firstName);
    const updatedLastName = prompt("Nom :", u.lastName);
    const updatedEmail = prompt("Email :", u.email);
    const updatedRole = prompt("Rôle :", u.role);

    if (!updatedFirstName || !updatedLastName || !updatedEmail || !updatedRole) return;

    // Ici tu pourrais faire une requête API PUT pour mettre à jour côté backend

    const updatedUser: User = {
      ...u,
      firstName: updatedFirstName,
      lastName: updatedLastName,
      email: updatedEmail,
      role: updatedRole,
    };

    const newUsers = users.map((user) => (user.id === u.id ? updatedUser : user));
    setUsers(newUsers);
    setFilteredUsers(newUsers);
  };

  if (!user) {
    return <div>🔐 Accès réservé aux utilisateurs connectés.</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>🛠️ Tableau de bord Admin</h1>
      <p>👋 Bonjour {user.firstName} {user.lastName}</p>

      <input
        type="text"
        placeholder="🔍 Rechercher..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginTop: "1rem", padding: "0.5rem", width: "100%" }}
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
                <td>{u.firstName}</td>
                <td>{u.lastName}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{new Date(u.createdAt).toLocaleDateString("fr-CA")}</td>
                <td>
                  <button onClick={() => handleEdit(u)}>✏️ Modifier</button>
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
