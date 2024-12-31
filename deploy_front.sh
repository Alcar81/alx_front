#!/bin/bash
# deploy_front.sh
# Script de déploiement du frontend

# Étape 0 : Préparation des logs
echo "=============================================================================="
echo "=== Début du script de déploiement Frontend : $(date) ==="

# Étape 0 : Configuration des logs
LOG_DIR="./logs"
LOG_FILE="$LOG_DIR/deployment_front.log"

echo "[INFO] Configuration des logs..."
echo "Répertoire des logs : $LOG_DIR"
echo "Fichier de log : $LOG_FILE"

# Rotation des logs si nécessaire
MAX_LOG_SIZE=$((1024 * 1024)) # 1 Mo
if [ -f "$LOG_FILE" ] && [ $(stat -c%s "$LOG_FILE") -ge $MAX_LOG_SIZE ]; then
  echo "[INFO] Rotation du fichier de log..."
  mv "$LOG_FILE" "$LOG_FILE.bak" || { echo "[ERROR] Échec de la rotation du fichier de log."; exit 1; }
fi

# Créer le répertoire des logs s'il n'existe pas encore
if [ ! -d "$LOG_DIR" ]; then
  echo "[INFO] Création du répertoire des logs..."
  mkdir -p "$LOG_DIR" || { echo "[ERROR] Échec de la création du répertoire des logs."; exit 1; }
fi

# Donner les permissions au répertoire et au fichier log
chmod 755 "$LOG_DIR" || { echo "[ERROR] Échec de la mise à jour des permissions pour le répertoire des logs."; exit 1; }
touch "$LOG_FILE" || { echo "[ERROR] Échec de la création du fichier de log."; exit 1; }
chmod 644 "$LOG_FILE" || { echo "[ERROR] Échec de la mise à jour des permissions pour le fichier de log."; exit 1; }

# Rediriger les sorties vers le fichier log
exec >> "$LOG_FILE" 2>&1
echo "[SUCCESS] Configuration des logs terminée."

# Fonction pour gérer les erreurs
error_exit() {
  echo "[ERROR] $1"
  echo "[INFO] Tentative de retour à la branche dev en cas d'erreur..."
  git checkout dev || echo "[WARNING] Échec du retour à la branche dev. Vérifiez manuellement."
  exit 1
}

# Étape 1 : Préparation
echo "=============================================================================="
echo "=== Étape 1 : Préparation de la migration : $(date) ==="

# Naviguer vers la racine du dépôt Git
REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
if [ -z "$REPO_ROOT" ]; then
  error_exit "Ce script doit être exécuté dans un dépôt Git valide."
fi
cd "$REPO_ROOT" || error_exit "Impossible de naviguer vers la racine du dépôt Git : $REPO_ROOT."

echo "[INFO] Répertoire racine du dépôt Git : $REPO_ROOT"

# Étape 2 : Vérification des branches et de l'état Git
echo "=============================================================================="
echo "=== Étape 2 : Vérification Git : $(date) ==="

# Vérifier si les branches existent
if ! git show-ref --quiet refs/heads/master; then
  error_exit "La branche 'master' n'existe pas. Vérifiez votre dépôt."
fi
if ! git show-ref --quiet refs/heads/dev; then
  error_exit "La branche 'dev' n'existe pas. Vérifiez votre dépôt."
fi

# Vérifier les modifications non validées
if [ "$(git status --porcelain)" ]; then
  echo "[ERROR] Des modifications locales non validées ont été détectées."
  git status --porcelain | awk '{print $2}'
  error_exit "Veuillez valider ou stash vos modifications avant de continuer."
fi

# Étape 3 : Synchronisation Git
echo "=============================================================================="
echo "=== Étape 3 : Synchronisation Git : $(date) ==="

# Passer à master, réinitialiser et écraser avec dev
echo "[INFO] Passage à la branche master..."
git checkout master || error_exit "Échec du checkout vers master."

echo "[INFO] Réinitialisation de master avec dev..."
git reset --hard origin/dev || error_exit "Échec de la réinitialisation de master avec dev."

echo "[INFO] Poussée forcée vers la branche master..."
git push origin master --force || error_exit "Échec de la poussée forcée vers master."

# Revenir sur dev pour continuer les travaux de développement
git checkout dev || error_exit "Échec du checkout vers dev."

# Étape 4 : Finalisation
echo "=============================================================================="
echo "=== Étape 4 : Finalisation du déploiement : $(date) ==="

# Vérification des ressources après déploiement
echo "[INFO] Utilisation des ressources après déploiement :"
df -h | grep "/$" || echo "[ERROR] Impossible d'obtenir l'état des disques."
free -h || echo "[ERROR] Impossible d'obtenir l'état de la mémoire."
uptime || echo "[ERROR] Impossible d'obtenir les informations système."

echo "[INFO] Le redémarrage du serveur frontend est géré par GitHub Actions après déploiement."
echo "[INFO] Surveillez les journaux GitHub Actions pour confirmer que le serveur est bien relancé."

echo "=== Déploiement Frontend terminé avec succès : $(date) ==="
echo "Les logs de ce déploiement sont disponibles dans $LOG_FILE"
echo "=============================================================================="
