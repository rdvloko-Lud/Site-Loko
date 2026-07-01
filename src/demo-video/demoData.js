// Données de la vidéo de démonstration Lockpit pour le SITE Loko.
// La vidéo affiche le VRAI site EN DIRECT (iframe même origine) dans un cadre
// navigateur, et défile de section en section. Les animations du site tournent
// pour de vrai (carrousel d'avis Google, mot rotatif du hero, etc.).

// ---------------------------------------------------------------------------
// Découpage de la séquence
// ---------------------------------------------------------------------------

export const STAGE = {
  intro: 0, // accroche Lockpit
  hero: 1, // le vrai site en haut (mot rotatif qui tourne)
  services: 2, // défile vers les services
  reviews: 3, // défile vers les avis Google (carrousel en mouvement)
  tarifs: 4, // défile vers les tarifs
  about: 5, // défile vers « Qui est derrière Loko ? »
  contact: 6, // défile vers le contact
  ensemble: 7, // vue d'ensemble + accroche
  signature: 8, // Créé par Lockpit
};

// Où défiler à chaque étape, exprimé par rapport au DOM du site (iframe) :
//   { type: "top" }                       → tout en haut
//   { type: "sel", sel: "#id" }           → sur une section
//   { type: "mid", a: "#id1", b: "#id2" } → à mi-chemin entre deux sections
export const stageScroll = [
  { type: "top" }, // intro
  { type: "top" }, // hero
  { type: "sel", sel: "#services" }, // services
  { type: "mid", a: "#services", b: "#tarifs" }, // avis (entre services et tarifs)
  { type: "sel", sel: "#tarifs" }, // tarifs
  { type: "sel", sel: "#qui-suis-je" }, // about
  { type: "sel", sel: "#contact" }, // contact
  { type: "top" }, // ensemble (vue réduite, peu importe)
  { type: "top" }, // signature
];

// Légende basse pendant le défilement (null = aucune).
export const stageCaption = [
  null,
  "Le vrai site, en ligne",
  "Vos services, clairs",
  "Vos avis Google, en direct",
  "Vos tarifs, transparents",
  "Qui est derrière Loko",
  "Un appel, un rendez-vous",
  null,
  null,
];

// Durée d'affichage de chaque étape en lecture automatique (?play=1).
export const stageDurationsMs = [
  2400, // intro
  3200, // hero (laisser le mot rotatif tourner)
  3000, // services
  3800, // avis (laisser le carrousel défiler)
  2800, // tarifs
  3000, // about
  2800, // contact
  2900, // ensemble
  3400, // signature
];

export const lastStage = stageDurationsMs.length - 1;

// ---------------------------------------------------------------------------
// Écrans de texte (identité Lockpit)
// ---------------------------------------------------------------------------

export const introLines = ["Un savoir-faire local.", "Une présence en ligne."];

export const compositeCaption = {
  title: "Un site qui inspire confiance.",
  subtitle: "Clair, rapide, pensé pour vos clients.",
};

export const outro = {
  title: "Créé par Lockpit",
  subtitle: "Sites, apps et logiciels métier sur mesure",
};
