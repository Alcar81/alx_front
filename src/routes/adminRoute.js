//src/routes/adminRoute.js
// Middleware pour sécuriser uniquement les accès admin
router.use((req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Accès réservé aux administrateurs." });
  }
  next();
});

// 📄 GET /api/admin/users
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
    res.status(500).json({ message: "Erreur récupération des utilisateurs." });
  }
});

// 🗑️ DELETE /api/admin/users/:id
router.delete("/users/:id", async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ message: "Utilisateur supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression." });
  }
});