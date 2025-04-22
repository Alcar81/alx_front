// 📁 backend/routes/admin.js
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const verifyToken = require("../middleware/auth");

// 🛡️ Middleware pour vérifier le token
router.use(verifyToken);

// 🔐 Restriction aux administrateurs
router.use((req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Accès réservé aux administrateurs." });
  }
  next();
});

// 📄 GET /api/admin/users - Récupère tous les utilisateurs
router.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(users);
  } catch (error) {
    console.error("Erreur récupération des utilisateurs :", error);
    res.status(500).json({ message: "Erreur récupération des utilisateurs." });
  }
});

// 🗑️ DELETE /api/admin/users/:id - Supprime un utilisateur
router.delete("/users/:id", async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ message: "Utilisateur supprimé avec succès." });
  } catch (error) {
    console.error("Erreur suppression utilisateur :", error);
    res.status(500).json({ message: "Erreur lors de la suppression." });
  }
});

module.exports = router;
