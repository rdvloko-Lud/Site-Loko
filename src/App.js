import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import logoCreditImpot from "./Assets/logo-credit-impot.png";
import { BLOG_POSTS } from "./blogData";
import { getCityEnrichment } from "./cityEnrichment";
const SITE_URL = "https://www.lokofr.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image-loko.jpg`;
const DEFAULT_SITE_NAME = "Loko";
const TURNSTILE_SITE_KEY = process.env.REACT_APP_TURNSTILE_SITE_KEY || "";
const MIN_FORM_DELAY_MS = 3000;
const BUSINESS_ID = `${SITE_URL}/#business`;
const BUSINESS_PHONE = "+33763131515";
const BUSINESS_EMAIL = "rdvloko@gmail.com";
// Police du site — à appliquer aux modales (rendues hors du <div styles.page>).
const UI_FONT =
  "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

// Lien vers les avis Google (page Loko).
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Loko+Les+Sables+d%27Olonne&hl=fr";

// Vrais avis de la page Google de Loko (note 5/5, 33 avis).
const GOOGLE_REVIEWS = [
  {
    author: "Sybille Sauvez",
    rating: 5,
    text: "Super expérience avec Loko. J'avais un problème avec mon iPhone depuis 2 ans, personne n'avait pu m'aider. Grâce à Loko, le problème a été trouvé tout de suite. Merci mille fois ! 😊",
  },
  {
    author: "Elisa R.",
    rating: 5,
    text: "Rapidité, efficacité, professionnalisme, prix très correct ! Je recommande vivement Ludéric et sa gentillesse. Ne cherchez plus, vous avez trouvé le bon sauveteur numérique !",
  },
  {
    author: "Benjamin Remigereau",
    rating: 5,
    text: "N'ayant pas toujours le temps de m'occuper des galères de papy et mamie, les services de Loko m'ont bien sauvé la vie. Professionnel toujours au top et agréable !",
  },
  {
    author: "Dorine Ferry",
    rating: 5,
    text: "Service au top ! Intervention rapide, problème réglé en quelques minutes. Très pro, prend le temps d'expliquer et super sympa. Je recommande à 100 % !",
  },
  {
    author: "Madeleine Juzeau",
    rating: 5,
    text: "Un souci informatique ? Loko vous dépanne très rapidement. Novice comme moi ? Loko vous explique tout. Je recommande Ludéric, qui assiste avec le sourire et l'efficacité du professionnel !",
  },
  {
    author: "Cécile Liard",
    rating: 5,
    text: "De passage aux Sables-d'Olonne pour des vacances, j'ai eu besoin d'une intervention pour mon téléphone. Loko est intervenu très rapidement. Très sérieux et réactif. Merci encore !",
  },
  {
    author: "Quentin Gauffreteau",
    rating: 5,
    text: "Merci à Ludéric pour sa réactivité et son savoir-faire pour le remplacement de la vitre arrière de mon iPhone 15. Je vous le recommande 😉",
  },
  {
    author: "Karl Bonneau",
    rating: 5,
    text: "Merci à Loko pour la mise en route du nouveau PC de ma tante. Intervention à domicile rapide et efficace.",
  },
  {
    author: "Maryse Paupardin",
    rating: 5,
    text: "Très sympathique, patient et compétent. Dépannée en vacances pour un smartphone avec une boîte mail bloquée. Merci encore, je recommande à 100 % !",
  },
  {
    author: "Antonin Foliot",
    rating: 5,
    text: "Merci à Loko qui a dépanné mon ordinateur et mon réseau qui n'arrêtait pas de se couper.",
  },
  {
    author: "Catherine Rouleau",
    rating: 5,
    text: "Rendez-vous à domicile avec ce nouvel informaticien. Très satisfaite : à l'écoute, de bons conseils et les problèmes sur l'ordinateur résolus.",
  },
  {
    author: "Max",
    rating: 5,
    text: "J'avais besoin de conseils pour l'installation de mon poste informatique. Très réactif et à l'écoute de mes demandes, je recommande !",
  },
  {
    author: "Christiane Ferré",
    rating: 5,
    text: "J'ai fait appel à Loko pour un problème avec mon iPhone… puis mon iPad ! En un temps record, avec professionnalisme et patience, il a réparé mon iPhone.",
  },
  {
    author: "Jo",
    rating: 5,
    text: "Très réactif, super à l'écoute. Je recommande fortement pour tout ce qui touche au numérique.",
  },
  {
    author: "Mannik Perrin",
    rating: 5,
    text: "Ludéric est très réactif, efficace, patient et délicat.",
  },
  {
    author: "Michel Villard",
    rating: 5,
    text: "Ludéric, extrêmement compétent et très sympathique. Merci pour votre intervention.",
  },
  {
    author: "Célia Charrier",
    rating: 5,
    text: "Très sympa et super efficace ! Je recommande vivement 🌈",
  },
  {
    author: "Solange Oger",
    rating: 5,
    text: "Super sympa et très agréable. Merci beaucoup !",
  },
];
const BUSINESS_LOGO = `${SITE_URL}/logo-loko.webp`;

const BUSINESS_ADDRESS = {
  "@type": "PostalAddress",
  addressLocality: "Les Sables d’Olonne",
  postalCode: "85100",
  addressCountry: "FR",
};

const SOCIAL_LINKS = [
  "https://www.facebook.com/profile.php?id=61572843448082&locale=fr_FR",
  "https://www.instagram.com/lokolesables/",
  "https://www.linkedin.com/company/110110832/",
];

const defaultSeo = {
  title: "Assistance numérique à domicile aux Sables d’Olonne | Loko",
  description:
    "Loko propose une assistance numérique à domicile aux Sables d’Olonne : Wi-Fi, Internet, smartphone, ordinateur, TV, transfert de données et découverte de l’IA.",
  robots: "index, follow",
  canonical: `${SITE_URL}/`,
  ogType: "website",
  ogImage: DEFAULT_OG_IMAGE,
  twitterCard: "summary_large_image",
};

const staticPagesSeo = {
  "/": {
    title: "Assistance numérique à domicile aux Sables d’Olonne | Loko",
    description:
      "Loko intervient à domicile aux Sables d’Olonne pour vous aider avec Internet, le Wi-Fi, les smartphones, les ordinateurs, la télévision, les transferts de données et l’intelligence artificielle.",
  },

  "/rendez-vous": {
    title: "Contact et rendez-vous | Assistance numérique aux Sables d’Olonne — Loko",
    description:
      "Prenez rendez-vous avec Loko pour une intervention d’assistance numérique à domicile aux Sables d’Olonne : Wi-Fi, smartphone, ordinateur, TV, imprimante et transfert de données.",
  },

  "/plan-du-site": {
    title: "Plan du site | Loko",
    description:
      "Accédez rapidement à toutes les pages du site Loko : services d’assistance numérique, prise de rendez-vous, informations légales et crédit d’impôt.",
  },

  "/credit-impot": {
    title: "Crédit d’impôt de 50 % | Assistance numérique Loko",
    description:
      "Découvrez comment fonctionne le crédit d’impôt de 50 % pour les prestations d’assistance numérique à domicile proposées par Loko aux Sables d’Olonne.",
  },

  "/tarifs": {
    title: "Tarifs assistance numérique aux Sables d’Olonne | Loko",
    description:
      "Découvrez les tarifs Loko pour une assistance numérique à domicile aux Sables d’Olonne : Wi-Fi, smartphone, ordinateur, imprimante, TV et transfert de données.",
  },

  "/zone-intervention": {
    title: "Zone d’intervention assistance numérique | Les Sables d’Olonne — Loko",
    description:
      "Loko intervient à domicile aux Sables d’Olonne, Olonne-sur-Mer, Château-d’Olonne, L’Île-d’Olonne et alentours pour l’aide numérique du quotidien.",
  },

  "/blog": {
    title: "Blog — conseils numériques à domicile aux Sables d’Olonne | Loko",
    description:
      "Astuces et conseils simples pour mieux vivre avec vos appareils : Wi-Fi, ordinateur, smartphone, TV et sécurité. Le blog Loko, écrit à partir de cas réels aux Sables d’Olonne.",
  },

  "/cgv": {
    title: "Conditions Générales de Vente | Loko",
    description:
      "Consultez les Conditions Générales de Vente de Loko pour les prestations d’assistance numérique à domicile aux Sables d’Olonne.",
    robots: "noindex, follow",
  },

  "/politique-confidentialite": {
    title: "Politique de confidentialité | Loko",
    description:
      "Découvrez comment Loko collecte, utilise et protège vos données personnelles dans le respect du RGPD.",
    robots: "noindex, follow",
  },

  "/mentions-legales": {
    title: "Mentions légales | Loko",
    description:
      "Consultez les mentions légales du site Loko : éditeur, hébergeur, propriété intellectuelle et responsabilité.",
    robots: "noindex, follow",
  },
};

const LOKO_PLANS = [
  {
    title: "Intervention à domicile",
    price: "79€",
    beforeText: "79€ soit ",
    reducedPrice: "39,50€",
    afterText: " après crédit d’impôt (service à la personne).",
  },
  {
    title: "Intervention à domicile urgente",
    price: "99€",
    beforeText: "99€ soit ",
    reducedPrice: "49,50€",
    afterText: " après crédit d’impôt (service à la personne).",
  },
];

const problemPages = {
  "/probleme-wifi-internet-les-sables-dolonne": {
    title: "Internet & Wi-Fi",
    seoTitle:
      "Internet et Wi-Fi aux Sables d’Olonne | Installation, aide et optimisation",
    seoDescription:
      "Loko vous accompagne à domicile aux Sables d’Olonne pour Internet et le Wi-Fi : installation de box, connexion des appareils, amélioration du réseau et aide simple au quotidien.",
    hero: "Un problème d’Internet ou de Wi-Fi aux Sables d’Olonne ? On vous aide à tout remettre en place simplement.",
    intro:
      "Loko intervient à domicile aux Sables d’Olonne pour vous aider avec Internet et le Wi-Fi du quotidien. Box à installer, connexion instable, appareils qui ne se connectent plus ou réseau difficile à comprendre : l’objectif est de retrouver une installation simple, claire et agréable à utiliser, sans stress.",
    symptoms: [
      "Internet coupe, rame ou devient pénible à utiliser",
      "Wi-Fi faible dans certaines pièces du logement",
      "Téléphone, TV, ordinateur ou imprimante qui ne se connecte pas correctement",
      "Nouvelle box ou changement d’opérateur difficile à mettre en place",
      "Installation Internet confuse ou peu claire au quotidien",
    ],
    help: [
      "Installation et mise en service de votre box Internet à domicile",
      "Connexion de vos appareils au bon réseau Wi-Fi",
      "Amélioration simple d’un Wi-Fi trop faible ou irrégulier",
      "Aide pour retrouver une installation claire et facile à utiliser",
      "Explications simples pour vous rendre plus autonome ensuite",
    ],
    relatedPages: [
      {
        href: "/depannage-wifi-internet-les-sables-dolonne",
        title: "Wi-Fi lent ou instable",
        text: "Quand la connexion fonctionne mais reste lente, faible ou difficile à utiliser.",
      },
      {
        href: "/depannage-wifi-internet-les-sables-dolonne",
        title: "Wi-Fi ne fonctionne plus",
        text: "Quand le réseau Wi-Fi n’apparaît plus ou refuse toute connexion.",
      },
      {
        href: "/depannage-wifi-internet-les-sables-dolonne",
        title: "Installation box Internet",
        text: "Pour installer une nouvelle box et connecter correctement vos appareils.",
      },
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "TV & appareils connectés",
        text: "Si votre télévision, votre box TV ou vos applications dépendent aussi de la connexion Internet.",
      },
    ],
    faq: [
      {
        q: "Est-ce que Loko remplace l’opérateur Internet ?",
        a: "Non. Loko n’est pas un opérateur. L’intervention sert à vous aider à installer, comprendre, reconnecter ou améliorer votre installation à domicile, simplement.",
      },
      {
        q: "Est-ce que vous pouvez connecter tous mes appareils ?",
        a: "Oui. Télévision, smartphone, ordinateur ou imprimante : l’objectif est que tout fonctionne ensemble de façon simple et cohérente.",
      },
      {
        q: "Est-ce que c’est adapté si je ne comprends pas bien comment tout fonctionne ?",
        a: "Oui. Justement, l’idée est de vous aider avec des explications claires et une intervention adaptée à votre niveau.",
      },
      {
        q: "Est-ce que vous intervenez aussi pour une nouvelle box ou après un changement d’opérateur ?",
        a: "Oui. C’est un cas fréquent. Loko peut vous aider à remettre l’installation en place et reconnecter correctement vos équipements.",
      },
    ],
  },
  "/probleme-tv-les-sables-dolonne": {
    title: "TV qui ne fonctionne plus",
    seoTitle:
      "TV qui ne fonctionne plus aux Sables d’Olonne | Écran noir, signal, branchement",
    seoDescription:
      "Loko intervient à domicile aux Sables d’Olonne si votre TV ne fonctionne plus : écran noir, aucun signal, mauvaise source, problème de branchement ou appareil non reconnu.",
    hero: "Votre TV ne fonctionne plus aux Sables d’Olonne ?",
    intro:
      "Loko vous aide à domicile aux Sables d’Olonne lorsque votre télévision ne fonctionne plus correctement. Écran noir, aucun signal, mauvaise source, câble HDMI mal branché ou appareil non reconnu : l’objectif est de retrouver une télévision simple à utiliser, sans prise de tête.",
    symptoms: [
      "Écran noir ou message “aucun signal”",
      "Impossible d’afficher l’image de la box ou d’un autre appareil",
      "Télévision qui semble allumée mais ne fonctionne pas normalement",
      "Source HDMI ou branchement difficile à comprendre",
      "Installation devenue confuse après un changement ou un déplacement",
    ],
    help: [
      "Vérification des branchements et des sources",
      "Aide à la connexion entre la TV et les appareils reliés",
      "Identification simple de la cause du blocage",
      "Remise en route d’un usage clair et fluide",
      "Explications simples pour éviter que le problème se reproduise",
    ],
    relatedPages: [
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "TV & appareils connectés",
        text: "Vue globale pour comprendre et améliorer toute votre installation TV.",
      },
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "Problème box TV",
        text: "Si le problème vient du décodeur, des chaînes ou de la box TV.",
      },
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "Netflix ne fonctionne plus",
        text: "Si l’écran fonctionne mais que les applications ne se lancent pas.",
      },
      {
        href: "/depannage-wifi-internet-les-sables-dolonne",
        title: "Internet & Wi-Fi",
        text: "Si votre TV connectée dépend d’une connexion Internet instable.",
      },
    ],
    faq: [
      {
        q: "Pourquoi ma TV affiche-t-elle “aucun signal” ?",
        a: "Cela vient souvent d’une mauvaise source sélectionnée, d’un câble mal branché ou d’un appareil non reconnu. Loko peut vous aider à identifier cela rapidement à domicile.",
      },
      {
        q: "Pouvez-vous vérifier les branchements HDMI et la source ?",
        a: "Oui. Loko peut vérifier les branchements, la bonne source et le fonctionnement général de votre installation TV.",
      },
      {
        q: "Est-ce que vous intervenez si la télévision fonctionne mal après un changement d’installation ?",
        a: "Oui. Après un déplacement, un changement de box ou un nouveau branchement, il est fréquent qu’une TV ne soit plus configurée correctement.",
      },
    ],
  },

  "/probleme-box-tv-les-sables-dolonne": {
    title: "Problème box TV",
    seoTitle:
      "Problème box TV aux Sables d’Olonne | Décodeur, chaînes, box qui bug",
    seoDescription:
      "Loko intervient à domicile aux Sables d’Olonne si votre box TV ne fonctionne plus : décodeur bloqué, chaînes indisponibles, image absente ou installation confuse.",
    hero: "Votre box TV ne fonctionne plus aux Sables d’Olonne ?",
    intro:
      "Loko vous accompagne à domicile aux Sables d’Olonne lorsque votre box TV, votre décodeur ou votre installation télévision pose problème. Box bloquée, chaînes indisponibles, image absente ou fonctionnement peu clair : l’objectif est de retrouver un usage simple et stable.",
    symptoms: [
      "Décodeur bloqué ou box TV qui répond mal",
      "Chaînes indisponibles ou image absente",
      "Télécommande ou navigation difficile à comprendre",
      "Installation TV confuse entre box, décodeur et télévision",
      "Problème apparu après un changement de box Internet ou de branchement",
    ],
    help: [
      "Vérification des branchements entre box TV, décodeur et télévision",
      "Aide à la remise en route simple de l’installation",
      "Identification des blocages les plus fréquents",
      "Explications claires sur le fonctionnement de votre équipement",
      "Accompagnement pour retrouver un usage plus simple au quotidien",
    ],
    relatedPages: [
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "TV & appareils connectés",
        text: "Vue globale pour comprendre votre installation TV à domicile.",
      },
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "TV qui ne fonctionne plus",
        text: "Si le problème concerne l’affichage ou l’écran.",
      },
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "Netflix ne fonctionne plus",
        text: "Si les applications de la box TV ne fonctionnent pas.",
      },
      {
        href: "/depannage-wifi-internet-les-sables-dolonne",
        title: "Installation box Internet",
        text: "Si le problème vient d’un changement de box ou d’opérateur.",
      },
    ],
    faq: [
      {
        q: "Pouvez-vous aider si ma box TV ou mon décodeur est bloqué ?",
        a: "Oui. Loko peut intervenir à domicile pour vérifier l’installation, identifier les blocages courants et remettre en place un fonctionnement plus simple.",
      },
      {
        q: "Est-ce que vous intervenez si je n’ai plus certaines chaînes ou plus d’image ?",
        a: "Oui. Ce type de problème peut venir d’un branchement, d’un appareil mal reconnu ou d’une installation devenue confuse.",
      },
      {
        q: "Pouvez-vous m’aider si tout est branché mais que je ne comprends plus comment ça fonctionne ?",
        a: "Oui. L’objectif est aussi de rendre votre installation plus claire et plus facile à utiliser au quotidien.",
      },
    ],
  },

  "/netflix-ne-fonctionne-plus-les-sables-dolonne": {
    title: "Netflix ne fonctionne plus",
    seoTitle:
      "Netflix ne fonctionne plus aux Sables d’Olonne | TV connectée, bug, connexion",
    seoDescription:
      "Loko intervient à domicile aux Sables d’Olonne si Netflix ne fonctionne plus : application bloquée, écran noir, problème de connexion ou TV connectée mal configurée.",
    hero: "Netflix ne fonctionne plus aux Sables d’Olonne ?",
    intro:
      "Loko vous aide à domicile aux Sables d’Olonne lorsque Netflix ne fonctionne plus sur votre télévision, votre box ou votre appareil connecté. Application qui ne se lance pas, écran noir, chargement bloqué ou problème de connexion : l’objectif est de retrouver un usage simple et fluide.",
    symptoms: [
      "Netflix ne se lance plus sur la télévision",
      "Écran noir ou chargement bloqué",
      "Application lente, instable ou inutilisable",
      "Problème de connexion entre Netflix et votre réseau",
      "Difficulté à comprendre si le problème vient de la TV, de la box ou d’Internet",
    ],
    help: [
      "Vérification simple de l’installation et de la connexion",
      "Aide à identifier si le problème vient de l’application, de l’appareil ou du réseau",
      "Remise en route d’un usage plus fluide",
      "Connexion correcte de la TV ou box au Wi-Fi si nécessaire",
      "Explications simples pour retrouver Netflix sans blocage",
    ],
    relatedPages: [
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "TV & appareils connectés",
        text: "Vue globale pour comprendre votre installation TV et vos applications.",
      },
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "TV qui ne fonctionne plus",
        text: "Si le problème concerne l’écran ou l’affichage.",
      },
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "Problème box TV",
        text: "Si le souci vient du décodeur ou de la box TV.",
      },
      {
        href: "/depannage-wifi-internet-les-sables-dolonne",
        title: "Internet & Wi-Fi",
        text: "Si Netflix bug à cause d’un réseau lent ou instable.",
      },
    ],
    faq: [
      {
        q: "Pourquoi Netflix ne fonctionne plus sur ma télévision ?",
        a: "Le problème peut venir de l’application, de la télévision connectée, de la box TV ou de la connexion Internet. Loko vous aide à identifier cela simplement à domicile.",
      },
      {
        q: "Pouvez-vous reconnecter ma TV au Wi-Fi si Netflix ne marche plus ?",
        a: "Oui. Loko peut vérifier la connexion de votre télévision ou de votre box au réseau et remettre en place un fonctionnement plus stable.",
      },
      {
        q: "Est-ce que vous intervenez même si je ne sais pas d’où vient le problème ?",
        a: "Oui. C’est justement l’intérêt : vous aider à y voir clair et à retrouver un usage normal.",
      },
    ],
  },
  "/ordinateur-lent-les-sables-dolonne": {
    title: "Ordinateur lent",
    seoTitle:
      "Ordinateur lent aux Sables d’Olonne | PC qui rame, démarrage long, blocages",
    seoDescription:
      "Loko vous aide à domicile aux Sables d’Olonne si votre ordinateur est lent : PC qui rame, démarrage long, blocages, lenteurs du quotidien et réglages simples.",
    hero: "Votre ordinateur est lent aux Sables d’Olonne ?",
    intro:
      "Loko vous accompagne à domicile aux Sables d’Olonne pour le petit dépannage informatique du quotidien : ordinateur lent, démarrage trop long, fichiers qui s’ouvrent mal ou blocages fréquents. L’objectif est de retrouver un usage plus fluide, plus simple et moins frustrant.",
    symptoms: [
      "Ordinateur très lent au démarrage",
      "PC ou Mac qui rame au quotidien",
      "Ouverture lente des fichiers, mails ou pages Internet",
      "Blocages réguliers ou sensation générale de lourdeur",
      "Ordinateur devenu pénible à utiliser pour des tâches simples",
    ],
    help: [
      "Vérification des causes simples de ralentissement",
      "Réglages de base pour retrouver un usage plus fluide",
      "Aide au tri numérique et à l’organisation de l’ordinateur",
      "Accompagnement pour mieux comprendre ce qui ralentit le quotidien",
      "Explications claires et adaptées à votre niveau",
    ],
    relatedPages: [
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "Dépannage informatique",
        text: "Vue d’ensemble pour l’aide informatique à domicile aux Sables d’Olonne.",
      },
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "Imprimante qui ne fonctionne plus",
        text: "Si le problème concerne aussi l’impression ou un périphérique relié à l’ordinateur.",
      },
      {
        href: "/",
        title: "Transfert de données",
        text: "Si vous avez besoin de récupérer, déplacer ou organiser des fichiers utiles.",
      },
    ],
    faq: [
      {
        q: "Est-ce que Loko peut aider si mon ordinateur rame ?",
        a: "Oui. Loko peut intervenir à domicile aux Sables d’Olonne pour identifier les causes simples de lenteur et remettre en place un usage plus fluide au quotidien.",
      },
      {
        q: "Est-ce que vous intervenez si l’ordinateur est juste devenu lent, sans être totalement bloqué ?",
        a: "Oui. C’est même une situation très fréquente. L’objectif est d’agir avant que l’usage ne devienne vraiment pénible ou décourageant.",
      },
      {
        q: "Est-ce que Loko fait de la réparation informatique lourde ?",
        a: "Non. Loko se concentre sur l’assistance numérique à domicile, les lenteurs du quotidien, les réglages simples et l’accompagnement pédagogique.",
      },
      {
        q: "Est-ce adapté si je ne m’y connais pas en informatique ?",
        a: "Oui. Tout est expliqué simplement, avec une approche claire et rassurante.",
      },
    ],
  },
  "/wifi-ne-fonctionne-plus-les-sables-dolonne": {
    title: "Wi-Fi ne fonctionne plus",
    seoTitle: "Wi-Fi ne fonctionne plus aux Sables d’Olonne | Loko",
    seoDescription:
      "Loko intervient à domicile aux Sables d’Olonne si votre Wi-Fi ne fonctionne plus : connexion impossible, appareils déconnectés ou réseau introuvable.",
    hero: "Votre Wi-Fi ne fonctionne plus aux Sables d’Olonne ?",
    intro:
      "Loko vous aide à domicile aux Sables d’Olonne lorsque votre Wi-Fi ne fonctionne plus. Appareils déconnectés, réseau introuvable ou impossibilité de se connecter : l’objectif est de remettre votre connexion en route simplement.",
    symptoms: [
      "Impossible de se connecter au Wi-Fi",
      "Réseau Wi-Fi introuvable",
      "Tous les appareils sont déconnectés",
      "Connexion refusée malgré le bon mot de passe",
    ],
    help: [
      "Vérification du réseau Wi-Fi et de la box",
      "Reconnexion des appareils",
      "Identification simple du problème",
      "Remise en fonctionnement du réseau",
    ],
    relatedPages: [
      {
        href: "/depannage-wifi-internet-les-sables-dolonne",
        title: "Internet & Wi-Fi",
        text: "Vue globale pour comprendre et améliorer votre réseau.",
      },
      {
        href: "/depannage-wifi-internet-les-sables-dolonne",
        title: "Wi-Fi lent",
        text: "Si votre connexion fonctionne mais reste lente.",
      },
    ],
    faq: [
      {
        q: "Pourquoi mon Wi-Fi ne fonctionne plus ?",
        a: "Cela peut venir de la box, d’un réglage ou d’un problème de connexion. Loko vous aide à identifier la cause rapidement.",
      },
      {
        q: "Pouvez-vous reconnecter tous mes appareils ?",
        a: "Oui, l’objectif est que tout refonctionne ensemble simplement.",
      },
    ],
  },
  "/installation-box-internet-les-sables-dolonne": {
    title: "Installation box Internet",
    seoTitle: "Installation box Internet aux Sables d’Olonne | Loko",
    seoDescription:
      "Loko installe votre box Internet à domicile aux Sables d’Olonne : mise en service, connexion des appareils et accompagnement simple.",
    hero: "Installation de box Internet aux Sables d’Olonne",
    intro:
      "Loko vous accompagne à domicile aux Sables d’Olonne pour installer votre box Internet. Branchement, activation, connexion des appareils : tout est mis en place pour un fonctionnement immédiat.",
    symptoms: [
      "Nouvelle box à installer",
      "Déménagement ou changement d’opérateur",
      "Installation compliquée ou incomplète",
      "Besoin d’aide pour connecter les appareils",
    ],
    help: [
      "Installation complète de la box",
      "Connexion des appareils au réseau",
      "Vérification du bon fonctionnement",
      "Explications simples pour être autonome",
    ],
    relatedPages: [
      {
        href: "/depannage-wifi-internet-les-sables-dolonne",
        title: "Internet & Wi-Fi",
        text: "Comprendre et améliorer votre installation globale.",
      },
      {
        href: "/depannage-wifi-internet-les-sables-dolonne",
        title: "Wi-Fi ne fonctionne plus",
        text: "Si votre installation pose problème après coup.",
      },
    ],
    faq: [
      {
        q: "Pouvez-vous installer une box neuve ?",
        a: "Oui, Loko s’occupe de toute la mise en service à domicile.",
      },
      {
        q: "Est-ce que vous connectez les appareils ?",
        a: "Oui, téléphone, TV, ordinateur… tout est configuré.",
      },
    ],
  },
  "/transfert-donnees-telephone-les-sables-dolonne": {
    title: "Transfert données téléphone",
    seoTitle: "Transfert de données téléphone aux Sables d’Olonne | Loko",
    seoDescription:
      "Loko vous aide à transférer vos données de téléphone aux Sables d’Olonne : photos, contacts, applications et comptes.",
    hero: "Transfert de données téléphone aux Sables d’Olonne, sans stress",
    intro:
      "Loko vous accompagne à domicile aux Sables d’Olonne pour transférer vos données d’un téléphone à un autre. Photos, contacts, applications : tout est récupéré simplement.",
    symptoms: [
      "Changement de téléphone",
      "Peur de perdre ses données",
      "Transfert compliqué ou incomplet",
      "Comptes difficiles à récupérer",
    ],
    help: [
      "Transfert complet des données",
      "Vérification des éléments importants",
      "Reconnexion des comptes",
      "Accompagnement après transfert",
    ],
    relatedPages: [
      {
        href: "/",
        title: "Données & transferts",
        text: "Vue globale sur la gestion des données.",
      },
      {
        href: "/",
        title: "Smartphone",
        text: "Aide complète sur l’utilisation du téléphone.",
      },
    ],
    faq: [
      {
        q: "Est-ce que tout peut être transféré ?",
        a: "Dans la majorité des cas oui : photos, contacts et applications.",
      },
      {
        q: "Faut-il préparer quelque chose ?",
        a: "Non, Loko vous guide directement sur place.",
      },
    ],
  },
  "/changement-telephone-les-sables-dolonne": {
    title: "Changement de téléphone",
    seoTitle: "Changement de téléphone aux Sables d’Olonne | Loko",
    seoDescription:
      "Loko vous accompagne lors du changement de téléphone aux Sables d’Olonne : transfert, configuration et prise en main.",
    hero: "Changement de téléphone aux Sables d’Olonne, sans repartir de zéro",
    intro:
      "Loko vous accompagne à domicile aux Sables d’Olonne lors de votre changement de téléphone. L’objectif : récupérer vos données et repartir sur un téléphone prêt à l’emploi.",
    symptoms: [
      "Nouveau téléphone à configurer",
      "Données à récupérer",
      "Applications à réinstaller",
      "Besoin d’être accompagné",
    ],
    help: [
      "Mise en route du nouveau téléphone",
      "Transfert des données",
      "Configuration des applications",
      "Explications pour une prise en main simple",
    ],
    relatedPages: [
      {
        href: "/",
        title: "Transfert données téléphone",
        text: "Récupération complète des données.",
      },
      {
        href: "/",
        title: "Smartphone",
        text: "Aide globale à l’utilisation.",
      },
    ],
    faq: [
      {
        q: "Est-ce que je perds mes données ?",
        a: "Non, tout est fait pour les récupérer.",
      },
      {
        q: "Pouvez-vous tout configurer ?",
        a: "Oui, le téléphone est prêt à l’utilisation.",
      },
    ],
  },
  "/wifi-lent-les-sables-dolonne": {
    title: "Wi-Fi lent",
    seoTitle: "Wi-Fi lent aux Sables d’Olonne | Loko",
    seoDescription:
      "Loko intervient à domicile aux Sables d’Olonne pour les problèmes de Wi-Fi lent : connexion instable, débit faible, pièces mal couvertes et appareils qui chargent difficilement.",
    hero: "Votre Wi-Fi est lent aux Sables d’Olonne ?",
    intro:
      "Loko intervient à domicile aux Sables d’Olonne pour les problèmes de Wi-Fi lent, de connexion instable ou de débit insuffisant dans certaines pièces du logement. L’objectif est de comprendre simplement d’où vient le blocage et d’améliorer l’usage du quotidien.",
    symptoms: [
      "Wi-Fi lent sur téléphone, ordinateur ou télévision",
      "Internet correct près de la box mais mauvais plus loin",
      "Pages qui chargent lentement ou vidéos qui coupent",
      "Certaines pièces du logement captent mal le réseau",
    ],
    help: [
      "Vérification du placement de la box et du réseau Wi-Fi",
      "Aide à l’identification des causes possibles de lenteur",
      "Connexion des appareils au bon réseau",
      "Explications simples pour améliorer l’usage au quotidien",
    ],
    relatedPages: [
      {
        href: "/depannage-wifi-internet-les-sables-dolonne",
        title: "Internet & Wi-Fi",
        text: "Vue globale pour comprendre et améliorer votre connexion à domicile.",
      },
      {
        href: "/depannage-wifi-internet-les-sables-dolonne",
        title: "Wi-Fi ne fonctionne plus",
        text: "Si la connexion devient totalement indisponible ou impossible à utiliser.",
      },
      {
        href: "/depannage-wifi-internet-les-sables-dolonne",
        title: "Installation box Internet",
        text: "Si la lenteur est liée à une nouvelle installation ou à une box mal configurée.",
      },
    ],
    faq: [
      {
        q: "Est-ce que Loko peut améliorer un Wi-Fi trop lent ?",
        a: "Oui. Loko peut intervenir à domicile pour vérifier l’installation, l’emplacement de la box, la couverture du logement et les réglages simples qui peuvent pénaliser votre usage.",
      },
      {
        q: "Est-ce que le problème vient toujours de l’opérateur ?",
        a: "Non. Parfois, la lenteur vient surtout de la disposition du logement, du placement de la box, du nombre d’appareils connectés ou d’un mauvais paramétrage local.",
      },
      {
        q: "Est-ce que Loko installe aussi les appareils sur le bon Wi-Fi ?",
        a: "Oui. L’intervention peut aussi inclure la reconnexion ou la vérification des appareils qui utilisent mal ou mal le réseau disponible.",
      },
    ],
  },
  "/aide-smartphone-les-sables-dolonne": {
    title: "Smartphone",
    seoTitle:
      "Aide smartphone aux Sables d’Olonne | Utilisation, réglages et accompagnement",
    seoDescription:
      "Loko vous aide à domicile aux Sables d’Olonne pour votre smartphone : réglages, stockage, transfert de données et prise en main simple.",
    hero: "Aide smartphone aux Sables d’Olonne, simplement",
    intro:
      "Loko vous accompagne à domicile aux Sables d’Olonne pour mieux comprendre et utiliser votre smartphone. Réglages, organisation, transfert de données ou prise en main globale : l’objectif est de rendre votre téléphone plus simple et plus agréable à utiliser. Loko accompagne aussi les seniors qui veulent reprendre confiance avec leur téléphone, à leur rythme.",
    symptoms: [
      "Téléphone difficile à comprendre ou à utiliser",
      "Stockage plein ou mal organisé",
      "Difficulté à transférer ses données",
      "Besoin d’être accompagné pour mieux utiliser son téléphone",
    ],
    help: [
      "Réglages et prise en main du smartphone",
      "Organisation et libération de stockage",
      "Transfert de données entre appareils",
      "Accompagnement simple pour gagner en autonomie",
    ],
    relatedPages: [
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Assistance numérique senior",
        text: "Pour les seniors ou personnes peu à l’aise qui veulent reprendre confiance avec le numérique.",
      },
      {
        href: "/",
        title: "Transfert de données téléphone",
        text: "Pour récupérer photos, contacts et applications lors d’un changement de téléphone.",
      },
      {
        href: "/",
        title: "Changement de téléphone",
        text: "Pour repartir sur un nouveau téléphone sans perdre ses repères ni ses données.",
      },
    ],
    faq: [
      {
        q: "Pouvez-vous configurer un nouveau téléphone ?",
        a: "Oui. Mise en service, récupération des données et accompagnement complet.",
      },
      {
        q: "Est-ce adapté si je ne suis pas à l’aise ?",
        a: "Oui. Tout est expliqué simplement.",
      },
    ],
  },
  "/depannage-ordinateur-les-sables-dolonne": {
    title: "Dépannage informatique",
    seoTitle:
      "Dépannage informatique aux Sables d’Olonne | Ordinateur à domicile — Loko",
    seoDescription:
      "Loko vous aide à domicile aux Sables d’Olonne pour les petits besoins de dépannage informatique : ordinateur lent, connexion Internet, imprimante, réglages et usage quotidien.",
    hero: "Dépannage informatique aux Sables d’Olonne, simplement à domicile",
    intro:
      "Loko vous accompagne à domicile aux Sables d’Olonne pour les petits problèmes informatiques du quotidien : ordinateur lent, connexion Internet ou Wi-Fi, imprimante, réglages simples ou aide à l’usage. L’objectif est de vous aider sans atelier et sans promesse de réparation lourde — quand une intervention simple à domicile suffit.",
    symptoms: [
      "Ordinateur difficile à utiliser ou devenu décourageant au quotidien",
      "Ordinateur lent, bloqué ou peu agréable à utiliser",
      "Difficultés avec les mails, les fichiers ou l’organisation",
      "Connexion Internet, Wi-Fi ou imprimante qui pose problème",
      "Besoin d’aide simple pour comprendre un message ou un réglage",
    ],
    help: [
      "Rendre un ordinateur plus agréable et plus simple à utiliser",
      "Aider à comprendre les messages, alertes ou réglages du quotidien",
      "Reconnecter Internet, le Wi-Fi ou une imprimante",
      "Installer ou vérifier des usages simples, sans prise de tête",
      "Expliquer les bonnes habitudes pour éviter les blocages récurrents",
    ],
    relatedPages: [
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "Ordinateur lent",
        text: "Quand l’ordinateur rame, démarre lentement ou devient pénible à utiliser au quotidien.",
      },
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "Imprimante qui ne fonctionne plus",
        text: "Quand l’imprimante n’est plus reconnue, n’imprime plus ou perd sa connexion.",
      },
      {
        href: "/depannage-wifi-internet-les-sables-dolonne",
        title: "Internet & Wi-Fi",
        text: "Si le blocage concerne surtout la connexion, la box ou le réseau à domicile.",
      },
      {
        href: "/",
        title: "Transfert de données",
        text: "Pour déplacer ou organiser des fichiers utiles entre plusieurs appareils.",
      },
    ],
    faq: [
      {
        q: "Est-ce que Loko fait de la réparation informatique lourde ?",
        a: "Non. Loko se concentre sur l’assistance numérique à domicile, l’usage quotidien, les réglages simples, la remise en route et l’accompagnement pédagogique.",
      },
      {
        q: "Pouvez-vous aider pour les mails, les fichiers et les réglages ?",
        a: "Oui. Loko peut vous aider à mieux utiliser votre ordinateur au quotidien, à organiser vos fichiers, à comprendre vos mails et à retrouver un usage plus simple.",
      },
      {
        q: "Pouvez-vous reconnecter une imprimante à mon ordinateur ?",
        a: "Oui. C’est une demande fréquente. Loko peut vérifier la connexion, remettre en place les réglages simples et vous aider à retrouver une impression fonctionnelle.",
      },
      {
        q: "Est-ce adapté si je ne suis pas à l’aise avec l’informatique ?",
        a: "Oui. L’objectif est justement de vous aider à votre rythme, avec des explications claires et rassurantes.",
      },
    ],
  },
  "/imprimante-ne-fonctionne-plus-les-sables-dolonne": {
    title: "Imprimante qui ne fonctionne plus",
    seoTitle: "Imprimante qui ne fonctionne plus aux Sables d’Olonne | Loko",
    seoDescription:
      "Loko intervient à domicile aux Sables d’Olonne si votre imprimante ne fonctionne plus : imprimante non détectée, problème de connexion, impression impossible ou blocage du quotidien.",
    hero: "Votre imprimante ne fonctionne plus aux Sables d’Olonne ?",
    intro:
      "Loko intervient à domicile aux Sables d’Olonne si votre imprimante ne fonctionne plus, n’est plus reconnue par l’ordinateur, n’imprime plus correctement ou semble bloquée après un changement de Wi-Fi, d’ordinateur ou de configuration.",
    symptoms: [
      "Imprimante non détectée par l’ordinateur",
      "Impression impossible malgré une imprimante allumée",
      "Imprimante déconnectée du Wi-Fi ou du réseau",
      "Blocage apparu après un changement de box ou d’ordinateur",
    ],
    help: [
      "Vérification de la connexion entre l’imprimante et vos appareils",
      "Aide au rétablissement d’une configuration simple",
      "Connexion de l’imprimante au bon réseau si nécessaire",
      "Explications claires pour retrouver un usage autonome",
    ],
    relatedPages: [
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "Dépannage informatique",
        text: "Aide à domicile pour l’ordinateur, les fichiers, les mails et les périphériques du quotidien.",
      },
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "Ordinateur lent",
        text: "Si l’imprimante pose problème en même temps qu’un ordinateur lent ou instable.",
      },
    ],
    faq: [
      {
        q: "Est-ce que Loko peut reconnecter une imprimante ?",
        a: "Oui. Loko peut intervenir à domicile pour vérifier la connexion de l’imprimante, la relier correctement à l’ordinateur ou au Wi-Fi et remettre un usage simple en place.",
      },
      {
        q: "Intervenez-vous après un changement de box ou d’ordinateur ?",
        a: "Oui. C’est une cause fréquente de dysfonctionnement. Une imprimante qui marchait avant peut perdre sa connexion après un changement de réseau ou de matériel.",
      },
      {
        q: "Est-ce que Loko répare l’imprimante si elle est cassée ?",
        a: "Non. Loko intervient surtout sur l’installation, la reconnexion, les réglages simples et les blocages d’usage du quotidien, pas sur la réparation matérielle lourde.",
      },
    ],
  },
  "/probleme-tv-box-les-sables-dolonne": {
    title: "TV & appareils connectés",
    seoTitle:
      "TV, box et appareils connectés aux Sables d’Olonne | Installation, connexion et aide",
    seoDescription:
      "Loko vous accompagne à domicile aux Sables d’Olonne pour la TV, la box et les appareils connectés : installation, connexion au Wi-Fi, applications, réglages et aide simple au quotidien.",
    hero: "TV, box et appareils connectés aux Sables d’Olonne : installation, connexion et accompagnement à domicile",
    intro:
      "Loko vous accompagne à domicile aux Sables d’Olonne pour tout ce qui concerne la télévision, la box TV et les appareils connectés du quotidien. Installation, connexion au Wi-Fi, problème d’application, changement de source, appareil mal branché ou fonctionnement peu clair : l’objectif est de rendre votre installation simple, fluide et agréable à utiliser.",
    symptoms: [
      "TV difficile à utiliser ou installation peu claire",
      "Box TV, décodeur ou appareil non connecté correctement",
      "Applications qui ne fonctionnent pas ou se lancent mal",
      "Problème de source, de branchement ou de connexion",
      "Besoin d’aide pour comprendre et utiliser l’ensemble plus simplement",
    ],
    help: [
      "Installation et mise en route de la télévision et des équipements associés",
      "Connexion de la TV, box ou décodeur au Wi-Fi ou au réseau",
      "Aide au branchement et au choix des bonnes sources",
      "Configuration simple des applications et usages du quotidien",
      "Explications claires pour rendre l’installation plus simple à utiliser",
    ],
    relatedPages: [
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "TV qui ne fonctionne plus",
        text: "Écran noir, aucun signal ou télévision qui ne répond plus.",
      },
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "Problème box TV",
        text: "Décodeur bloqué, chaînes indisponibles ou box TV qui ne fonctionne pas correctement.",
      },
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "Netflix ne fonctionne plus",
        text: "Application qui ne se lance pas, bug, écran noir ou problème de connexion.",
      },
      {
        href: "/depannage-wifi-internet-les-sables-dolonne",
        title: "Internet & Wi-Fi",
        text: "Si votre télévision ou vos applications dépendent d’une connexion Internet instable.",
      },
      {
        href: "/depannage-wifi-internet-les-sables-dolonne",
        title: "Installation box Internet",
        text: "Pour installer correctement votre box et connecter tous vos appareils.",
      },
    ],
    faq: [
      {
        q: "Pouvez-vous installer une télévision ou une box TV ?",
        a: "Oui. Loko peut vous aider à installer votre télévision, votre box TV ou vos appareils connectés à domicile, avec une mise en route simple et claire.",
      },
      {
        q: "Pouvez-vous connecter ma TV au Wi-Fi ?",
        a: "Oui. Loko peut connecter votre télévision au réseau Wi-Fi, vérifier la connexion et vous aider à retrouver un usage fluide.",
      },
      {
        q: "Pouvez-vous aider si mes applications comme Netflix ou YouTube fonctionnent mal ?",
        a: "Oui. Loko peut vérifier la connexion, les réglages simples et le bon fonctionnement général de votre installation pour retrouver un usage normal.",
      },
      {
        q: "Est-ce adapté si je ne suis pas à l’aise avec la télévision connectée ?",
        a: "Oui. L’objectif est justement de rendre l’installation plus simple, plus compréhensible et plus agréable à utiliser au quotidien.",
      },
    ],
  },
  "/transfert-de-donnees-les-sables-dolonne": {
    title: "Transfert de données",
    seoTitle: "Transfert de données à domicile aux Sables d’Olonne | Loko",
    seoDescription:
      "Loko vous accompagne à domicile aux Sables d’Olonne pour le transfert de données entre appareils : photos, contacts, fichiers, comptes et premiers réglages.",
    hero: "Transfert de données aux Sables d’Olonne",
    intro:
      "Loko vous aide à domicile aux Sables d’Olonne pour transférer vos données d’un appareil à un autre : photos, contacts, fichiers, comptes et premiers réglages.",
    symptoms: [
      "Changement de téléphone ou d’ordinateur",
      "Peur de perdre des photos ou des contacts",
      "Difficulté à reconnecter les comptes utiles",
      "Besoin d’un accompagnement rassurant",
    ],
    help: [
      "Préparation et sécurisation du transfert",
      "Aide à la récupération des données utiles",
      "Vérification des comptes essentiels",
      "Explications claires après l’intervention",
    ],
    relatedPages: [
      {
        href: "/",
        title: "Transfert de données téléphone",
        text: "Pour transférer simplement les données d’un ancien téléphone vers un nouveau.",
      },
      {
        href: "/",
        title: "Changement de téléphone",
        text: "Pour configurer un nouveau téléphone et retrouver vos contenus essentiels.",
      },
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "Ordinateur",
        text: "Pour être aidé sur l’usage de l’ordinateur, les fichiers et l’organisation du quotidien.",
      },
    ],
    faq: [
      {
        q: "Est-ce que toutes les données peuvent être récupérées ?",
        a: "Cela dépend des appareils et de leur état. Loko vous accompagne pour récupérer le maximum utile, de la façon la plus simple et sécurisée possible.",
      },
      {
        q: "Pouvez-vous aider après l’achat d’un nouveau téléphone ?",
        a: "Oui. C’est l’un des cas les plus fréquents pour éviter de repartir de zéro.",
      },
    ],
  },
  "/apprendre-le-numerique-les-sables-dolonne": {
    title: "Apprendre le numérique",
    seoTitle:
      "Apprendre le numérique aux Sables d’Olonne | Accompagnement simple à domicile",
    seoDescription:
      "Loko vous accompagne à domicile aux Sables d’Olonne pour apprendre le numérique simplement : ordinateur, smartphone, Internet, mails, IA et usages du quotidien.",
    hero: "Apprendre le numérique aux Sables d’Olonne, simplement et à votre rythme",
    intro:
      "Loko vous accompagne à domicile aux Sables d’Olonne pour apprendre à utiliser plus sereinement les outils numériques du quotidien. Ordinateur, smartphone, Internet, mails, intelligence artificielle ou usages de base : l’objectif est de rendre les choses plus simples, plus claires et plus accessibles. Loko accompagne aussi les seniors qui veulent reprendre confiance avec leur ordinateur, Internet ou leur TV, à leur rythme.",
    symptoms: [
      "Besoin d’apprendre à utiliser un ordinateur ou un téléphone plus sereinement",
      "Difficulté à comprendre certains usages numériques du quotidien",
      "Envie de gagner en autonomie sans stress ni langage compliqué",
      "Besoin d’un accompagnement humain, local et adapté à votre niveau",
      "Curiosité pour découvrir de nouveaux outils comme l’intelligence artificielle",
    ],
    help: [
      "Accompagnement pédagogique à domicile sur les outils numériques du quotidien",
      "Apprentissage simple de l’ordinateur, du smartphone et d’Internet",
      "Aide à la compréhension des usages utiles et concrets",
      "Découverte de nouveaux outils numériques, y compris l’IA",
      "Explications claires, à votre rythme, avec une approche rassurante",
    ],
    relatedPages: [
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Assistance numérique senior",
        text: "Accompagnement à domicile pour les seniors qui veulent reprendre confiance avec le numérique.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Découverte de l’IA",
        text: "Pour comprendre l’intelligence artificielle et apprendre à l’utiliser simplement.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre à utiliser un ordinateur Windows",
        text: "Pour mieux comprendre l’usage quotidien d’un PC Windows.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre à utiliser un MacBook",
        text: "Pour mieux utiliser un Mac au quotidien, simplement.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre à utiliser un smartphone",
        text: "Pour mieux comprendre son téléphone et gagner en autonomie.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre à utiliser Internet",
        text: "Pour comprendre la navigation, les recherches et les usages du web.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre à utiliser sa messagerie",
        text: "Pour envoyer, recevoir et retrouver ses mails plus facilement.",
      },
    ],
    faq: [
      {
        q: "Est-ce que Loko propose de la formation informatique compliquée ?",
        a: "Non. Loko propose un accompagnement numérique simple, humain et concret, adapté au niveau réel de la personne.",
      },
      {
        q: "Est-ce que c’est adapté si je débute complètement ?",
        a: "Oui. L’objectif est justement d’apprendre sans pression, avec des explications claires et un accompagnement à votre rythme.",
      },
      {
        q: "Pouvez-vous m’aider à apprendre sur mon propre matériel ?",
        a: "Oui. Loko intervient à domicile et s’appuie sur vos appareils du quotidien pour rendre l’apprentissage plus concret et utile.",
      },
      {
        q: "Est-ce que l’intelligence artificielle fait partie de cet accompagnement ?",
        a: "Oui. La découverte de l’IA peut faire partie de l’accompagnement, mais elle s’inscrit dans un ensemble plus large d’apprentissage du numérique.",
      },
    ],
  },
  "/apprendre-ia-les-sables-dolonne": {
    title: "Découverte de l’IA",
    seoTitle:
      "Découvrir l’IA aux Sables d’Olonne | Comprendre et utiliser l’intelligence artificielle",
    seoDescription:
      "Loko accompagne les particuliers aux Sables d’Olonne pour découvrir l’intelligence artificielle, comprendre ses usages et apprendre à l’utiliser simplement.",
    hero: "Découvrir l’intelligence artificielle aux Sables d’Olonne, simplement et concrètement",
    intro:
      "Loko accompagne les particuliers aux Sables d’Olonne pour découvrir l’intelligence artificielle, comprendre à quoi elle sert et apprendre à l’utiliser simplement dans la vie quotidienne. L’objectif est de rendre l’IA accessible, utile et concrète.",
    symptoms: [
      "Curiosité pour l’intelligence artificielle sans savoir par où commencer",
      "Besoin d’exemples concrets et simples",
      "Envie de comprendre ChatGPT et d’autres outils similaires",
      "Peur que ce soit trop compliqué ou trop technique",
    ],
    help: [
      "Présentation simple de l’IA et de ses usages du quotidien",
      "Découverte d’outils concrets comme ChatGPT",
      "Aide à la prise en main pas à pas",
      "Exemples utiles et adaptés à votre niveau",
      "Explications claires pour comprendre sans se sentir dépassé",
    ],
    relatedPages: [
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre le numérique",
        text: "Vue d’ensemble pour apprendre à mieux utiliser les outils numériques du quotidien.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre à utiliser un ordinateur Windows",
        text: "Pour mieux utiliser un PC et se sentir plus à l’aise avec le numérique au quotidien.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre à utiliser un smartphone",
        text: "Pour mieux comprendre son téléphone et les usages numériques du quotidien.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre à utiliser Internet",
        text: "Pour mieux comprendre les recherches, les usages du web et le contexte numérique général.",
      },
    ],
    faq: [
      {
        q: "Est-ce que c’est adapté à un débutant complet ?",
        a: "Oui. L’objectif est justement de rendre l’IA compréhensible et utile, sans langage compliqué.",
      },
      {
        q: "Faut-il déjà être bon en informatique ?",
        a: "Non. Loko part du niveau réel de la personne et avance pas à pas.",
      },
      {
        q: "Est-ce que vous pouvez montrer des usages concrets du quotidien ?",
        a: "Oui. L’accompagnement peut s’appuyer sur des exemples utiles dans la vie de tous les jours, pour rendre l’IA vraiment concrète.",
      },
    ],
  },
  "/formation-windows-les-sables-dolonne": {
    title: "Formation Windows",
    seoTitle:
      "Apprendre à utiliser un ordinateur Windows aux Sables d’Olonne | Loko",
    seoDescription:
      "Loko vous accompagne à domicile aux Sables d’Olonne pour apprendre à utiliser un ordinateur Windows simplement : fichiers, mails, navigation et bases du quotidien.",
    hero: "Apprendre à utiliser un ordinateur Windows aux Sables d’Olonne",
    intro:
      "Loko vous accompagne à domicile aux Sables d’Olonne pour apprendre à utiliser plus sereinement un ordinateur Windows. Fichiers, dossiers, mails, navigation Internet ou bases du quotidien : l’objectif est de rendre votre ordinateur plus simple à comprendre et plus agréable à utiliser.",
    symptoms: [
      "Difficulté à utiliser un ordinateur Windows au quotidien",
      "Besoin de comprendre les fichiers, dossiers ou téléchargements",
      "Manque d’aisance avec les mails ou Internet",
      "Envie d’apprendre sans stress",
    ],
    help: [
      "Apprentissage des bases d’un ordinateur Windows",
      "Aide à la compréhension des fichiers, dossiers et usages du quotidien",
      "Accompagnement sur les mails, Internet et l’organisation simple",
      "Explications claires et adaptées à votre niveau",
    ],
    relatedPages: [
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre le numérique",
        text: "Vue d’ensemble pour mieux comprendre les outils numériques du quotidien.",
      },
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "Ordinateur",
        text: "Pour être aidé concrètement sur l’usage quotidien d’un ordinateur à domicile.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre à utiliser un MacBook",
        text: "Si vous utilisez plutôt un ordinateur Apple au quotidien.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre à utiliser Internet",
        text: "Pour mieux comprendre la navigation, les recherches et les usages du web.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre à utiliser sa messagerie",
        text: "Pour envoyer, recevoir et retrouver ses mails plus facilement.",
      },
    ],
    faq: [
      {
        q: "Est-ce adapté si je débute complètement sur ordinateur ?",
        a: "Oui. Loko part de votre niveau réel et vous accompagne pas à pas, simplement.",
      },
      {
        q: "Est-ce que je peux apprendre sur mon propre PC Windows ?",
        a: "Oui. L’accompagnement se fait directement sur votre matériel pour que ce soit plus concret et utile au quotidien.",
      },
    ],
  },

  "/formation-macbook-les-sables-dolonne": {
    title: "Formation MacBook",
    seoTitle: "Apprendre à utiliser un MacBook aux Sables d’Olonne | Loko",
    seoDescription:
      "Loko vous accompagne à domicile aux Sables d’Olonne pour apprendre à utiliser un MacBook simplement : navigation, fichiers, mails et usages du quotidien.",
    hero: "Apprendre à utiliser un MacBook aux Sables d’Olonne",
    intro:
      "Loko vous accompagne à domicile aux Sables d’Olonne pour apprendre à utiliser plus sereinement un MacBook. Navigation, fichiers, mails, organisation et usages du quotidien : l’objectif est de rendre votre Mac plus clair, plus simple et plus agréable à utiliser.",
    symptoms: [
      "Difficulté à utiliser un MacBook au quotidien",
      "Besoin de comprendre les bases de macOS",
      "Manque d’aisance avec les fichiers, mails ou Internet",
      "Envie d’apprendre tranquillement",
    ],
    help: [
      "Apprentissage simple des bases du MacBook",
      "Aide à la compréhension des fichiers, dossiers et usages du quotidien",
      "Accompagnement sur Internet, mails et organisation",
      "Explications claires adaptées à votre niveau",
    ],
    relatedPages: [
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre le numérique",
        text: "Vue d’ensemble pour apprendre à utiliser les outils numériques du quotidien.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre à utiliser un ordinateur Windows",
        text: "Si vous utilisez aussi ou plutôt un PC Windows.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre à utiliser Internet",
        text: "Pour mieux comprendre la navigation et les usages du web.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre à utiliser sa messagerie",
        text: "Pour mieux gérer vos mails au quotidien sur votre Mac.",
      },
    ],
    faq: [
      {
        q: "Est-ce adapté si je débute complètement sur Mac ?",
        a: "Oui. Loko vous accompagne à votre rythme pour rendre l’utilisation du Mac plus simple et plus rassurante.",
      },
      {
        q: "Puis-je apprendre directement sur mon propre MacBook ?",
        a: "Oui. L’apprentissage se fait directement sur votre matériel pour que ce soit concret et utile dans la vie de tous les jours.",
      },
    ],
  },

  "/formation-smartphone-les-sables-dolonne": {
    title: "Formation smartphone",
    seoTitle: "Apprendre à utiliser un smartphone aux Sables d’Olonne | Loko",
    seoDescription:
      "Loko vous accompagne à domicile aux Sables d’Olonne pour apprendre à utiliser un smartphone simplement : appels, messages, photos, applications et bases du quotidien.",
    hero: "Apprendre à utiliser un smartphone aux Sables d’Olonne",
    intro:
      "Loko vous accompagne à domicile aux Sables d’Olonne pour apprendre à utiliser plus sereinement un smartphone. Appels, messages, photos, applications et usages du quotidien : l’objectif est de rendre votre téléphone plus simple à comprendre et plus agréable à utiliser.",
    symptoms: [
      "Difficulté à utiliser un smartphone au quotidien",
      "Besoin d’aide pour les appels, messages ou applications",
      "Manque d’aisance avec les réglages de base",
      "Envie d’apprendre à votre rythme, sans stress",
    ],
    help: [
      "Apprentissage simple des bases du smartphone",
      "Aide à la compréhension des appels, messages et applications",
      "Accompagnement sur les réglages utiles du quotidien",
      "Explications claires et adaptées à votre niveau",
    ],
    relatedPages: [
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre le numérique",
        text: "Vue d’ensemble pour apprendre à mieux utiliser les outils numériques du quotidien.",
      },
      {
        href: "/",
        title: "Smartphone",
        text: "Pour être aidé concrètement sur l’utilisation et les réglages du téléphone au quotidien.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Découverte de l’IA",
        text: "Pour découvrir l’intelligence artificielle simplement sur vos appareils du quotidien.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre à utiliser Internet",
        text: "Pour mieux naviguer et faire des recherches sur le web depuis votre téléphone.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre à utiliser sa messagerie",
        text: "Pour consulter, envoyer et retrouver vos mails plus facilement sur smartphone.",
      },
    ],
    faq: [
      {
        q: "Est-ce adapté si je débute complètement avec mon téléphone ?",
        a: "Oui. Loko part de votre niveau réel et vous aide pas à pas.",
      },
      {
        q: "Puis-je apprendre directement sur mon propre smartphone ?",
        a: "Oui. L’accompagnement se fait directement sur votre appareil pour que ce soit concret et utile au quotidien.",
      },
    ],
  },

  "/apprendre-internet-les-sables-dolonne": {
    title: "Apprendre Internet",
    seoTitle: "Apprendre à utiliser Internet aux Sables d’Olonne | Loko",
    seoDescription:
      "Loko vous accompagne à domicile aux Sables d’Olonne pour apprendre à utiliser Internet simplement : navigation, recherches, sites web et usages du quotidien.",
    hero: "Apprendre à utiliser Internet aux Sables d’Olonne",
    intro:
      "Loko vous accompagne à domicile aux Sables d’Olonne pour apprendre à utiliser Internet plus sereinement. Navigation, recherches, compréhension des sites web et usages du quotidien : l’objectif est de rendre Internet plus clair, plus simple et plus utile.",
    symptoms: [
      "Difficulté à naviguer sur Internet",
      "Besoin d’aide pour faire des recherches utiles",
      "Manque d’aisance avec les sites web du quotidien",
      "Envie de mieux comprendre le fonctionnement d’Internet",
    ],
    help: [
      "Apprentissage simple de la navigation Internet",
      "Aide pour faire des recherches claires et utiles",
      "Compréhension des sites web et des usages du quotidien",
      "Explications simples pour gagner en autonomie",
    ],
    relatedPages: [
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre le numérique",
        text: "Vue d’ensemble pour apprendre à mieux utiliser les outils numériques du quotidien.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre à utiliser un ordinateur Windows",
        text: "Pour mieux utiliser Internet sur un PC Windows au quotidien.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre à utiliser un smartphone",
        text: "Pour mieux utiliser Internet depuis votre téléphone.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre à utiliser sa messagerie",
        text: "Pour mieux comprendre les liens entre Internet, messagerie et usages quotidiens.",
      },
    ],
    faq: [
      {
        q: "Est-ce que vous pouvez m’apprendre à faire des recherches sur Internet ?",
        a: "Oui. Loko peut vous aider à mieux comprendre la navigation, les recherches et les usages concrets d’Internet au quotidien.",
      },
      {
        q: "Est-ce adapté si je ne suis pas à l’aise avec le web ?",
        a: "Oui. Tout est expliqué simplement, à votre rythme, sans langage compliqué.",
      },
    ],
  },

  "/apprendre-mails-les-sables-dolonne": {
    title: "Apprendre les mails",
    seoTitle: "Apprendre à utiliser sa messagerie aux Sables d’Olonne | Loko",
    seoDescription:
      "Loko vous accompagne à domicile aux Sables d’Olonne pour apprendre à utiliser votre messagerie simplement : lire, envoyer, répondre et retrouver vos mails.",
    hero: "Apprendre à utiliser sa messagerie aux Sables d’Olonne",
    intro:
      "Loko vous accompagne à domicile aux Sables d’Olonne pour apprendre à utiliser plus sereinement votre messagerie. Lire, envoyer, répondre, retrouver ses mails et mieux comprendre le fonctionnement général : l’objectif est de rendre cet usage plus simple et plus clair au quotidien.",
    symptoms: [
      "Difficulté à lire, envoyer ou retrouver ses mails",
      "Manque d’aisance avec la messagerie du quotidien",
      "Peur de faire une erreur ou de perdre un message important",
      "Besoin d’un accompagnement simple et rassurant",
    ],
    help: [
      "Apprentissage simple des bases de la messagerie",
      "Aide pour lire, envoyer, répondre et retrouver ses mails",
      "Compréhension claire du fonctionnement général d’une boîte mail",
      "Explications adaptées à votre niveau et à votre rythme",
    ],
    relatedPages: [
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre le numérique",
        text: "Vue d’ensemble pour mieux comprendre les outils numériques du quotidien.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre à utiliser un ordinateur Windows",
        text: "Pour mieux gérer votre messagerie depuis un PC Windows.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre à utiliser un smartphone",
        text: "Pour mieux consulter et envoyer vos mails depuis votre téléphone.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre à utiliser Internet",
        text: "Pour mieux comprendre les liens entre navigation web et messagerie.",
      },
    ],
    faq: [
      {
        q: "Est-ce que vous pouvez m’apprendre à envoyer et retrouver mes mails ?",
        a: "Oui. Loko peut vous accompagner pas à pas pour rendre l’usage de votre messagerie plus simple et plus rassurant.",
      },
      {
        q: "Est-ce adapté si je suis souvent perdu avec mes mails ?",
        a: "Oui. L’objectif est justement de clarifier cet usage du quotidien avec des explications simples et concrètes.",
      },
    ],
  },

  "/assistance-numerique-senior-les-sables-dolonne": {
    title: "Assistance numérique senior",
    seoTitle: "Assistance numérique senior aux Sables d’Olonne | Loko",
    seoDescription:
      "Loko accompagne les seniors à domicile aux Sables d’Olonne pour utiliser plus simplement smartphone, ordinateur, Internet, imprimante, TV et services numériques du quotidien.",
    hero: "Assistance numérique senior aux Sables d’Olonne",
    intro:
      "Loko aide les seniors, retraités ou personnes peu à l’aise avec le numérique à reprendre confiance, à domicile, à leur rythme. Smartphone, ordinateur, Wi-Fi, box Internet, imprimante, TV connectée ou démarches simples du quotidien : l’objectif est de rendre le numérique plus clair, plus rassurant et plus accessible. Loko intervient aux Sables d’Olonne, à Olonne-sur-Mer, au Château-d’Olonne, à L’Île-d’Olonne et dans les alentours.",
    symptoms: [
      "Utiliser un smartphone plus sereinement",
      "Comprendre les réglages essentiels du téléphone ou de l’ordinateur",
      "Remettre Internet ou le Wi-Fi en service",
      "Connecter une imprimante ou la remettre en route",
      "Utiliser une TV connectée ou une application du quotidien",
      "Transférer des photos, contacts ou données entre appareils",
      "Apprendre les bases sans se sentir jugé ou dépassé",
    ],
    help: [
      "Explications simples, adaptées à votre rythme",
      "Intervention à domicile, dans un cadre calme et rassurant",
      "Possibilité de noter les étapes importantes pour reprendre ensuite",
      "Accompagnement humain et local",
      "Une aide qui respecte votre niveau, sans infantiliser",
    ],
    relatedPages: [
      {
        href: "/zone-intervention",
        title: "Zone d’intervention",
        text: "Voir les communes desservies autour des Sables d’Olonne.",
      },
      {
        href: "/",
        title: "Aide smartphone",
        text: "Pour mieux comprendre et utiliser votre téléphone au quotidien.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Apprendre le numérique",
        text: "Pour découvrir les outils numériques du quotidien, simplement et à votre rythme.",
      },
      {
        href: "/depannage-wifi-internet-les-sables-dolonne",
        title: "Internet & Wi-Fi",
        text: "Si le blocage concerne surtout la connexion, la box ou le réseau à domicile.",
      },
    ],
    faq: [
      {
        q: "Est-ce réservé aux seniors ?",
        a: "Non. Loko accompagne toute personne qui souhaite une aide claire et humaine avec le numérique. Cette page s’adresse surtout aux seniors, retraités ou personnes peu à l’aise, sans les mettre dans une case.",
      },
      {
        q: "Pouvez-vous aider avec un smartphone ?",
        a: "Oui. Loko peut vous aider à mieux comprendre votre téléphone, ses réglages essentiels, le transfert de données ou la prise en main globale, à domicile.",
      },
      {
        q: "Pouvez-vous aider avec Internet ou la box ?",
        a: "Oui. Loko intervient pour remettre en service une connexion Wi-Fi, reconnecter des appareils ou simplifier une installation Internet devenue confuse.",
      },
      {
        q: "Comment prendre rendez-vous ?",
        a: "Le plus simple est d’appeler Loko au 07 63 13 15 15 ou de choisir un créneau en ligne via la page rendez-vous.",
      },
    ],
  },
};

// ───────────────────────────────────────────────────────────────────
// Pages "piliers" (services forts) — ciblées Les Sables d'Olonne.
// Même structure que problemPages -> rendues par <ProblemPage /> + SEO auto.
// ───────────────────────────────────────────────────────────────────
const SERVICE_PILLARS = {
  "/depannage-informatique-les-sables-dolonne": {
    title: "Dépannage informatique",
    art: "ordinateur",
    seoTitle:
      "Dépannage informatique aux Sables d’Olonne | Ordinateur, imprimante à domicile — Loko",
    seoDescription:
      "Dépannage informatique à domicile aux Sables d’Olonne : ordinateur lent, imprimante, écran, virus et sécurité, mails ou fichiers introuvables. Diagnostic clair, sans passer par une boutique.",
    hero:
      "Un souci d’ordinateur ou d’imprimante aux Sables d’Olonne ? Loko remet tout en route à domicile.",
    intro:
      "Loko intervient à domicile aux Sables d’Olonne pour le dépannage informatique du quotidien : ordinateur lent, imprimante, écran ou périphérique qui ne répond plus, virus ou sécurité, mails et fichiers introuvables. Pas besoin de boutique ni d’entreprise informatique : on identifie la cause chez vous et on remet tout en marche.",
    symptoms: [
      "Ordinateur lent, qui se bloque ou met longtemps à démarrer",
      "Imprimante qui n’imprime plus ou n’est plus reconnue",
      "Écran, clavier ou périphérique qui ne répond plus",
      "Virus, pop-ups, arnaque par mail ou doute sur la sécurité",
      "Mails, photos ou fichiers introuvables ou mal organisés",
      "Appareil qui ne répond plus après une mise à jour ou un changement",
    ],
    help: [
      "Diagnostic clair de la panne, à domicile",
      "Remise en route de l’ordinateur, de l’imprimante ou des périphériques",
      "Suppression de virus et conseils de sécurité contre les arnaques",
      "Nettoyage et optimisation pour retrouver un appareil fluide",
      "Explications simples pour comprendre ce qui s’était passé",
      "Conseils pour éviter que le problème revienne",
    ],
    relatedPages: [
      {
        href: "/depannage-wifi-internet-les-sables-dolonne",
        title: "Dépannage Wi-Fi & Internet",
        text: "Box, connexion instable, réseau faible : on remet l’accès en place.",
      },
      {
        href: "/depannage-tv-box-les-sables-dolonne",
        title: "Dépannage TV & appareils connectés",
        text: "TV, box, streaming : on remet l’image et le son en place.",
      },
      {
        href: "/",
        title: "Assistance numérique à domicile",
        text: "Vue d’ensemble de l’accompagnement Loko aux Sables d’Olonne.",
      },
    ],
    faq: [
      {
        q: "Faut-il apporter l’ordinateur ou venez-vous à domicile ?",
        a: "Loko se déplace chez vous aux Sables d’Olonne : tout se fait à domicile, sans avoir à transporter votre matériel.",
      },
      {
        q: "Réparez-vous le matériel cassé ?",
        a: "Loko se concentre sur le dépannage, le réglage et la remise en route. En cas de panne purement matérielle, vous êtes orienté vers la bonne solution.",
      },
      {
        q: "Le dépannage est-il éligible au crédit d’impôt ?",
        a: "Pour les prestations d’assistance éligibles au service à la personne, vous pouvez bénéficier d’un crédit d’impôt de 50 %.",
      },
      {
        q: "Combien de temps dure une intervention ?",
        a: "Cela dépend du problème, mais l’objectif est toujours d’aller à l’essentiel et de vous laisser avec une situation claire.",
      },
      {
        q: "Intervenez-vous en cas de virus ou de problème de sécurité ?",
        a: "Oui : suppression de virus et de pop-ups, vérification des mots de passe et conseils simples pour vous protéger des arnaques par mail ou par téléphone.",
      },
    ],
  },

  "/depannage-wifi-internet-les-sables-dolonne": {
    title: "Dépannage Wi-Fi & Internet",
    art: "wifi",
    seoTitle:
      "Dépannage Wi-Fi et Internet aux Sables d’Olonne | Box, connexion, réseau — Loko",
    seoDescription:
      "Loko remet votre Internet en place à domicile aux Sables d’Olonne : installation de box, Wi-Fi faible ou instable, appareils qui ne se connectent plus. Simple et efficace.",
    hero:
      "Internet en panne ou Wi-Fi capricieux aux Sables d’Olonne ? Loko remet tout en place à domicile.",
    intro:
      "Loko intervient à domicile aux Sables d’Olonne pour vos soucis d’Internet et de Wi-Fi : nouvelle box à installer, connexion qui coupe, réseau trop faible dans certaines pièces, appareils qui refusent de se connecter. L’objectif est de retrouver une connexion stable, claire et agréable à utiliser.",
    symptoms: [
      "Internet qui coupe, rame ou devient pénible à utiliser",
      "Wi-Fi faible ou absent dans certaines pièces du logement",
      "Nouvelle box ou changement d’opérateur difficile à mettre en place",
      "Téléphone, TV ou ordinateur qui ne se connecte plus correctement",
      "Installation réseau confuse ou peu claire au quotidien",
    ],
    help: [
      "Installation et mise en service de votre box Internet",
      "Connexion de tous vos appareils au bon réseau Wi-Fi",
      "Amélioration simple d’un Wi-Fi trop faible ou irrégulier",
      "Explications claires pour rester autonome ensuite",
      "Conseils pour une installation stable et durable",
    ],
    relatedPages: [
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "Dépannage informatique",
        text: "Ordinateur, imprimante, TV : on remet tout en route à domicile.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Formation & aide informatique",
        text: "Apprendre à utiliser ses appareils sereinement, à son rythme.",
      },
      {
        href: "/",
        title: "Assistance numérique à domicile",
        text: "Vue d’ensemble de l’accompagnement Loko aux Sables d’Olonne.",
      },
    ],
    faq: [
      {
        q: "Loko remplace-t-il mon opérateur Internet ?",
        a: "Non, Loko n’est pas un opérateur. L’intervention sert à installer, comprendre, reconnecter ou améliorer votre installation à domicile.",
      },
      {
        q: "Pouvez-vous connecter tous mes appareils ?",
        a: "Oui : TV, smartphone, ordinateur ou imprimante, l’objectif est que tout fonctionne ensemble simplement.",
      },
      {
        q: "Intervenez-vous après l’installation d’une nouvelle box ?",
        a: "Oui, c’est un cas fréquent. Loko remet l’installation en place et reconnecte correctement vos équipements.",
      },
      {
        q: "Est-ce éligible au crédit d’impôt de 50 % ?",
        a: "Pour les prestations éligibles au service à la personne, vous pouvez bénéficier d’un crédit d’impôt de 50 %.",
      },
    ],
  },

  "/formation-informatique-seniors-les-sables-dolonne": {
    title: "Formation & aide informatique",
    art: "formation",
    seoTitle:
      "Formation informatique et aide aux seniors aux Sables d’Olonne | Loko",
    seoDescription:
      "Loko vous apprend à utiliser ordinateur, smartphone, Internet et IA à domicile aux Sables d’Olonne, à votre rythme. Accompagnement patient et clair, idéal pour les seniors.",
    hero:
      "Envie d’être plus à l’aise avec vos appareils aux Sables d’Olonne ? Loko vous accompagne à votre rythme, à domicile.",
    intro:
      "Loko propose à domicile aux Sables d’Olonne un accompagnement et une formation au numérique adaptés à votre rythme : ordinateur, smartphone, tablette, Internet, mails ou intelligence artificielle. L’approche est patiente et claire — idéale pour les seniors qui veulent reprendre confiance avec leurs appareils.",
    symptoms: [
      "Smartphone ou ordinateur intimidant ou difficile à utiliser",
      "Peur de “mal faire” ou de tout dérégler",
      "Mails, photos ou applications difficiles à gérer",
      "Envie de comprendre Internet et l’IA simplement",
      "Besoin d’avancer à son rythme, sans se sentir pressé",
    ],
    help: [
      "Accompagnement patient, vraiment à votre rythme",
      "Apprentissage concret sur vos propres appareils",
      "Explications claires et accessibles",
      "Repères simples pour se souvenir des étapes",
      "Gain d’autonomie et de confiance au quotidien",
    ],
    relatedPages: [
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "Dépannage informatique",
        text: "Ordinateur, imprimante, TV : on remet tout en route à domicile.",
      },
      {
        href: "/depannage-wifi-internet-les-sables-dolonne",
        title: "Dépannage Wi-Fi & Internet",
        text: "Box, connexion, réseau faible : on remet l’accès en place.",
      },
      {
        href: "/",
        title: "Assistance numérique à domicile",
        text: "Vue d’ensemble de l’accompagnement Loko aux Sables d’Olonne.",
      },
    ],
    faq: [
      {
        q: "Faut-il déjà s’y connaître un minimum ?",
        a: "Non, pas du tout. L’accompagnement part de là où vous en êtes, sans jugement.",
      },
      {
        q: "Apprend-on sur mes propres appareils ?",
        a: "Oui, c’est l’idéal : on avance sur votre matériel, dans votre environnement, pour que ce soit utile au quotidien.",
      },
      {
        q: "C’est adapté aux personnes âgées ?",
        a: "Oui. L’approche est pensée pour être rassurante, patiente et facile à suivre, en particulier pour les seniors.",
      },
      {
        q: "La formation est-elle éligible au crédit d’impôt ?",
        a: "Pour les prestations éligibles au service à la personne, vous pouvez bénéficier d’un crédit d’impôt de 50 %.",
      },
    ],
  },

  "/depannage-smartphone-les-sables-dolonne": {
    title: "Aide & dépannage smartphone",
    art: "smartphone",
    seoTitle:
      "Aide et dépannage smartphone aux Sables d’Olonne | iPhone, Android à domicile — Loko",
    seoDescription:
      "Loko vous aide avec votre smartphone à domicile aux Sables d’Olonne : iPhone ou Android difficile à utiliser, stockage plein, réglages, applications, mails. À votre rythme.",
    hero:
      "Smartphone compliqué ou capricieux aux Sables d’Olonne ? Loko vous aide à le prendre en main à domicile.",
    intro:
      "Loko intervient à domicile aux Sables d’Olonne pour tout ce qui concerne votre smartphone : iPhone ou Android difficile à utiliser, mémoire saturée, réglages incompréhensibles, applications, messagerie, photos ou contacts. L’objectif est que votre téléphone redevienne simple et agréable, avec des explications claires.",
    symptoms: [
      "Smartphone lent, saturé ou « mémoire pleine »",
      "Réglages, notifications ou écran difficiles à comprendre",
      "Applications, mails ou messagerie compliqués à utiliser",
      "Photos et contacts mal organisés ou introuvables",
      "Peur de mal faire ou de tout dérégler sur le téléphone",
    ],
    help: [
      "Prise en main simple de votre iPhone ou Android",
      "Nettoyage et libération de l’espace de stockage",
      "Réglages adaptés à votre confort (taille du texte, sons…)",
      "Installation et configuration de vos applications utiles",
      "Explications claires pour rester autonome ensuite",
    ],
    relatedPages: [
      {
        href: "/transfert-donnees-sauvegarde-les-sables-dolonne",
        title: "Données & transfert",
        text: "Changement de téléphone, sauvegarde, photos : on transfère tout en sécurité.",
      },
      {
        href: "/formation-informatique-seniors-les-sables-dolonne",
        title: "Formation & aide informatique",
        text: "Apprendre à utiliser ses appareils sereinement, à son rythme.",
      },
      {
        href: "/",
        title: "Assistance numérique à domicile",
        text: "Vue d’ensemble de l’accompagnement Loko aux Sables d’Olonne.",
      },
    ],
    faq: [
      {
        q: "Intervenez-vous sur iPhone et Android ?",
        a: "Oui, Loko vous aide aussi bien sur iPhone que sur les smartphones Android, à domicile aux Sables d’Olonne.",
      },
      {
        q: "Mon téléphone est plein, pouvez-vous m’aider ?",
        a: "Oui : on fait le tri, on libère de l’espace et on met en place de quoi éviter que ça se reproduise.",
      },
      {
        q: "Pouvez-vous m’apprendre à m’en servir, pas seulement le réparer ?",
        a: "Bien sûr. L’accompagnement peut être uniquement de la prise en main, à votre rythme.",
      },
      {
        q: "Est-ce éligible au crédit d’impôt de 50 % ?",
        a: "Pour les prestations éligibles au service à la personne, vous pouvez bénéficier d’un crédit d’impôt de 50 %.",
      },
    ],
  },

  "/depannage-tv-box-les-sables-dolonne": {
    title: "Dépannage TV & appareils connectés",
    art: "tv",
    seoTitle:
      "Dépannage TV et box aux Sables d’Olonne | Télévision, streaming, objets connectés — Loko",
    seoDescription:
      "Loko remet votre TV en marche à domicile aux Sables d’Olonne : écran noir, plus de signal, box TV, Netflix ou applications qui ne fonctionnent plus, objets connectés à installer.",
    hero:
      "Télévision, box ou appareil connecté qui ne répond plus aux Sables d’Olonne ? Loko remet tout en marche à domicile.",
    intro:
      "Loko intervient à domicile aux Sables d’Olonne pour votre télévision et vos appareils connectés : écran noir, plus aucun signal, mauvaise source, box TV, services de streaming comme Netflix qui ne se lancent plus, ou nouvel objet connecté à installer. L’objectif est de tout remettre en marche simplement et de vous montrer comment vous en servir.",
    symptoms: [
      "Télévision avec écran noir, « aucun signal » ou mauvaise source",
      "Box TV qui ne s’allume plus ou ne répond plus",
      "Netflix, Prime ou autre application qui ne se lance plus",
      "Télécommande, son ou image mal réglés",
      "Nouvel appareil connecté (TV, enceinte, caméra) à installer",
    ],
    help: [
      "Remise en route de la télévision et de la box TV",
      "Reconfiguration des sources, du son et de l’image",
      "Réinstallation de vos applications de streaming",
      "Installation et mise en service d’appareils connectés",
      "Explications simples pour tout reprendre en main",
    ],
    relatedPages: [
      {
        href: "/depannage-wifi-internet-les-sables-dolonne",
        title: "Dépannage Wi-Fi & Internet",
        text: "Box, connexion instable, réseau faible : on remet l’accès en place.",
      },
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "Dépannage informatique",
        text: "Ordinateur, imprimante, fichiers : on remet tout en route à domicile.",
      },
      {
        href: "/",
        title: "Assistance numérique à domicile",
        text: "Vue d’ensemble de l’accompagnement Loko aux Sables d’Olonne.",
      },
    ],
    faq: [
      {
        q: "Ma TV affiche « aucun signal », pouvez-vous intervenir ?",
        a: "Oui, c’est un cas fréquent. Loko identifie la cause (source, câble, box…) et remet l’image en place à domicile.",
      },
      {
        q: "Réparez-vous l’écran d’une télévision cassée ?",
        a: "Loko se concentre sur le réglage, la configuration et la remise en route. En cas de panne purement matérielle, vous êtes orienté vers la bonne solution.",
      },
      {
        q: "Pouvez-vous réinstaller Netflix ou mes applications ?",
        a: "Oui : on reconnecte la TV ou la box et on remet vos applications de streaming en fonctionnement.",
      },
      {
        q: "Est-ce éligible au crédit d’impôt de 50 % ?",
        a: "Pour les prestations éligibles au service à la personne, vous pouvez bénéficier d’un crédit d’impôt de 50 %.",
      },
    ],
  },

  "/transfert-donnees-sauvegarde-les-sables-dolonne": {
    title: "Transfert de données & sauvegarde",
    art: "data",
    seoTitle:
      "Transfert de données et sauvegarde aux Sables d’Olonne | Changement d’appareil — Loko",
    seoDescription:
      "Loko sécurise et transfère vos données à domicile aux Sables d’Olonne : changement de téléphone ou d’ordinateur, sauvegarde de photos, contacts et fichiers. Rien de perdu.",
    hero:
      "Changement de téléphone ou d’ordinateur aux Sables d’Olonne ? Loko transfère et sauvegarde vos données à domicile.",
    intro:
      "Loko intervient à domicile aux Sables d’Olonne lors d’un changement d’appareil ou pour mettre vos données à l’abri : transfert de photos, contacts, messages et fichiers d’un ancien téléphone ou ordinateur vers le nouveau, mise en place d’une sauvegarde fiable. L’objectif est simple : ne rien perdre et partir l’esprit tranquille.",
    symptoms: [
      "Nouveau téléphone ou ordinateur à configurer",
      "Peur de perdre ses photos, contacts ou documents",
      "Ancien appareil à vider en toute sécurité",
      "Aucune sauvegarde en place aujourd’hui",
      "Données éparpillées entre plusieurs appareils",
    ],
    help: [
      "Transfert complet vers votre nouvel appareil",
      "Récupération des photos, contacts, messages et fichiers",
      "Mise en place d’une sauvegarde simple et fiable",
      "Effacement sécurisé de l’ancien appareil si besoin",
      "Explications claires pour garder vos données à l’abri",
    ],
    relatedPages: [
      {
        href: "/depannage-smartphone-les-sables-dolonne",
        title: "Aide & dépannage smartphone",
        text: "iPhone ou Android difficile à utiliser : on vous accompagne pas à pas.",
      },
      {
        href: "/depannage-informatique-les-sables-dolonne",
        title: "Dépannage informatique",
        text: "Ordinateur, imprimante, fichiers : on remet tout en route à domicile.",
      },
      {
        href: "/",
        title: "Assistance numérique à domicile",
        text: "Vue d’ensemble de l’accompagnement Loko aux Sables d’Olonne.",
      },
    ],
    faq: [
      {
        q: "Je change de téléphone, vais-je perdre mes photos ?",
        a: "Non : Loko transfère vos photos, contacts et messages vers le nouveau téléphone et vérifie que tout est bien là avant de finir.",
      },
      {
        q: "Pouvez-vous transférer d’un ordinateur à un autre ?",
        a: "Oui, d’un téléphone ou d’un ordinateur vers un nouvel appareil, en gardant vos fichiers organisés.",
      },
      {
        q: "Mettez-vous en place une sauvegarde automatique ?",
        a: "Oui : on installe une sauvegarde simple et fiable pour que vos données restent à l’abri sans y penser.",
      },
      {
        q: "Est-ce éligible au crédit d’impôt de 50 % ?",
        a: "Pour les prestations éligibles au service à la personne, vous pouvez bénéficier d’un crédit d’impôt de 50 %.",
      },
    ],
  },
};

// ───────────────────────────────────────────────────────────────────
// Pages "villes" autour des Sables d'Olonne — contenu localisé par commune.
// ───────────────────────────────────────────────────────────────────
const NEARBY_CITIES = [
  {
    slug: "olonne-sur-mer",
    name: "Olonne-sur-Mer",
    timeMin: 5,
    neighbors: ["Les Sables d’Olonne", "L’Île-d’Olonne"],
    local:
      "Au nord de l’agglomération des Sables d’Olonne, Olonne-sur-Mer mêle bourg ancien, lotissements récents et bordure de forêt. Loko se déplace à domicile dans tous ces quartiers, de La Pironnière au centre-bourg, pour dépanner et accompagner sur Internet, ordinateur, smartphone et TV.",
  },
  {
    slug: "chateau-d-olonne",
    name: "Château-d’Olonne",
    timeMin: 5,
    neighbors: ["Les Sables d’Olonne", "Sainte-Foy"],
    local:
      "Côté est de l’agglomération, le Château-d’Olonne s’étend des quartiers résidentiels jusqu’au littoral, de Tanchet à la Pierre Levée. Loko intervient à domicile sur toute la commune pour le Wi-Fi capricieux, l’ordinateur lent, la box, le smartphone ou la télévision.",
  },
  {
    slug: "l-ile-d-olonne",
    name: "L’Île-d’Olonne",
    timeMin: 10,
    neighbors: ["Olonne-sur-Mer", "Vairé"],
    local:
      "Connue pour ses marais salants et sa réserve ornithologique, L’Île-d’Olonne est un secteur plus rural à une dizaine de minutes des Sables. Loko vient jusque chez vous, y compris dans les hameaux un peu isolés, pour régler vos soucis d’Internet, d’appareils et d’écrans.",
  },
  {
    slug: "vaire",
    name: "Vairé",
    timeMin: 15,
    neighbors: ["L’Île-d’Olonne", "Brem-sur-Mer"],
    local:
      "Petit village au nord-est, entre Olonne et Brem, Vairé garde un caractère rural et tranquille. Plutôt que de vous déplacer jusqu’aux Sables, vous profitez d’une assistance et d’un dépannage informatique directement à domicile, à votre rythme.",
  },
  {
    slug: "sainte-foy",
    name: "Sainte-Foy",
    timeMin: 12,
    neighbors: ["Château-d’Olonne", "Talmont-Saint-Hilaire"],
    local:
      "Commune paisible juste à l’est du Château-d’Olonne, Sainte-Foy est essentiellement résidentielle et entourée de campagne. Loko s’y déplace à domicile pour installer, réparer et expliquer vos ordinateurs, box, smartphones et téléviseurs, simplement.",
  },
  {
    slug: "brem-sur-mer",
    name: "Brem-sur-Mer",
    timeMin: 18,
    neighbors: ["Vairé", "Saint-Mathurin"],
    local:
      "Station familiale réputée pour ses plages et ses vignes des Fiefs Vendéens, Brem-sur-Mer accueille de nombreuses résidences principales et secondaires. Loko intervient à domicile pour les habitants à l’année comme pour les propriétaires de passage, du Wi-Fi à la TV.",
  },
  {
    slug: "saint-mathurin",
    name: "Saint-Mathurin",
    timeMin: 12,
    neighbors: ["Olonne-sur-Mer", "Brem-sur-Mer"],
    local:
      "Village au nord des Sables, le long de l’Auzance, Saint-Mathurin alterne bourg et secteurs pavillonnaires. Loko vient chez vous régler les blocages du quotidien — Wi-Fi, ordinateur, smartphone, télévision — calmement et sans vocabulaire technique.",
  },
  {
    slug: "talmont-saint-hilaire",
    name: "Talmont-Saint-Hilaire",
    timeMin: 18,
    neighbors: ["Château-d’Olonne", "Jard-sur-Mer"],
    local:
      "Dominée par son château médiéval et tournée vers la mer avec le port de Bourgenay et la plage du Veillon, Talmont-Saint-Hilaire est une commune étendue. Loko couvre aussi bien le bourg que les secteurs côtiers pour l’assistance numérique à domicile.",
  },
  {
    slug: "les-achards",
    name: "Les Achards",
    timeMin: 20,
    neighbors: ["Sainte-Foy", "Nieul-le-Dolent"],
    local:
      "Bourg commerçant de l’est sablais, né du rapprochement de La Mothe-Achard et de La Chapelle-Achard, Les Achards est un point d’ancrage pratique avec sa gare. Loko s’y déplace à domicile pour dépanner et accompagner sur l’ensemble de vos appareils.",
  },
  {
    slug: "nieul-le-dolent",
    name: "Nieul-le-Dolent",
    timeMin: 20,
    neighbors: ["Les Achards", "Château-d’Olonne"],
    local:
      "Commune rurale au nord-est, entre Les Achards et l’agglomération des Sables, Nieul-le-Dolent est calme et résidentielle. Loko vient à domicile y résoudre vos soucis numériques, du Wi-Fi capricieux à l’ordinateur qui rame, sans que vous ayez à vous déplacer.",
  },
  {
    slug: "jard-sur-mer",
    name: "Jard-sur-Mer",
    timeMin: 25,
    neighbors: ["Talmont-Saint-Hilaire", "Saint-Vincent-sur-Jard"],
    local:
      "Station balnéaire prisée pour son port de plaisance, ses plages et sa forêt, Jard-sur-Mer compte beaucoup de résidences secondaires. Loko se déplace à domicile pour l’installation, le dépannage et la prise en main, résidents à l’année comme estivants.",
  },
];

const BUSINESS_AREAS = [
  { "@type": "City", name: "Les Sables d’Olonne" },
  ...NEARBY_CITIES.map((city) => ({
    "@type": "City",
    name: city.name,
  })),
];

// Lien interne vers la page d'une commune voisine (maillage entre pages villes).
// "Les Sables d’Olonne" pointe vers l'accueil ; une commune sans page dédiée
// reste en texte simple (pas de lien).
function cityNeighborHref(name) {
  if (name === "Les Sables d’Olonne") return "/";
  const match = NEARBY_CITIES.find((c) => c.name === name);
  return match ? `/aide-informatique-${match.slug}` : null;
}

function makeCityPage(c) {
  const enrichment = getCityEnrichment(c.slug);
  return {
    title: `Assistance numérique à domicile à ${c.name}`,
    seoTitle: `Assistance numérique à domicile à ${c.name} | Loko`,
    seoDescription:
      enrichment?.seoDescription ||
      `Loko vous aide à domicile à ${c.name} (à ~${c.timeMin} min des Sables d’Olonne) : Internet, Wi-Fi, smartphone, ordinateur, TV et dépannage du quotidien. Crédit d’impôt 50 %.`,
    intro: c.local,
    faq: enrichment?.faq || [],
    citySlug: c.slug,
  };
}

const CITY_PAGES = NEARBY_CITIES.reduce((acc, c) => {
  acc[`/aide-informatique-${c.slug}`] = makeCityPage(c);
  return acc;
}, {});

Object.assign(problemPages, SERVICE_PILLARS, CITY_PAGES);

const problemCards = [
  {
    href: "/depannage-wifi-internet-les-sables-dolonne",
    label: "Internet & Wi-Fi",
    desc: "Connexion instable, Wi-Fi lent ou box à installer : on remet tout en place simplement à domicile.",
  },
  {
    href: "/depannage-smartphone-les-sables-dolonne",
    label: "Smartphone",
    desc: "Téléphone difficile à utiliser, stockage plein ou réglages compliqués : on vous accompagne pas à pas.",
  },
  {
    href: "/depannage-informatique-les-sables-dolonne",
    label: "Ordinateur",
    desc: "Ordinateur lent, mails, fichiers ou imprimante : on simplifie votre usage au quotidien.",
  },
  {
    href: "/depannage-tv-box-les-sables-dolonne",
    label: "TV & appareils connectés",
    desc: "TV, box ou applications qui ne fonctionnent plus : on remet tout en marche sans prise de tête.",
  },
  {
    href: "/transfert-donnees-sauvegarde-les-sables-dolonne",
    label: "Données & transferts",
    desc: "Changement d’appareil ou peur de perdre vos données : on sécurise et transfère tout pour vous.",
  },
  {
    href: "/formation-informatique-seniors-les-sables-dolonne",
    label: "Apprendre le numérique",
    desc: "Ordinateur, smartphone, Internet ou IA : apprenez simplement, à votre rythme, chez vous.",
  },
];
function upsertMetaTag(attr, key, content) {
  if (typeof document === "undefined" || !content) return;

  let selector = "";
  if (attr === "name") selector = `meta[name="${key}"]`;
  if (attr === "property") selector = `meta[property="${key}"]`;

  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function upsertLinkTag(rel, href) {
  if (typeof document === "undefined" || !href) return;

  let tag = document.head.querySelector(`link[rel="${rel}"]`);

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
}
function upsertJsonLdScript(id, data) {
  if (typeof document === "undefined" || !id) return;

  const selector = `script[type="application/ld+json"][data-loko-schema="${id}"]`;
  let tag = document.head.querySelector(selector);

  if (!data) {
    if (tag) tag.remove();
    return;
  }

  if (!tag) {
    tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.setAttribute("data-loko-schema", id);
    document.head.appendChild(tag);
  }

  tag.textContent = JSON.stringify(data);
}

function applyStructuredData(schemas = []) {
  if (typeof document === "undefined") return;

  const activeIds = new Set(schemas.map((schema) => schema.id));

  document.head
    .querySelectorAll('script[type="application/ld+json"][data-loko-schema]')
    .forEach((tag) => {
      const id = tag.getAttribute("data-loko-schema");
      if (!activeIds.has(id)) {
        tag.remove();
      }
    });

  schemas.forEach(({ id, data }) => {
    upsertJsonLdScript(id, data);
  });
}

function getGlobalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: "Loko",
    legalName: "Loko",
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE,
    logo: BUSINESS_LOGO,
    description: defaultSeo.description,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    address: BUSINESS_ADDRESS,
    areaServed: BUSINESS_AREAS,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "33",
      bestRating: "5",
      worstRating: "1",
    },
    priceRange: "€€",
    sameAs: SOCIAL_LINKS,
    founder: {
      "@type": "Person",
      name: "Ludéric Gelot",
    },
    knowsAbout: [
      "Assistance numérique à domicile",
      "Wi-Fi",
      "Internet",
      "Smartphone",
      "Ordinateur",
      "TV connectée",
      "Transfert de données",
      "Intelligence artificielle",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services Loko",
      itemListElement: problemCards.map((card) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: card.label,
          description: card.desc,
          url: `${SITE_URL}${card.href}`,
          provider: {
            "@id": BUSINESS_ID,
          },
        },
      })),
    },
  };
}

function getServiceSchema(path, page) {
  if (!page) return null;

  const canonical = `${SITE_URL}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: page.title,
    serviceType: page.title,
    description: page.seoDescription || page.intro,
    url: canonical,
    provider: {
      "@id": BUSINESS_ID,
    },
    areaServed: BUSINESS_AREAS,
    audience: {
      "@type": "Audience",
      audienceType: "Particuliers",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE_URL}/rendez-vous`,
      servicePhone: {
        "@type": "ContactPoint",
        telephone: BUSINESS_PHONE,
        contactType: "customer service",
        areaServed: "FR",
        availableLanguage: "fr",
      },
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/rendez-vous`,
      priceCurrency: "EUR",
      price: "79",
      availability: "https://schema.org/InStock",
      eligibleRegion: {
        "@type": "Country",
        name: "France",
      },
    },
  };
}

function getFaqSchema(path, page) {
  if (!page?.faq?.length) return null;

  const canonical = `${SITE_URL}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

function getArticleSchema(post, canonical) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonical}#article`,
    headline: post.title,
    description: post.description,
    url: canonical,
    datePublished: post.date || undefined,
    dateModified: post.date || undefined,
    inLanguage: "fr-FR",
    image: getPostOgImage(post),
    author: {
      "@type": "Person",
      name: "Ludéric Gelot",
    },
    publisher: { "@id": BUSINESS_ID },
    mainEntityOfPage: canonical,
  };
}

function getBreadcrumbSchema(crumbs) {
  if (!crumbs?.length) return null;
  const lastUrl = crumbs[crumbs.length - 1].url;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${lastUrl}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

function getBreadcrumbsForPath(path, currentPage) {
  const crumbs = [{ name: "Accueil", url: `${SITE_URL}/` }];

  if (path.startsWith("/aide-informatique-")) {
    const city = NEARBY_CITIES.find((c) => path === `/aide-informatique-${c.slug}`);
    if (city) {
      crumbs.push({
        name: "Zone d’intervention",
        url: `${SITE_URL}/zone-intervention`,
      });
      crumbs.push({ name: city.name, url: `${SITE_URL}${path}` });
      return crumbs;
    }
  }

  if (path.startsWith("/blog/")) {
    const post = BLOG_POSTS.find((p) => `/blog/${p.slug}` === path);
    if (post) {
      crumbs.push({ name: "Blog", url: `${SITE_URL}/blog` });
      crumbs.push({ name: post.title, url: `${SITE_URL}${path}` });
      return crumbs;
    }
  }

  if (path === "/blog") {
    crumbs.push({ name: "Blog", url: `${SITE_URL}/blog` });
    return crumbs;
  }

  if (currentPage?.hero) {
    crumbs.push({ name: currentPage.title, url: `${SITE_URL}${path}` });
    return crumbs;
  }

  const staticSeo = staticPagesSeo[path];
  if (staticSeo?.title) {
    crumbs.push({ name: staticSeo.title.split(" | ")[0], url: `${SITE_URL}${path}` });
    return crumbs;
  }

  return null;
}

function getPostOgImage(post) {
  if (!post?.cover) return DEFAULT_OG_IMAGE;
  return post.cover.startsWith("http") ? post.cover : `${SITE_URL}${post.cover}`;
}

function getSchemas(path, currentPage) {
  const schemas = [
    {
      id: "global-business",
      data: getGlobalBusinessSchema(),
    },
  ];

  const breadcrumbData = getBreadcrumbSchema(getBreadcrumbsForPath(path, currentPage));
  if (breadcrumbData) {
    schemas.push({ id: "page-breadcrumb", data: breadcrumbData });
  }

  if (currentPage) {
    const serviceSchema = getServiceSchema(path, currentPage);
    const faqSchema = getFaqSchema(path, currentPage);

    if (serviceSchema) {
      schemas.push({
        id: "page-service",
        data: serviceSchema,
      });
    }

    if (faqSchema) {
      schemas.push({
        id: "page-faq",
        data: faqSchema,
      });
    }
  }

  return schemas;
}
function applySeoMeta(seo) {
  if (typeof document === "undefined") return;

  const finalSeo = {
    ...defaultSeo,
    ...seo,
  };

  document.title = finalSeo.title;

  upsertMetaTag("name", "description", finalSeo.description);
  upsertMetaTag("name", "robots", finalSeo.robots);

  upsertLinkTag("canonical", finalSeo.canonical);

  upsertMetaTag("property", "og:type", finalSeo.ogType || "website");
  upsertMetaTag("property", "og:site_name", DEFAULT_SITE_NAME);
  upsertMetaTag("property", "og:title", finalSeo.ogTitle || finalSeo.title);
  upsertMetaTag(
    "property",
    "og:description",
    finalSeo.ogDescription || finalSeo.description
  );
  upsertMetaTag("property", "og:image", finalSeo.ogImage || DEFAULT_OG_IMAGE);
  upsertMetaTag("property", "og:url", finalSeo.ogUrl || finalSeo.canonical);
  upsertMetaTag("property", "og:locale", "fr_FR");

  upsertMetaTag(
    "name",
    "twitter:card",
    finalSeo.twitterCard || "summary_large_image"
  );
  upsertMetaTag(
    "name",
    "twitter:title",
    finalSeo.twitterTitle || finalSeo.title
  );
  upsertMetaTag(
    "name",
    "twitter:description",
    finalSeo.twitterDescription || finalSeo.description
  );
  upsertMetaTag(
    "name",
    "twitter:image",
    finalSeo.twitterImage || finalSeo.ogImage || DEFAULT_OG_IMAGE
  );

  applyStructuredData(finalSeo.schemas || []);
}

function getSeoData(path, currentPage) {
  const cleanPath = path || "/";
  const canonical = `${SITE_URL}${cleanPath}`;
  const schemas = getSchemas(cleanPath, currentPage);

  if (currentPage) {
    return {
      title: currentPage.seoTitle,
      description: currentPage.seoDescription || currentPage.intro,
      canonical,
      robots: "index, follow",
      ogTitle: currentPage.seoTitle,
      ogDescription: currentPage.seoDescription || currentPage.intro,
      ogImage: DEFAULT_OG_IMAGE,
      ogUrl: canonical,
      twitterTitle: currentPage.seoTitle,
      twitterDescription: currentPage.seoDescription || currentPage.intro,
      twitterImage: DEFAULT_OG_IMAGE,
      schemas,
    };
  }

  if (cleanPath.startsWith("/blog/")) {
    const post = BLOG_POSTS.find((p) => `/blog/${p.slug}` === cleanPath);
    if (post) {
      const postImage = getPostOgImage(post);
      const breadcrumbs = getBreadcrumbsForPath(cleanPath, null);
      const blogSchemas = [
        { id: "global-business", data: getGlobalBusinessSchema() },
        { id: "page-article", data: getArticleSchema(post, canonical) },
      ];
      const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
      if (breadcrumbSchema) {
        blogSchemas.push({ id: "page-breadcrumb", data: breadcrumbSchema });
      }
      return {
        title: post.seoTitle,
        description: post.description,
        canonical,
        robots: "index, follow",
        ogType: "article",
        ogTitle: post.seoTitle,
        ogDescription: post.description,
        ogImage: postImage,
        ogUrl: canonical,
        twitterTitle: post.seoTitle,
        twitterDescription: post.description,
        twitterImage: postImage,
        schemas: blogSchemas,
      };
    }
  }

  const staticSeo = staticPagesSeo[cleanPath];

  if (staticSeo) {
    return {
      ...staticSeo,
      canonical,
      ogTitle: staticSeo.title,
      ogDescription: staticSeo.description,
      ogImage: DEFAULT_OG_IMAGE,
      ogUrl: canonical,
      twitterTitle: staticSeo.title,
      twitterDescription: staticSeo.description,
      twitterImage: DEFAULT_OG_IMAGE,
      schemas,
    };
  }

  return {
    title: "Page non trouvée | Loko",
    description:
      "Cette page du site Loko n’existe pas ou n’est plus disponible.",
    canonical,
    robots: "noindex, follow",
    ogTitle: "Page non trouvée | Loko",
    ogDescription:
      "Cette page du site Loko n’existe pas ou n’est plus disponible.",
    ogImage: DEFAULT_OG_IMAGE,
    ogUrl: canonical,
    twitterTitle: "Page non trouvée | Loko",
    twitterDescription:
      "Cette page du site Loko n’existe pas ou n’est plus disponible.",
    twitterImage: DEFAULT_OG_IMAGE,
    schemas,
  };
}
function useIsMobile() {
  const getIsMobile = () =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false;

  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const onResize = () => setIsMobile(getIsMobile());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isMobile;
}

function usePrefersReducedMotion() {
  const get = () =>
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [reduced, setReduced] = useState(get);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(mq.matches);
    mq.addEventListener
      ? mq.addEventListener("change", handler)
      : mq.addListener(handler);
    return () =>
      mq.removeEventListener
        ? mq.removeEventListener("change", handler)
        : mq.removeListener(handler);
  }, []);

  return reduced;
}

// Mot de service qui défile dans le hero (s'arrête si reduced-motion).
function useRotatingWord(words, intervalMs, enabled) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!enabled || words.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      intervalMs
    );
    return () => clearInterval(id);
  }, [enabled, intervalMs, words.length]);

  return index;
}

// Compteur 0 -> target au montage (instantané si reduced-motion).
// Filet de sécurité : la valeur finale est toujours garantie même si
// requestAnimationFrame est gelé (onglet en arrière-plan, navigateur automatisé).
function useCountUp(target, durationMs, enabled) {
  const [value, setValue] = useState(enabled ? 0 : target);

  useEffect(() => {
    if (!enabled) {
      setValue(target);
      return;
    }
    setValue(0);
    let raf;
    let start;
    const step = (ts) => {
      if (start == null) start = ts;
      const p = Math.min((ts - start) / durationMs, 1);
      setValue(Math.round(p * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    const safety = setTimeout(() => setValue(target), durationMs + 400);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safety);
    };
  }, [target, durationMs, enabled]);

  return value;
}

function useGlobalAnimations() {
  useLayoutEffect(() => {
    if (typeof document === "undefined") return;

    const styleId = "loko-global-animations";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
    @keyframes lokoStarsGlow {
      0% {
        transform: translateY(0) scale(1);
        filter: drop-shadow(0 0 0 rgba(255,255,255,0));
        opacity: 0.92;
      }
      50% {
        transform: translateY(-1px) scale(1.06);
        filter: drop-shadow(0 0 8px rgba(255,255,255,0.35));
        opacity: 1;
      }
      100% {
        transform: translateY(0) scale(1);
        filter: drop-shadow(0 0 0 rgba(255,255,255,0));
        opacity: 0.92;
      }
    }
  
    @keyframes lokoBlueGlow {
      0% {
        box-shadow:
          inset 0 0 0 1px rgba(59,130,246,0.20),
          inset 0 0 18px rgba(59,130,246,0.10),
          0 0 8px rgba(59,130,246,0.18),
          0 0 18px rgba(59,130,246,0.10),
          0 20px 60px rgba(0,0,0,0.28);
      }
      50% {
        box-shadow:
          inset 0 0 0 1px rgba(59,130,246,0.45),
          inset 0 0 28px rgba(59,130,246,0.18),
          0 0 12px rgba(59,130,246,0.28),
          0 0 28px rgba(59,130,246,0.16),
          0 20px 60px rgba(0,0,0,0.28);
      }
      100% {
        box-shadow:
          inset 0 0 0 1px rgba(59,130,246,0.20),
          inset 0 0 18px rgba(59,130,246,0.10),
          0 0 8px rgba(59,130,246,0.18),
          0 0 18px rgba(59,130,246,0.10),
          0 20px 60px rgba(0,0,0,0.28);
      }
    }

    @keyframes lkFadeUp {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes lkWordIn {
      0% { opacity: 0.35; transform: translateY(14px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    @keyframes lkPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.45); }
      50% { box-shadow: 0 0 0 10px rgba(37,99,235,0); }
    }

    @keyframes lkPhoneRing {
      0%, 45%, 100% { transform: rotate(0); }
      5%, 15%, 25%, 35% { transform: rotate(-15deg); }
      10%, 20%, 30%, 40% { transform: rotate(15deg); }
    }

    @keyframes lkFloat {
      0%, 100% { transform: translate(0, 0) rotate(-3deg); }
      50% { transform: translate(5px, -18px) rotate(5deg); }
    }

    @keyframes lkArtFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-9px); }
    }

    @keyframes lkArtBlink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.2; }
    }

    @keyframes lkArtWave {
      0% { opacity: 0.12; }
      45% { opacity: 1; }
      100% { opacity: 0.12; }
    }

    @keyframes lkArtPing {
      0% { transform: scale(0.6); opacity: 0.55; }
      100% { transform: scale(1.5); opacity: 0; }
    }

    @keyframes lkMarquee {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    .lk-marquee { animation-duration: 90s; }
    .lk-marquee:hover { animation-play-state: paused; }

    html, body { margin: 0; padding: 0; }
    body { overflow-x: hidden; }
    html { scroll-behavior: smooth; }
    /* décalage pour ne pas masquer la cible sous le header sticky */
    [id] { scroll-margin-top: 92px; }

    .lk-article { color: rgba(28,36,51,0.82); font-size: 17px; line-height: 1.75; }
    .lk-article h2 { color: #1C2433; font-size: 26px; line-height: 1.2; letter-spacing: -0.02em; font-weight: 800; margin: 36px 0 12px; }
    .lk-article h3 { color: #1C2433; font-size: 20px; line-height: 1.25; font-weight: 700; margin: 26px 0 10px; }
    .lk-article p { margin: 0 0 18px; }
    .lk-article ul, .lk-article ol { margin: 0 0 18px; padding-left: 22px; }
    .lk-article li { margin: 0 0 8px; }
    .lk-article a { color: #2563EB; text-decoration: underline; }
    .lk-article strong { color: #1C2433; font-weight: 700; }
    .lk-article em { font-style: italic; }
    .lk-article blockquote { margin: 24px 0; padding: 14px 20px; border-left: 3px solid #2563EB; background: rgba(37,99,235,0.05); border-radius: 0 12px 12px 0; color: #1C2433; font-style: italic; }
    .lk-article code { background: rgba(28,36,51,0.06); padding: 2px 6px; border-radius: 6px; font-size: 0.9em; }
    .lk-article img { max-width: 100%; height: auto; border-radius: 14px; margin: 10px 0 22px; display: block; border: 1px solid rgba(28,36,51,0.08); }
    .lk-article figcaption { font-size: 14px; color: rgba(28,36,51,0.55); margin: -14px 0 22px; }

    @media (max-width: 640px) {
      .lk-article { font-size: 15.5px; line-height: 1.62; }
      .lk-article h2 { font-size: 21px; margin: 28px 0 10px; }
      .lk-article h3 { font-size: 18px; margin: 22px 0 8px; }
      .lk-article p, .lk-article ul, .lk-article ol { margin: 0 0 14px; }
    }

    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
      * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; }
    }
  `;
    document.head.appendChild(style);
  }, []);
}

export default function LokoSite() {
  useGlobalAnimations();

  const path =
    typeof window !== "undefined" && window.location.pathname
      ? window.location.pathname
      : "/";

  const isRdvPage = path === "/rendez-vous";
  const isPlanPage = path === "/plan-du-site";
  const isCgvPage = path === "/cgv";
  const isPrivacyPage = path === "/politique-confidentialite";
  const isMentionsPage = path === "/mentions-legales";
  const isCreditImpotPage = path === "/credit-impot";
  const isTarifsPage = path === "/tarifs";
  const isZonePage = path === "/zone-intervention";
  const isBlogIndex = path === "/blog";
  const blogPost = path.startsWith("/blog/")
    ? BLOG_POSTS.find((p) => path === `/blog/${p.slug}`)
    : null;
  const currentPage = problemPages[path] || null;
  const cityMatch = path.startsWith("/aide-informatique-")
    ? NEARBY_CITIES.find((c) => path === `/aide-informatique-${c.slug}`)
    : null;

  useEffect(() => {
    const seoData = getSeoData(path, currentPage);
    applySeoMeta(seoData);
  }, [path, currentPage]);

  let page;
  if (isRdvPage) page = <RendezVousPage />;
  else if (isPlanPage) page = <PlanDuSitePage />;
  else if (isCgvPage) page = <CGVPage />;
  else if (isPrivacyPage) page = <PrivacyPage />;
  else if (isMentionsPage) page = <MentionsPage />;
  else if (isCreditImpotPage) page = <CreditImpotPage />;
  else if (isTarifsPage) page = <TarifsPage />;
  else if (isZonePage) page = <ZoneInterventionPage />;
  else if (isBlogIndex) page = <BlogIndexPage />;
  else if (blogPost) page = <BlogPostPage post={blogPost} />;
  else if (cityMatch) page = <HomePage city={cityMatch} />;
  else if (currentPage) {
    // Si on arrive depuis une page ville (?ville=slug), on adapte le pilier à
    // cette commune (titre + badge). Le canonical et le prérendu restent le hub.
    const villeParam =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("ville")
        : null;
    const originCity = villeParam
      ? NEARBY_CITIES.find((c) => c.slug === villeParam) || null
      : null;
    page = <ProblemPage page={currentPage} originCity={originCity} />;
  } else page = <HomePage />;

  return (
    <>
      <SiteBackground />
      {page}
      <ContactModal />
      <CreditModal />
    </>
  );
}
function CreditImpotPage() {
  const isMobile = useIsMobile();
  const check = (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5l4 4 10-10"
        stroke="#2563EB"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const chip = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 14px",
    borderRadius: 999,
    background: "#FFFFFF",
    border: "1px solid rgba(28,36,51,0.10)",
    fontSize: 13.5,
    fontWeight: 600,
    color: "#1C2433",
  };
  const steps = [
    {
      n: "1",
      title: "Vous prenez rendez-vous",
      text: "Loko intervient à domicile pour vos besoins numériques du quotidien.",
    },
    {
      n: "2",
      title: "Vous réglez la prestation",
      text: "Le montant est payé normalement, comme une prestation classique.",
    },
    {
      n: "3",
      title: "Vous récupérez 50 %",
      text: "Selon votre situation, la moitié vous est remboursée en crédit d'impôt.",
    },
  ];
  return (
    <div style={styles.page}>
      <SiteHeader />

      <main>
        <section style={{ padding: isMobile ? "70px 0 36px" : "92px 0 48px" }}>
          <div style={styles.container}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1.05fr 0.95fr",
                gap: isMobile ? 28 : 48,
                alignItems: "center",
              }}
            >
              <div>
                <span style={styles.badge}>Service à la personne • Loko</span>
                <h1 style={{ ...styles.sectionTitle, marginTop: 8 }}>
                  Crédit d’impôt de 50 %
                </h1>
                <p style={{ ...styles.sectionText, maxWidth: 520 }}>
                  Loko est déclaré organisme de services à la personne : la
                  moitié de ce que vous payez vous est remboursée par l’État,
                  sous forme de crédit d’impôt.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                    marginTop: 22,
                  }}
                >
                  {[
                    "50 % remboursé",
                    "Même si non imposable",
                    "Attestation fiscale fournie",
                  ].map((c) => (
                    <span key={c} style={chip}>
                      {check}
                      {c}
                    </span>
                  ))}
                </div>
                <div style={styles.heroButtons}>
                  <HoverButton href="tel:+33763131515" variant="primary">
                    Appeler Loko
                  </HoverButton>
                  <HoverButton onClick={openContactModal} variant="secondary">
                    Prendre rendez-vous
                  </HoverButton>
                </div>
              </div>

              <div
                style={{
                  background: "linear-gradient(158deg, #FFFFFF 0%, #EEF3FF 100%)",
                  border: "1px solid rgba(37,99,235,0.14)",
                  borderRadius: 28,
                  padding: isMobile ? "30px 24px" : "36px",
                  boxShadow: "0 20px 50px rgba(28,36,51,0.08)",
                  textAlign: "center",
                }}
              >
                <img
                  src={logoCreditImpot}
                  alt="Crédit d’impôt 50 % — service à la personne"
                  style={{
                    width: 116,
                    height: "auto",
                    margin: "0 auto 18px",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#2563EB",
                    marginBottom: 12,
                  }}
                >
                  Exemple
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 14,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: 26,
                      fontWeight: 800,
                      color: "rgba(28,36,51,0.45)",
                      textDecoration: "line-through",
                    }}
                  >
                    79 €
                  </span>
                  <span style={{ color: "#2563EB", fontSize: 24 }}>→</span>
                  <span
                    style={{
                      fontSize: 40,
                      fontWeight: 800,
                      color: "#1C2433",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    39,50 €
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "rgba(28,36,51,0.6)",
                    marginTop: 8,
                  }}
                >
                  votre coût réel après crédit d’impôt
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.sectionAlt}>
          <div style={styles.container}>
            <h2 style={{ ...styles.sectionTitle, fontSize: isMobile ? 26 : 34 }}>
              Comment ça marche
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                gap: 18,
                marginTop: 28,
              }}
            >
              {steps.map((s) => (
                <div
                  key={s.n}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(28,36,51,0.08)",
                    borderRadius: 22,
                    padding: "26px 24px",
                    boxShadow: "0 6px 20px rgba(28,36,51,0.04)",
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 12,
                      background: "#2563EB",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 17,
                      marginBottom: 14,
                    }}
                  >
                    {s.n}
                  </div>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      color: "#1C2433",
                      margin: "0 0 8px",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "rgba(28,36,51,0.66)",
                      margin: 0,
                    }}
                  >
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
            <p
              style={{
                ...styles.sectionText,
                fontSize: 14.5,
                color: "rgba(28,36,51,0.55)",
                marginTop: 24,
                maxWidth: 760,
              }}
            >
              Le crédit d’impôt s’applique selon la réglementation en vigueur et
              l’éligibilité de la prestation. En cas de doute, Loko vous explique
              simplement le principe au moment du rendez-vous.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
      <CookieBanner />
    </div>
  );
}

function StaticPageCta({ title = "Besoin d’aide ?" }) {
  return (
    <section style={styles.sectionAlt}>
      <div style={styles.containerNarrow}>
        <div style={styles.contactCard}>
          <h2 style={styles.sectionTitle}>{title}</h2>
          <p style={styles.sectionText}>
            Appelez Loko au{" "}
            <a href="tel:0763131515" style={styles.inlinePhoneLink}>
              07 63 13 15 15
            </a>{" "}
            ou prenez rendez-vous en ligne.
          </p>
          <div style={styles.heroButtons}>
            <HoverButton href="tel:0763131515" variant="primary">
              Appeler Loko
            </HoverButton>
            <HoverButton onClick={openContactModal} variant="secondary">
              Prendre rendez-vous
            </HoverButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function TarifsPage() {
  const faq = [
    {
      q: "Combien coûte une intervention Loko ?",
      a: "Une intervention standard à domicile est à 79 € TTC, soit 39,50 € après crédit d’impôt si la prestation est éligible. Une intervention urgente est à 99 € TTC, soit 49,50 € après crédit d’impôt dans les mêmes conditions.",
    },
    {
      q: "Le déplacement est-il inclus ?",
      a: "Dans la zone d’intervention habituelle de Loko, l’intervention à domicile est incluse dans le tarif annoncé. Pour une demande plus éloignée ou une situation particulière, Loko vous informe clairement avant l’intervention.",
    },
    {
      q: "Quels problèmes pouvez-vous traiter ?",
      a: "Loko intervient pour le Wi-Fi, la box Internet, le smartphone, l’ordinateur lent, l’imprimante, la TV connectée, le transfert de données et l’accompagnement numérique du quotidien — sans réparation lourde.",
    },
    {
      q: "Le crédit d’impôt est-il possible ?",
      a: "Certaines prestations d’assistance numérique à domicile peuvent être éligibles au crédit d’impôt de 50 %, selon la réglementation en vigueur et votre situation. Loko peut vous expliquer le principe simplement.",
    },
  ];

  return (
    <div style={styles.page}>
      <SiteHeader />

      <main>
        <section style={styles.heroSection}>
          <div style={styles.containerNarrow}>
            <div style={styles.badge}>Tarifs • Les Sables d’Olonne</div>
            <h1 style={styles.heroTitle}>
              Tarifs assistance numérique aux Sables d’Olonne
            </h1>
            <p style={styles.heroText}>
              Loko intervient à domicile pour les petits problèmes numériques du
              quotidien : Wi-Fi, box Internet, smartphone, ordinateur lent,
              imprimante, TV connectée et transfert de données.{" "}
              <HoverLink
                href="/depannage-informatique-les-sables-dolonne"
                baseStyle={styles.contactZoneLink}
                hoverStyle={styles.contactZoneLinkHover}
              >
                Dépannage informatique
              </HoverLink>
              {" · "}
              <HoverLink
                href="/formation-informatique-seniors-les-sables-dolonne"
                baseStyle={styles.contactZoneLink}
                hoverStyle={styles.contactZoneLinkHover}
              >
                Assistance numérique senior
              </HoverLink>
            </p>
          </div>
        </section>

        <section style={styles.sectionAlt}>
          <div style={styles.containerNarrow}>
            <h2 style={styles.sectionTitle}>Nos tarifs</h2>
            <p style={styles.sectionText}>
              Service à la personne pouvant être éligible au crédit d’impôt de
              50 %, selon la prestation et votre situation.
            </p>

            <div style={styles.pricingGrid}>
              {LOKO_PLANS.map((plan) => (
                <div key={plan.title} style={styles.priceCardClickable}>
                  <div style={styles.priceCardTopRow}>
                    <div style={styles.cardTitle}>{plan.title}</div>
                  </div>
                  <div style={styles.price}>{plan.price}</div>
                  <p style={styles.cardText}>
                    {plan.beforeText}
                    <span style={styles.taxPriceInlineBlue}>
                      {plan.reducedPrice}
                    </span>
                    {plan.afterText}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.containerNarrow}>
            <div style={styles.taxHeroCard}>
              <div style={styles.taxHeroTop}>
                <img
                  src={logoCreditImpot}
                  alt="Crédit d’impôt de 50 %"
                  style={styles.taxLogo}
                />
                <div>
                  <div style={styles.taxHeroLabel}>Crédit d’impôt</div>
                  <div style={styles.taxHeroPriceLine}>
                    79 € → 39,50 € après crédit d’impôt
                  </div>
                </div>
              </div>
              <p style={styles.taxHeroText}>
                Certaines prestations d’assistance numérique à domicile peuvent
                ouvrir droit à un crédit d’impôt de 50 %, selon la
                réglementation en vigueur et l’éligibilité de la prestation.
                Loko vous explique le principe simplement, sans promesse
                excessive.
              </p>
            </div>
            <div style={{ marginTop: 20 }}>
              <HoverButton
                onClick={openCreditModal}
                baseStyle={styles.creditButton}
                hoverStyle={styles.creditButtonHover}
              >
                En savoir plus sur le crédit d’impôt
              </HoverButton>
            </div>
          </div>
        </section>

        <section style={styles.sectionAlt}>
          <div style={styles.containerNarrow}>
            <h2 style={styles.sectionTitle}>Questions fréquentes</h2>
            <div style={styles.cardGridSingle}>
              {faq.map((item) => (
                <div key={item.q} style={styles.infoCard}>
                  <h3 style={styles.cardTitle}>{item.q}</h3>
                  <p style={styles.cardText}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <StaticPageCta title="Prêt à prendre rendez-vous ?" />
      </main>

      <SiteFooter />
      <CookieBanner />
    </div>
  );
}

function ZoneInterventionPage() {
  return (
    <div style={styles.page}>
      <SiteHeader />

      <main>
        <section style={styles.heroSection}>
          <div style={styles.containerNarrow}>
            <div style={styles.badge}>Local • Les Sables d’Olonne</div>
            <h1 style={styles.heroTitle}>
              Zone d’intervention Loko aux Sables d’Olonne et alentours
            </h1>
            <p style={styles.heroText}>
              Loko intervient à domicile aux Sables d’Olonne et dans les
              communes proches pour vous aider avec Internet, le Wi-Fi, le
              smartphone, l’ordinateur, l’imprimante, la TV et le transfert de
              données.{" "}
              <HoverLink
                href="/formation-informatique-seniors-les-sables-dolonne"
                baseStyle={styles.contactZoneLink}
                hoverStyle={styles.contactZoneLinkHover}
              >
                Assistance numérique senior
              </HoverLink>
            </p>
          </div>
        </section>

        <section style={styles.sectionAlt}>
          <div style={styles.containerNarrow}>
            <h2 style={styles.sectionTitle}>Communes desservies</h2>
            <p style={styles.sectionText}>
              Basé aux Sables d’Olonne, Loko se déplace à domicile dans toute
              l’agglomération et les communes proches. Choisissez votre commune
              pour voir la page dédiée.
            </p>
            <div style={styles.cardGrid}>
              {NEARBY_CITIES.map((c) => (
                <LinkCard
                  key={c.slug}
                  href={`/aide-informatique-${c.slug}`}
                  title={c.name}
                  text={`Intervention à domicile à ${c.name} (à ~${c.timeMin} min des Sables d’Olonne) : ordinateur, Wi-Fi, smartphone, TV et formation numérique.`}
                />
              ))}
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.containerNarrow}>
            <h2 style={styles.sectionTitle}>Pourquoi un service local ?</h2>
            <div style={styles.bulletPanel}>
              <div style={styles.bulletItem}>
                • Un contact humain, direct et rassurant
              </div>
              <div style={styles.bulletItem}>
                • Une intervention à domicile, adaptée à votre situation
              </div>
              <div style={styles.bulletItem}>
                • Des explications simples
              </div>
              <div style={styles.bulletItem}>
                • Une aide adaptée aux seniors et aux personnes peu à l’aise
                avec le numérique
              </div>
              <div style={styles.bulletItem}>
                • Un service de proximité, pensé pour le quotidien
              </div>
            </div>
          </div>
        </section>

        <StaticPageCta title="Besoin d’une intervention près de chez vous ?" />
      </main>

      <SiteFooter />
      <CookieBanner />
    </div>
  );
}
function MentionsPage() {
  return (
    <div style={styles.page}>
      <SiteHeader />

      <main>
        <section style={styles.heroSection}>
          <div style={styles.containerNarrow}>
            <div style={styles.badge}>Informations légales • Loko</div>
            <h1 style={styles.heroTitle}>Mentions légales</h1>
            <p style={styles.heroText}>
              Informations légales relatives au site Loko.
            </p>
          </div>
        </section>

        <section style={styles.sectionAlt}>
          <div style={styles.containerNarrow}>
            <div style={styles.legalCard}>
              <h2 style={styles.legalArticleTitle}>1. Éditeur du site</h2>
              <p style={styles.legalText}>
                Lockpit
                <br />
                Micro-entreprise représentée par Ludéric Gelot
                <br />
                Les Sables d’Olonne, France
                <br />
                07 63 13 15 15
                <br />
                rdvloko@gmail.com
                <br />
                SIRET : 811 759 737 00034
                <br />
                Code APE : 62.02A
                <br />
                TVA non applicable, article 293 B du CGI.
              </p>

              <h2 style={styles.legalArticleTitle}>2. Hébergeur</h2>
              <p style={styles.legalText}>
                Cloudflare, Inc.
                <br />
                101 Townsend Street, San Francisco, CA 94107, États-Unis
                <br />
                https://www.cloudflare.com/
              </p>

              <h2 style={styles.legalArticleTitle}>
                3. Propriété intellectuelle
              </h2>
              <p style={styles.legalText}>
                L’ensemble du contenu du site (textes, visuels, graphismes,
                logo, structure) est la propriété exclusive de Loko.
              </p>

              <h2 style={styles.legalArticleTitle}>4. Données personnelles</h2>
              <p style={styles.legalText}>
                Les données sont traitées conformément au RGPD. Consultez la
                politique de confidentialité pour plus de détails.
              </p>

              <h2 style={styles.legalArticleTitle}>5. Responsabilité</h2>
              <ul style={styles.legalList}>
                <li>Erreurs ou omissions involontaires</li>
                <li>Interruptions ou dysfonctionnements</li>
                <li>Dommages liés à l’utilisation du site</li>
              </ul>

              <h2 style={styles.legalArticleTitle}>6. Liens externes</h2>
              <p style={styles.legalText}>
                Loko décline toute responsabilité concernant les sites externes.
              </p>

              <h2 style={styles.legalArticleTitle}>7. Contact</h2>
              <p style={styles.legalText}>
                rdvloko@gmail.com
                <br />
                07 63 13 15 15
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <CookieBanner />
    </div>
  );
}
function PrivacyPage() {
  return (
    <div style={styles.page}>
      <SiteHeader />

      <main>
        <section style={styles.heroSection}>
          <div style={styles.containerNarrow}>
            <div style={styles.badge}>Informations légales • Loko</div>
            <h1 style={styles.heroTitle}>Politique de confidentialité</h1>
            <p style={styles.heroText}>
              Découvrez comment Loko protège et utilise vos données
              personnelles.
            </p>
          </div>
        </section>

        <section style={styles.sectionAlt}>
          <div style={styles.containerNarrow}>
            <div style={styles.legalCard}>
              <h2 style={styles.legalArticleTitle}>1. Introduction</h2>
              <p style={styles.legalText}>
                Chez Loko, la confidentialité de vos données est une priorité.
                Nous ne vendons, ne louons et ne troquons aucune information
                personnelle.
              </p>

              <h2 style={styles.legalArticleTitle}>2. Qui sommes-nous ?</h2>
              <p style={styles.legalText}>
                Loko est une entreprise d’assistance numérique basée aux Sables
                d’Olonne. Responsable : Ludéric Gelot.
              </p>
              <p style={styles.legalText}>
                Contact : rdvloko@gmail.com — 07 63 13 15 15
              </p>

              <h2 style={styles.legalArticleTitle}>3. Données collectées</h2>
              <ul style={styles.legalList}>
                <li>Nom, prénom, email, téléphone</li>
                <li>Ville et adresse pour l’intervention à domicile</li>
                <li>Message décrivant votre besoin</li>
                <li>Préférence de consentement cookies (stockée localement)</li>
              </ul>

              <h2 style={styles.legalArticleTitle}>
                4. Utilisation des données
              </h2>
              <ul style={styles.legalList}>
                <li>Gestion des demandes de contact et des rendez-vous</li>
                <li>Organisation des interventions à domicile</li>
                <li>Communication liée à votre demande</li>
              </ul>

              <h2 style={styles.legalArticleTitle}>5. Stockage et partage</h2>
              <p style={styles.legalText}>
                Les données transmises via le formulaire de contact sont
                traitées par{" "}
                <strong>Formspree</strong> (prestataire américain) puis
                transmises à Loko par email. La prise de rendez-vous en ligne
                peut passer par <strong>Notion Calendar</strong>. Les pages
                villes peuvent intégrer une carte <strong>Google Maps</strong>{" "}
                si vous acceptez les cookies tiers.
              </p>
              <p style={styles.legalText}>
                Loko ne vend, ne loue et ne cède pas vos données à des tiers à
                des fins commerciales.
              </p>

              <h2 style={styles.legalArticleTitle}>6. Durée de conservation</h2>
              <ul style={styles.legalList}>
                <li>Demandes de contact : 2 ans après le dernier échange</li>
                <li>Facturation : 10 ans (obligation légale)</li>
                <li>Consentement cookies : 13 mois</li>
              </ul>

              <h2 style={styles.legalArticleTitle}>7. Vos droits</h2>
              <ul style={styles.legalList}>
                <li>Accès</li>
                <li>Rectification</li>
                <li>Suppression</li>
                <li>Portabilité</li>
                <li>Opposition et limitation</li>
              </ul>
              <p style={styles.legalText}>Contact : rdvloko@gmail.com</p>

              <h2 style={styles.legalArticleTitle}>8. Cookies</h2>
              <p style={styles.legalText}>
                Le site utilise un cookie de consentement stocké dans votre
                navigateur. Les cartes Google Maps intégrées sur les pages
                villes ne sont chargées qu’après acceptation des cookies tiers.
                Un contrôle anti-spam (Cloudflare Turnstile) peut s’afficher sur
                les formulaires si activé. Loko n’utilise pas d’outil de mesure
                d’audience (Google Analytics, Matomo, etc.) sur ce site.
              </p>

              <h2 style={styles.legalArticleTitle}>9. Sécurité</h2>
              <p style={styles.legalText}>
                Le site est servi en HTTPS. L’accès aux données est limité à
                Ludéric Gelot (Loko).
              </p>

              <h2 style={styles.legalArticleTitle}>10. Modifications</h2>
              <p style={styles.legalText}>
                Cette politique peut évoluer à tout moment.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <CookieBanner />
    </div>
  );
}
function CGVPage() {
  return (
    <div style={styles.page}>
      <SiteHeader />

      <main>
        <section style={styles.heroSection}>
          <div style={styles.containerNarrow}>
            <div style={styles.badge}>Informations légales • Loko</div>
            <h1 style={styles.heroTitle}>Conditions Générales de Vente</h1>
            <p style={styles.heroText}>
              Retrouvez ici les conditions applicables aux prestations
              d’assistance numérique à domicile proposées par Loko.
            </p>
          </div>
        </section>

        <section style={styles.sectionAlt}>
          <div style={styles.containerNarrow}>
            <div style={styles.legalCard}>
              <h2 style={styles.legalArticleTitle}>Article 1 — Objet</h2>
              <p style={styles.legalText}>
                Les présentes Conditions Générales de Vente ont pour objet de
                définir les conditions dans lesquelles Loko propose à ses
                clients des prestations d’assistance numérique à domicile,
                d’accompagnement technique du quotidien, d’installation, de
                paramétrage et, selon les cas, certaines interventions
                techniques limitées.
              </p>
              <p style={styles.legalText}>
                Les prestations de Loko ont pour finalité d’accompagner le
                client dans la résolution de situations numériques du quotidien,
                dans la limite du périmètre annoncé, du temps prévu, des accès
                disponibles et des contraintes techniques constatées.
              </p>

              <h2 style={styles.legalArticleTitle}>
                Article 2 — Prestations proposées
              </h2>
              <p style={styles.legalText}>Loko propose notamment :</p>
              <ul style={styles.legalList}>
                <li>l’assistance numérique à domicile ;</li>
                <li>l’aide à l’utilisation d’équipements numériques ;</li>
                <li>l’installation et la mise en service d’équipements ;</li>
                <li>le paramétrage simple ;</li>
                <li>l’accompagnement dans certaines démarches numériques ;</li>
                <li>
                  l’accompagnement avec certains services tiers ou opérateurs,
                  avec accord du client.
                </li>
              </ul>
              <p style={styles.legalText}>
                Certaines demandes techniques plus spécifiques peuvent être
                acceptées au cas par cas, sans engagement automatique préalable.
              </p>
              <p style={styles.legalText}>
                Loko se réserve le droit de refuser toute demande hors
                périmètre, trop risquée, trop technique, ou incompatible avec
                son fonctionnement.
              </p>
              <p style={styles.legalText}>
                Loko n’a pas vocation à assurer des prestations de vente de
                matériel, de réparation lourde, de micro-soudure, de
                contournement de sécurité, ni toute intervention spécialisée
                excédant son périmètre habituel.
              </p>

              <h2 style={styles.legalArticleTitle}>
                Article 3 — Prise de rendez-vous
              </h2>
              <p style={styles.legalText}>
                La prise de rendez-vous s’effectue principalement par téléphone.
                Un rendez-vous peut ensuite être confirmé par écrit, notamment
                par courrier électronique.
              </p>
              <p style={styles.legalText}>
                Le rendez-vous est fixé sur la base des informations
                communiquées par le client. Toute description du besoin
                effectuée à distance est considérée comme indicative. Le besoin
                réel peut être précisé, ajusté ou requalifié lors de
                l’intervention sur place.
              </p>

              <h2 style={styles.legalArticleTitle}>
                Article 4 — Tarifs et facturation
              </h2>
              <p style={styles.legalText}>
                Les tarifs en vigueur sont ceux communiqués au client au moment
                de la prise de rendez-vous ou affichés sur les supports de
                communication de Loko lorsqu’ils existent.
              </p>
              <p style={styles.legalText}>
                Le tarif annoncé correspond à la prestation prévue dans le cadre
                initialement décrit par le client.
              </p>
              <p style={styles.legalText}>
                Si le besoin réel constaté sur place diffère de la demande
                initiale, nécessite un temps supplémentaire, une prise en charge
                particulière, un déplacement complémentaire ou une intervention
                distincte, Loko en informe le client avant toute poursuite hors
                cadre initial.
              </p>
              <p style={styles.legalText}>
                Tout dépassement de temps accepté par le client est facturé par
                palier de <strong>15 minutes au tarif de 15 € TTC</strong>.
              </p>
              <p style={styles.legalText}>
                Toute prestation complémentaire ou hors périmètre initial peut
                faire l’objet d’une facturation complémentaire ou d’une nouvelle
                intervention.
              </p>
              <p style={styles.legalText}>
                La facture est émise après intervention.
              </p>

              <h2 style={styles.legalArticleTitle}>
                Article 5 — Conditions d’intervention
              </h2>
              <p style={styles.legalText}>
                Le client s’engage à fournir des informations sincères et
                suffisamment précises sur le besoin rencontré.
              </p>
              <p style={styles.legalText}>
                Le client s’engage également à rendre accessibles les
                équipements, comptes, identifiants, mots de passe, codes,
                autorisations ou éléments nécessaires à la bonne réalisation de
                la prestation.
              </p>
              <p style={styles.legalText}>
                Lorsque certaines conditions ne sont pas réunies au moment de
                l’intervention, notamment en cas d’absence d’accès, de matériel,
                d’identifiants ou de conditions techniques minimales, Loko
                pourra :
              </p>
              <ul style={styles.legalList}>
                <li>limiter son intervention ;</li>
                <li>proposer un report ;</li>
                <li>proposer une prise en charge différente ;</li>
                <li>
                  ou facturer le déplacement et/ou le temps mobilisé selon la
                  situation.
                </li>
              </ul>

              <h2 style={styles.legalArticleTitle}>
                Article 6 — Annulation, report, absence
              </h2>
              <p style={styles.legalText}>
                Toute demande de report ou d’annulation doit être communiquée
                dès que possible.
              </p>
              <p style={styles.legalText}>
                Sauf accord particulier, tout report ou annulation intervenant
                moins de <strong>24 heures</strong> avant le rendez-vous donne
                lieu à une facturation forfaitaire de <strong>10 € TTC</strong>.
              </p>
              <p style={styles.legalText}>
                En cas d’absence du client au rendez-vous, d’impossibilité
                d’accéder au lieu d’intervention, ou de déplacement rendu
                inutile du fait du client, Loko se réserve le droit de facturer
                un forfait de déplacement ou d’immobilisation de{" "}
                <strong>10 € TTC</strong>.
              </p>
              <p style={styles.legalText}>
                En cas de reports répétés ou abusifs, Loko se réserve le droit
                d’annuler définitivement la demande.
              </p>

              <h2 style={styles.legalArticleTitle}>
                Article 7 — Déroulement et périmètre de la prestation
              </h2>
              <p style={styles.legalText}>
                La prestation réalisée correspond au besoin annoncé, tel qu’il a
                été compris au moment du rendez-vous puis confirmé au démarrage
                de l’intervention.
              </p>
              <p style={styles.legalText}>
                Si, sur place, le client sollicite un besoin différent, plus
                large ou distinct de celui annoncé initialement, Loko pourra :
              </p>
              <ul style={styles.legalList}>
                <li>
                  l’intégrer si cela reste compatible avec le cadre prévu ;
                </li>
                <li>proposer une adaptation tarifaire ;</li>
                <li>proposer une nouvelle intervention ;</li>
                <li>ou refuser la demande si elle sort du périmètre.</li>
              </ul>
              <p style={styles.legalText}>
                La prestation de Loko constitue une{" "}
                <strong>obligation de moyens</strong> et non une obligation
                générale de résultat, sauf cas particulier expressément défini.
                Loko s’engage à mettre en œuvre son savoir-faire avec sérieux,
                professionnalisme et pédagogie, dans le cadre de la mission
                acceptée.
              </p>

              <h2 style={styles.legalArticleTitle}>
                Article 8 — Données, accès et sauvegardes
              </h2>
              <p style={styles.legalText}>
                Le client demeure responsable de ses données personnelles,
                professionnelles ou familiales, ainsi que de leur sauvegarde.
              </p>
              <p style={styles.legalText}>
                Avant toute intervention susceptible d’affecter un appareil, un
                compte, un support ou des données, il appartient au client de
                s’assurer, lorsque cela est possible, qu’une sauvegarde récente
                existe.
              </p>
              <p style={styles.legalText}>
                Dans le cadre de certaines prestations, notamment les transferts
                de données, sauvegardes ou récupérations, Loko peut être amené,
                à la demande du client, à copier temporairement tout ou partie
                des données sur un support externe, notamment un disque dur ou
                tout autre support de stockage adapté, afin de sécuriser
                l’intervention et de limiter les risques de perte de données.
              </p>
              <p style={styles.legalText}>
                Lorsque cette copie temporaire est réalisée, les données peuvent
                être conservées sur ce support externe pendant le temps
                strictement nécessaire à la finalisation de l’intervention,
                notamment afin de vérifier le bon déroulement du transfert ou de
                prévenir tout incident technique.
              </p>
              <p style={styles.legalText}>
                Une fois l’intervention finalisée, et sauf demande contraire du
                client ou contrainte particulière liée à la prestation, cette
                copie temporaire n’a pas vocation à être conservée durablement
                par Loko.
              </p>
              <p style={styles.legalText}>
                Loko s’engage à manipuler les données du client uniquement dans
                le cadre de la prestation demandée, avec discrétion et sans
                consultation non nécessaire de leur contenu.
              </p>
              <p style={styles.legalText}>
                Loko ne pourra être tenu responsable de la perte de données
                préexistante, ni d’une perte résultant :
              </p>
              <ul style={styles.legalList}>
                <li>de l’état antérieur de l’appareil ;</li>
                <li>d’un support défectueux ;</li>
                <li>d’un accès indisponible ;</li>
                <li>d’un blocage logiciel ou matériel ;</li>
                <li>d’une contrainte technique indépendante de sa volonté ;</li>
                <li>
                  ou d’une interruption, d’une corruption ou d’une anomalie
                  constatée sur les données avant intervention.
                </li>
              </ul>
              <p style={styles.legalText}>
                Le client reste responsable de la communication de ses
                identifiants, autorisations et accès nécessaires à
                l’intervention.
              </p>

              <h2 style={styles.legalArticleTitle}>
                Article 9 — Intervention avec un tiers
              </h2>
              <p style={styles.legalText}>
                Loko peut accompagner le client dans ses démarches auprès d’un
                tiers, notamment un opérateur, un service client, une plateforme
                ou un organisme.
              </p>
              <p style={styles.legalText}>
                Cet accompagnement ne vaut pas garantie de résultat sur la
                décision, le délai, l’action ou le traitement effectué par le
                tiers concerné.
              </p>
              <p style={styles.legalText}>
                Loko ne saurait être tenu responsable :
              </p>
              <ul style={styles.legalList}>
                <li>des décisions, délais ou blocages d’un tiers ;</li>
                <li>d’un refus d’opérateur ou de service ;</li>
                <li>d’un compte bloqué ;</li>
                <li>d’une panne externe ;</li>
                <li>ni de toute situation échappant à son contrôle direct.</li>
              </ul>

              <h2 style={styles.legalArticleTitle}>
                Article 10 — Prise en charge atelier
              </h2>
              <p style={styles.legalText}>
                Certaines situations peuvent nécessiter une prise en charge
                atelier.
              </p>
              <p style={styles.legalText}>
                Dans ce cas, une fiche de prise en charge est établie et signée
                par le client. Cette fiche mentionne notamment :
              </p>
              <ul style={styles.legalList}>
                <li>l’identité du client ;</li>
                <li>le matériel confié ;</li>
                <li>l’état apparent du matériel au moment de sa remise ;</li>
                <li>la panne ou le besoin déclaré ;</li>
                <li>la date de prise en charge.</li>
              </ul>
              <p style={styles.legalText}>
                Le lieu de prise en charge atelier est situé au :
              </p>
              <p style={styles.legalText}>
                <strong>
                  16 bis chemin de la Gillerie, 85340 Les Sables d’Olonne
                </strong>
                .
              </p>
              <p style={styles.legalText}>
                La prise en charge atelier ne vaut pas engagement automatique de
                réparation ni garantie de résultat, sauf accord exprès écrit.
              </p>

              <h2 style={styles.legalArticleTitle}>
                Article 11 — Responsabilité
              </h2>
              <p style={styles.legalText}>
                Loko intervient dans le cadre d’une prestation d’assistance
                numérique, d’accompagnement ou de mise en service. Sa
                responsabilité est limitée au périmètre exact de la prestation
                réalisée.
              </p>
              <p style={styles.legalText}>
                Loko ne saurait être tenu responsable :
              </p>
              <ul style={styles.legalList}>
                <li>d’un équipement défectueux ou déjà altéré ;</li>
                <li>d’un problème antérieur ou non signalé ;</li>
                <li>
                  d’une incompatibilité technique indépendante de sa volonté ;
                </li>
                <li>d’un défaut provenant d’un tiers ;</li>
                <li>d’un usage non conforme postérieur à l’intervention ;</li>
                <li>ni de toute situation échappant à son contrôle direct.</li>
              </ul>

              <h2 style={styles.legalArticleTitle}>
                Article 12 — Réclamations
              </h2>
              <p style={styles.legalText}>
                Toute réclamation doit être adressée à Loko dans un délai
                raisonnable après l’intervention, de préférence par écrit.
              </p>
              <p style={styles.legalText}>
                Après analyse de la situation, Loko pourra, selon les cas :
              </p>
              <ul style={styles.legalList}>
                <li>apporter une précision ;</li>
                <li>proposer un retour ;</li>
                <li>proposer une nouvelle intervention ;</li>
                <li>appliquer un geste commercial ;</li>
                <li>
                  ou refuser la demande si elle ne relève pas de la prestation
                  initiale.
                </li>
              </ul>
              <p style={styles.legalText}>
                Une nouvelle demande, distincte de la prestation initiale,
                pourra faire l’objet d’une nouvelle facturation.
              </p>

              <h2 style={styles.legalArticleTitle}>Article 13 — Paiement</h2>
              <p style={styles.legalText}>
                Le paiement intervient à l’issue de la prestation, sauf cas
                particulier.
              </p>
              <p style={styles.legalText}>
                Loko accepte les moyens de paiement proposés au client au moment
                de l’encaissement.
              </p>
              <p style={styles.legalText}>
                Une facture est transmise au client après intervention.
              </p>

              <h2 style={styles.legalArticleTitle}>
                Article 14 — Droit applicable
              </h2>
              <p style={styles.legalText}>
                Les présentes CGV sont soumises au droit français.
              </p>
              <p style={styles.legalText}>
                En cas de litige, les parties rechercheront d’abord une solution
                amiable. À défaut, le client pourra recourir au médiateur de la
                consommation compétent puis, si nécessaire, aux juridictions
                compétentes.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <CookieBanner />
    </div>
  );
}
function RendezVousContactForm() {
  const [formOpenedAt] = useState(() => Date.now());
  const [turnstileToken, setTurnstileToken] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    const spamError = validateFormSpam(formOpenedAt, turnstileToken);
    if (spamError) {
      e.preventDefault();
      setError(spamError);
    }
  };

  return (
    <>
      <form
        action="https://formspree.io/f/mjgjkbjo"
        method="POST"
        onSubmit={handleSubmit}
        style={styles.form}
      >
        <FormSpamFields
          formOpenedAt={formOpenedAt}
          onTurnstileToken={setTurnstileToken}
        />
        <input
          type="text"
          name="nom"
          placeholder="Votre nom"
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Votre email"
          required
          style={styles.input}
        />
        <input
          type="tel"
          name="telephone"
          placeholder="Votre numéro"
          required
          style={styles.input}
        />
        <input
          list="villes"
          name="ville"
          placeholder="Votre ville"
          required
          style={styles.input}
        />
        <datalist id="villes">
          <option value="Les Sables d’Olonne" />
          <option value="Olonne-sur-Mer" />
          <option value="Château-d’Olonne" />
          <option value="L’Île-d’Olonne" />
          <option value="La Roche-sur-Yon" />
          <option value="Talmont-Saint-Hilaire" />
        </datalist>
        <textarea
          name="message"
          placeholder="Expliquez votre besoin"
          required
          style={styles.textarea}
        />
        <label style={styles.formConsentLabel}>
          <input type="checkbox" name="consent" required />
          <span>
            J’accepte que mes données soient traitées conformément à la{" "}
            <a href="/politique-confidentialite" style={styles.formConsentLink}>
              politique de confidentialité
            </a>
            .
          </span>
        </label>
        {error ? (
          <div style={{ color: "#E5484D", fontSize: 14 }}>{error}</div>
        ) : null}
        <button type="submit" style={styles.submitButton}>
          Envoyer la demande
        </button>
      </form>
    </>
  );
}

function RendezVousPage() {
  return (
    <div style={styles.page}>
      <SiteHeader />

      <main>
        <section style={styles.heroSection}>
          <div style={styles.containerNarrow}>
            <h1 style={styles.heroTitle}>Prendre rendez-vous aux Sables d’Olonne</h1>

            <p style={styles.heroText}>
              Choisissez la méthode la plus simple pour contacter Loko et
              planifier une intervention à domicile.
            </p>

            <div style={styles.cardGridSingle}>
              {/* 📞 Téléphone */}
              <a href="tel:+33763131515" style={styles.linkCard}>
                <h3 style={styles.cardTitle}>📞 Appeler Loko</h3>
                <p style={styles.cardText}>
                  Pour une réponse rapide et une prise de rendez-vous immédiate.
                </p>
              </a>

              {/* 📅 Calendrier Notion */}
              <a
                href="https://calendar.notion.so/meet/ludericgelot/rdvloko"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.linkCard}
              >
                <h3 style={styles.cardTitle}>📅 Choisir un créneau</h3>
                <p style={styles.cardText}>
                  Consultez les disponibilités et choisissez un moment qui vous
                  convient.
                </p>
              </a>

              {/* 📧 Mail */}
              {/* 📝 Formulaire */}
              <div style={styles.infoCard}>
                <h3 style={styles.cardTitle}>📝 Prise de contact</h3>

                <RendezVousContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <CookieBanner />
    </div>
  );
}
function PlanDuSitePage() {
  const cityLinks = NEARBY_CITIES.map((city) => ({
    href: `/aide-informatique-${city.slug}`,
    title: `Aide informatique à ${city.name}`,
    text: `Assistance numérique à domicile à ${city.name} et alentours.`,
  }));

  const links = [
    { href: "/", title: "Accueil", text: "Page principale de Loko." },
    {
      href: "/rendez-vous",
      title: "Prendre rendez-vous",
      text: "Appeler, choisir un créneau ou envoyer une demande.",
    },
    {
      href: "/tarifs",
      title: "Tarifs",
      text: "Tarifs d’intervention à domicile et informations sur le crédit d’impôt.",
    },
    {
      href: "/zone-intervention",
      title: "Zone d’intervention",
      text: "Communes desservies autour des Sables d’Olonne.",
    },
    {
      href: "/depannage-wifi-internet-les-sables-dolonne",
      title: "Problème Wi-Fi / Internet",
      text: "Aide à domicile pour box, Wi-Fi, réseau et connexion.",
    },
    {
      href: "/depannage-wifi-internet-les-sables-dolonne",
      title: "Problème Internet",
      text: "Aide à domicile pour les coupures Internet, les box sans connexion et les accès réseau indisponibles.",
    },
    {
      href: "/depannage-wifi-internet-les-sables-dolonne",
      title: "Wi-Fi ne fonctionne plus",
      text: "Aide à domicile si le Wi-Fi ne fonctionne plus ou si la connexion est impossible.",
    },
    {
      href: "/depannage-wifi-internet-les-sables-dolonne",
      title: "Installation box Internet",
      text: "Aide à domicile pour installer une box et connecter les appareils.",
    },
    {
      href: "/transfert-donnees-sauvegarde-les-sables-dolonne",
      title: "Transfert de données téléphone",
      text: "Aide à domicile pour transférer photos, contacts et applications.",
    },
    {
      href: "/transfert-donnees-sauvegarde-les-sables-dolonne",
      title: "Changement de téléphone",
      text: "Aide à domicile pour repartir sur un nouveau téléphone sans stress.",
    },
    {
      href: "/depannage-wifi-internet-les-sables-dolonne",
      title: "Wi-Fi lent",
      text: "Aide à domicile pour les lenteurs Wi-Fi, les coupures et les problèmes de couverture réseau.",
    },
    {
      href: "/depannage-informatique-les-sables-dolonne",
      title: "Ordinateur lent",
      text: "Aide à domicile si votre ordinateur devient trop lent, rame ou bloque au quotidien.",
    },
    {
      href: "/depannage-informatique-les-sables-dolonne",
      title: "Imprimante qui ne fonctionne plus",
      text: "Aide à domicile pour reconnecter ou remettre en route une imprimante bloquée.",
    },
    {
      href: "/depannage-smartphone-les-sables-dolonne",
      title: "Aide smartphone",
      text: "Réglages, stockage, transfert de données et accompagnement.",
    },
    {
      href: "/depannage-informatique-les-sables-dolonne",
      title: "Dépannage informatique à domicile",
      text: "Aide aux Sables d’Olonne pour ordinateur lent, réglages, imprimante et usage du quotidien.",
    },
    {
      href: "/depannage-informatique-les-sables-dolonne",
      title: "TV & box",
      text: "Installation, connexion, applications et accompagnement.",
    },
    {
      href: "/transfert-donnees-sauvegarde-les-sables-dolonne",
      title: "Transfert de données",
      text: "Migration de téléphone ou d’ordinateur en douceur.",
    },
    {
      href: "/formation-informatique-seniors-les-sables-dolonne",
      title: "Apprendre le numérique",
      text: "Accompagnement à domicile pour apprendre à utiliser les outils numériques du quotidien.",
    },
    {
      href: "/formation-informatique-seniors-les-sables-dolonne",
      title: "Assistance numérique senior",
      text: "Accompagnement à domicile pour les seniors qui veulent reprendre confiance avec le numérique.",
    },
    {
      href: "/formation-informatique-seniors-les-sables-dolonne",
      title: "Découverte de l’IA",
      text: "Comprendre et utiliser l’intelligence artificielle simplement.",
    },
    {
      href: "/blog",
      title: "Blog Loko",
      text: "Conseils et articles sur le Wi-Fi, Internet et l’assistance numérique à domicile.",
    },
    ...cityLinks,
    {
      href: "/cgv",
      title: "CGV",
      text: "Conditions générales de vente.",
    },
    {
      href: "/politique-confidentialite",
      title: "Politique de confidentialité",
      text: "Traitement des données et confidentialité.",
    },
    {
      href: "/mentions-legales",
      title: "Mentions légales",
      text: "Informations légales du site.",
    },
    {
      href: "/credit-impot",
      title: "Crédit d’impôt de 50 %",
      text: "Comprendre le fonctionnement du crédit d’impôt applicable aux prestations éligibles.",
    },
    {
      href: "/depannage-tv-box-les-sables-dolonne",
      title: "TV qui ne fonctionne plus",
      text: "Aide à domicile si votre télévision affiche un écran noir, aucun signal ou un problème de source.",
    },
    {
      href: "/depannage-tv-box-les-sables-dolonne",
      title: "Problème box TV",
      text: "Aide à domicile pour une box TV bloquée, un décodeur qui bug ou des chaînes indisponibles.",
    },
    {
      href: "/depannage-tv-box-les-sables-dolonne",
      title: "Netflix ne fonctionne plus",
      text: "Aide à domicile si Netflix ne se lance plus, bug ou fonctionne mal sur votre installation.",
    },
    {
      href: "/formation-informatique-seniors-les-sables-dolonne",
      title: "Apprendre à utiliser un ordinateur Windows",
      text: "Accompagnement à domicile pour apprendre à utiliser un PC Windows simplement.",
    },
    {
      href: "/formation-informatique-seniors-les-sables-dolonne",
      title: "Apprendre à utiliser un MacBook",
      text: "Accompagnement à domicile pour apprendre à utiliser un MacBook simplement.",
    },
    {
      href: "/formation-informatique-seniors-les-sables-dolonne",
      title: "Apprendre à utiliser un smartphone",
      text: "Accompagnement à domicile pour apprendre à mieux utiliser son téléphone au quotidien.",
    },
    {
      href: "/formation-informatique-seniors-les-sables-dolonne",
      title: "Apprendre à utiliser Internet",
      text: "Accompagnement à domicile pour comprendre la navigation et les usages du web.",
    },
    {
      href: "/formation-informatique-seniors-les-sables-dolonne",
      title: "Apprendre à utiliser sa messagerie",
      text: "Accompagnement à domicile pour lire, envoyer et retrouver ses mails plus facilement.",
    },
  ];

  return (
    <div style={styles.page}>
      <SiteHeader />

      <main>
        <section style={styles.heroSection}>
          <div style={styles.containerNarrow}>
            <div style={styles.badge}>Plan du site • Loko</div>
            <h1 style={styles.heroTitle}>Plan du site Loko</h1>
            <p style={styles.heroText}>
              Retrouvez ici toutes les pages importantes du site Loko pour
              accéder rapidement aux services et informations utiles.
            </p>

            <div style={styles.cardGridSingle}>
              {links.map((link) => (
                <LinkCard
                  key={`${link.href}-${link.title}`}
                  href={link.href}
                  title={link.title}
                  text={link.text}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <CookieBanner />
    </div>
  );
}

function HoverLink({
  href,
  onClick,
  children,
  baseStyle,
  hoverStyle,
  target,
  rel,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const style = { ...baseStyle, ...(isHovered ? hoverStyle : {}) };
  const handlers = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        style={{
          appearance: "none",
          border: 0,
          margin: 0,
          padding: 0,
          background: "transparent",
          font: "inherit",
          textAlign: "inherit",
          cursor: "pointer",
          ...style,
        }}
        {...handlers}
      >
        {children}
      </button>
    );
  }

  return (
    <a href={href} target={target} rel={rel} style={style} {...handlers}>
      {children}
    </a>
  );
}

function HoverButton({
  href,
  onClick,
  children,
  variant = "primary",
  baseStyle,
  hoverStyle,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const resolvedBaseStyle =
    baseStyle ||
    (variant === "primary" ? styles.primaryButton : styles.secondaryButton);

  const resolvedHoverStyle =
    hoverStyle ||
    (variant === "primary"
      ? styles.primaryButtonHover
      : styles.secondaryButtonHover);

  const style = {
    ...resolvedBaseStyle,
    ...(isHovered ? resolvedHoverStyle : {}),
  };
  const handlers = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        style={{ ...style, font: "inherit", appearance: "none" }}
        {...handlers}
      >
        {children}
      </button>
    );
  }

  return (
    <a href={href} style={style} {...handlers}>
      {children}
    </a>
  );
}

// Icônes line-art des modales (au thème du site, remplacent les emojis).
const MODAL_ICO = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#2563EB",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
function IconPhone() {
  return (
    <svg {...MODAL_ICO} aria-hidden="true">
      <path d="M5 4h3l1.5 5-2 1.2a11 11 0 0 0 5.3 5.3l1.2-2 5 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg {...MODAL_ICO} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </svg>
  );
}
function IconSend() {
  return (
    <svg {...MODAL_ICO} aria-hidden="true">
      <path d="M21 3L10.5 13.5M21 3l-6.5 18-4-8.5L2 8.5z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg {...MODAL_ICO} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </svg>
  );
}
function IconClose() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

// Bouton de contact compact (carte Contact de l'accueil) : icône + label.
function ContactQuickButton({ icon, label, href, onClick, external }) {
  const isMobile = useIsMobile();
  const [h, setH] = useState(false);
  const style = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    justifyContent: "center",
    gap: isMobile ? 7 : 10,
    width: "100%",
    boxSizing: "border-box",
    background: "#fff",
    border: `1px solid ${h ? "rgba(37,99,235,0.35)" : "rgba(28,36,51,0.10)"}`,
    borderRadius: 14,
    padding: isMobile ? "14px 8px" : "11px 13px",
    cursor: "pointer",
    textDecoration: "none",
    fontFamily: "inherit",
    fontSize: 14.5,
    fontWeight: 700,
    color: "#1C2433",
    transform: h ? "translateY(-2px)" : "none",
    boxShadow: h ? "0 10px 24px rgba(28,36,51,0.10)" : "none",
    transition: "all 0.2s ease",
  };
  const handlers = {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
  };
  const content = (
    <>
      <span
        style={{
          width: 30,
          height: 30,
          borderRadius: 9,
          background: "rgba(37,99,235,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      {label}
    </>
  );
  if (onClick)
    return (
      <button type="button" onClick={onClick} style={style} {...handlers}>
        {content}
      </button>
    );
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={style}
      {...handlers}
    >
      {content}
    </a>
  );
}

function openContactModal() {
  if (typeof window !== "undefined")
    window.dispatchEvent(new CustomEvent("loko:contact"));
}

function useTurnstile(onToken) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return undefined;

    const renderWidget = () => {
      if (!containerRef.current || !window.turnstile) return;
      if (widgetIdRef.current != null) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token) => onToken(token),
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken(""),
      });
    };

    if (window.turnstile) {
      renderWidget();
      return undefined;
    }

    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = renderWidget;
    document.head.appendChild(script);

    return () => {
      if (widgetIdRef.current != null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, [onToken]);

  return containerRef;
}

function FormSpamFields({ formOpenedAt, onTurnstileToken }) {
  const [token, setToken] = useState("");
  const turnstileRef = useTurnstile(
    useCallback(
      (value) => {
        setToken(value);
        if (onTurnstileToken) onTurnstileToken(value);
      },
      [onTurnstileToken]
    )
  );

  return (
    <>
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={styles.honeypot}
      />
      <input type="hidden" name="_formOpenedAt" value={formOpenedAt} />
      {TURNSTILE_SITE_KEY ? (
        <>
          <div ref={turnstileRef} style={{ marginTop: 4 }} />
          <input type="hidden" name="cf-turnstile-response" value={token} />
        </>
      ) : null}
    </>
  );
}

function validateFormSpam(formOpenedAt, turnstileToken) {
  if (Date.now() - formOpenedAt < MIN_FORM_DELAY_MS) {
    return "Merci de patienter quelques secondes avant d’envoyer le formulaire.";
  }
  if (TURNSTILE_SITE_KEY && !turnstileToken) {
    return "Merci de valider le contrôle anti-spam.";
  }
  return "";
}

function ContactOption({ icon, title, text, href, onClick, external }) {
  const [h, setH] = useState(false);
  const style = {
    display: "flex",
    alignItems: "center",
    gap: 14,
    textAlign: "left",
    width: "100%",
    boxSizing: "border-box",
    background: "#fff",
    border: `1px solid ${h ? "rgba(37,99,235,0.35)" : "rgba(28,36,51,0.10)"}`,
    borderRadius: 16,
    padding: "16px 18px",
    cursor: "pointer",
    textDecoration: "none",
    transform: h ? "translateY(-2px)" : "none",
    boxShadow: h ? "0 12px 28px rgba(28,36,51,0.10)" : "none",
    transition: "all 0.2s ease",
    font: "inherit",
  };
  const handlers = {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
  };
  const inner = (
    <>
      <span
        style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          background: "rgba(37,99,235,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <span style={{ flex: 1 }}>
        <span style={{ display: "block", fontSize: 16, fontWeight: 700, color: "#1C2433" }}>
          {title}
        </span>
        <span style={{ display: "block", fontSize: 13.5, color: "rgba(28,36,51,0.6)" }}>
          {text}
        </span>
      </span>
      <span style={{ color: "#2563EB", fontSize: 18 }}>→</span>
    </>
  );
  if (onClick)
    return (
      <button type="button" onClick={onClick} style={style} {...handlers}>
        {inner}
      </button>
    );
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={style}
      {...handlers}
    >
      {inner}
    </a>
  );
}

function ContactModal() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("choose");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [formOpenedAt, setFormOpenedAt] = useState(() => Date.now());
  const [turnstileToken, setTurnstileToken] = useState("");

  useEffect(() => {
    const onOpen = () => {
      setStep("choose");
      setError("");
      setSending(false);
      setOpen(true);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("loko:contact", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("loko:contact", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const close = () => setOpen(false);

  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const spamError = validateFormSpam(formOpenedAt, turnstileToken);
    if (spamError) {
      setError(spamError);
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch("https://formspree.io/f/mjgjkbjo", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) setStep("sent");
      else
        setError(
          "Une erreur est survenue. Réessayez ou appelez-nous directement."
        );
    } catch (err) {
      setError(
        "Une erreur est survenue. Réessayez ou appelez-nous directement."
      );
    }
    setSending(false);
  };

  const input = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(28,36,51,0.16)",
    fontSize: 15,
    color: "#1C2433",
    background: "#fff",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };
  const eyebrow = {
    fontSize: 12.5,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#2563EB",
    marginBottom: 8,
  };
  const title = {
    fontSize: 24,
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: "#1C2433",
    margin: "0 0 6px",
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Contacter Loko"
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(11,12,15,0.55)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? 16 : 24,
        fontFamily: UI_FONT,
        animation: "lkFadeUp 0.25s ease both",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          background: "#FBF8F3",
          borderRadius: 24,
          width: "100%",
          maxWidth: 520,
          maxHeight: "90vh",
          overflowY: "auto",
          padding: isMobile ? "30px 22px 26px" : "34px 34px 30px",
          boxShadow: "0 30px 80px rgba(11,12,15,0.4)",
        }}
      >
        <button
          onClick={close}
          aria-label="Fermer"
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 34,
            height: 34,
            borderRadius: 10,
            border: "none",
            background: "rgba(28,36,51,0.06)",
            color: "#1C2433",
            fontSize: 20,
            lineHeight: 1,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconClose />
        </button>

        {step === "choose" && (
          <>
            <div style={eyebrow}>Contact</div>
            <h2 style={title}>Comment souhaitez-vous nous joindre ?</h2>
            <p style={{ fontSize: 15, color: "rgba(28,36,51,0.6)", margin: "0 0 22px" }}>
              Choisissez ce qui vous arrange — intervention à domicile aux Sables
              d’Olonne et alentours.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <ContactOption
                icon={<IconPhone />}
                title="Appeler Loko"
                text="Réponse rapide, rendez-vous immédiat."
                href={`tel:${BUSINESS_PHONE}`}
              />
              <ContactOption
                icon={<IconCalendar />}
                title="Choisir un créneau"
                text="Consultez les disponibilités en ligne."
                href="https://calendar.notion.so/meet/ludericgelot/rdvloko"
                external
              />
              <ContactOption
                icon={<IconSend />}
                title="Envoyer un message"
                text="On vous recontacte au plus vite."
                onClick={() => {
                  setFormOpenedAt(Date.now());
                  setTurnstileToken("");
                  setStep("form");
                }}
              />
            </div>
          </>
        )}

        {step === "form" && (
          <>
            <button
              onClick={() => setStep("choose")}
              style={{
                background: "none",
                border: "none",
                color: "rgba(28,36,51,0.6)",
                fontSize: 14,
                cursor: "pointer",
                padding: 0,
                marginBottom: 10,
                fontFamily: "inherit",
              }}
            >
              ← Retour
            </button>
            <h2 style={title}>Envoyer un message</h2>
            <form
              onSubmit={submit}
              style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}
            >
              <FormSpamFields
                formOpenedAt={formOpenedAt}
                onTurnstileToken={setTurnstileToken}
              />
              <input name="nom" placeholder="Votre nom" required style={input} />
              <input
                type="email"
                name="email"
                placeholder="Votre email"
                required
                style={input}
              />
              <input
                type="tel"
                name="telephone"
                placeholder="Votre numéro"
                required
                style={input}
              />
              <input
                list="modal-villes"
                name="ville"
                placeholder="Votre ville"
                required
                style={input}
              />
              <datalist id="modal-villes">
                <option value="Les Sables d’Olonne" />
                <option value="Olonne-sur-Mer" />
                <option value="Château-d’Olonne" />
                <option value="L’Île-d’Olonne" />
                <option value="Talmont-Saint-Hilaire" />
              </datalist>
              <textarea
                name="message"
                placeholder="Expliquez votre besoin"
                required
                rows={4}
                style={{ ...input, resize: "vertical" }}
              />
              <label style={styles.formConsentLabel}>
                <input type="checkbox" name="consent" required />
                <span>
                  J’accepte que mes données soient traitées conformément à la{" "}
                  <a href="/politique-confidentialite" style={styles.formConsentLink}>
                    politique de confidentialité
                  </a>
                  .
                </span>
              </label>
              {error ? (
                <div style={{ color: "#E5484D", fontSize: 14 }}>{error}</div>
              ) : null}
              <button
                type="submit"
                disabled={sending}
                style={{
                  background: "#1C2433",
                  color: "#FBF8F3",
                  border: "none",
                  borderRadius: 14,
                  padding: "14px 20px",
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: sending ? "default" : "pointer",
                  opacity: sending ? 0.7 : 1,
                  fontFamily: "inherit",
                }}
              >
                {sending ? "Envoi…" : "Envoyer la demande"}
              </button>
            </form>
          </>
        )}

        {step === "sent" && (
          <div style={{ textAlign: "center", padding: "16px 0 6px" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <svg width="54" height="54" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="11" fill="rgba(37,99,235,0.1)" />
                <path
                  d="M7 12.5l3.2 3.2L17 8.8"
                  stroke="#2563EB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 style={{ ...title, marginTop: 12 }}>Message envoyé !</h2>
            <p style={{ fontSize: 15, color: "rgba(28,36,51,0.66)", margin: "0 0 20px" }}>
              Merci, je vous recontacte au plus vite. Pour une urgence, appelez
              le {BUSINESS_PHONE}.
            </p>
            <HoverButton onClick={close} variant="primary">
              Fermer
            </HoverButton>
          </div>
        )}
      </div>
    </div>
  );
}

function openCreditModal() {
  if (typeof window !== "undefined")
    window.dispatchEvent(new CustomEvent("loko:credit"));
}

function CreditModal() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("loko:credit", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("loko:credit", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;
  const close = () => setOpen(false);

  const point = (txt) => (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
      <span
        style={{
          flexShrink: 0,
          width: 24,
          height: 24,
          borderRadius: 7,
          background: "rgba(37,99,235,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 1,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 12.5l4 4 10-10"
            stroke="#2563EB"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span style={{ fontSize: 15, lineHeight: 1.5, color: "rgba(28,36,51,0.82)" }}>
        {txt}
      </span>
    </div>
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Crédit d’impôt"
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(11,12,15,0.55)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? 16 : 24,
        fontFamily: UI_FONT,
        animation: "lkFadeUp 0.25s ease both",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          background: "#FBF8F3",
          borderRadius: 24,
          width: "100%",
          maxWidth: 520,
          maxHeight: "90vh",
          overflowY: "auto",
          padding: isMobile ? "30px 22px 26px" : "34px 34px 30px",
          boxShadow: "0 30px 80px rgba(11,12,15,0.4)",
        }}
      >
        <button
          onClick={close}
          aria-label="Fermer"
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 34,
            height: 34,
            borderRadius: 10,
            border: "none",
            background: "rgba(28,36,51,0.06)",
            color: "#1C2433",
            fontSize: 20,
            lineHeight: 1,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconClose />
        </button>

        <div
          style={{
            fontSize: 12.5,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#2563EB",
            marginBottom: 8,
          }}
        >
          Service à la personne
        </div>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#1C2433",
            margin: "0 0 8px",
          }}
        >
          Crédit d’impôt de 50 %
        </h2>
        <p style={{ fontSize: 15, color: "rgba(28,36,51,0.66)", margin: "0 0 18px" }}>
          Loko est déclaré organisme de services à la personne : la moitié de ce
          que vous payez vous est remboursée par l’État, sous forme de crédit
          d’impôt.
        </p>

        <div
          style={{
            background: "#F4F0EA",
            borderRadius: 16,
            padding: "16px 18px",
            margin: "0 0 20px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "rgba(28,36,51,0.5)",
              textDecoration: "line-through",
            }}
          >
            79 €
          </span>
          <span style={{ color: "#2563EB", fontSize: 20 }}>→</span>
          <span style={{ fontSize: 26, fontWeight: 800, color: "#1C2433" }}>
            39,50 €
          </span>
          <span
            style={{
              fontSize: 13.5,
              color: "rgba(28,36,51,0.6)",
              marginLeft: "auto",
            }}
          >
            après crédit d’impôt
          </span>
        </div>

        {point("50 % du montant des prestations éligibles, remboursé.")}
        {point("Même si vous n’êtes pas imposable : c’est versé, pas seulement déduit.")}
        {point("Une attestation fiscale vous est fournie pour votre déclaration.")}

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 22 }}>
          <HoverButton
            onClick={() => {
              close();
              openContactModal();
            }}
            variant="primary"
          >
            Prendre rendez-vous
          </HoverButton>
          <HoverButton href="/credit-impot" variant="secondary">
            Voir le détail
          </HoverButton>
        </div>
      </div>
    </div>
  );
}

function LinkCard({ href, title, text, compact = false }) {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);
  // En mode compact sur mobile : titre seul, carte plus petite → 2 par ligne.
  const titleOnly = compact && isMobile;

  return (
    <a
      href={href}
      style={{
        ...styles.linkCard,
        ...(titleOnly ? styles.linkCardCompact : {}),
        ...(isHovered ? styles.linkCardHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3
        style={{
          ...styles.cardTitle,
          ...(titleOnly ? styles.cardTitleCompact : {}),
          ...(isHovered ? styles.cardTitleHover : {}),
        }}
      >
        {title}
      </h3>

      {titleOnly ? (
        <span style={styles.cardCompactArrow} aria-hidden="true">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1C2433"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      ) : (
        <p
          style={{
            ...styles.cardText,
            ...(isHovered ? styles.cardTextHover : {}),
          }}
        >
          {text}
        </p>
      )}
    </a>
  );
}

function SiteLogo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="/"
      style={{
        ...styles.logoLink,
        ...(isHovered ? styles.logoLinkHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Retour à l’accueil Loko"
    >
      <div style={styles.logoWrap}>
        <img src="/logo-loko.webp" alt="Logo Loko" style={styles.logoImage} />
        <div style={styles.logoTextBlock}>
          <div style={styles.sublogo}>Assistance numérique à domicile</div>
        </div>
      </div>
    </a>
  );
}

function FooterSocialLink({ href, label, children }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        ...styles.socialIcon,
        ...(isHovered ? styles.socialIconHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </a>
  );
}
function GoogleIcon({ size = 17 }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={styles.socialSvg}
      fill="currentColor"
    >
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.7-1.6H16.7V3.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4V10H8v3h2.5v8h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={styles.socialSvg}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={styles.socialSvg}
      fill="currentColor"
    >
      <path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.4a1.56 1.56 0 0 1 0 3.1ZM5.5 9.75h2.9V18H5.5V9.75Zm4.72 0H13v1.13h.04c.39-.74 1.35-1.52 2.78-1.52 2.97 0 3.52 1.95 3.52 4.49V18h-2.9v-3.65c0-.87-.02-1.99-1.21-1.99-1.22 0-1.41.95-1.41 1.93V18h-2.9V9.75Z" />
    </svg>
  );
}

// Icône de la marque Lockpit (lock-pit.com) — source : lockpit-site/assets/lockpit-app-icon.svg
function LockpitIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#1A2E3D" />
      <path
        d="M 16 5 A 8 8 0 1 0 16 19"
        fill="none"
        stroke="#FCEFE3"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="12"
        x2="17.5"
        y2="6.5"
        stroke="#FFB627"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="1.7" fill="#FFB627" />
    </svg>
  );
}

function ProBand() {
  const isMobile = useIsMobile();
  const [hover, setHover] = useState(false);
  return (
    <section
      style={{
        background: "#FBF8F3",
        borderTop: "1px solid rgba(28,36,51,0.06)",
        padding: isMobile ? "30px 0" : "42px 0",
      }}
    >
      <div style={styles.container}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            background: "linear-gradient(158deg, #FFFFFF 0%, #EEF3FF 100%)",
            border: "1px solid rgba(37,99,235,0.16)",
            borderRadius: 24,
            padding: isMobile ? "26px 24px" : "30px 38px",
          }}
        >
          <div style={{ maxWidth: 620 }}>
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#2563EB",
                marginBottom: 8,
              }}
            >
              Espace pro
            </div>
            <div
              style={{
                fontSize: isMobile ? 20 : 23,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "#1C2433",
                lineHeight: 1.2,
              }}
            >
              Vous êtes une entreprise ou un professionnel ?
            </div>
            <div
              style={{
                fontSize: 15.5,
                lineHeight: 1.6,
                color: "rgba(28,36,51,0.66)",
                marginTop: 8,
              }}
            >
              Lockpit conçoit votre site et votre présence web. Loko reste votre
              interlocuteur à domicile pour les particuliers.
            </div>
          </div>
          <a
            href="https://www.lock-pit.com"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: hover ? "#1d4fd7" : "#2563EB",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              padding: "14px 24px",
              borderRadius: 16,
              flexShrink: 0,
              whiteSpace: "nowrap",
              transition: "background 0.2s ease",
            }}
          >
            <LockpitIcon size={22} />
            Découvrir Lockpit →
          </a>
        </div>
      </div>
    </section>
  );
}

// Choisit une illustration de couverture selon les tags de l'article.
function blogCoverKind(tags = []) {
  const t = tags.join(" ").toLowerCase();
  if (/wi-?fi|internet|box|r[ée]seau/.test(t)) return "wifi";
  if (/smartphone|t[ée]l[ée]phone|iphone|android/.test(t)) return "phone";
  if (/s[ée]curit[ée]|virus|arnaque|mot de passe/.test(t)) return "shield";
  if (/ordinateur|\bpc\b|informatique|imprimante/.test(t)) return "laptop";
  if (/\btv\b|t[ée]l[ée]|streaming/.test(t)) return "tv";
  if (/donn[ée]es|transfert|sauvegarde/.test(t)) return "data";
  return "spark";
}

function BlogCoverIcon({ kind, size = 88 }) {
  const blue = "#2563EB";
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: blue,
    strokeWidth: 2.4,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (kind) {
    case "wifi":
      return (
        <svg {...p}>
          <path d="M10 23a20 20 0 0 1 28 0" />
          <path d="M16 29a12 12 0 0 1 16 0" />
          <circle cx="24" cy="35" r="1.8" fill={blue} stroke="none" />
        </svg>
      );
    case "phone":
      return (
        <svg {...p}>
          <rect x="16" y="7" width="16" height="34" rx="3" />
          <line x1="22" y1="36" x2="26" y2="36" />
        </svg>
      );
    case "laptop":
      return (
        <svg {...p}>
          <rect x="10" y="12" width="28" height="18" rx="2" />
          <path d="M6 36h36l-3-6H9z" />
        </svg>
      );
    case "tv":
      return (
        <svg {...p}>
          <rect x="8" y="11" width="32" height="22" rx="3" />
          <path d="M18 40h12M24 33v7" />
        </svg>
      );
    case "data":
      return (
        <svg {...p}>
          <rect x="6" y="17" width="12" height="16" rx="2" />
          <rect x="30" y="17" width="12" height="14" rx="2" />
          <path d="M20 25h7M25 22l3 3-3 3" />
        </svg>
      );
    case "shield":
      return (
        <svg {...p}>
          <path d="M24 6l14 5v9c0 9-6 15-14 18-8-3-14-9-14-18v-9z" />
          <path d="M18 24l4 4 8-8" />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <path d="M24 7v6M24 35v6M7 24h6M35 24h6M13 13l4 4M31 31l4 4M35 13l-4 4M17 31l-4 4" />
          <circle cx="24" cy="24" r="4" />
        </svg>
      );
  }
}

// Couverture d'article : vraie image si `cover` fourni, sinon illustration SVG au thème.
function BlogCover({ post, height, radius = 16 }) {
  if (post.cover) {
    return (
      <img
        src={post.cover}
        alt={post.title}
        loading="lazy"
        style={{
          width: "100%",
          height,
          objectFit: "cover",
          borderRadius: radius,
          display: "block",
        }}
      />
    );
  }
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height,
        borderRadius: radius,
        overflow: "hidden",
        border: "1px solid rgba(37,99,235,0.12)",
        background:
          "linear-gradient(158deg, #EEF3FF 0%, #FFFFFF 55%, #E7EEFF 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.14), transparent 68%)",
          top: "-32%",
          right: "-8%",
          pointerEvents: "none",
        }}
      />
      <BlogCoverIcon
        kind={blogCoverKind(post.tags)}
        size={Math.min(96, Math.round(height * 0.5))}
      />
    </div>
  );
}

function BlogCard({ post }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={`/blog/${post.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        background: "#FFFFFF",
        border: `1px solid ${
          hover ? "rgba(37,99,235,0.30)" : "rgba(28,36,51,0.08)"
        }`,
        borderRadius: 24,
        padding: "24px 24px",
        textDecoration: "none",
        transform: hover ? "translateY(-4px)" : "none",
        boxShadow: hover
          ? "0 16px 36px rgba(28,36,51,0.10)"
          : "0 6px 20px rgba(28,36,51,0.05)",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <BlogCover post={post} height={168} radius={14} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {post.tags.slice(0, 2).map((tg) => (
          <span
            key={tg}
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#2563EB",
              background: "rgba(37,99,235,0.08)",
              padding: "4px 10px",
              borderRadius: 999,
            }}
          >
            {tg}
          </span>
        ))}
      </div>
      <h2
        style={{
          fontSize: 21,
          lineHeight: 1.25,
          letterSpacing: "-0.02em",
          color: "#1C2433",
          fontWeight: 800,
          margin: 0,
        }}
      >
        {post.title}
      </h2>
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.6,
          color: "rgba(28,36,51,0.66)",
          margin: 0,
        }}
      >
        {post.description}
      </p>
      <div
        style={{
          marginTop: "auto",
          paddingTop: 8,
          display: "flex",
          gap: 10,
          alignItems: "center",
          fontSize: 13,
          color: "rgba(28,36,51,0.5)",
        }}
      >
        <span>{post.dateLabel}</span>
        <span>•</span>
        <span>{post.readingMinutes} min de lecture</span>
      </div>
    </a>
  );
}

function BlogIndexPage() {
  const isMobile = useIsMobile();
  return (
    <div style={styles.page}>
      <SiteHeader />
      <main>
        <section style={{ padding: isMobile ? "52px 0 18px" : "72px 0 28px" }}>
          <div style={styles.container}>
            <span style={styles.badge}>Blog • Conseils numériques</span>
            <h1 style={{ ...styles.sectionTitle, marginTop: 10 }}>
              Le blog Loko
            </h1>
            <p style={styles.sectionText}>
              Des astuces simples et des réponses concrètes aux questions qu’on
              me pose le plus souvent à domicile aux Sables d’Olonne.
            </p>
          </div>
        </section>
        <section style={{ padding: isMobile ? "8px 0 54px" : "16px 0 80px" }}>
          <div style={styles.container}>
            {BLOG_POSTS.length ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: 20,
                }}
              >
                {BLOG_POSTS.map((p) => (
                  <BlogCard key={p.slug} post={p} />
                ))}
              </div>
            ) : (
              <p style={styles.sectionText}>
                Les premiers articles arrivent bientôt.
              </p>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
      <CookieBanner />
    </div>
  );
}

function BlogPostPage({ post }) {
  const isMobile = useIsMobile();
  return (
    <div style={styles.page}>
      <SiteHeader />
      <main>
        <section style={{ padding: isMobile ? "44px 0 8px" : "60px 0 12px" }}>
          <div style={styles.containerNarrow}>
            <HoverLink
              href="/blog"
              baseStyle={styles.backLink}
              hoverStyle={styles.backLinkHover}
            >
              ← Tous les articles
            </HoverLink>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
              {post.tags.map((tg) => (
                <span
                  key={tg}
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#2563EB",
                    background: "rgba(37,99,235,0.08)",
                    padding: "5px 12px",
                    borderRadius: 999,
                  }}
                >
                  {tg}
                </span>
              ))}
            </div>
            <h1 style={{ ...styles.sectionTitle, maxWidth: 760, marginTop: 14 }}>
              {post.title}
            </h1>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                alignItems: "center",
                fontSize: 14,
                color: "rgba(28,36,51,0.5)",
                marginTop: 14,
              }}
            >
              <span>Par Ludéric</span>
              <span>•</span>
              <span>{post.dateLabel}</span>
              <span>•</span>
              <span>{post.readingMinutes} min de lecture</span>
            </div>

            <div style={{ marginTop: 26 }}>
              <BlogCover post={post} height={isMobile ? 200 : 340} radius={20} />
            </div>
          </div>
        </section>
        <section style={{ padding: isMobile ? "8px 0 40px" : "16px 0 56px" }}>
          <div style={styles.containerNarrow}>
            <div
              className="lk-article"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            {post.relatedHref ? (
              <div style={{ marginTop: 36 }}>
                <HoverButton href={post.relatedHref} variant="primary">
                  {post.relatedLabel || "Voir le service"} →
                </HoverButton>
              </div>
            ) : null}
          </div>
        </section>
      </main>
      <SiteFooter />
      <CookieBanner />
    </div>
  );
}

function SiteFooter() {
  const isMobile = useIsMobile();
  // Sur mobile, on enlève les "boîtes" (bord + fond + padding) pour un footer
  // plus aéré et pensé mobile : titres + listes à plat.
  const flatPanel = isMobile
    ? { background: "transparent", border: 0, borderRadius: 0, padding: 0 }
    : {};

  return (
    <>
      <ProBand />
      <footer
        style={{
          ...styles.footer,
          ...(isMobile ? { padding: "30px 0 20px" } : {}),
        }}
      >
      <div style={styles.container}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.3fr 1fr 1.3fr",
            gap: isMobile ? 22 : 28,
            alignItems: "stretch",
            justifyItems: "stretch",
            textAlign: "left",
          }}
        >
          <div
            style={{
              ...styles.footerPanel,
              ...flatPanel,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/logo-loko-footer.png"
              alt="Logo Loko"
              style={{
                width: "100%",
                maxWidth: isMobile ? 190 : 360,
                height: "auto",
                display: "block",
              }}
            />
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 22,
                width: "100%",
                justifyContent: "center",
              }}
            >
              <FooterSocialLink
                href="https://www.facebook.com/profile.php?id=61572843448082&locale=fr_FR"
                label="Facebook Loko"
              >
                <FacebookIcon />
              </FooterSocialLink>
              <FooterSocialLink
                href="https://www.instagram.com/lokolesables/"
                label="Instagram Loko"
              >
                <InstagramIcon />
              </FooterSocialLink>
              <FooterSocialLink
                href="https://www.linkedin.com/company/110110832/"
                label="LinkedIn Loko"
              >
                <LinkedInIcon />
              </FooterSocialLink>
            </div>
          </div>

          <div style={{ ...styles.footerPanel, ...flatPanel }}>
            <div style={styles.footerPanelTitle}>Nos services</div>
            <div style={styles.footerLinkList}>
              {[
                {
                  href: "/depannage-informatique-les-sables-dolonne",
                  label: "Dépannage informatique",
                },
                {
                  href: "/depannage-wifi-internet-les-sables-dolonne",
                  label: "Dépannage Wi-Fi & Internet",
                },
                {
                  href: "/formation-informatique-seniors-les-sables-dolonne",
                  label: "Formation & aide",
                },
                { href: "/credit-impot", label: "Crédit d’impôt 50 %" },
              ].map((s) => (
                <HoverLink
                  key={s.href}
                  href={s.href}
                  baseStyle={styles.footerLink}
                  hoverStyle={styles.footerLinkHover}
                >
                  {s.label}
                </HoverLink>
              ))}
            </div>
          </div>

          <div style={{ ...styles.footerPanel, ...flatPanel }}>
            <div style={styles.footerPanelTitle}>Zones d’intervention</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: isMobile ? "2px 12px" : "4px 18px",
                justifyItems: "start",
              }}
            >
              <HoverLink
                href="/zone-intervention"
                baseStyle={styles.footerLink}
                hoverStyle={styles.footerLinkHover}
              >
                Les Sables d’Olonne
              </HoverLink>
              {NEARBY_CITIES.map((c) => (
                <HoverLink
                  key={c.slug}
                  href={`/aide-informatique-${c.slug}`}
                  baseStyle={styles.footerLink}
                  hoverStyle={styles.footerLinkHover}
                >
                  {c.name}
                </HoverLink>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            ...styles.footerLegalBar,
            ...(isMobile ? styles.footerLegalBarMobile : {}),
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px 18px",
              justifyContent: "center",
            }}
          >
            {[
              { href: "/blog", label: "Blog" },
              { href: "/plan-du-site", label: "Plan du site" },
              { href: "/tarifs", label: "Tarifs" },
              { href: "/mentions-legales", label: "Mentions légales" },
              { href: "/cgv", label: "CGV" },
              { href: "/politique-confidentialite", label: "Confidentialité" },
            ].map((s) => (
              <HoverLink
                key={s.href}
                href={s.href}
                baseStyle={{
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  fontSize: 13,
                  padding: "2px 4px",
                  borderRadius: 8,
                  transition: "all 0.2s ease",
                }}
                hoverStyle={styles.footerLinkHover}
              >
                {s.label}
              </HoverLink>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11.5,
              color: "rgba(255,255,255,0.4)",
            }}
          >
            <span>© {new Date().getFullYear()} Loko — Tous droits réservés</span>
            <span style={styles.footerLegalDot}>•</span>
            <span>Service local d’assistance numérique à domicile</span>
          </div>
          <span
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.4)",
              marginTop: 2,
            }}
          >
            Fait par{" "}
            <a
              href="https://www.lock-pit.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontWeight: 700,
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
              }}
            >
              Lockpit
            </a>{" "}
            avec le ❤️
          </span>
        </div>
      </div>
      </footer>
    </>
  );
}

// Icône de service au trait (filigrane), pour le fond animé du hero.
function FloatIcon({ name, size }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "wifi":
      return (
        <svg {...common}>
          <path d="M5 12.5a10 10 0 0 1 14 0" />
          <path d="M8.5 15.5a5 5 0 0 1 7 0" />
          <circle cx="12" cy="19" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "laptop":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="11" rx="1.5" />
          <path d="M2 19h20" />
        </svg>
      );
    case "mobile":
      return (
        <svg {...common}>
          <rect x="7" y="3" width="10" height="18" rx="2.5" />
          <path d="M10.5 18h3" />
        </svg>
      );
    case "tv":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="12" rx="1.5" />
          <path d="M8 20h8" />
          <path d="M12 17v3" />
        </svg>
      );
    case "printer":
      return (
        <svg {...common}>
          <path d="M6 9V4h12v5" />
          <rect x="4" y="9" width="16" height="7" rx="1.5" />
          <rect x="7" y="14" width="10" height="6" rx="1" />
        </svg>
      );
    case "router":
      return (
        <svg {...common}>
          <rect x="3" y="11" width="18" height="7" rx="1.5" />
          <path d="M7 11V8" />
          <path d="M17 11V5" />
          <circle cx="7.5" cy="14.5" r="0.7" fill="currentColor" stroke="none" />
        </svg>
      );
    case "mouse":
      return (
        <svg {...common}>
          <rect x="8" y="3" width="8" height="18" rx="4" />
          <path d="M12 3v5" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common}>
          <path d="M7 18h10a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.6-1.3A3.5 3.5 0 0 0 7 18z" />
        </svg>
      );
    default:
      return null;
  }
}

// Fond global du site : icônes de services en filigrane qui flottent,
// derrière tout le contenu (le header et le footer, opaques, le masquent).
function SiteBackground() {
  const icons = [
    { name: "wifi", left: "5%", top: "17%", size: 40, dur: 6, delay: 0 },
    { name: "printer", left: "23%", top: "30%", size: 30, dur: 7, delay: 0.4 },
    { name: "mobile", left: "88%", top: "16%", size: 34, dur: 6.8, delay: 0.2 },
    { name: "cloud", left: "70%", top: "26%", size: 36, dur: 8.4, delay: 1.5 },
    { name: "laptop", left: "12%", top: "48%", size: 38, dur: 7.5, delay: 0.8 },
    { name: "router", left: "90%", top: "44%", size: 32, dur: 6.4, delay: 1 },
    { name: "tv", left: "40%", top: "55%", size: 36, dur: 8, delay: 0.6 },
    { name: "mouse", left: "62%", top: "60%", size: 26, dur: 7.2, delay: 1.3 },
    { name: "wifi", left: "82%", top: "72%", size: 34, dur: 6.6, delay: 0.3 },
    { name: "mobile", left: "8%", top: "78%", size: 30, dur: 7.8, delay: 0.9 },
    { name: "laptop", left: "48%", top: "84%", size: 34, dur: 6.9, delay: 1.1 },
    { name: "tv", left: "30%", top: "70%", size: 30, dur: 8.2, delay: 0.5 },
  ];
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
        pointerEvents: "none",
        background: "#FBF8F3",
      }}
    >
      {icons.map((ic, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: ic.left,
            top: ic.top,
            color: "#2563EB",
            opacity: 0.12,
            animation: `lkFloat ${ic.dur}s ease-in-out infinite ${ic.delay}s`,
          }}
        >
          <FloatIcon name={ic.name} size={ic.size} />
        </span>
      ))}
    </div>
  );
}

// Bloc local affiché sur les pages villes : carte de la commune + infos locales.
function CityUniqueSection({ city }) {
  const enrichment = getCityEnrichment(city.slug);
  if (!enrichment?.highlights?.length && !enrichment?.faq?.length) return null;

  return (
    <section style={styles.section}>
      <div style={styles.containerNarrow}>
        {enrichment.highlights?.length ? (
          <>
            <h2 style={styles.sectionTitle}>
              Pourquoi faire appel à Loko à {city.name} ?
            </h2>
            <ul style={styles.legalList}>
              {enrichment.highlights.map((item) => (
                <li key={item} style={styles.legalText}>
                  {item}
                </li>
              ))}
            </ul>
          </>
        ) : null}

        {enrichment.faq?.length ? (
          <div style={{ marginTop: enrichment.highlights?.length ? 32 : 0 }}>
            <h2 style={styles.sectionTitle}>Questions fréquentes à {city.name}</h2>
            <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
              {enrichment.faq.map((item) => (
                <div key={item.q} style={styles.infoCard}>
                  <h3 style={{ ...styles.cardTitle, fontSize: 18 }}>{item.q}</h3>
                  <p style={styles.cardText}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function CityLocalBlock({ city }) {
  const isMobile = useIsMobile();
  const [hasMapConsent, setHasMapConsent] = useState(() =>
    hasExternalMediaConsent()
  );

  useEffect(() => {
    const onConsent = () => setHasMapConsent(hasExternalMediaConsent());
    window.addEventListener("loko:cookie-consent", onConsent);
    return () => window.removeEventListener("loko:cookie-consent", onConsent);
  }, []);

  const mapQuery = encodeURIComponent(`${city.name}, Vendée, France`);
  const mapSrc = `https://maps.google.com/maps?q=${mapQuery}&z=13&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  return (
    <section style={styles.sectionAlt}>
      <div style={styles.container}>
        <h2
          style={{
            ...styles.sectionTitle,
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Loko intervient à {city.name}
        </h2>
        <p
          style={{
            ...styles.sectionText,
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 28,
            maxWidth: 760,
          }}
        >
          {city.local ||
            `Assistance numérique à domicile à ${city.name} et dans les communes voisines, à ~${city.timeMin} minutes des Sables d’Olonne.`}
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr",
            gap: 24,
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              borderRadius: 24,
              overflow: "hidden",
              border: "1px solid rgba(28,36,51,0.1)",
              boxShadow: "0 16px 40px rgba(28,36,51,0.1)",
              minHeight: 340,
            }}
          >
            {hasMapConsent ? (
              <iframe
                title={`Carte de ${city.name}`}
                src={mapSrc}
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: 340,
                  border: 0,
                  display: "block",
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div
                style={{
                  minHeight: 340,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 14,
                  padding: 28,
                  background: "linear-gradient(180deg, #F4F7FB 0%, #E8EEF7 100%)",
                  textAlign: "center",
                }}
              >
                <p style={{ margin: 0, color: "rgba(28,36,51,0.72)", lineHeight: 1.6 }}>
                  La carte Google Maps s’affiche uniquement si vous acceptez les
                  cookies tiers via le bandeau en bas de page.
                </p>
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#2563EB",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Voir {city.name} sur Google Maps
                </a>
              </div>
            )}
          </div>
          <div
            style={{
              background: "#ffffff",
              border: "1px solid rgba(28,36,51,0.08)",
              borderRadius: 24,
              padding: 26,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "#2563EB",
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                Zone d’intervention
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#1C2433",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                }}
              >
                À ~{city.timeMin} min des Sables d’Olonne
              </div>
            </div>
            <div
              style={{
                borderTop: "1px solid rgba(28,36,51,0.08)",
                paddingTop: 16,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(28,36,51,0.55)",
                  marginBottom: 10,
                }}
              >
                Communes voisines aussi desservies
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {city.neighbors.map((n) => {
                  const href = cityNeighborHref(n);
                  const pillStyle = {
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#1C2433",
                    background: "rgba(28,36,51,0.05)",
                    padding: "6px 12px",
                    borderRadius: 999,
                  };
                  return href ? (
                    <HoverLink
                      key={n}
                      href={href}
                      baseStyle={{
                        ...pillStyle,
                        background: "rgba(37,99,235,0.08)",
                        color: "#2563EB",
                        textDecoration: "none",
                      }}
                      hoverStyle={{ background: "rgba(37,99,235,0.16)" }}
                    >
                      {n}
                    </HoverLink>
                  ) : (
                    <span key={n} style={pillStyle}>
                      {n}
                    </span>
                  );
                })}
              </div>
            </div>
            <div
              style={{
                borderTop: "1px solid rgba(28,36,51,0.08)",
                paddingTop: 16,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: "#1D9E75",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <span
                style={{ fontSize: 14, color: "#1C2433", fontWeight: 600 }}
              >
                Intervention rapide sur rendez-vous
              </span>
            </div>
            <HoverButton onClick={openContactModal} variant="primary">
              Prendre rendez-vous à {city.name}
            </HoverButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage({ city = null }) {
  const isMobile = useIsMobile();
  const isCity = !!city;
  const cityName = isCity ? city.name : "Les Sables d’Olonne";
  // Locatif ville : préposition correcte (table CITY_LOC) + nom à colorer en bleu.
  const cityLoc = isCity ? CITY_LOC[city.slug] : null;
  const cityEnrichment = isCity ? getCityEnrichment(city.slug) : null;
  const cityPrep = isCity ? (cityLoc ? cityLoc[0] : "à ") : "aux ";
  const cityShortName = isCity
    ? cityLoc
      ? cityLoc[1]
      : city.name
    : "Sables d’Olonne";
  const cityIn = `${cityPrep}${cityShortName}`;
  const services = [
    {
      title: "Internet & Wi-Fi",
      text: "Connexion instable, Wi-Fi lent ou box à installer : on remet tout en place simplement à domicile.",
      href: "/depannage-wifi-internet-les-sables-dolonne",
    },
    {
      title: "Smartphone",
      text: "Téléphone difficile à utiliser, stockage plein ou réglages compliqués : on vous accompagne pas à pas.",
      href: "/depannage-smartphone-les-sables-dolonne",
    },
    {
      title: "Ordinateur",
      text: "Ordinateur lent, mails, fichiers ou imprimante : on simplifie votre usage au quotidien.",
      href: "/depannage-informatique-les-sables-dolonne",
    },
    {
      title: "TV & appareils connectés",
      text: "TV, box ou applications qui ne fonctionnent plus : on remet tout en marche sans prise de tête.",
      href: "/depannage-tv-box-les-sables-dolonne",
    },
    {
      title: "Données & transferts",
      text: "Changement d’appareil ou peur de perdre vos données : on sécurise et transfère tout pour vous.",
      href: "/transfert-donnees-sauvegarde-les-sables-dolonne",
    },
    {
      title: "Apprendre le numérique",
      text: "Ordinateur, smartphone, Internet ou IA : apprenez simplement, à votre rythme, chez vous.",
      href: "/formation-informatique-seniors-les-sables-dolonne",
    },
  ];

  const plans = LOKO_PLANS;

  const reducedMotion = usePrefersReducedMotion();
  // Pas d'animation si l'utilisateur préfère le mouvement réduit,
  // ni au prérendu (Puppeteer) -> le HTML statique montre l'état final.
  const animate =
    !reducedMotion &&
    !(typeof navigator !== "undefined" && navigator.webdriver);
  const heroWords = [
    "Wi-Fi",
    "ordinateur",
    "smartphone",
    "télévision",
    "box internet",
    "imprimante",
  ];
  const heroWordIndex = useRotatingWord(heroWords, 1900, animate);
  const avisCount = useCountUp(33, 1100, animate);
  const fade = (delay) =>
    animate
      ? { animation: `lkFadeUp 0.6s cubic-bezier(0.2,0.7,0.2,1) both ${delay}s` }
      : {};

  return (
    <div style={styles.page}>
      <SiteHeader />

      <main>
        <section
          style={{
            ...styles.heroSection,
            ...(isMobile ? { padding: "24px 0 56px" } : {}),
          }}
        >
          <div style={styles.container}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  maxWidth: 860,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    flexWrap: "wrap",
                    marginBottom: 8,
                    ...fade(0),
                  }}
                >
                  <div
                    style={{
                      ...styles.badge,
                      marginBottom: 0,
                      ...(isMobile
                        ? { fontSize: 11.5, padding: "6px 12px" }
                        : {}),
                    }}
                  >
                    {cityName} • Local • Clair • Humain
                  </div>
                  <a
                    href="https://www.google.com/search?q=Loko&stick=H4sIAAAAAAAA_-NgU1I1qLAwTExMSkuyTDIzNzQzMjK2MqiwNDK1TE1OSzMySjY0NUtLXsTK4pOfnQ8AyoacgzAAAAA&hl=fr&mat=CTj3n5wFSPq0ElYBTVDHntshTo7_URKAUzU5zj2B4-AIA8kRvNgcDs-cUvm1CYS6L90-9Cm6Bmkfg36yo5DnjpvxYitSupE6LaoX2oqvS8xp_bUQ0-GurVep4rvm6xJZ7Q&authuser=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ ...styles.socialProofBox, margin: 0 }}
                  >
                    <GoogleIcon />
                    <span style={styles.socialProofStars} aria-hidden="true">
                      ★★★★★
                    </span>
                    <span style={styles.socialProofText}>
                      {avisCount} avis Google
                    </span>
                  </a>
                </div>
                <h1 style={{ ...styles.heroTitle, ...fade(0.16) }}>
                  <span
                    style={{
                      display: "block",
                      fontSize: "clamp(40px, 6.6vw, 68px)",
                      fontWeight: 800,
                      letterSpacing: "-0.04em",
                      lineHeight: 1.04,
                      color: "#1C2433",
                    }}
                  >
                    Un souci avec votre
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: "clamp(40px, 6.6vw, 68px)",
                      fontWeight: 800,
                      letterSpacing: "-0.04em",
                      lineHeight: 1.04,
                      color: "#1C2433",
                      margin: "2px 0 0",
                    }}
                  >
                    <span
                      key={heroWordIndex}
                      style={{
                        display: "inline-block",
                        color: "#2563EB",
                        ...(animate
                          ? {
                              animation:
                                "lkWordIn 0.55s cubic-bezier(0.2,0.7,0.2,1)",
                            }
                          : {}),
                      }}
                    >
                      {heroWords[heroWordIndex]}
                    </span>
                    {" ?"}
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: "clamp(16px, 2.2vw, 22px)",
                      fontWeight: 600,
                      lineHeight: 1.3,
                      color: "rgba(28,36,51,0.66)",
                      marginTop: 16,
                    }}
                  >
                    Assistance numérique & dépannage informatique à domicile{" "}
                    {cityPrep}
                    <span
                      style={{
                        color: "#2563EB",
                        display: "inline-block",
                        animation:
                          "lkWordIn 0.6s cubic-bezier(0.2,0.7,0.2,1) both",
                      }}
                    >
                      {cityShortName}
                    </span>
                    .
                  </span>
                </h1>
                <p
                  style={{
                    ...styles.heroText,
                    ...fade(0.26),
                    ...(isMobile ? { order: 3, marginTop: 24 } : {}),
                  }}
                >
                  {cityEnrichment?.heroIntro ||
                    `Loko vous aide à domicile${isCity ? ` ${cityIn}` : ""} pour tout le numérique et le dépannage informatique : Internet, Wi-Fi, smartphone, ordinateur, télévision, sécurité et transfert de données. Pas besoin de boutique ni d’entreprise informatique — on vient chez vous, avec un crédit d’impôt de 50 %.`}
                </p>

                <div
                  style={{
                    ...styles.heroButtons,
                    justifyContent: "center",
                    ...fade(0.34),
                    ...(isMobile ? { order: 2 } : {}),
                  }}
                >
                  <HoverButton href="#services" variant="secondary">
                    Voir les services
                  </HoverButton>
                  <HoverButton onClick={openContactModal} variant="primary">
                    Prendre rendez-vous
                  </HoverButton>
                  <HoverLink
                    onClick={openCreditModal}
                    baseStyle={{
                      display: "inline-flex",
                      alignItems: "center",
                      textDecoration: "none",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#2563EB",
                      background: "#E8EEF7",
                      padding: "11px 15px",
                      borderRadius: 12,
                      border: "1px solid rgba(37,99,235,0.25)",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      ...(animate
                        ? { animation: "lkPulse 2.4s ease-out infinite" }
                        : {}),
                    }}
                    hoverStyle={{
                      background: "#D7E3FB",
                      border: "1px solid rgba(37,99,235,0.5)",
                      color: "#1D4FA8",
                      transform: "translateY(-2px)",
                    }}
                  >
                    −50 % crédit d’impôt
                  </HoverLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" style={styles.sectionAlt}>
          <div style={styles.container}>
            <h2
              style={{
                ...styles.sectionTitle,
                textAlign: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Des solutions concrètes pour vos appareils du quotidien
            </h2>
            <p
              style={{
                ...styles.sectionText,
                textAlign: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Loko intervient à domicile pour résoudre les blocages numériques
              les plus fréquents et vous accompagner pas à pas.
            </p>
            <div
              style={{
                ...styles.cardGrid,
                gridTemplateColumns: isMobile
                  ? "repeat(2, minmax(0, 1fr))"
                  : "repeat(3, minmax(0, 1fr))",
                gap: isMobile ? 12 : styles.cardGrid.gap,
              }}
            >
              {services.map((card) => (
                <LinkCard
                  key={card.title}
                  href={
                    isCity ? `${card.href}?ville=${city.slug}` : card.href
                  }
                  title={card.title}
                  text={card.text}
                  compact
                />
              ))}
            </div>
          </div>
        </section>

        {/* AVIS GOOGLE (bandeau défilant) */}
        <ReviewsBanner />

        <section id="tarifs" style={styles.sectionAlt}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Tarifs</h2>
            <p style={styles.sectionText}>
              Service à la personne éligible au crédit d’impôt de 50 %.
            </p>

            <div style={styles.taxHighlightCard}>
              <div style={styles.taxHighlightLeft}>
                <img
                  src={logoCreditImpot}
                  alt="Crédit d’impôt de 50 %"
                  style={styles.taxHighlightLogo}
                />
                <div>
                  <div style={styles.taxHighlightLabel}>Crédit d’impôt</div>
                  <div style={styles.taxHighlightMain}>
                    Divisez votre coût réel par deux
                  </div>
                  <p style={styles.taxHighlightText}>
                    Exemple : 79 € l’intervention, soit{" "}
                    <span style={styles.taxHighlightBluePrice}>
                      39,50 € après crédit d’impôt
                    </span>
                    .
                  </p>
                </div>
              </div>

              <div style={styles.taxHighlightRight}>
                <HoverButton
                  onClick={openCreditModal}
                  baseStyle={styles.creditButton}
                  hoverStyle={styles.creditButtonHover}
                >
                  Comment ça marche ?
                </HoverButton>
              </div>
            </div>

            <div style={styles.pricingGrid}>
              {plans.map((plan) => (
                <HoverLink
                  key={plan.title}
                  onClick={openContactModal}
                  baseStyle={styles.priceCardLink}
                >
                  <div
                    style={styles.priceCardClickable}
                    onMouseEnter={(e) => {
                      Object.assign(
                        e.currentTarget.style,
                        styles.priceCardClickableHover
                      );
                      const arrow = e.currentTarget.querySelector("span");
                      if (arrow) arrow.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      Object.assign(
                        e.currentTarget.style,
                        styles.priceCardClickable
                      );
                      const arrow = e.currentTarget.querySelector("span");
                      if (arrow) arrow.style.transform = "translateX(0)";
                    }}
                  >
                    <div style={styles.priceCardTopRow}>
                      <div style={styles.cardTitle}>{plan.title}</div>
                      <span style={styles.priceCardArrow}>→</span>
                    </div>

                    <div style={styles.price}>{plan.price}</div>

                    <p style={styles.cardText}>
                      {plan.beforeText}
                      <span style={styles.taxPriceInlineBlue}>
                        {plan.reducedPrice}
                      </span>
                      {plan.afterText}
                    </p>
                  </div>
                </HoverLink>
              ))}
            </div>

            <div style={{ marginTop: 24, textAlign: "center" }}>
              <HoverButton href="/tarifs" variant="secondary">
                Voir tous les tarifs
              </HoverButton>
            </div>
          </div>
        </section>

        {isCity && <CityLocalBlock city={city} />}
        {isCity && <CityUniqueSection city={city} />}

        {!isCity && (
          <section id="qui-suis-je" style={styles.section}>
          <div style={styles.container}>
            <div
              style={{
                ...styles.aboutGrid,
                gridTemplateColumns: isMobile ? "1fr" : "1.35fr 1fr",
                gap: isMobile ? 28 : 44,
              }}
            >
              <div style={{ position: "relative", padding: "6px 26px 30px 0" }}>
                <div
                  style={{
                    borderRadius: 28,
                    overflow: "hidden",
                    border: "1px solid rgba(28,36,51,0.08)",
                    boxShadow: "0 26px 60px rgba(28,36,51,0.18)",
                  }}
                >
                  <img
                    src="/luderic-plage.jpg"
                    alt="Ludéric, fondateur de Loko, sur la plage des Sables d’Olonne"
                    style={{
                      display: "block",
                      width: "100%",
                      aspectRatio: "4 / 3",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div
                  style={{
                    position: "absolute",
                    right: 4,
                    bottom: 6,
                    width: isMobile ? 120 : 196,
                    height: isMobile ? 120 : 196,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: isMobile ? "5px solid #FBF8F3" : "7px solid #FBF8F3",
                    boxShadow: "0 16px 34px rgba(28,36,51,0.22)",
                    background: "#0E1014",
                  }}
                >
                  <img
                    src="/luderic-face.jpg"
                    alt="Portrait de Ludéric, fondateur de Loko"
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transform: "scale(1.18)",
                      transformOrigin: "50% 34%",
                    }}
                  />
                </div>

                <div
                  style={{
                    position: "absolute",
                    left: -2,
                    top: 24,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#ffffff",
                    border: "1px solid rgba(28,36,51,0.08)",
                    borderRadius: 999,
                    padding: "9px 14px",
                    boxShadow: "0 10px 26px rgba(28,36,51,0.14)",
                  }}
                >
                  <span
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      background: "#2563EB",
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{ fontSize: 13, fontWeight: 700, color: "#1C2433" }}
                  >
                    Ludéric · Fondateur
                  </span>
                </div>
              </div>

              <div>
                <h2 style={styles.sectionTitle}>Qui est derrière Loko ?</h2>

                <p style={styles.sectionText}>
                  Je m’appelle Ludéric et j’ai créé Loko pour proposer une
                  assistance numérique à domicile plus simple, plus humaine et
                  plus locale.
                </p>

                <p style={styles.sectionText}>
                  L’idée est née d’un constat concret : beaucoup de personnes se
                  sentent bloquées avec leurs appareils, non pas parce que tout
                  est trop compliqué, mais parce qu’on ne leur explique pas les
                  choses simplement.
                </p>

                <p style={styles.sectionText}>
                  Avec Loko, je me déplace à domicile aux Sables d’Olonne pour
                  aider, remettre en route, installer, expliquer et rendre les
                  choses plus claires au quotidien.
                </p>

                <div style={styles.aboutPoints}>
                  {[
                    "Service local et humain",
                    "Explications claires",
                    "Intervention à domicile",
                    "Approche rassurante et pédagogique",
                  ].map((item) => (
                    <div key={item} style={styles.aboutPoint}>
                      • {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        )}

        <section id="contact" style={styles.section}>
          <div style={styles.container}>
            <div style={styles.contactBox}>
              <div>
                <h2 style={styles.sectionTitle}>Besoin d’aide ?</h2>
                <p style={styles.sectionText}>
                  Loko intervient localement pour vous aider à mieux comprendre
                  et utiliser vos appareils numériques à domicile. Loko
                  accompagne aussi les seniors qui veulent reprendre confiance
                  avec leur smartphone, leur ordinateur, Internet ou leur TV, à
                  leur rythme.
                </p>
                <p style={styles.contactMuted}>
                  Loko intervient aux Sables d’Olonne, à Olonne-sur-Mer, au
                  Château-d’Olonne, à L’Île-d’Olonne et dans les alentours.{" "}
                  <HoverLink
                    href="/zone-intervention"
                    baseStyle={styles.contactZoneLink}
                    hoverStyle={styles.contactZoneLinkHover}
                  >
                    Voir la zone d’intervention
                  </HoverLink>
                </p>
              </div>
              <div style={styles.contactCard}>
                <div style={styles.contactLabel}>Disponibilité</div>
                <div style={styles.contactValue}>Sur rendez-vous</div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 10,
                    marginTop: 8,
                  }}
                >
                  <ContactQuickButton
                    icon={<IconPhone />}
                    label="Appeler"
                    href={`tel:${BUSINESS_PHONE}`}
                  />
                  <ContactQuickButton
                    icon={<IconCalendar />}
                    label="Planning"
                    href="https://calendar.notion.so/meet/ludericgelot/rdvloko"
                    external
                  />
                  <ContactQuickButton
                    icon={<IconMail />}
                    label="Email"
                    href={`mailto:${BUSINESS_EMAIL}`}
                  />
                  <ContactQuickButton
                    icon={<IconSend />}
                    label="Formulaire"
                    onClick={openContactModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <CookieBanner />
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: 340,
        boxSizing: "border-box",
        background: "#fff",
        border: "1px solid rgba(28,36,51,0.08)",
        borderRadius: 20,
        padding: "22px 24px",
        boxShadow: "0 6px 20px rgba(28,36,51,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        whiteSpace: "normal",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{ color: "#FFB400", fontSize: 15, letterSpacing: 2 }}
          aria-hidden="true"
        >
          {"★".repeat(review.rating)}
        </span>
        <span style={{ marginLeft: "auto", display: "flex" }}>
          <GoogleIcon />
        </span>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 14.5,
          lineHeight: 1.6,
          color: "rgba(28,36,51,0.82)",
        }}
      >
        « {review.text} »
      </p>
      <div
        style={{
          marginTop: "auto",
          fontSize: 14,
          fontWeight: 700,
          color: "#1C2433",
        }}
      >
        {review.author}
      </div>
    </div>
  );
}

function ReviewsBanner() {
  const reduced = usePrefersReducedMotion();
  if (!GOOGLE_REVIEWS.length) return null;
  const loop = [...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS];
  return (
    <section style={{ padding: "46px 0", overflow: "hidden" }}>
      <div
        style={{
          ...styles.container,
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <h2
          style={{
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#1C2433",
            margin: 0,
          }}
        >
          Ils ont fait appel à Loko
        </h2>
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...styles.socialProofBox, margin: 0 }}
        >
          <GoogleIcon />
          <span style={styles.socialProofStars} aria-hidden="true">
            ★★★★★
          </span>
          <span style={styles.socialProofText}>33 avis Google</span>
        </a>
      </div>
      <div
        className="lk-marquee"
        style={{
          display: "flex",
          gap: 18,
          width: "max-content",
          paddingLeft: 18,
          // durée gérée par CSS (.lk-marquee / :hover) pour ralentir au survol
          animationName: reduced ? "none" : "lkMarquee",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {loop.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>
    </section>
  );
}

function ProblemArt({ kind }) {
  const ink = "#1C2433";
  const blue = "#2563EB";
  const soft = "rgba(28,36,51,0.30)";
  const faint = "rgba(28,36,51,0.14)";
  const wave = (d) => ({
    animation: "lkArtWave 2s ease-in-out infinite",
    animationDelay: d,
  });
  const blink = (s = "1.6s") => ({
    animation: `lkArtBlink ${s} ease-in-out infinite`,
  });
  const svgProps = {
    viewBox: "0 0 280 280",
    width: "100%",
    style: {
      maxWidth: 360,
      height: "auto",
      display: "block",
      animation: "lkArtFloat 6s ease-in-out infinite",
    },
    role: "img",
  };
  const dev = {
    fill: "#FFFFFF",
    stroke: ink,
    strokeWidth: 3.6,
    strokeLinejoin: "round",
  };

  if (kind === "wifi") {
    return (
      <svg {...svgProps} aria-label="Box et signal Wi-Fi">
        <g
          transform="translate(60 30) scale(6.5)"
          fill="none"
          stroke={blue}
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" style={wave("0s")} />
          <path d="M5 12.55a11 11 0 0 1 14.08 0" style={wave("0.2s")} />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" style={wave("0.4s")} />
        </g>
        <circle cx="140" cy="166" r="6" fill={blue} />
        <rect x="96" y="196" width="88" height="46" rx="13" {...dev} />
        <circle cx="116" cy="219" r="4.6" fill={blue} style={blink("1.3s")} />
        <circle cx="133" cy="219" r="4.6" fill={soft} />
        <line
          x1="150"
          y1="214"
          x2="168"
          y2="214"
          stroke={soft}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="150"
          y1="224"
          x2="162"
          y2="224"
          stroke={soft}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (kind === "ordinateur") {
    return (
      <svg {...svgProps} aria-label="Ordinateur">
        <rect x="42" y="54" width="196" height="132" rx="16" {...dev} />
        <path
          d="M124 186v18M156 186v18M104 206h72"
          fill="none"
          stroke={ink}
          strokeWidth="3.6"
          strokeLinecap="round"
        />
        <line
          x1="70"
          y1="88"
          x2="150"
          y2="88"
          stroke={soft}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="70"
          y1="108"
          x2="196"
          y2="108"
          stroke={faint}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="116" cy="150" r="6.5" fill={blue} style={wave("0s")} />
        <circle cx="140" cy="150" r="6.5" fill={blue} style={wave("0.2s")} />
        <circle cx="164" cy="150" r="6.5" fill={blue} style={wave("0.4s")} />
      </svg>
    );
  }

  if (kind === "smartphone") {
    return (
      <svg {...svgProps} aria-label="Smartphone">
        <rect x="100" y="34" width="80" height="212" rx="22" {...dev} />
        <line
          x1="128"
          y1="49"
          x2="152"
          y2="49"
          stroke={soft}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="130"
          y1="232"
          x2="150"
          y2="232"
          stroke={soft}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <g fill={blue}>
          <rect x="114" y="96" width="8" height="12" rx="2" style={wave("0s")} />
          <rect x="128" y="86" width="8" height="22" rx="2" style={wave("0.15s")} />
          <rect x="142" y="74" width="8" height="34" rx="2" style={wave("0.3s")} />
        </g>
        <g fill={faint}>
          <rect x="114" y="126" width="22" height="22" rx="6" />
          <rect x="144" y="126" width="22" height="22" rx="6" />
          <rect x="114" y="156" width="22" height="22" rx="6" />
          <rect x="144" y="156" width="22" height="22" rx="6" />
        </g>
        <circle cx="174" cy="48" r="8" fill={blue} style={blink("1.5s")} />
      </svg>
    );
  }

  if (kind === "tv") {
    return (
      <svg {...svgProps} aria-label="Télévision">
        <rect x="44" y="50" width="192" height="124" rx="14" {...dev} />
        <path
          d="M118 174l-12 26M162 174l12 26M96 200h88"
          fill="none"
          stroke={ink}
          strokeWidth="3.6"
          strokeLinecap="round"
        />
        <path
          d="M128 92l36 20-36 20z"
          fill={blue}
          stroke={blue}
          strokeWidth="6"
          strokeLinejoin="round"
          style={blink("1.8s")}
        />
        <g
          fill="none"
          stroke={soft}
          strokeWidth="3"
          strokeLinecap="round"
          transform="translate(60 150)"
        >
          <path d="M0 8a8 8 0 0 1 8 8" />
          <path d="M0 0a16 16 0 0 1 16 16" />
        </g>
        <circle cx="60" cy="166" r="2.6" fill={soft} />
      </svg>
    );
  }

  if (kind === "data") {
    return (
      <svg {...svgProps} aria-label="Transfert de données">
        <rect x="34" y="88" width="58" height="104" rx="13" {...dev} />
        <line
          x1="52"
          y1="180"
          x2="74"
          y2="180"
          stroke={soft}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <rect x="180" y="96" width="84" height="58" rx="9" {...dev} />
        <path
          d="M168 172h108l-10-18h-88z"
          fill="#FFFFFF"
          stroke={ink}
          strokeWidth="3.4"
          strokeLinejoin="round"
        />
        <path
          d="M100 118q40 -20 80 0"
          fill="none"
          stroke={blue}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="2 9"
        />
        <g fill={blue}>
          <circle cx="112" cy="140" r="6.5" style={wave("0s")} />
          <circle cx="140" cy="140" r="6.5" style={wave("0.22s")} />
          <circle cx="168" cy="140" r="6.5" style={wave("0.44s")} />
        </g>
      </svg>
    );
  }

  if (kind === "formation") {
    return (
      <svg {...svgProps} aria-label="Apprentissage du numérique">
        <rect x="68" y="120" width="144" height="98" rx="16" {...dev} />
        <line
          x1="94"
          y1="150"
          x2="158"
          y2="150"
          stroke={soft}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="94"
          y1="172"
          x2="186"
          y2="172"
          stroke={faint}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="140" cy="74" r="26" {...dev} style={blink("2s")} />
        <path
          d="M130 100h20M134 108h12"
          fill="none"
          stroke={ink}
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <g stroke={blue} strokeWidth="3.4" strokeLinecap="round">
          <line x1="140" y1="32" x2="140" y2="22" style={wave("0s")} />
          <line x1="178" y1="74" x2="190" y2="74" style={wave("0.2s")} />
          <line x1="102" y1="74" x2="90" y2="74" style={wave("0.2s")} />
          <line x1="167" y1="47" x2="176" y2="38" style={wave("0.4s")} />
          <line x1="113" y1="47" x2="104" y2="38" style={wave("0.4s")} />
        </g>
      </svg>
    );
  }

  return (
    <svg {...svgProps} aria-label="Assistance numérique">
      <rect x="42" y="60" width="196" height="128" rx="16" {...dev} />
      <circle cx="116" cy="124" r="6.5" fill={blue} style={wave("0s")} />
      <circle cx="140" cy="124" r="6.5" fill={blue} style={wave("0.2s")} />
      <circle cx="164" cy="124" r="6.5" fill={blue} style={wave("0.4s")} />
    </svg>
  );
}

// Locatif par ville (préposition correcte + nom à colorer en bleu).
// Sert à adapter le titre des pages piliers à la ville d'origine du visiteur.
const CITY_LOC = {
  "olonne-sur-mer": ["à ", "Olonne-sur-Mer"],
  "chateau-d-olonne": ["au ", "Château-d’Olonne"],
  "l-ile-d-olonne": ["à ", "L’Île-d’Olonne"],
  vaire: ["à ", "Vairé"],
  "sainte-foy": ["à ", "Sainte-Foy"],
  "brem-sur-mer": ["à ", "Brem-sur-Mer"],
  "saint-mathurin": ["à ", "Saint-Mathurin"],
  "talmont-saint-hilaire": ["à ", "Talmont-Saint-Hilaire"],
  "les-achards": ["aux ", "Achards"],
  "nieul-le-dolent": ["à ", "Nieul-le-Dolent"],
  "jard-sur-mer": ["à ", "Jard-sur-Mer"],
};

const HUB_LOC = "aux Sables d’Olonne";

// Met la ville en bleu (accent) dans un titre, avec une légère apparition.
// Le mot-clé reste intact dans le H1 (aucun impact SEO, on ne fait que l'habiller).
// prep/cityShort permettent d'afficher la ville d'origine ("à Vairé") au lieu du hub.
function HeroTitleWithCity({ text, prep = "aux ", cityShort = "Sables d’Olonne" }) {
  if (!text) return text;
  const blue = (
    <span
      style={{
        color: "#2563EB",
        display: "inline-block",
        animation: "lkWordIn 0.6s cubic-bezier(0.2,0.7,0.2,1) both",
      }}
    >
      {cityShort}
    </span>
  );
  const idx = text.indexOf(HUB_LOC);
  if (idx !== -1) {
    return (
      <>
        {text.slice(0, idx)}
        {prep}
        {blue}
        {text.slice(idx + HUB_LOC.length)}
      </>
    );
  }
  // Repli : on colore juste "Sables d’Olonne" s'il est présent autrement.
  const HUB_NAME = "Sables d’Olonne";
  const idx2 = text.indexOf(HUB_NAME);
  if (idx2 !== -1) {
    return (
      <>
        {text.slice(0, idx2)}
        {blue}
        {text.slice(idx2 + HUB_NAME.length)}
      </>
    );
  }
  return text;
}

function ProblemPage({ page, originCity = null }) {
  const isMobile = useIsMobile();

  const INK = "#1C2433";
  const BLUE = "#2563EB";

  // Ville affichée : celle d'origine (depuis une page ville) sinon le hub.
  const cityLoc = originCity ? CITY_LOC[originCity.slug] : null;
  const heroPrep = cityLoc ? cityLoc[0] : "aux ";
  const heroCity = cityLoc ? cityLoc[1] : "Sables d’Olonne";
  const badgeCity = originCity ? originCity.name : "Les Sables d’Olonne";
  // Intro alignée sur la ville d'origine (texte simple). page.intro (et donc la
  // meta description SEO) reste inchangé : on ne modifie que l'affichage.
  const heroIntro = cityLoc
    ? page.intro.replace(HUB_LOC, `${heroPrep}${heroCity}`)
    : page.intro;

  const check = (color = BLUE, size = 16) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5l4 4 10-10"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const RED = "#E5484D";
  const alertIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 7.5v5.4" stroke={RED} strokeWidth="2.3" strokeLinecap="round" />
      <circle cx="12" cy="16.7" r="1.4" fill={RED} />
    </svg>
  );

  const t = {
    hero: { padding: isMobile ? "40px 0 26px" : "52px 0 36px" },
    chips: { display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24 },
    chip: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 14px",
      borderRadius: 999,
      background: "#FFFFFF",
      border: "1px solid rgba(28,36,51,0.10)",
      fontSize: 13.5,
      fontWeight: 600,
      color: INK,
    },
    twoCol: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: 22,
      alignItems: "stretch",
    },
    panel: {
      background: "#FFFFFF",
      border: "1px solid rgba(28,36,51,0.08)",
      borderRadius: 24,
      padding: isMobile ? "26px 22px" : "32px 30px",
    },
    eyebrow: {
      fontSize: 12.5,
      fontWeight: 700,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "rgba(28,36,51,0.45)",
      marginBottom: 10,
    },
    panelTitle: {
      fontSize: isMobile ? 22 : 26,
      lineHeight: 1.15,
      letterSpacing: "-0.02em",
      color: INK,
      fontWeight: 700,
      margin: 0,
    },
    panelSub: {
      fontSize: 15,
      lineHeight: 1.6,
      color: "rgba(28,36,51,0.6)",
      margin: "10px 0 0",
    },
    rows: { marginTop: 14 },
    row: {
      display: "flex",
      alignItems: "flex-start",
      gap: 13,
      padding: "13px 0",
    },
    rowDivider: { borderTop: "1px solid rgba(28,36,51,0.07)" },
    iconWrap: {
      flexShrink: 0,
      width: 30,
      height: 30,
      borderRadius: 9,
      background: "rgba(37,99,235,0.09)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 1,
    },
    iconWrapAlert: {
      flexShrink: 0,
      width: 30,
      height: 30,
      borderRadius: 9,
      background: "rgba(229,72,77,0.12)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 1,
    },
    rowText: {
      fontSize: 15.5,
      lineHeight: 1.5,
      color: "rgba(28,36,51,0.86)",
      fontWeight: 500,
    },
    ctaBar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 22,
      flexWrap: "wrap",
      background: "#FFFFFF",
      border: "1px solid rgba(28,36,51,0.08)",
      borderRadius: 24,
      padding: isMobile ? "26px 24px" : "30px 36px",
    },
    ctaTitle: {
      fontSize: isMobile ? 22 : 27,
      lineHeight: 1.18,
      letterSpacing: "-0.02em",
      color: INK,
      fontWeight: 700,
      margin: 0,
    },
    ctaText: {
      fontSize: 16,
      lineHeight: 1.6,
      color: "rgba(28,36,51,0.66)",
      margin: "8px 0 0",
      maxWidth: 540,
    },
    ctaButtons: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      flexShrink: 0,
      ...(isMobile
        ? { width: "100%", flexDirection: "column", alignItems: "stretch" }
        : {}),
    },
    heroGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1.05fr 0.95fr",
      gap: isMobile ? 28 : 48,
      alignItems: "center",
    },
    artPanel: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(158deg, #FFFFFF 0%, #EEF3FF 100%)",
      border: "1px solid rgba(37,99,235,0.14)",
      borderRadius: 28,
      padding: isMobile ? "26px" : "34px",
      minHeight: isMobile ? 230 : 320,
      overflow: "hidden",
      boxShadow: "0 20px 50px rgba(28,36,51,0.08)",
    },
    artGlow: {
      position: "absolute",
      width: 280,
      height: 280,
      borderRadius: "50%",
      background:
        "radial-gradient(circle, rgba(37,99,235,0.16), transparent 68%)",
      top: "-28%",
      right: "-18%",
      pointerEvents: "none",
    },
  };

  return (
    <div style={styles.page}>
      <SiteHeader />

      <main>
        {/* HERO */}
        <section style={t.hero}>
          <div style={styles.container}>
            <HoverLink
              href="/"
              baseStyle={styles.backLink}
              hoverStyle={styles.backLinkHover}
            >
              ← Retour à l’accueil
            </HoverLink>

            <div style={{ ...t.heroGrid, marginTop: 18 }}>
              <div>
                <div style={{ marginBottom: 0 }}>
                  <span style={styles.badge}>
                    {page.title} • {badgeCity}
                  </span>
                </div>

                <h1
                  style={{
                    ...styles.sectionTitle,
                    fontSize: isMobile ? "25px" : "clamp(26px, 3.2vw, 38px)",
                    lineHeight: 1.14,
                    maxWidth: 540,
                    marginTop: 6,
                  }}
                >
                  <HeroTitleWithCity
                    text={page.hero}
                    prep={heroPrep}
                    cityShort={heroCity}
                  />
                </h1>
                <p
                  style={{
                    ...styles.sectionText,
                    fontSize: isMobile ? 15.5 : 16,
                    lineHeight: 1.6,
                    marginTop: 14,
                    maxWidth: 520,
                  }}
                >
                  {heroIntro}
                </p>

                <div style={t.chips}>
                  {[
                    "À domicile",
                    "Crédit d’impôt 50 %",
                    "Intervention rapide",
                  ].map((c) => (
                    <span key={c} style={t.chip}>
                      {check(BLUE, 15)}
                      {c}
                    </span>
                  ))}
                </div>

                <div style={styles.heroButtons}>
                  <HoverButton href="tel:+33763131515" variant="primary">
                    Appeler Loko
                  </HoverButton>
                  <HoverButton onClick={openContactModal} variant="secondary">
                    Prendre rendez-vous
                  </HoverButton>
                </div>
              </div>

              <div style={t.artPanel}>
                <div style={t.artGlow} />
                <ProblemArt kind={page.art} />
              </div>
            </div>
          </div>
        </section>

        {/* SITUATIONS + AIDE (2 colonnes pleine largeur) */}
        <section style={styles.sectionAlt}>
          <div style={styles.container}>
            <div style={t.twoCol}>
              <div style={t.panel}>
                <div style={t.eyebrow}>Situations fréquentes</div>
                <h2 style={t.panelTitle}>Ce que vous vivez</h2>
                <div style={t.rows}>
                  {page.symptoms.map((item, i) => (
                    <div
                      key={item}
                      style={{ ...t.row, ...(i > 0 ? t.rowDivider : {}) }}
                    >
                      <span style={t.iconWrapAlert}>{alertIcon()}</span>
                      <span style={t.rowText}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={t.panel}>
                <div style={t.eyebrow}>Comment Loko intervient</div>
                <h2 style={t.panelTitle}>Comment on vous aide</h2>
                <div style={t.rows}>
                  {page.help.map((item, i) => (
                    <div
                      key={item}
                      style={{ ...t.row, ...(i > 0 ? t.rowDivider : {}) }}
                    >
                      <span style={t.iconWrap}>{check(BLUE, 16)}</span>
                      <span style={t.rowText}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BAR */}
        <section style={{ padding: isMobile ? "44px 0" : "60px 0" }}>
          <div style={styles.container}>
            <div style={t.ctaBar}>
              <div>
                <h2 style={t.ctaTitle}>Vous voulez aller au plus simple ?</h2>
                <p style={t.ctaText}>
                  Appelez Loko, expliquez votre situation : on voit tout de
                  suite la meilleure solution, à domicile.
                </p>
              </div>
              <div style={t.ctaButtons}>
                <HoverButton href="tel:+33763131515" variant="primary">
                  Appeler maintenant
                </HoverButton>
                <HoverButton onClick={openContactModal} variant="secondary">
                  Choisir un créneau
                </HoverButton>
              </div>
            </div>
          </div>
        </section>

        {/* AVIS GOOGLE (bandeau défilant) */}
        <ReviewsBanner />

        {/* FAQ */}
        <section style={styles.sectionAlt}>
          <div style={styles.containerNarrow}>
            <div style={styles.faqWrap}>
              <div style={styles.faqEyebrow}>Questions fréquentes</div>

              <h2 style={styles.faqTitle}>
                Ce qu’on nous demande souvent avant une intervention
              </h2>

              <p style={styles.faqIntro}>
                Voici quelques réponses simples pour vous aider à y voir plus
                clair avant de prendre contact.
              </p>

              <div style={styles.faqList}>
                {page.faq.map((item, index) => (
                  <div
                    key={item.q}
                    style={{
                      ...styles.faqItemEnhanced,
                      ...(isMobile ? styles.faqItemEnhancedMobile : {}),
                    }}
                  >
                    <div style={styles.faqNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div style={styles.faqContent}>
                      <h3 style={styles.faqQuestionEnhanced}>{item.q}</h3>
                      <p style={styles.faqAnswer}>{item.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES LIÉS */}
        {page.relatedPages?.length ? (
          <section style={{ padding: isMobile ? "46px 0 64px" : "64px 0 88px" }}>
            <div style={styles.container}>
              <h2 style={{ ...styles.sectionTitle, fontSize: isMobile ? 26 : 32 }}>
                Autres services
              </h2>
              <div
                style={{
                  ...styles.cardGrid,
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : "repeat(3, minmax(0, 1fr))",
                }}
              >
                {page.relatedPages.map((item) => (
                  <LinkCard
                    key={item.href}
                    href={item.href}
                    title={item.title}
                    text={item.text}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <SiteFooter />
      <CookieBanner />
    </div>
  );
}

const HEADER_NAV_ITEMS = [
  { href: "/#services", label: "Services" },
  { href: "/#tarifs", label: "Tarifs" },
  { href: "/#qui-suis-je", label: "Qui suis-je ?" },
  { href: "/#contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

function SiteHeader() {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Ferme le tiroir si on repasse en desktop, ou via Échap.
  useEffect(() => {
    if (!isMobile && menuOpen) setMenuOpen(false);
  }, [isMobile, menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  if (isMobile) {
    return (
      <>
        <header style={styles.header}>
          <div style={styles.container}>
            <div style={styles.headerInnerMobileRow}>
              <SiteLogo />
              <div style={styles.headerMobileActions}>
                <a
                  href="tel:+33763131515"
                  aria-label="Appeler Loko"
                  style={styles.headerPhoneBtn}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 4h3l1.5 5-2 1.2a11 11 0 0 0 5.3 5.3l1.2-2 5 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
                  </svg>
                </a>
                <button
                  type="button"
                  aria-label="Ouvrir le menu"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen(true)}
                  style={styles.burgerBtn}
                >
                  <span style={styles.burgerBar} />
                  <span style={styles.burgerBar} />
                  <span style={styles.burgerBar} />
                </button>
              </div>
            </div>
          </div>
        </header>

        {menuOpen && (
          <div style={styles.menuOverlay} role="dialog" aria-modal="true">
            <div style={styles.menuTopRow}>
              <SiteLogo />
              <button
                type="button"
                aria-label="Fermer le menu"
                onClick={() => setMenuOpen(false)}
                style={styles.burgerBtn}
              >
                <IconClose />
              </button>
            </div>
            <nav style={styles.menuLinks}>
              {HEADER_NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  style={styles.menuLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </>
    );
  }

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.headerInner}>
          <SiteLogo />
          <nav style={styles.nav}>
            {HEADER_NAV_ITEMS.map((item) => (
              <HoverLink
                key={item.href}
                href={item.href}
                baseStyle={styles.navLink}
                hoverStyle={styles.navLinkHover}
              >
                {item.label}
              </HoverLink>
            ))}
          </nav>
          {/* 👉 CTA */}
          <a
            href="tel:+33763131515"
            style={{
              ...styles.headerCTA,
              ...(isHovered ? styles.headerCTAHover : {}),
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span
              style={{
                display: "inline-block",
                marginRight: 6,
                transformOrigin: "center",
                animation: "lkPhoneRing 2.2s ease-in-out infinite",
              }}
            >
              📞
            </span>
            Appeler Loko
          </a>
        </div>
      </div>
    </header>
  );
}
const COOKIE_CONSENT_KEY = "loko-cookie-consent";

function hasExternalMediaConsent() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted";
}

function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const cookieChoice = localStorage.getItem(COOKIE_CONSENT_KEY);

    if (!cookieChoice) {
      setIsVisible(true);
    }
  }, []);

  const handleChoice = (choice) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, choice);
    window.dispatchEvent(new CustomEvent("loko:cookie-consent", { detail: choice }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        ...styles.cookieBanner,
        ...(isMobile ? styles.cookieBannerMobile : {}),
      }}
    >
      <div
        style={{
          ...styles.cookieBannerContent,
          ...(isMobile ? styles.cookieBannerContentMobile : {}),
        }}
      >
        <div style={styles.cookieBannerTextBlock}>
          <div style={styles.cookieBannerTitle}>🍪 Cookies</div>

          <p
            style={{
              ...styles.cookieBannerText,
              ...(isMobile ? styles.cookieBannerTextMobile : {}),
            }}
          >
            Loko utilise des cookies pour mémoriser votre choix et, si vous
            acceptez, afficher les cartes Google Maps sur les pages villes. Aucun
            outil de mesure d’audience n’est utilisé sur ce site.
          </p>

          <a
            href="/politique-confidentialite"
            style={{
              ...styles.cookieBannerLink,
              ...(isMobile ? styles.cookieBannerLinkMobile : {}),
            }}
          >
            Voir la politique de confidentialité
          </a>
        </div>

        <div
          style={{
            ...styles.cookieBannerActions,
            ...(isMobile ? styles.cookieBannerActionsMobile : {}),
          }}
        >
          <button
            type="button"
            style={{
              ...styles.cookieSecondaryButton,
              ...(isMobile ? styles.cookieButtonMobile : {}),
            }}
            onClick={() => handleChoice("refused")}
          >
            Refuser
          </button>

          <button
            type="button"
            style={{
              ...styles.cookiePrimaryButton,
              ...(isMobile ? styles.cookieButtonMobile : {}),
            }}
            onClick={() => handleChoice("accepted")}
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "transparent",
    color: "#1C2433",
    minHeight: "100vh",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
  },

  containerNarrow: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "0 24px",
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 30,
    backdropFilter: "blur(14px)",
    background: "rgba(11,12,15,0.9)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  headerInnerMobile: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "10px 0 10px",
  },

  headerLogoZoneMobile: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },

  // --- En-tête mobile : barre compacte + menu tiroir ---
  headerInnerMobileRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: "10px 0",
  },
  headerMobileActions: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    flexShrink: 0,
  },
  headerPhoneBtn: {
    width: 44,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    background: "#FBF8F3",
    color: "#1C2433",
    textDecoration: "none",
    flexShrink: 0,
    boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
  },
  burgerBtn: {
    appearance: "none",
    border: 0,
    background: "transparent",
    color: "#FBF8F3",
    width: 44,
    height: 44,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    cursor: "pointer",
    borderRadius: 12,
    flexShrink: 0,
  },
  burgerBar: {
    display: "block",
    width: 24,
    height: 2,
    borderRadius: 2,
    background: "#FBF8F3",
  },
  menuOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 60,
    background: "rgba(11,12,15,0.98)",
    backdropFilter: "blur(8px)",
    display: "flex",
    flexDirection: "column",
    padding: "14px 22px 32px",
  },
  menuTopRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  menuLinks: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginTop: 28,
  },
  menuLink: {
    color: "#FBF8F3",
    textDecoration: "none",
    fontSize: 20,
    fontWeight: 600,
    padding: "14px 8px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  menuCTA: {
    marginTop: "auto",
    background: "#FBF8F3",
    color: "#1C2433",
    textDecoration: "none",
    textAlign: "center",
    padding: "15px 18px",
    borderRadius: 14,
    fontWeight: 700,
    fontSize: 16,
    boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 16,
  },

  input: {
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(28,36,51,0.12)",
    background: "#FBF8F3",
    color: "#1C2433",
    fontSize: 14,
  },

  textarea: {
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(28,36,51,0.12)",
    background: "#FBF8F3",
    color: "#1C2433",
    fontSize: 14,
    minHeight: 100,
    resize: "vertical",
  },
  taxHighlightCard: {
    marginTop: 24,
    marginBottom: 28,
    padding: 24,
    borderRadius: 28,
    background: "linear-gradient(180deg, #ffffff, #f8fbff)",
    color: "#1C2433",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 20,
    alignItems: "center",
    border: "1px solid rgba(59,130,246,0.72)",
    boxShadow:
      "inset 0 0 0 1px rgba(59,130,246,0.18), 0 20px 60px rgba(0,0,0,0.28)",
    animation: "lokoBlueGlow 3.8s ease-in-out infinite",
  },

  taxHighlightLeft: {
    display: "flex",
    alignItems: "center",
    gap: 18,
  },

  taxHighlightRight: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  taxHighlightLogo: {
    width: 82,
    height: 82,
    objectFit: "contain",
    flexShrink: 0,
  },

  taxHighlightLabel: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: "#2563EB",
    marginBottom: 8,
    fontWeight: 700,
  },

  taxHighlightMain: {
    fontSize: "clamp(24px, 4vw, 38px)",
    lineHeight: 1.05,
    letterSpacing: "-0.04em",
    fontWeight: 800,
    color: "#1C2433",
  },

  taxHighlightText: {
    margin: "12px 0 0",
    fontSize: 16,
    lineHeight: 1.7,
    color: "rgba(0,0,0,0.72)",
  },
  searchSection: {
    padding: "18px 0 8px",
  },

  searchPanel: {
    maxWidth: 820,
    margin: "0 auto",
    padding: "22px 24px",
    borderRadius: 28,
    background:
      "linear-gradient(180deg, rgba(28,36,51,0.05) 0%, rgba(28,36,51,0.025) 100%)",
    border: "1px solid rgba(28,36,51,0.08)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.22)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  },

  taxHeroCard: {
    background: "#ffffff",
    color: "#1C2433",
    borderRadius: 28,
    padding: 26,
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
  },

  taxHeroTop: {
    display: "flex",
    alignItems: "center",
    gap: 18,
    flexWrap: "wrap",
  },

  taxLogo: {
    width: 92,
    height: 92,
    objectFit: "contain",
    display: "block",
  },
  priceCardLink: {
    textDecoration: "none",
    color: "inherit",
    display: "block",
  },

  priceCardClickable: {
    background: "rgba(28,36,51,0.015)",
    border: "1px solid rgba(28,36,51,0.08)",
    borderRadius: "28px",
    padding: "22px 24px",
    minHeight: "unset",
    boxShadow: "0 10px 28px rgba(0,0,0,0.14)",
    transition:
      "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
    cursor: "pointer",
  },

  priceCardTopRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "12px",
  },

  priceCardArrow: {
    fontSize: "1.2rem",
    color: "rgba(28,36,51,0.65)",
    flexShrink: 0,
    transition: "transform 0.2s ease",
  },

  taxHeroLabel: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: "rgba(0,0,0,0.55)",
    marginBottom: 8,
    fontWeight: 700,
  },

  taxHeroPriceLine: {
    fontSize: "clamp(28px, 4vw, 42px)",
    lineHeight: 1.05,
    letterSpacing: "-0.05em",
    fontWeight: 800,
    color: "#1C2433",
  },

  taxHeroText: {
    marginTop: 18,
    marginBottom: 0,
    fontSize: 17,
    lineHeight: 1.8,
    color: "rgba(0,0,0,0.74)",
  },

  taxNoteCard: {
    background:
      "linear-gradient(180deg, rgba(28,36,51,0.08), rgba(28,36,51,0.03))",
    border: "1px solid rgba(28,36,51,0.08)",
    borderRadius: 28,
    padding: 24,
  },

  creditButton: {
    padding: "14px 20px",
    borderRadius: 12,
    background: "#1C2433",
    border: "2px solid #1C2433",
    color: "#FBF8F3",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },

  creditButtonHover: {
    background: "#0F1623",
    border: "2px solid #0F1623",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.18)",
  },

  submitButton: {
    marginTop: 10,
    padding: "12px",
    borderRadius: 14,
    border: "none",
    background: "#1C2433",
    color: "#FBF8F3",
    fontWeight: 700,
    cursor: "pointer",
  },
  honeypot: {
    position: "absolute",
    left: "-9999px",
    width: 1,
    height: 1,
    opacity: 0,
    pointerEvents: "none",
  },
  formConsentLabel: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    fontSize: 14,
    lineHeight: 1.5,
    color: "rgba(28,36,51,0.72)",
  },
  formConsentLink: {
    color: "#2563EB",
    textDecoration: "underline",
  },
  searchSuggestions: {
    marginTop: 12,
    display: "grid",
    gap: 10,
    maxWidth: 720,
  },

  priceCardClickableHover: {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
    border: "1px solid rgba(28,36,51,0.18)",
  },

  searchSuggestionItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: "14px 16px",
    borderRadius: 16,
    background: "rgba(28,36,51,0.04)",
    border: "1px solid rgba(28,36,51,0.08)",
    textDecoration: "none",
    color: "#1C2433",
    transition: "all 0.22s ease",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  },

  searchSuggestionItemHover: {
    background: "rgba(28,36,51,0.08)",
    border: "1px solid rgba(28,36,51,0.16)",
    transform: "translateY(-2px)",
    boxShadow: "0 14px 32px rgba(0,0,0,0.24)",
  },

  searchSuggestionLabel: {
    fontSize: 15,
    lineHeight: 1.5,
    color: "rgba(28,36,51,0.88)",
    transition: "color 0.22s ease",
  },

  searchSuggestionLabelHover: {
    color: "#1C2433",
  },

  searchSuggestionArrow: {
    fontSize: 18,
    color: "rgba(28,36,51,0.45)",
    transition: "all 0.22s ease",
  },
  problemEyebrowLeft: {
    fontSize: "0.82rem",
    fontWeight: 800,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "rgba(192,57,43,0.92)",
    marginBottom: "14px",
  },
  searchButtonHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 14px 35px rgba(28,36,51,0.12)",
  },

  problemEyebrowRight: {
    fontSize: "0.82rem",
    fontWeight: 800,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "rgba(15,158,117,0.92)",
    marginBottom: "14px",
  },

  problemRightTitle: {
    fontSize: "clamp(1.8rem, 2.3vw, 2.6rem)",
    fontWeight: 800,
    lineHeight: 1.06,
    letterSpacing: "-0.02em",
    color: "rgba(15,110,86,0.98)",
    margin: "0 0 16px 0",
  },

  searchSuggestionArrowHover: {
    color: "#1C2433",
    transform: "translateX(4px)",
  },

  searchHelper: {
    margin: "0 0 16px 0",
    fontSize: "0.98rem",
    lineHeight: 1.5,
    color: "rgba(28,36,51,0.82)",
    textAlign: "center",
  },

  searchNoResult: {
    marginTop: 12,
    padding: "12px 14px",
    borderRadius: 14,
    background: "rgba(28,36,51,0.03)",
    border: "1px solid rgba(28,36,51,0.06)",
    color: "rgba(28,36,51,0.7)",
    fontSize: "0.92rem",
    lineHeight: 1.45,
  },
  faqWrap: {
    maxWidth: "980px",
    margin: "0 auto",
    marginTop: "10px",
  },

  faqEyebrow: {
    fontSize: "0.82rem",
    fontWeight: 800,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "rgba(28,36,51,0.55)",
    marginBottom: "14px",
  },

  faqTitle: {
    fontSize: "clamp(1.9rem, 2.8vw, 2.9rem)",
    fontWeight: 800,
    lineHeight: 1.08,
    letterSpacing: "-0.02em",
    color: "#1C2433",
    margin: "0 0 16px 0",
  },
  stickyActionWrap: {
    position: "fixed",
    bottom: 18,
    left: 16,
    right: 16,
    zIndex: 1200,
    display: "flex",
    justifyContent: "center",
    pointerEvents: "none",
  },

  stickyActionWrapMobile: {
    bottom: 10,
    left: 10,
    right: 10,
  },

  stickyActionBar: {
    width: "100%",
    maxWidth: 980,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    padding: "14px 16px",
    borderRadius: 20,
    background: "rgba(251,248,243,0.95)",
    border: "1px solid rgba(28,36,51,0.08)",
    boxShadow: "0 18px 50px rgba(0,0,0,0.28)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    pointerEvents: "auto",
  },

  stickyActionBarMobile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
    padding: "10px",
    borderRadius: 16,
    maxWidth: "100%",
  },

  stickyActionText: {
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  stickyActionTitle: {
    color: "#1C2433",
    fontSize: 15,
    fontWeight: 800,
    lineHeight: 1.1,
  },

  stickyActionSubtitle: {
    color: "rgba(28,36,51,0.72)",
    fontSize: 13,
    lineHeight: 1.2,
  },

  stickyActionButtons: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
  },

  stickyActionButtonsMobile: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
    width: "100%",
  },

  stickyCallButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 16px",
    borderRadius: 14,
    border: "1px solid rgba(28,36,51,0.14)",
    background: "#1C2433",
    color: "#FBF8F3",
    fontWeight: 800,
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  },

  stickyCallButtonMobile: {
    padding: "10px 12px",
    borderRadius: 12,
    fontSize: 14,
  },

  stickyCallButtonHover: {
    background: "#1C2433",
    border: "1px solid rgba(28,36,51,0.14)",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(28,36,51,0.14)",
  },

  stickyBookingButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 16px",
    borderRadius: 14,
    border: "1px solid rgba(28,36,51,0.14)",
    background: "transparent",
    color: "#1C2433",
    fontWeight: 800,
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  },

  stickyBookingButtonMobile: {
    padding: "10px 12px",
    borderRadius: 12,
    fontSize: 14,
  },

  stickyBookingButtonHover: {
    background: "rgba(28,36,51,0.08)",
    border: "1px solid rgba(28,36,51,0.22)",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.18)",
  },

  faqIntro: {
    fontSize: "1.06rem",
    lineHeight: 1.75,
    color: "rgba(28,36,51,0.78)",
    margin: "0 0 30px 0",
    maxWidth: "760px",
  },

  faqItemEnhanced: {
    display: "grid",
    gridTemplateColumns: "64px 1fr",
    gap: "18px",
    alignItems: "start",
    padding: "24px 24px",
    borderRadius: "24px",
    background:
      "linear-gradient(180deg, rgba(28,36,51,0.035), rgba(28,36,51,0.02))",
    border: "1px solid rgba(28,36,51,0.08)",
    boxShadow: "0 10px 28px rgba(0,0,0,0.16)",
  },

  faqNumber: {
    width: "48px",
    height: "48px",
    borderRadius: "999px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.95rem",
    fontWeight: 800,
    color: "rgba(15,158,117,0.95)",
    background: "rgba(15,158,117,0.08)",
    border: "1px solid rgba(15,158,117,0.16)",
  },

  faqContent: {
    minWidth: 0,
  },

  faqQuestionEnhanced: {
    fontSize: "1.15rem",
    fontWeight: 700,
    lineHeight: 1.45,
    color: "#1C2433",
    margin: "0 0 10px 0",
  },

  faqAnswer: {
    fontSize: "1rem",
    lineHeight: 1.75,
    color: "rgba(28,36,51,0.78)",
    margin: 0,
  },

  navMobile: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 8,
    justifyItems: "center",
  },
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 28,
    alignItems: "center",
  },

  aboutPhotoCard: {
    background:
      "linear-gradient(180deg, rgba(28,36,51,0.08), rgba(28,36,51,0.03))",
    border: "1px solid rgba(28,36,51,0.08)",
    borderRadius: 28,
    padding: 18,
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
  },

  aboutPhoto: {
    width: "100%",
    height: "100%",
    maxHeight: 520,
    objectFit: "cover",
    borderRadius: 20,
    display: "block",
  },

  aboutPoints: {
    marginTop: 24,
    background:
      "linear-gradient(180deg, rgba(28,36,51,0.08), rgba(28,36,51,0.03))",
    border: "1px solid rgba(28,36,51,0.08)",
    borderRadius: 24,
    padding: 22,
  },
  problemHeroGridMobile: {
    gridTemplateColumns: "1fr",
  },
  searchBox: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: 12,
    alignItems: "center",
  },

  searchInput: {
    width: "100%",
    minHeight: 54,
    padding: "0 18px",
    borderRadius: 18,
    border: "1px solid rgba(28,36,51,0.12)",
    background: "rgba(28,36,51,0.035)",
    color: "#1C2433",
    fontSize: "1rem",
    outline: "none",
    boxSizing: "border-box",
    boxShadow: "inset 0 1px 0 rgba(28,36,51,0.04)",
  },

  searchButton: {
    minHeight: 54,
    padding: "0 22px",
    borderRadius: 18,
    border: "1px solid rgba(28,36,51,0.12)",
    background: "#1C2433",
    color: "#FBF8F3",
    fontWeight: 800,
    fontSize: "0.98rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 10px 30px rgba(28,36,51,0.08)",
  },

  aboutPoint: {
    color: "rgba(28,36,51,0.84)",
    fontSize: 17,
    lineHeight: 1.8,
    marginBottom: 8,
  },

  navLinkMobile: {
    width: "100%",
    textAlign: "center",
    padding: "8px 10px",
    fontSize: 13,
  },
  quickActionCard: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "34px 32px",
    borderRadius: "28px",
    marginTop: "10px",
    background:
      "linear-gradient(180deg, rgba(28,36,51,0.04), rgba(28,36,51,0.02))",
    border: "1px solid rgba(28,36,51,0.08)",
    boxShadow: `
      0 0 0 1px rgba(28,36,51,0.03),
      0 14px 40px rgba(0,0,0,0.20),
      0 0 60px rgba(15,158,117,0.05)
    `,
    textAlign: "left",
  },

  quickActionEyebrow: {
    fontSize: "0.82rem",
    fontWeight: 800,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "rgba(15,158,117,0.92)",
    marginBottom: "14px",
  },
  faqItemEnhancedMobile: {
    gridTemplateColumns: "1fr",
    gap: "14px",
    padding: "20px 18px",
  },

  quickActionTitle: {
    fontSize: "clamp(1.8rem, 2.5vw, 2.8rem)",
    fontWeight: 800,
    lineHeight: 1.08,
    letterSpacing: "-0.02em",
    color: "#1C2433",
    margin: "0 0 16px 0",
  },

  quickActionText: {
    fontSize: "1.08rem",
    lineHeight: 1.75,
    color: "rgba(28,36,51,0.82)",
    margin: "0 0 22px 0",
    maxWidth: "720px",
  },

  quickActionPoints: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "26px",
  },
  quickActionCardMobile: {
    padding: "26px 22px",
    borderRadius: "22px",
  },

  quickActionPoint: {
    fontSize: "1rem",
    lineHeight: 1.6,
    color: "rgba(28,36,51,0.92)",
  },
  headerInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    padding: "18px 0",
  },
  logoLink: {
    textDecoration: "none",
    color: "inherit",
    display: "inline-block",
    transition: "all 0.25s ease",
    cursor: "pointer",
  },
  logoLinkHover: {
    opacity: 0.92,
    transform: "scale(1.02)",
    filter: "drop-shadow(0 0 12px rgba(28,36,51,0.12))",
  },
  logo: {
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: "-0.03em",
  },
  headerCTA: {
    background: "#FBF8F3",
    color: "#1C2433",
    textDecoration: "none",
    padding: "10px 16px",
    borderRadius: 14,
    fontWeight: 700,
    fontSize: 14,
    border: "1px solid rgba(255,255,255,0.18)",
    transition: "all 0.25s ease",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
  },
  headerCTAHover: {
    transform: "translateY(-2px) scale(1.03)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
    background: "#FFFFFF",
  },

  headerCTAMobile: {
    width: "fit-content",
    alignSelf: "center",
    padding: "9px 14px",
    fontSize: 13,
    marginTop: 2,
    borderRadius: 999,
  },
  sublogo: {
    color: "rgba(255,255,255,0.6)",
    marginTop: 2,
    fontSize: 11,
    textAlign: "center",
    lineHeight: 1.2,
  },
  logoWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    textAlign: "center",
  },
  taxHighlightBluePrice: {
    color: "#2563EB",
    fontWeight: 800,
  },
  nav: {
    display: "flex",
    gap: 18,
    alignItems: "center",
  },
  taxPriceInlineBlue: {
    color: "#2563EB",
    fontWeight: 800,
  },
  navLink: {
    color: "rgba(255,255,255,0.82)",
    textDecoration: "none",
    fontSize: 14,
    transition: "all 0.2s ease",
    padding: "6px 10px",
    borderRadius: 10,
    cursor: "pointer",
  },
  navLinkHover: {
    color: "#FFFFFF",
    background: "rgba(255,255,255,0.1)",
    boxShadow: "0 0 0 1px rgba(255,255,255,0.14)",
  },
  n: {
    padding: "48px 0 40px",
  },
  cardTitleHover: {
    color: "#1C2433",
  },

  cardTextHover: {
    color: "rgba(0,0,0,0.7)",
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 32,
    alignItems: "center",
  },
  badge: {
    display: "inline-block",
    padding: "10px 16px",
    borderRadius: 999,
    background: "rgba(28,36,51,0.06)",
    border: "1px solid rgba(28,36,51,0.08)",
    color: "rgba(28,36,51,0.78)",
    fontSize: 14,
    marginBottom: 18,
  },

  heroTitle: {
    fontSize: 40, // 👈 réduit
    lineHeight: 1.15,
    fontWeight: 700,
    maxWidth: 700, // 👈 important pour éviter que ça prenne trop large
  },
  heroSection: {
    padding: "110px 0 90px",
  },

  heroText: {
    color: "rgba(28,36,51,0.74)",
    fontSize: "clamp(15px, 4vw, 18px)",
    lineHeight: 1.7,
    maxWidth: 760,
    marginTop: 18,
  },
  heroButtons: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap",
    marginTop: 28,
  },
  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#1C2433",
    color: "#FBF8F3",
    textDecoration: "none",
    borderRadius: 18,
    padding: "14px 22px",
    fontWeight: 700,
    border: "1px solid rgba(28,36,51,0.12)",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
  },
  cookieBanner: {
    position: "fixed",
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 999,
    display: "flex",
    justifyContent: "center",
    pointerEvents: "none",
  },

  cookieBannerMobile: {
    bottom: 12,
    left: 12,
    right: 12,
  },

  cookieBannerContent: {
    width: "min(980px, 100%)",
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 22,
    boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
    backdropFilter: "blur(14px)",
    padding: "20px 22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    pointerEvents: "auto",
  },
  searchPanelMobile: {
    padding: "16px 14px",
    borderRadius: 22,
    background:
      "linear-gradient(180deg, rgba(28,36,51,0.045) 0%, rgba(28,36,51,0.02) 100%)",
    border: "1px solid rgba(28,36,51,0.08)",
    boxShadow: "0 14px 40px rgba(0,0,0,0.18)",
  },

  searchHelperMobile: {
    margin: "0 0 12px 0",
    fontSize: "0.92rem",
    lineHeight: 1.4,
    color: "rgba(28,36,51,0.76)",
    textAlign: "left",
  },
  logoTextBlock: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  socialSvg: {
    width: 22,
    height: 22,
    display: "block",
    flexShrink: 0,
  },

  searchBoxMobile: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 10,
  },

  searchInputMobile: {
    minHeight: 50,
    padding: "0 16px",
    borderRadius: 16,
    fontSize: "0.96rem",
    background: "rgba(28,36,51,0.025)",
    border: "1px solid rgba(28,36,51,0.1)",
  },

  searchButtonMobile: {
    width: "100%",
    minHeight: 48,
    padding: "0 16px",
    borderRadius: 16,
    fontSize: "0.95rem",
  },

  cookieBannerContentMobile: {
    flexDirection: "column",
    alignItems: "stretch",
    padding: "18px 16px",
    gap: 16,
    borderRadius: 18,
  },

  cookieBannerTextBlock: {
    flex: 1,
  },

  cookieBannerTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#1C2433",
    marginBottom: 8,
  },
  problemHeroGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.35fr) minmax(320px, 0.9fr)",
    gap: 28,
    alignItems: "start",
  },
  problemLeftTitle: {
    fontSize: "clamp(1.55rem, 2vw, 2.2rem)",
    fontWeight: 800,
    lineHeight: 1.08,
    letterSpacing: "-0.02em",
    color: "#1C2433",
    margin: "0 0 22px 0",
  },
  problemLeftCol: {
    minWidth: 0,
  },
  problemRightCol: {
    minWidth: 0,
  },

  problemHeroSideCard: {
    background:
      "linear-gradient(180deg, rgba(28,36,51,0.06), rgba(28,36,51,0.025))",
    border: "1px solid rgba(28,36,51,0.08)",
    borderRadius: 28,
    padding: 22,
    boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
    position: "sticky",
    top: 110,
  },

  problemHeroSideLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: "rgba(28,36,51,0.45)",
    marginBottom: 10,
    fontWeight: 700,
  },

  problemHeroSideTitle: {
    fontSize: 24,
    lineHeight: 1.2,
    fontWeight: 700,
    color: "#1C2433",
    marginBottom: 18,
  },

  problemHeroSideList: {
    display: "grid",
    gap: 12,
  },
  problemSplitWrap: {
    maxWidth: "1120px",
    margin: "0 auto",
    padding: "0 24px",
  },
  problemSymptomsList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    padding: "22px 24px",
    background: "rgba(28,36,51,0.025)",
    border: "1px solid rgba(192,57,43,0.12)",
    borderRadius: "24px",
    boxShadow: `
      0 0 0 1px rgba(192,57,43,0.08),
      0 10px 28px rgba(192,57,43,0.10),
      0 0 60px rgba(192,57,43,0.07)
    `,
  },
  problemHelpCard: {
    display: "grid",
    gridTemplateColumns: "56px 1fr",
    alignItems: "center",
    gap: "16px",
    padding: "18px 20px",
    borderRadius: "22px",
    background:
      "linear-gradient(180deg, rgba(28,36,51,0.02), rgba(28,36,51,0.015))",
    border: "1px solid rgba(15,158,117,0.14)",
    color: "#1C2433",
    fontSize: "1.02rem",
    lineHeight: 1.5,
    boxShadow: `
      0 0 0 1px rgba(15,158,117,0.06),
      0 8px 24px rgba(0,0,0,0.16),
      0 0 48px rgba(15,158,117,0.08)
    `,
  },
  problemHelpIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "999px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.35rem",
    fontWeight: 700,
    color: "rgba(15,158,117,0.95)",
    background: "rgba(15,158,117,0.08)",
    border: "1px solid rgba(15,158,117,0.22)",
    boxShadow: "0 0 24px rgba(15,158,117,0.08)",
  },

  problemHelpText: {
    color: "#1C2433",
    fontSize: "1.02rem",
    lineHeight: 1.5,
  },
  problemBullet: {
    color: "rgba(28,36,51,0.7)",
  },
  problemHelpList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginTop: "18px",
  },

  problemSymptomRow: {
    display: "grid",
    gridTemplateColumns: "14px 1fr",
    gap: "10px",
    alignItems: "start",
    color: "rgba(28,36,51,0.88)",
    fontSize: "1.02rem",
    lineHeight: 1.7,
  },
  problemGrid: {
    display: "grid",
    gridTemplateColumns: "0.78fr 1.22fr",
    gap: "44px",
    alignItems: "start",
  },

  problemGridMobile: {
    gridTemplateColumns: "1fr",
    gap: "32px",
  },

  cookieBannerText: {
    margin: 0,
    color: "rgba(0,0,0,0.75)",
    fontSize: 14,
    lineHeight: 1.7,
  },

  cookieBannerTextMobile: {
    fontSize: 13,
    lineHeight: 1.6,
  },

  cookieBannerLink: {
    display: "inline-block",
    marginTop: 10,
    color: "#1C2433",
    fontWeight: 600,
    fontSize: 14,
    textDecoration: "underline",
    textUnderlineOffset: "3px",
  },

  cookieBannerLinkMobile: {
    fontSize: 13,
    marginTop: 8,
  },

  cookieBannerActions: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexShrink: 0,
  },

  cookieBannerActionsMobile: {
    width: "100%",
    flexDirection: "column-reverse",
    gap: 10,
  },

  cookiePrimaryButton: {
    background: "#1C2433",
    color: "#FBF8F3",
    color: "#FBF8F3",
    padding: "12px 18px",
    borderRadius: 14,
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    minWidth: 120,
    transition: "all 0.2s ease",
  },

  cookieSecondaryButton: {
    border: "1px solid rgba(0,0,0,0.12)",
    color: "#1C2433",
    background: "rgba(0,0,0,0.04)",
    padding: "12px 18px",
    borderRadius: 14,
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    minWidth: 120,
    transition: "all 0.2s ease",
  },

  cookieButtonMobile: {
    width: "100%",
    minWidth: "100%",
    padding: "12px 14px",
    fontSize: 14,
  },
  primaryButtonHover: {
    transform: "translateY(-2px) scale(1.03)",
    boxShadow: "0 12px 30px rgba(28,36,51,0.18)",
    background: "#2A3447",
  },
  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    color: "#1C2433",
    textDecoration: "none",
    borderRadius: 18,
    padding: "14px 22px",
    fontWeight: 600,
    border: "1px solid rgba(28,36,51,0.14)",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
  },
  secondaryButtonHover: {
    transform: "translateY(-2px) scale(1.03)",
    background: "rgba(28,36,51,0.06)",
    border: "1px solid rgba(28,36,51,0.22)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
  },
  heroCard: {
    borderRadius: 28,
    padding: 24,
    background:
      "linear-gradient(180deg, rgba(28,36,51,0.08), rgba(28,36,51,0.03))",
    border: "1px solid rgba(28,36,51,0.08)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
  },
  heroCardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 12,
  },
  miniCard: {
    padding: "16px 14px",
    borderRadius: 18,
    background: "rgba(28,36,51,0.05)",
    border: "1px solid rgba(28,36,51,0.07)",
    color: "rgba(28,36,51,0.88)",
    fontSize: 15,
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    transition: "all 0.25s ease",
    cursor: "pointer",
  },
  miniCardHover: {
    background: "rgba(28,36,51,0.08)",
    border: "1px solid rgba(28,36,51,0.16)",
    color: "#1C2433",
    transform: "translateY(-2px)",
    boxShadow: "0 12px 24px rgba(0,0,0,0.28)",
  },
  promiseBox: {
    marginTop: 16,
    padding: 18,
    borderRadius: 20,
    background: "rgba(28,36,51,0.05)",
    border: "1px solid rgba(28,36,51,0.07)",
  },
  promiseLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color: "rgba(28,36,51,0.45)",
  },
  promiseText: {
    fontSize: 22,
    lineHeight: 1.3,
    fontWeight: 600,
    marginTop: 8,
  },
  section: {
    padding: "80px 0",
    borderTop: "1px solid rgba(28,36,51,0.04)",
  },

  sectionAlt: {
    padding: "80px 0",
    background: "rgba(28,36,51,0.015)",
    borderTop: "1px solid rgba(28,36,51,0.04)",
  },
  sectionTitle: {
    fontSize: "clamp(30px, 5vw, 46px)",
    lineHeight: 1.05,
    letterSpacing: "-0.04em",
    margin: 0,
    maxWidth: 760,
  },
  sectionText: {
    color: "rgba(28,36,51,0.72)",
    fontSize: "clamp(15px, 4vw, 18px)",
    lineHeight: 1.7,
    marginTop: 16,
    maxWidth: 800,
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 18,
    marginTop: 28,
  },
  cardGridSingle: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 18,
    marginTop: 28,
  },
  infoCard: {
    background: "#FFFFFF",
    border: "1px solid rgba(28,36,51,0.08)",
    borderRadius: 24,
    padding: 22,
  },
  linkCard: {
    background: "#FFFFFF",
    border: "1px solid rgba(28,36,51,0.08)",
    borderRadius: 24,
    padding: 22,
    textDecoration: "none",
    color: "inherit",
    display: "block",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
  },
  linkCardCompact: {
    position: "relative",
    borderRadius: 18,
    padding: "18px 14px 30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    minHeight: 84,
  },
  cardCompactArrow: {
    position: "absolute",
    bottom: 10,
    right: 12,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 0,
  },
  cardTitleCompact: {
    fontSize: 16,
    lineHeight: 1.2,
    fontWeight: 700,
  },
  footerLogoImage: {
    maxWidth: "320px",
    width: "100%",
    height: "auto",
    objectFit: "contain",
    display: "block",
  },

  linkCardHover: {
    transform: "translateY(-6px) scale(1.02)",
    border: "1px solid rgba(37,99,235,0.35)",
    background: "#F4F0EA",
    color: "#1C2433",
    boxShadow: "0 18px 40px rgba(28,36,51,0.12)",
  },
  logoImage: {
    width: "clamp(64px, 10vw, 120px)",
    height: "auto",
    objectFit: "contain",
    display: "block",
  },
  cardTitle: {
    fontSize: 22,
    lineHeight: 1.2,
    margin: 0,
    fontWeight: 600,
  },
  cardText: {
    color: "rgba(28,36,51,0.68)",
    fontSize: "clamp(14.5px, 3.7vw, 16px)",
    lineHeight: 1.6,
    marginTop: 12,
  },
  socialProof: {
    marginTop: 10,
    fontSize: 14,
    color: "rgba(28,36,51,0.75)",
    letterSpacing: "0.02em",
  },
  legalCard: {
    background: "#FFFFFF",
    border: "1px solid rgba(28,36,51,0.08)",
    borderRadius: 28,
    padding: "28px 24px",
  },
  legalArticleTitle: {
    fontSize: 28,
    lineHeight: 1.2,
    marginTop: 0,
    marginBottom: 18,
    fontWeight: 700,
  },
  legalText: {
    color: "rgba(28,36,51,0.78)",
    fontSize: 16,
    lineHeight: 1.85,
    marginTop: 0,
    marginBottom: 18,
  },
  legalList: {
    color: "rgba(28,36,51,0.78)",
    fontSize: 16,
    lineHeight: 1.85,
    paddingLeft: 22,
    marginTop: 0,
    marginBottom: 18,
  },
  socialProofBox: {
    display: "inline-flex",
    alignItems: "center",
    gap: 9,
    marginTop: 14,
    padding: "9px 15px",
    borderRadius: 999,
    background: "#ffffff",
    border: "1px solid rgba(28,36,51,0.1)",
    color: "rgba(28,36,51,0.85)",
    fontSize: 14,
    textDecoration: "none",
    transition: "all 0.25s ease",
    cursor: "pointer",
    boxShadow: "0 2px 10px rgba(28,36,51,0.07)",
  },
  socialProofStars: {
    display: "inline-block",
    color: "#FBBC05",
    fontSize: 15,
    letterSpacing: 1,
    transformOrigin: "center",
  },

  socialProofText: {
    color: "rgba(28,36,51,0.88)",
  },
  bulletPanel: {
    marginTop: 28,
    background:
      "linear-gradient(180deg, rgba(28,36,51,0.08), rgba(28,36,51,0.03))",
    border: "1px solid rgba(28,36,51,0.08)",
    borderRadius: 28,
    padding: 24,
  },
  bulletItem: {
    color: "rgba(28,36,51,0.82)",
    fontSize: 17,
    lineHeight: 1.8,
    marginBottom: 10,
  },
  faqList: {
    display: "grid",
    gap: 18,
    marginTop: 28,
  },
  faqItem: {
    background: "#FFFFFF",
    border: "1px solid rgba(28,36,51,0.08)",
    borderRadius: 24,
    padding: 22,
  },
  faqQuestion: {
    fontSize: 22,
    lineHeight: 1.3,
    margin: 0,
    fontWeight: 600,
  },
  pricingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 18,
    marginTop: 28,
  },
  priceCard: {
    background: "#FFFFFF",
    border: "1px solid rgba(28,36,51,0.08)",
    borderRadius: 24,
    padding: 24,
  },
  price: {
    fontSize: 42,
    letterSpacing: "-0.04em",
    fontWeight: 800,
    marginTop: 18,
  },
  contactBox: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 24,
    alignItems: "start",
  },
  contactCard: {
    background:
      "linear-gradient(180deg, rgba(28,36,51,0.08), rgba(28,36,51,0.03))",
    border: "1px solid rgba(28,36,51,0.08)",
    borderRadius: 28,
    padding: 24,
    display: "grid",
    gap: 8,
  },
  contactLabel: {
    color: "rgba(28,36,51,0.46)",
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    marginTop: 6,
  },
  contactValue: {
    fontSize: 22,
    fontWeight: 600,
    marginBottom: 4,
  },
  contactMuted: {
    color: "rgba(28,36,51,0.55)",
    marginTop: 14,
    fontSize: 16,
  },
  contactZoneLink: {
    color: "#2563EB",
    textDecoration: "underline",
    textUnderlineOffset: 3,
  },
  contactZoneLinkHover: {
    color: "#1C2433",
  },
  inlinePhoneLink: {
    color: "#1C2433",
    fontWeight: 600,
    textDecoration: "none",
  },
  backLink: {
    display: "inline-block",
    color: "rgba(28,36,51,0.7)",
    textDecoration: "none",
    marginBottom: 22,
    fontSize: 15,
    transition: "all 0.2s ease",
    padding: "6px 10px",
    borderRadius: 10,
    cursor: "pointer",
  },
  backLinkHover: {
    color: "#1C2433",
    background: "rgba(28,36,51,0.08)",
  },

  footer: {
    padding: "44px 0 22px",
    background: "#0E1014",
    position: "relative",
    zIndex: 1,
  },
  footerContactCard: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: "20px 18px",
    textDecoration: "none",
    color: "inherit",
    transition: "all 0.25s ease",
    minHeight: 110,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  footerContactCardHover: {
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.03)",
    transform: "translateY(-2px)",
  },
  footerContactTitle: {
    color: "rgba(255,255,255,0.46)",
    fontSize: 14,
    marginBottom: 12,
  },
  footerContactValue: {
    color: "#FFFFFF",
    fontSize: 18,
    lineHeight: 1.5,
    fontWeight: 700,
  },
  footerBottomGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 0.8fr)",
    gap: 28,
    alignItems: "start",
    paddingTop: 28,
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  footerBrandBlock: {
    display: "grid",
    gap: 18,
  },
  footerLogoBox: {
    minHeight: 220,
    borderRadius: 24,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.04)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
  },
  footerBrandText: {
    fontSize: 15,
    lineHeight: 1.8,
    color: "rgba(255,255,255,0.62)",
    margin: 0,
    maxWidth: 720,
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  footerSideColumn: {
    display: "grid",
    gap: 18,
  },
  footerPanel: {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 22,
    padding: 20,
  },
  footerPanelTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 12,
    color: "#FFFFFF",
  },
  footerBottomGridMobile: {
    gridTemplateColumns: "1fr",
    gap: 20,
  },

  footerBrandBlockMobile: {
    gap: 16,
  },

  footerLogoBoxMobile: {
    minHeight: 140,
    padding: 20,
  },

  footerLogoImageMobile: {
    maxWidth: "180px",
  },

  footerBrandTextMobile: {
    maxWidth: "100%",
    fontSize: 15,
    lineHeight: 1.7,
  },

  footerSideColumnMobile: {
    gap: 16,
  },

  socialRowMobile: {
    justifyContent: "center",
  },

  footerLinkListMobile: {
    gap: 10,
  },

  footerLinkMobile: {
    width: "100%",
    boxSizing: "border-box",
  },

  footerLegalBarMobile: {
    flexDirection: "column",
    gap: 6,
  },
  socialRow: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap",
  },
  compactLinkCard: {
    display: "block",
    textDecoration: "none",
    color: "inherit",
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: "18px 20px",
    transition: "all 0.22s ease",
    boxShadow: "0 10px 24px rgba(0,0,0,0.16)",
  },

  compactLinkCardHover: {
    transform: "translateY(-2px)",
    background: "#F4F0EA",
    border: "1px solid rgba(255,255,255,0.16)",
    boxShadow: "0 14px 32px rgba(0,0,0,0.26)",
  },

  compactLinkCardTitle: {
    fontSize: 18,
    lineHeight: 1.25,
    fontWeight: 700,
    marginBottom: 8,
    color: "#FFFFFF",
    transition: "color 0.22s ease",
  },

  compactLinkCardTitleHover: {
    color: "#FFFFFF",
  },

  compactLinkCardText: {
    fontSize: 15,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.68)",
    transition: "color 0.22s ease",
  },

  compactLinkCardTextHover: {
    color: "rgba(0,0,0,0.68)",
  },
  socialIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: "#FFFFFF",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    fontSize: 22,
    fontWeight: 700,
    transition: "all 0.25s ease",
  },
  socialIconHover: {
    transform: "translateY(-2px) scale(1.04)",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.18)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
  },
  footerLinkList: {
    display: "grid",
    gap: 5,
  },
  footerLink: {
    color: "rgba(255,255,255,0.72)",
    textDecoration: "none",
    fontSize: 14,
    padding: "4px 8px",
    borderRadius: 10,
    transition: "all 0.2s ease",
    display: "inline-block",
    width: "fit-content",
  },
  footerLinkHover: {
    color: "#FFFFFF",
    background: "rgba(255,255,255,0.08)",
  },
  footerLegalBar: {
    marginTop: 28,
    paddingTop: 20,
    borderTop: "1px solid rgba(255,255,255,0.08)",
    color: "rgba(255,255,255,0.46)",
    fontSize: 13,
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  footerLegalDot: {
    color: "rgba(255,255,255,0.22)",
  },
};
