# Roundcube Webmail Clone

Un clone de l'interface Roundcube Webmail avec un thème sombre et un panel d'administration.

## 🚀 Fonctionnalités

- **Page de connexion** : Interface de connexion identique à Roundcube
- **Interface Webmail** : 
  - Boîte de réception
  - Brouillons
  - Envoyés
  - Pourriels
  - Corbeille
  - Contacts
  - Paramètres
- **Panel d'administration** :
  - Gestion des utilisateurs (ajouter, modifier, supprimer)
  - Gestion des emails
  - Paramètres système

## 📁 Structure du Projet

```
webmail-roundcube/
├── index.html          # Page de connexion
├── dashboard.html      # Interface principale du webmail
├── admin.html         # Panel d'administration
├── css/
│   └── style.css      # Styles CSS (thème sombre)
├── js/
│   ├── app.js         # Logique principale et authentification
│   ├── dashboard.js   # Fonctionnalités du dashboard
│   └── admin.js       # Fonctionnalités d'administration
└── README.md          # Ce fichier
```

## 🔐 Identifiants par défaut

**Administrateur :**
- Nom d'utilisateur : `admin`
- Mot de passe : `admin123`

## 💾 Stockage des données

Les données sont stockées localement dans le navigateur (localStorage) :
- Utilisateurs
- Emails
- Session utilisateur

## 🎨 Design

Le site utilise un thème sombre avec :
- Couleurs principales : Gris foncé (#1a1a1a, #2d2d2d)
- Accent bleu : #4a90e2
- Logo isométrique avec sphère grise sur base bleue

## 📝 Utilisation

1. Ouvrez `index.html` dans votre navigateur
2. Connectez-vous avec les identifiants admin
3. Accédez au panel d'administration pour gérer les utilisateurs
4. Créez de nouveaux utilisateurs et connectez-vous avec leurs identifiants

## 🔧 Personnalisation

Vous pouvez modifier les couleurs dans `css/style.css` en changeant les variables CSS :
- `--bg-dark` : Fond principal
- `--bg-sidebar` : Fond de la sidebar
- `--blue-primary` : Couleur bleue principale
- etc.

## ⚠️ Note

Ce site est une démonstration frontend. Pour une utilisation en production, vous devriez :
- Implémenter un backend sécurisé
- Utiliser une base de données réelle
- Ajouter une authentification sécurisée (hashage des mots de passe)
- Implémenter un vrai système d'emails

