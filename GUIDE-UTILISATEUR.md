# 📘 GUIDE UTILISATEUR - OnlyStache Simulé

**Version pour court-métrage**
Interface créateur avec statistiques, upload et messagerie

---

## 🚀 DÉMARRAGE RAPIDE

### 1. Lancer le serveur

**Mode localhost uniquement (par défaut - RECOMMANDÉ) :**

Windows :
```cmd
python start-server.py
```

Mac/Linux :
```bash
python3 start-server.py
```

**Mode réseau (pour accès depuis autres appareils) :**

Windows :
```cmd
python start-server.py --network
```

Mac/Linux :
```bash
python3 start-server.py --network
```

### 2. Modes disponibles

**🔒 Mode Localhost (par défaut)** - SÉCURISÉ
- Accessible uniquement depuis cet ordinateur
- Parfait pour développement et tests
- URL : `http://localhost:8000`
- **Recommandé si vous n'avez pas besoin d'accès réseau**

**🌐 Mode Réseau** - RÉSEAU LOCAL
- Accessible depuis autres appareils sur le même réseau
- Pour filmer depuis téléphone/tablette
- URLs :
  - Local : `http://localhost:8000`
  - Réseau : `http://192.168.X.X:8000`
- **Utilisez uniquement si nécessaire pour le tournage**

### 3. Options supplémentaires

```bash
# Changer le port
python start-server.py --port 8080

# Réseau avec port personnalisé
python start-server.py --network --port 8080

# Afficher l'aide
python start-server.py --help
```

### 4. Naviguer

Vous verrez 4 pages principales :
- **Accueil** - Feed avec posts
- **Statistiques** - Dashboard créateur
- **Upload** - Zone d'upload de contenu
- **Messages** - Messagerie simulée

---

## 📝 MODIFIER LE CONTENU

### Changer les statistiques

**Fichier :** `data/stats.json`

```json
{
  "username": "VotreNom",           ← Changez le nom du créateur
  "stats": {
    "totalViews": 15420,            ← Nombre de vues
    "monthlyEarnings": 3250.50,     ← Revenus en €
    "subscribers": 847,             ← Nombre d'abonnés
    "likes": 2341,                  ← Nombre de likes
    "posts": 156                    ← Nombre de posts
  }
}
```

**Modification :**
1. Ouvrez le fichier avec Notepad/TextEdit
2. Modifiez les nombres
3. Sauvegardez
4. Rafraîchissez la page (F5)

---

### Modifier les messages

**Fichier :** `data/conversations.json`

Chaque conversation a cette structure :

```json
{
  "id": 1,
  "name": "Sophie Martin",          ← Nom de la personne
  "lastMessage": "Merci !",         ← Dernier message visible
  "timestamp": "Il y a 5 min",      ← Heure du dernier message
  "messages": [
    {
      "sender": "received",         ← "received" ou "sent"
      "text": "Bonjour !",          ← Contenu du message
      "time": "14:32"               ← Heure d'envoi
    }
  ]
}
```

**Pour ajouter un message :**
1. Ouvrez `data/conversations.json`
2. Copiez un bloc de message existant
3. Modifiez le texte et l'heure
4. Sauvegardez

---

### Modifier les posts du feed

**Fichier :** `data/posts.json`

```json
{
  "id": 1,
  "author": "CreatorName",
  "timestamp": "Il y a 2 heures",
  "content": {
    "text": "Votre texte ici",       ← Description du post
    "media": {
      "type": "image",              ← "image" ou "video"
      "url": "media/images/photo1.jpg"  ← Chemin vers le fichier
    }
  },
  "stats": {
    "likes": 234,                   ← Nombre de likes
    "comments": 45,                 ← Nombre de commentaires
    "tips": 12                      ← Nombre de tips
  }
}
```

---

### Ajouter des images/vidéos

**Voir le fichier :** `media/README.txt`

**Résumé :**
1. Placez vos fichiers dans les dossiers appropriés :
   - `media/avatars/` → Photos de profil
   - `media/images/` → Photos pour posts
   - `media/videos/` → Vidéos pour posts

2. Nommage recommandé :
   - Avatar créateur : `creator.jpg`
   - Avatars utilisateurs : `user1.jpg`, `user2.jpg`, etc.
   - Photos : `photo1.jpg`, `photo2.jpg`, etc.
   - Vidéos : `video1.mp4`, `video2.mp4`, etc.

3. Mettez à jour les chemins dans les fichiers JSON

---

## 🎨 PERSONNALISATION VISUELLE

### Changer les couleurs

**Fichier :** `css/variables.css`

```css
:root {
    --of-blue: #00AFF0;        ← Couleur principale (bleu OnlyStache)
    --of-dark: #27272B;        ← Couleur foncée (texte)
    --of-gray: #8A96A3;        ← Couleur grise (texte secondaire)
}
```

**Exemple - Passer au rouge :**
```css
--of-blue: #FF0000;
```

### Modifier les textes des pages

Les textes sont directement dans les fichiers HTML :
- `index.html` → Page d'accueil
- `dashboard.html` → Page statistiques
- `upload.html` → Page upload
- `messages.html` → Page messages

**Ouvrez avec un éditeur de texte et modifiez directement.**

---

## 🎬 CONSEILS POUR LE TOURNAGE

### Préparer les données

1. **Statistiques réalistes** - Ajustez les chiffres dans `data/stats.json`
2. **Messages authentiques** - Créez des conversations crédibles dans `data/conversations.json`
3. **Contenu visuel** - Ajoutez vos vraies images/vidéos dans `media/`

### Scénarios de démonstration

**Scénario 1 : Consultation des stats**
- Ouvrir `dashboard.html`
- Les statistiques s'affichent automatiquement
- La heatmap montre l'activité des fans

**Scénario 2 : Upload d'une vidéo**
- Ouvrir `upload.html`
- Glisser-déposer un fichier
- Remplir la description
- Cliquer sur "Publier"

**Scénario 3 : Répondre aux messages**
- Ouvrir `messages.html`
- Cliquer sur une conversation
- Taper un message
- Appuyer sur Entrée ou "Envoyer"

---

## ❓ DÉPANNAGE

### Le serveur ne démarre pas

**Erreur : Port déjà utilisé**
- Solution : Modifiez `PORT = 8000` dans `start-server.py` par `PORT = 8080`

**Erreur : Python non trouvé**
- Solution : Installez Python depuis python.org

### Les images ne s'affichent pas

1. Vérifiez que les fichiers existent dans `media/`
2. Vérifiez les noms de fichiers dans les JSON (sensible à la casse)
3. Actualisez la page avec Ctrl+F5

### Les modifications ne s'affichent pas

1. Sauvegardez bien le fichier modifié
2. Rafraîchissez la page avec F5
3. Vérifiez qu'il n'y a pas d'erreur de syntaxe JSON (virgules, guillemets)

### Vérifier les erreurs JSON

Si les données ne se chargent pas :
1. Ouvrez la Console du navigateur (F12)
2. Regardez les erreurs affichées
3. Vérifiez la syntaxe JSON sur jsonlint.com

---

## 📱 ACCÈS DEPUIS UN AUTRE APPAREIL

### Sur le même réseau Wi-Fi/LAN

1. Lancez le serveur sur l'ordinateur principal
2. Notez l'adresse affichée (ex: `http://192.168.1.10:8000`)
3. Sur l'autre appareil, ouvrez cette URL dans le navigateur

**Utilisations possibles :**
- Téléphone pour filmer l'écran
- Tablette pour affichage secondaire
- Autre ordinateur pour double caméra

---

## 🛠️ STRUCTURE DU PROJET

```
OF/
├── index.html              # Page d'accueil (feed)
├── dashboard.html          # Page statistiques créateur
├── upload.html             # Page upload de vidéo
├── messages.html           # Page messagerie
├── start-server.py         # Serveur Python
├── GUIDE-UTILISATEUR.md    # Ce guide
├── css/
│   ├── variables.css       # Couleurs et variables
│   ├── components.css      # Composants réutilisables
│   └── pages.css           # Styles par page
├── js/
│   ├── data-loader.js      # Chargement des données
│   └── messages.js         # Gestion messagerie
├── data/
│   ├── stats.json          # ⭐ Statistiques (modifiable)
│   ├── conversations.json  # ⭐ Messages (modifiable)
│   └── posts.json          # ⭐ Posts feed (modifiable)
└── media/
    ├── avatars/            # ⭐ Photos de profil
    ├── images/             # ⭐ Images pour posts
    └── videos/             # ⭐ Vidéos pour posts
```

**⭐ = Fichiers à personnaliser pour votre court-métrage**

---

## 💡 ASTUCES

### Modification rapide pendant le tournage

1. Gardez les fichiers JSON ouverts dans un éditeur
2. Modifiez les valeurs entre les prises
3. Sauvegardez et rafraîchissez (F5) la page

### Créer plusieurs profils

Dupliquez `data/stats.json` et créez :
- `stats-profil1.json`
- `stats-profil2.json`

Puis modifiez `data-loader.js` pour charger le bon profil.

### Mode plein écran pour le tournage

Appuyez sur **F11** dans le navigateur pour passer en plein écran.

---

## 📞 SUPPORT

Ce projet est conçu pour être **simple et autonome**.

**En cas de problème :**
1. Consultez la section Dépannage ci-dessus
2. Vérifiez la Console du navigateur (F12)
3. Vérifiez que Python est bien installé

**Technologies utilisées :**
- HTML/CSS/JavaScript (vanilla, aucune dépendance)
- Python (serveur HTTP intégré)
- JSON (stockage des données)

---

**Bon tournage ! 🎬**
