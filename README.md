# 🏛️ Borgel & Associés — Projet Full-Stack

Cabinet d'avocats spécialisé en droit du dommage corporel

## Architecture

```
borgel-associes/
├── backend/           → API Django REST Framework
├── frontend-client/   → Site web React (public)
├── frontend-admin/    → Dashboard admin React
└── frontend-mobile/   → Application mobile React Native
```

## Démarrage rapide

### 1. Backend Django

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
# → http://localhost:8000
```

### 2. Frontend Client

```bash
cd frontend-client
npm install
npm run dev
# → http://localhost:3000
```

### 3. Dashboard Admin

```bash
cd frontend-admin
npm install
npm run dev
# → http://localhost:3001
```

### 4. Application Mobile

```bash
cd frontend-mobile
npm install
npx expo start
```

## Technologies

| Couche | Stack |
|--------|-------|
| Backend | Django 4.x + DRF + SQLite |
| Auth | JWT (djangorestframework-simplejwt) |
| Frontend Web | React 18 + TypeScript + TailwindCSS |
| Animations | Framer Motion |
| Icônes | Lucide Icons |
| Charts Admin | Recharts |
| Mobile | React Native + Expo + Bottom Tabs |

## Design System

- **Couleur principale :** `#080d1e` (navy foncé)
- **Accent orange :** `#f97316`
- **Style :** Dark gradient + Glassmorphism
- **Police :** Poppins (Google Fonts)
- **Animations :** Framer Motion avec variants

## API Endpoints publics

```
GET  /api/posts/                  → Articles publiés
GET  /api/posts/:slug/            → Détail + incrément vues
GET  /api/team/                   → Membres équipe
GET  /api/team/:id/               → Profil membre
GET  /api/expertises/             → Liste expertises
GET  /api/expertises/:slug/       → Détail expertise
GET  /api/reviews/                → Avis clients
GET  /api/videos/                 → Vidéos
POST /api/contacts/               → Formulaire contact
POST /api/newsletter/subscribe/   → Inscription newsletter
POST /api/auth/login/             → JWT login
POST /api/auth/refresh/           → JWT refresh
```

## Crédits

Projet Santa généré le 22 Février 2026 — Borgel & Associés Marseille
