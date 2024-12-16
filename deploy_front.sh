#!/bin/bash
# deploy_frontend

# Définir le répertoire des logs et le fichier log
LOG_DIR="./logs"
LOG_FILE="$LOG_DIR/deployment_front.log"

# Créer le répertoire des logs s'il n'existe pas encore
if [ ! -d "$LOG_DIR" ]; then
  echo "Création du répertoire $LOG_DIR..."
  mkdir -p "$LOG_DIR"
fi

# Donner les permissions au répertoire et au fichier log
chmod 755 "$LOG_DIR"
touch "$LOG_FILE"
chmod 644 "$LOG_FILE"

# Rediriger les sorties vers le fichier log
exec >> "$LOG_FILE" 2>&1

echo "=== Déploiement Niveau 2 commencé : $(date) ==="

# Vérifier si les branches existent
if ! git show-ref --quiet refs/heads/master; then
  echo "Erreur : La branche 'master' n'existe pas."
  exit 1
fi

if ! git show-ref --quiet refs/heads/dev; then
  echo "Erreur : La branche 'dev' n'existe pas."
  exit 1
fi

# Vérifier les modifications non validées
if [ "$(git status --porcelain)" ]; then
  echo "Erreur : Il y a des modifications non validées."
  exit 1
fi

# Passer à master, faire un pull et une réinitialisation de dev
git checkout master || exit 1
git pull origin master || exit 1
git reset --hard origin/dev || exit 1
git push origin master --force || exit 1

# Revenir sur dev pour continuer les travaux de développement
git checkout dev || exit 1

echo "=== Déploiement Niveau 2 terminé : $(date) ==="
echo "Les logs de ce déploiement sont disponibles dans $LOG_FILE"
