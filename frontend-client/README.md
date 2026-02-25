# Borgel & Associés — Frontend Client React

## Stack
- React 18 + TypeScript
- TailwindCSS 3.x
- Framer Motion (animations)
- React Router v7
- Axios (API calls)

## Installation

```bash
cd frontend-client
npm install
```

## Démarrage

```bash
npm run dev
```

Accès : http://localhost:3000

## Structure

```
src/
├── api/          # Client Axios + endpoints
├── components/   # Navbar, Footer, Cards, HeroBanner...
├── pages/        # Home, Team, Posts, Expertises, Contact...
└── index.css     # Styles globaux TailwindCSS
```

## Pages disponibles

| Route | Page |
|-------|------|
| `/` | Accueil (hero carousel + sections) |
| `/equipe` | Liste équipe |
| `/equipe/:id` | Profil membre |
| `/actualites` | Liste articles |
| `/actualites/:slug` | Détail article |
| `/expertises` | Liste expertises |
| `/expertises/:slug` | Détail expertise |
| `/honoraires` | Nos honoraires |
| `/videos` | Vidéos explicatives |
| `/avis` | Avis clients |
| `/galerie` | Galerie photos |
| `/contact` | Formulaire de contact |
| `/login` | Connexion admin |

## Build production

```bash
npm run build
```
