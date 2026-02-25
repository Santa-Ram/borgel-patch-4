# Borgel & Associés — Application Mobile React Native

## Stack
- React Native + Expo
- React Navigation (Bottom Tabs)
- Axios
- Lucide React Native

## Installation

```bash
cd frontend-mobile
npm install
npx expo install
```

## Démarrage

```bash
npm start
# ou
npx expo start
```

Scanner le QR code avec Expo Go (iOS/Android).

## Screens

| Onglet | Écran |
|--------|-------|
| Accueil | Hero + expertises + contact rapide |
| Équipe | Liste membres avec recherche |
| Actualités | Liste des articles |
| Contact | Formulaire + coordonnées + appel direct |
| Galerie | Photos avec lightbox |

## Configuration API

Modifier l'URL de l'API dans chaque screen :
```js
const API_URL = 'http://YOUR_LOCAL_IP:8000/api';
// Remplacer localhost par l'IP de votre machine sur le réseau local
```
