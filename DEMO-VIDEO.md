# Mode démo vidéo — « Créé par Lockpit »

Vidéo de présentation autonome qui met en scène le **vrai site Loko, en direct**.
Le site est chargé dans une iframe (même origine) à l'intérieur d'un cadre
navigateur, et défile de section en section. **Les animations du site tournent
réellement** : carrousel d'avis Google qui défile, mot rotatif du hero, compteur
d'avis, fondus… Entre l'intro et la signature aux couleurs de Lockpit.

Format **paysage 16:9 par défaut** (vertical 9:16 dispo via `?format=vertical`).

Aucune page ni logique du site n'est modifiée, sauf une ligne de routage vers
`/demo-video` (page hors sitemap et hors prérendu).

Les écrans de marque (intro, ensemble, signature) reprennent l'identité Lockpit :
navy `#1A2E3D`, crème `#FCEFE3`, orange `#FFB627`, avec l'icône Lockpit animée.

## Lancer / enregistrer

```bash
npm start
```

Puis ouvrir http://localhost:3000/demo-video (page publique, hors sitemap/prérendu).

| `?stage=` | Étape |
|---|---|
| 0 | Intro — « Un savoir-faire local. / Une présence en ligne. » |
| 1 | Le vrai site en haut (le mot du hero tourne) |
| 2 | Défile vers les services |
| 3 | Défile vers les avis Google (carrousel en mouvement) |
| 4 | Défile vers les tarifs |
| 5 | Défile vers « Qui est derrière Loko ? » |
| 6 | Défile vers le contact |
| 7 | Vue d'ensemble — « Un site qui inspire confiance. » |
| 8 | Signature — « Créé par Lockpit » |

Options combinables :

- **`/demo-video?play=1`** — enchaîne les 9 étapes automatiquement (~28 s) :
  c'est l'URL à enregistrer pour la vidéo.
- **`?format=vertical`** — variante 9:16 (540×960) ; paysage 16:9 par défaut.
- **`?delay=4000`** — retarde le début de la lecture auto (temps de lancer
  l'enregistrement).
- **Clavier ← / →** — avancer/reculer manuellement.

Le rendu est composé sur un canvas à ratio fixe (1280×720 ou 540×960) mis à
l'échelle automatiquement.

### Enregistrement (paysage 16:9)

1. Ouvrir une fenêtre de navigateur la plus large possible (le canvas se centre,
   fond noir autour).
2. Ouvrir `http://localhost:3000/demo-video?play=1`.
3. Lancer l'enregistrement (Screen Studio / QuickTime), recharger la page,
   laisser dérouler ~28 s.
4. Monter dans CapCut / Screen Studio : recadrer sur le canvas 16:9, ajouter
   musique et éventuelle voix off.

## Comment ça marche

- La page `/demo-video` charge `/` (la home du vrai site) dans une **iframe même
  origine**. Comme c'est la même origine, on peut piloter son défilement et
  masquer son bandeau cookies (consentement pré-réglé sur « refused » dans
  `localStorage`, sans charger d'outil tiers).
- Le défilement est animé « à la main » (rAF) parce que le site force
  `scroll-behavior: smooth` sur `<html>` ; on force donc `auto` dans l'iframe
  pour piloter le glissement nous-mêmes.
- En production, héberger le site et `/demo-video` sur le **même domaine** pour
  que l'iframe reste same-origin.

## Capturer des frames PNG (optionnel)

```bash
# serveur de dev lancé (npm start)
node scripts/capture-demo-frames.js 3000            # paysage 1920×1080
node scripts/capture-demo-frames.js 3000 horizontal # idem
```

⚠️ Le storyboard PNG fige un instant : les animations du site (carrousel…) ne se
voient qu'en vidéo. Pour la vraie démo, enregistrer `?play=1`.

## Texte à l'écran (déjà intégré)

- Intro : « Un savoir-faire local. / Une présence en ligne. »
- Ensemble : « Un site qui inspire confiance. / Clair, rapide, pensé pour vos clients. »
- Final : « Créé par Lockpit » + « Sites, apps et logiciels métier sur mesure »

## Voix off proposée (~28 s)

> Derrière chaque commerce local, il y a un vrai savoir-faire.
> Mais sans présence en ligne, personne ne le voit.   *(étapes 0–1)*
>
> Vos services, vos avis Google, vos tarifs, votre histoire :
> tout est clair, vivant, et donne envie de vous appeler.   *(étapes 2–6)*
>
> Un site rapide, pensé pour vos clients.   *(étape 7)*
>
> Une activité. Un site. Créé par Lockpit.   *(étape 8)*

## Fichiers du mode démo

- `src/demo-video/DemoVideoPage.jsx` — la page (cadre navigateur + iframe live + défilement)
- `src/demo-video/demoData.js` — étapes, cibles de défilement, légendes
- `src/demo-video/demoVideo.css` — animations (icône, lignes, scènes)
- `scripts/capture-demo-frames.js` — capture de frames de la vidéo (optionnel)
- `scripts/capture-real-site.js` — ancienne capture statique (plus utilisée par la page ; gardée si besoin)
- Routage : `src/App.js` (`if (path === "/demo-video") return <DemoVideoPage />`)

## Limites / points à vérifier

- La page est volontairement **hors sitemap et hors prérendu** (`scripts/routes.js`).
- L'iframe doit être **same-origin** (sinon impossible de piloter le défilement /
  masquer les cookies) : garder site + `/demo-video` sur le même domaine.
- Animations en CSS/JS purs, aucune dépendance ajoutée.
- Pas d'export vidéo automatique : l'enregistrement d'écran de `?play=1` reste la
  méthode prévue.
