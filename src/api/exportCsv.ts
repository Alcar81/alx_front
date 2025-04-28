// 📁 src/api/exportCsv.ts
/**
 * Exportation de la liste d'utilisateurs vers un fichier CSV.
 */
export function exportUsersToCSV(users: any[]) {
  const csvHeader = ["Prénom", "Nom", "Email", "Rôles", "Créé le"];
  const csvRows = users.map((u) => [
    u.firstName,
    u.lastName,
    u.email,
    (u.roles || []).join(", "),
    new Date(u.createdAt).toLocaleDateString("fr-CA"),
  ]);

  const csvContent = [csvHeader, ...csvRows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "utilisateurs.csv";
  link.click();
}
