# Borgel & Associés — Backend Django

## Installation

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Configuration

Créez un fichier `.env` :
```
SECRET_KEY=votre-clé-secrète
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

## Démarrage

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## API

- Public : `http://localhost:8000/api/`
- Admin Django : `http://localhost:8000/django-admin/`
- Auth JWT : `POST /api/auth/login/` → `{ "username": "...", "password": "..." }`

## Endpoints principaux

| Méthode | URL | Description |
|---------|-----|-------------|
| GET | /api/posts/ | Liste articles publiés |
| GET | /api/posts/:slug/ | Détail article |
| GET | /api/team/ | Liste équipe |
| GET | /api/expertises/ | Liste expertises |
| GET | /api/reviews/ | Avis clients |
| GET | /api/videos/ | Vidéos |
| POST | /api/contacts/ | Formulaire contact |
| POST | /api/newsletter/subscribe/ | Inscription newsletter |
| POST | /api/auth/login/ | Authentification JWT |
