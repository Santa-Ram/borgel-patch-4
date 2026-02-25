# Borgel & Associés — Dashboard Admin React

## Stack
- React 18 + TypeScript
- TailwindCSS 3.x
- Framer Motion
- Recharts (graphiques)
- Axios + JWT interceptors

## Installation

```bash
cd frontend-admin
npm install
```

## Démarrage

```bash
npm run dev
```

Accès : http://localhost:3001

## Connexion

Créer un superuser Django d'abord :
```bash
cd backend
python manage.py createsuperuser
```

Puis se connecter sur `/login` avec vos identifiants.

## Pages Admin

| Route | Fonctionnalité |
|-------|----------------|
| `/` | Dashboard (stats, charts, derniers messages) |
| `/posts` | Gestion articles (CRUD + toggle publication) |
| `/team` | Gestion équipe (CRUD + toggle actif) |
| `/expertises` | Gestion expertises |
| `/contacts` | Messages reçus (marquer lu, supprimer) |
| `/reviews` | Avis clients |
| `/videos` | Vidéos |
| `/newsletter` | Abonnés newsletter |
| `/gallery` | Galerie photos |
| `/stats` | Statistiques |
