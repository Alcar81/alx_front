// 📁 src/components/pages/user/UserProfile/UserProfile.tsx

import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { useParams, Navigate } from "react-router-dom";
import Header from "../../../partiels/Header/Header";
import Footer from "../../../partiels/Footer/Footer";
import "./UserProfile.css";

const AVAILABLE_ROLES = ["USER", "ADMIN"];

interface UserUpdateData {
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
}

const UserProfile: React.FC = () => {
  const { user: currentUser, token } = useAuth();
  const { userId } = useParams<{ userId: string }>();

  const [userData, setUserData] = useState<UserUpdateData>({
    firstName: "",
    lastName: "",
    email: "",
    roles: [],
  });

  const [saveStatus, setSaveStatus] = useState<"success" | "error" | "">("");
  const [passwordChangeStatus, setPasswordChangeStatus] = useState<"success" | "error" | "">("");
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🛡️ Sécurité : rediriger si pas connecté
  if (!currentUser || !token) return <Navigate to="/Accueil" replace />;

  const isAdmin = currentUser.roles.includes("ADMIN");
  const isSelfProfile = currentUser.id === userId;
  if (!isAdmin && !isSelfProfile) return <Navigate to="/Unauthorized" replace />;

  // ✅ Hooks déplacés dans le composant
  const { getUserById, updateUser } = require("../../../../api/adminApi").useAdminApi();
  const { changePassword } = require("../../../../api/authApi").useAuthApi();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!userId || !token) return;
        const response = await getUserById(userId, token);
        if (response?.success) {
          setUserData(response.user);
        } else {
          setError("❌ Impossible de charger le profil.");
        }
      } catch (error) {
        console.error(error);
        setError("❌ Erreur serveur.");
      }
      setLoading(false);
    };

    fetchProfile();
  }, [userId, token, getUserById]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleToggle = (e: React.ChangeEvent<HTMLInputElement>, role: string) => {
    if (!isAdmin) return;
    setUserData((prev) => ({
      ...prev,
      roles: e.target.checked
        ? [...prev.roles, role]
        : prev.roles.filter((r) => r !== role),
    }));
  };

  const handleSave = async () => {
    if (!token || !userId) return;
    try {
      const response = await updateUser(userId, userData, token);
      setSaveStatus(response.success ? "success" : "error");
    } catch (error) {
      console.error(error);
      setSaveStatus("error");
    }
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = async () => {
    if (!token || !userId) return;

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("❌ Les mots de passe ne correspondent pas !");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert("❌ Le mot de passe doit contenir au moins 8 caractères !");
      return;
    }

    try {
      const response = await changePassword(
        userId,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        token
      );

      if (response.success) {
        setPasswordChangeStatus("success");
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setPasswordChangeStatus("error");
      }
    } catch (err) {
      console.error(err);
      setPasswordChangeStatus("error");
    }
  };

  if (loading) return <p>⏳ Chargement du profil...</p>;
  if (error) return <p className="alert-error">{error}</p>;

  return (
    <>
      <Header />
      <main className="main page-with-header">
        <div className="user-profile-page">
          <header className="user-profile-header">
            <h1>👤 Profil Utilisateur</h1>
            <p>Bienvenue {userData.firstName} {userData.lastName}</p>
          </header>

          {saveStatus === "success" && <div className="alert-success">✅ Profil mis à jour avec succès</div>}
          {saveStatus === "error" && <div className="alert-error">❌ Erreur lors de la mise à jour</div>}

          <section className="user-profile-info">
            <h2>📝 Informations personnelles</h2>
            <input name="firstName" placeholder="Prénom" value={userData.firstName} onChange={handleInputChange} />
            <input name="lastName" placeholder="Nom" value={userData.lastName} onChange={handleInputChange} />
            <input name="email" placeholder="Email" value={userData.email} onChange={handleInputChange} />
            <div className="save-button-wrapper">
              <button className="save-button" onClick={handleSave}>💾 Sauvegarder</button>
            </div>
          </section>

          <section className="user-profile-security">
            <h2>🔒 Changer le mot de passe</h2>
            {passwordChangeStatus === "success" && <div className="alert-success">✅ Mot de passe changé</div>}
            {passwordChangeStatus === "error" && <div className="alert-error">❌ Échec du changement</div>}
            <input name="currentPassword" type="password" placeholder="Mot de passe actuel" value={passwordData.currentPassword} onChange={handlePasswordInputChange} />
            <input name="newPassword" type="password" placeholder="Nouveau mot de passe" value={passwordData.newPassword} onChange={handlePasswordInputChange} />
            <input name="confirmPassword" type="password" placeholder="Confirmer" value={passwordData.confirmPassword} onChange={handlePasswordInputChange} />
            <div className="save-button-wrapper">
              <button className="save-button" onClick={handlePasswordChange}>🔒 Mettre à jour le mot de passe</button>
            </div>
          </section>

          {isAdmin && (
            <section className="user-profile-roles">
              <h2>🛡️ Permissions</h2>
              <div className="checkbox-group">
                {AVAILABLE_ROLES.map((role) => (
                  <label key={role} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={userData.roles.includes(role)}
                      onChange={(e) => handleRoleToggle(e, role)}
                    />
                    {role}
                  </label>
                ))}
              </div>
            </section>
          )}

          <section className="footer">
            <Footer />
          </section>
        </div>
      </main>
    </>
  );
};

export default UserProfile;
