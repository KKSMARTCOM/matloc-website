# MATLOC — Site BTP Bénin

Site web professionnel pour **MATLOC BTP**, expert en location d'échafaudages, transport et équipements BTP au Bénin.

---

## Démarrage

```bash
# Installer les dépendances
npm install

# Générer le client Prisma
npm run db:generate

# Appliquer les migrations (première fois)
npm run db:migrate

# Lancer le serveur de développement (port 3001)
npm run dev
```

Ouvrir [http://localhost:3001](http://localhost:3001)

---

## Administration

L'espace d'administration est accessible sur `/admin`.

**Identifiants par défaut** (configurables dans `.env`) :
```
Email    : admin@matloc.bj
Password : Admin@2026
```

---

## Base de données

### Variables d'environnement

```env
DATABASE_URL=postgresql://postgres:<PASSWORD>@localhost:5432/matloc_db
JWT_SECRET=<secret_key>
ADMIN_EMAIL=admin@matloc.bj
ADMIN_PASSWORD=Admin@2026
```

### Commandes utiles

```bash
# Générer le client Prisma après modification du schéma
npm run db:generate

# Créer et appliquer une migration
npm run db:migrate

# Appliquer les migrations en production
npm run db:deploy

# Ouvrir Prisma Studio (interface visuelle DB)
npm run db:studio
```

### Vider la base de données (remettre le site à nu)

> ⚠️ **Attention** : cette action supprime tout le contenu (services, réalisations, partenaires, membres, valeurs, paramètres CMS). Les comptes admin et les traductions sont conservés.

**Option 1 — Via l'API (owner uniquement, serveur démarré) :**
```bash
curl -X POST http://localhost:3001/api/admin/reset \
  -H "Cookie: matloc_admin_token=<votre_token>"
```

**Option 2 — Via Prisma (reset complet, toutes les tables) :**
```bash
npx prisma migrate reset --force
```
> Cette commande recrée toutes les tables depuis zéro. Les données seed (owner admin) seront réinsérées au prochain démarrage du serveur.

**Option 3 — Via psql (ciblé par table) :**
```sql
TRUNCATE TABLE cms_services, cms_achievements, cms_partners,
               cms_members, cms_values, cms_settings RESTART IDENTITY CASCADE;
```

---

## Stack technique

- **Framework** : Next.js 16 (App Router, Turbopack)
- **Base de données** : PostgreSQL via Prisma ORM
- **Authentification** : JWT + cookies HttpOnly
- **Style** : Tailwind CSS v4
- **Internationalisation** : i18next (FR / EN)
- **Éditeur riche** : Tiptap
- **Animations** : Motion (Framer Motion)
- **Carrousel** : Swiper.js

---

## Structure des dossiers

```
app/
  admin/          → Espace d'administration (CMS)
  api/
    admin/        → Routes API protégées (admin)
    cms/          → Routes API publiques (contenu)
  (pages publiques)

components/
  admin/          → Composants UI de l'admin
  ui/             → Composants UI du site public

lib/
  db.ts           → Connexion PostgreSQL + CRUD
  auth.ts         → JWT + bcrypt
  i18n.ts         → Traductions FR/EN
  migrate.ts      → Migrations manuelles

prisma/
  schema.prisma   → Schéma de la base de données
```

---

## Réalisé par [KASMARTCOM](https://kasmartcom.com)
