# loko-resa — API maison de Loko

Worker Cloudflare qui remplace **Formspree** (formulaires) et **Notion Calendar**
(prise de rendez-vous). Même principe que `lockpit-resa` sur lockpit.fr, mais les
emails partent par **Cloudflare Email Sending** (binding natif, pas de Resend, pas
de clé API).

## Routes

| Méthode | Route | Rôle |
|---|---|---|
| `POST` | `/api/contact` | Formulaire de contact (page RDV + modale) |
| `GET` | `/api/slots?from=&to=` | Créneaux disponibles `{ "2026-08-25": ["09:00", …] }` |
| `POST` | `/api/book` | Réservation d'un créneau |
| `POST` | `/api/admin/login` | Vérifie le mot de passe admin |
| `GET` | `/api/admin/bookings?from=&to=` | RDV + créneaux bloqués |
| `POST` | `/api/admin/block` | `{ slot, action: "block" \| "unblock" }` |
| `POST` | `/api/admin/cancel` | `{ slot, notify }` — annule et prévient le client |
| `GET` | `/api/admin/contacts` | Messages reçus |
| `DELETE` | `/api/admin/contact` | `{ id }` |

Toutes les routes `/api/admin/*` exigent `Authorization: Bearer <ADMIN_PASSWORD>`.

## Créneaux (`src/services/slots.js`)

Lundi → samedi, 9h–12h et 14h–18h, créneaux d'1 h, 4 h de délai minimum,
30 jours d'horizon. Les heures sont des **heures françaises** (Europe/Paris,
bascule été/hiver gérée). Tout se règle en haut du fichier.

## Anti-spam

Honeypot (`website`), délai minimum côté site, **Turnstile vérifié côté serveur**
et limitation par IP (5 messages/h, 2 réservations/h).

## Déploiement (à faire une fois)

```bash
cd worker
npm install

# 1. Base KV
npx wrangler kv namespace create RESA_KV
npx wrangler kv namespace create RESA_KV --preview
# → coller les deux ids dans wrangler.jsonc

# 2. Email Sending sur le domaine (pose les DNS SPF/DKIM automatiquement)
npx wrangler email sending enable lokofr.com
npx wrangler email sending list   # vérifier que lokofr.com est actif

# 3. Secrets
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put TURNSTILE_SECRET   # clé secrète du widget Turnstile

# 4. Déploiement
npx wrangler deploy
```

L'URL obtenue (`https://loko-resa.<compte>.workers.dev`) doit correspondre à
`API_BASE` dans `src/App.js` et à `API` dans `public/admin-rdv.html`.

## Administration

`https://www.lokofr.com/admin-rdv.html` — mot de passe = `ADMIN_PASSWORD`.
Onglet **Rendez-vous** (annuler, débloquer) et onglet **Messages**.
La page est en `noindex` et exclue du `robots.txt`.

## Données

KV, clés : `booking:<slot>`, `blocked:<slot>`, `contact:<id>` (TTL 1 an),
`ratelimit:*` (TTL 1 h).
