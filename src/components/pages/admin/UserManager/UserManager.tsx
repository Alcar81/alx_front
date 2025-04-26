// 📁 src/components/pages/admin/UserManager/UserManager.tsx

import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import Header from "../../../partiels/Header/Header";
import Footer from "../../../partiels/Footer/Footer";
import { getAllUsers, deleteUserById, updateUser } from "../../../../utils/requests";
import "./UserManager.css";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[]; // ✅ tableau de rôles
  createdAt: string;
}

const AVAILABLE_ROLES = ["USER", "ADMIN"]; // ✅ Centralisé pour ajouter facilement plus tard

const UserManager: React.FC = () => {
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
    if (!target) return;

    const confirmDelete = window.confirm(`🗑️ Supprimer ${target.firstName} ${target.lastName} ?`);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: string, key: keyof User) => {
    const value = e.target.value;
    setFilteredUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, [key]: value } : user))
    );
  };

  const handleRoleToggle = (e: React.ChangeEvent<HTMLInputElement>, id: string, role: string) => {
    setFilteredUsers((prev) =>
      prev.map((user) => {
        if (user.id !== id) return user;
        const hasRole = user.roles.includes(role);
        const newRoles = hasRole
          ? user.roles.filter((r) => r !== role)
          : [...user.roles, role];
        return { ...user, roles: newRoles };
      })
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
      const aVal = a[key]?.toString().toLowerCase() || "";
      const bVal = b[key]?.toString().toLowerCase() || "";
      return newOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });

    setFilteredUsers(sorted);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredUsers(
      users.filter((u) =>
        u.firstName.toLowerCase().includes(term) ||
        u.lastName.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.roles.some((r) => r.toLowerCase().includes(term))
      )
    );
  };

  return (
    <>
      <Header />

      <main className="main page-with-header">
        <div className="user-manager-page">
          <header className="user-manager-header">
            <h1>👥 Gestionnaire d’utilisateurs</h1>
            <p>Bonjour {user?.firstName} {user?.lastName}</p>
          </header>  

          <section id="search" className="user-manager-search">
            <input
              type="text"
              placeholder="🔍 Rechercher..."
              value={searchTerm}
              onChange={handleSearch}
              className="user-manager-search"
            />
          </section>

          <section id="table" className="user-manager-table">
            {loading ? (
              <p>⏳ Chargement...</p>
            ) : error ? (
              <p className="error-text">{error}</p>
            ) : (
              <table className="user-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort("firstName")}>Prénom</th>
                    <th onClick={() => handleSort("lastName")}>Nom</th>
                    <th onClick={() => handleSort("email")}>Email</th>
                    <th>Rôles</th>
                    <th onClick={() => handleSort("createdAt")}>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id}>
                      <td><input value={u.firstName} onChange={(e) => handleInputChange(e, u.id, "firstName")} /></td>
                      <td><input value={u.lastName} onChange={(e) => handleInputChange(e, u.id, "lastName")} /></td>
                      <td><input value={u.email} onChange={(e) => handleInputChange(e, u.id, "email")} /></td>
                      <td>
                        <div className="checkbox-group">
                          {AVAILABLE_ROLES.map((roleOption) => (
                            <label key={roleOption} className="checkbox-label">
                              <input
                                type="checkbox"
                                checked={u.roles.includes(roleOption)}
                                onChange={(e) => handleRoleToggle(e, u.id, roleOption)}
                              />
                              {roleOption}
                            </label>
                          ))}
                        </div>
                      </td>
                      <td>{new Date(u.createdAt).toLocaleDateString("fr-CA")}</td>
                      <td>
                        <button onClick={() => handleUpdate(u)}>💾</button>
                        <button onClick={() => handleDelete(u.id)}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
             )}
          </section>
        </div>
      </main>
      <section id="footer" className="home-footer">
        <Footer />
      </section>
    </>
  );
};

export default UserManager;