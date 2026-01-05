
# OnlyStache Simulé - Interface Créateur

**Projet pour court-métrage**

Simulation d'interface OnlyStache avec vue créateur, statistiques, upload et messagerie.

## 🎯 Caractéristiques

- ✅ Interface inspirée d'OnlyStache (couleurs, design)
- ✅ Page d'accueil avec feed de posts
- ✅ Dashboard créateur avec statistiques et heatmap
- ✅ Page d'upload de vidéo/photo
- ✅ Messagerie avec conversations simulées
- ✅ **Zéro dépendance** - HTML/CSS/JS vanilla
- ✅ **Facile à modifier** - Données dans fichiers JSON
- ✅ **Serveur simple** - Python intégré

## 🚀 Démarrage en 30 secondes

```bash
# 1. Lancer le serveur (localhost uniquement par défaut)
python start-server.py

# 2. Ouvrir dans le navigateur
http://localhost:8000
```

C'est tout !

### Modes disponibles

**🔒 Mode Localhost (par défaut)** - Sécurisé, accessible uniquement sur cet ordinateur
```bash
python start-server.py
```

**🌐 Mode Réseau** - Accessible depuis autres appareils (téléphone, tablette)
```bash
python start-server.py --network
```

## 📁 Structure

```
OF/
├── index.html          # Accueil (feed)
├── dashboard.html      # Statistiques créateur
├── upload.html         # Upload de contenu
├── messages.html       # Messagerie
├── start-server.py     # Serveur Python
├── css/                # Styles OnlyStache
├── js/                 # Logique simple
├── data/               # ⭐ Données modifiables (JSON)
└── media/              # ⭐ Images/vidéos à ajouter
```

## 🎨 Personnalisation

### Modifier les statistiques
Éditez `data/stats.json` :
```json
{
  "username": "VotreNom",
  "stats": {
    "totalViews": 15420,
    "monthlyEarnings": 3250.50,
    "subscribers": 847
  }
}
```

### Modifier les messages
Éditez `data/conversations.json`

### Ajouter des images
Placez vos fichiers dans `media/avatars/`, `media/images/`, `media/videos/`

**📖 Voir le [GUIDE-UTILISATEUR.md](GUIDE-UTILISATEUR.md) pour plus de détails**

## 🛠️ Technologies

- **Frontend** : HTML, CSS, JavaScript (vanilla)
- **Backend** : Python HTTP server (intégré)
- **Données** : JSON
- **Design** : Inspiré d'OnlyStache (couleur #00AFF0)

## 🎬 Utilisation pour le tournage

1. Personnalisez les données dans `data/`
2. Ajoutez vos images dans `media/`
3. Lancez le serveur
4. Filmez l'écran du navigateur

**Mode plein écran** : Appuyez sur F11

## 📱 Accès réseau

**Par défaut, le serveur est en mode localhost uniquement** pour la sécurité.

Pour activer l'accès réseau (filmer depuis téléphone/tablette) :
```bash
python start-server.py --network
```

Le serveur affichera alors :
- Depuis l'ordinateur : `http://localhost:8000`
- Depuis un autre appareil : `http://[IP-LOCAL]:8000`

Parfait pour filmer depuis un téléphone !

## 💾 Sauvegarde

Tous les fichiers importants sont dans :
- `data/*.json` - Statistiques, messages, posts
- `media/` - Vos images/vidéos

Sauvegardez ces dossiers entre les sessions.

## 🔧 Configuration requise

- **Python 3.x** (déjà installé sur Mac/Linux)
- Navigateur web moderne (Chrome, Firefox, Edge)
- Aucune autre dépendance !

## ⚠️ Note

Ce projet est une **simulation visuelle** pour court-métrage.
Il n'est **pas fonctionnel** au sens d'une vraie plateforme.

---

**Créé avec simplicité pour faciliter la modification**
