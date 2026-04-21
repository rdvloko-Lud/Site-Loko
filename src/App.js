import React, { useState, useEffect } from "react"; 
import logoCreditImpot from "./Assets/logo-credit-impot.png";
const SITE_URL = "https://lokofr.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image-loko.jpg`;
const DEFAULT_SITE_NAME = "Loko";
const BUSINESS_ID = `${SITE_URL}/#business`;
const BUSINESS_PHONE = "+33763131515";
const BUSINESS_EMAIL = "rdvloko@gmail.com";
const BUSINESS_LOGO = `${SITE_URL}/logo-loko.webp`;

const BUSINESS_ADDRESS = {
  "@type": "PostalAddress",
  addressLocality: "Les Sables d’Olonne",
  postalCode: "85100",
  addressCountry: "FR",
};

const BUSINESS_AREAS = [
  {
    "@type": "City",
    name: "Les Sables d’Olonne",
  },
  {
    "@type": "City",
    name: "Olonne-sur-Mer",
  },
  {
    "@type": "City",
    name: "Château d’Olonne",
  },
  {
    "@type": "City",
    name: "L’Île d’Olonne",
  },
  {
    "@type": "City",
    name: "Talmont-Saint-Hilaire",
  },
];

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
    title: "Prendre rendez-vous | Loko",
    description:
      "Prenez rendez-vous avec Loko pour une assistance numérique à domicile aux Sables d’Olonne : appel, demande en ligne ou choix d’un créneau simple et rapide.",
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

const searchData = [
  {
    title: "Internet & Wi-Fi",
    keywords: [
      "wifi",
      "wi-fi",
      "internet",
      "connexion",
      "reseau",
      "réseau",
      "box",
      "wifi lent",
      "internet lent",
      "probleme internet",
      "problème internet",
      "wifi ne fonctionne plus",
      "connexion impossible",
    ],
    href: "/probleme-wifi-internet-les-sables-dolonne",
  },
  {
    title: "TV qui ne fonctionne plus",
    keywords: [
      "tv ne fonctionne plus",
      "tele ne fonctionne plus",
      "television ne fonctionne plus",
      "ecran noir tv",
      "écran noir tv",
      "aucun signal tv",
      "probleme tv",
      "problème tv",
      "source tv",
      "hdmi tv",
    ],
    href: "/probleme-tv-les-sables-dolonne",
  },
  {
    title: "Problème box TV",
    keywords: [
      "box tv",
      "probleme box tv",
      "problème box tv",
      "decodeur tv",
      "décodeur tv",
      "box tv bloquee",
      "box tv bloquée",
      "chaines tv",
      "chaînes tv",
      "plus de chaines",
      "plus de chaînes",
    ],
    href: "/probleme-box-tv-les-sables-dolonne",
  },
  {
    title: "Netflix ne fonctionne plus",
    keywords: [
      "netflix ne fonctionne plus",
      "netflix bug",
      "netflix tv",
      "netflix ne marche plus",
      "netflix ecran noir",
      "netflix écran noir",
      "netflix ne se lance plus",
      "probleme netflix",
      "problème netflix",
    ],
    href: "/netflix-ne-fonctionne-plus-les-sables-dolonne",
  },
  {
    title: "Formation Windows",
    keywords: [
      "formation windows",
      "apprendre windows",
      "utiliser un pc windows",
      "apprendre ordinateur windows",
      "cours windows",
    ],
    href: "/formation-windows-les-sables-dolonne",
  },
  {
    title: "Formation MacBook",
    keywords: [
      "formation macbook",
      "apprendre macbook",
      "utiliser un mac",
      "apprendre mac",
      "cours macbook",
    ],
    href: "/formation-macbook-les-sables-dolonne",
  },
  {
    title: "Formation smartphone",
    keywords: [
      "formation smartphone",
      "apprendre smartphone",
      "utiliser un smartphone",
      "cours smartphone",
      "aide smartphone debutant",
    ],
    href: "/formation-smartphone-les-sables-dolonne",
  },
  {
    title: "Apprendre Internet",
    keywords: [
      "apprendre internet",
      "utiliser internet",
      "cours internet",
      "comprendre internet",
      "naviguer sur internet",
    ],
    href: "/apprendre-internet-les-sables-dolonne",
  },
  {
    title: "Apprendre les mails",
    keywords: [
      "apprendre mails",
      "apprendre email",
      "utiliser sa messagerie",
      "cours mail",
      "envoyer un mail",
      "retrouver ses mails",
    ],
    href: "/apprendre-mails-les-sables-dolonne",
  },
  {
    title: "Wi-Fi lent",
    keywords: [
      "wifi lent",
      "wifi faible",
      "wifi mauvais",
      "mauvaise connexion",
      "connexion lente",
      "internet lent",
      "debit lent",
      "débit lent",
    ],
    href: "/wifi-lent-les-sables-dolonne",
  },
  {
    title: "Wi-Fi ne fonctionne plus",
    keywords: [
      "wifi ne fonctionne plus",
      "wifi hs",
      "wifi impossible",
      "impossible de se connecter",
      "reseau introuvable",
      "réseau introuvable",
      "connexion wifi impossible",
    ],
    href: "/wifi-ne-fonctionne-plus-les-sables-dolonne",
  },
  {
    title: "Installation box Internet",
    keywords: [
      "installation box",
      "installer box",
      "nouvelle box",
      "mise en service box",
      "installation internet",
      "brancher box",
      "changer de box",
    ],
    href: "/installation-box-internet-les-sables-dolonne",
  },
  {
    title: "Smartphone",
    keywords: [
      "smartphone",
      "telephone",
      "téléphone",
      "iphone",
      "android",
      "portable",
      "aide telephone",
      "aide téléphone",
      "reglage telephone",
      "réglage téléphone",
    ],
    href: "/aide-smartphone-les-sables-dolonne",
  },
  {
    title: "Ordinateur",
    keywords: [
      "ordinateur",
      "pc",
      "mac",
      "ordinateur lent",
      "pc lent",
      "mac lent",
      "probleme ordinateur",
      "problème ordinateur",
      "fichier",
      "mail",
      "mails",
    ],
    href: "/depannage-ordinateur-les-sables-dolonne",
  },
  {
    title: "Ordinateur lent",
    keywords: [
      "ordinateur lent",
      "pc lent",
      "mac lent",
      "ordinateur rame",
      "pc rame",
      "ordinateur bloque",
      "ordinateur bloqué",
      "ordinateur tres lent",
      "ordinateur très lent",
      "ordinateur long a demarrer",
      "ordinateur long à démarrer",
    ],
    href: "/ordinateur-lent-les-sables-dolonne",
  },
  {
    title: "Imprimante qui ne fonctionne plus",
    keywords: [
      "imprimante",
      "impression",
      "imprimante ne fonctionne plus",
      "imprimante hors ligne",
      "imprimante non detectee",
      "imprimante non détectée",
      "imprimante wifi",
    ],
    href: "/imprimante-ne-fonctionne-plus-les-sables-dolonne",
  },
  {
    title: "TV & appareils connectés",
    keywords: [
      "tv",
      "television",
      "télévision",
      "box tv",
      "decodeur",
      "décodeur",
      "chaine tv",
      "chaîne tv",
      "netflix",
      "tele connectee",
      "télé connectée",
      "smart tv",
    ],
    href: "/probleme-tv-box-les-sables-dolonne",
  },
  {
    title: "Données & transferts",
    keywords: [
      "transfert",
      "donnees",
      "données",
      "transfert donnees",
      "transfert données",
      "photos",
      "contacts",
      "recuperation donnees",
      "récupération données",
    ],
    href: "/transfert-de-donnees-les-sables-dolonne",
  },
  {
    title: "Transfert de données téléphone",
    keywords: [
      "transfert telephone",
      "transfert téléphone",
      "transfert iphone",
      "transfert android",
      "transfert nouveau telephone",
      "transfert nouveau téléphone",
      "changer de telephone",
      "changer de téléphone",
    ],
    href: "/transfert-donnees-telephone-les-sables-dolonne",
  },
  {
    title: "Changement de téléphone",
    keywords: [
      "nouveau telephone",
      "nouveau téléphone",
      "changement telephone",
      "changement téléphone",
      "configurer telephone",
      "configurer téléphone",
      "nouvel iphone",
      "nouvel android",
    ],
    href: "/changement-telephone-les-sables-dolonne",
  },
  {
    title: "Apprendre le numérique",
    keywords: [
      "apprendre le numerique",
      "apprendre le numérique",
      "formation numerique",
      "formation numérique",
      "apprendre informatique",
      "cours informatique",
      "apprendre ordinateur",
      "apprendre smartphone",
      "aide numerique",
      "aide numérique",
    ],
    href: "/apprendre-le-numerique-les-sables-dolonne",
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
      "Loko intervient à domicile aux Sables d’Olonne pour vous aider avec Internet et le Wi-Fi du quotidien. Box à installer, connexion instable, appareils qui ne se connectent plus ou réseau difficile à comprendre : l’objectif est de retrouver une installation simple, claire et agréable à utiliser, sans jargon ni stress.",
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
        href: "/wifi-lent-les-sables-dolonne",
        title: "Wi-Fi lent ou instable",
        text: "Quand la connexion fonctionne mais reste lente, faible ou difficile à utiliser.",
      },
      {
        href: "/wifi-ne-fonctionne-plus-les-sables-dolonne",
        title: "Wi-Fi ne fonctionne plus",
        text: "Quand le réseau Wi-Fi n’apparaît plus ou refuse toute connexion.",
      },
      {
        href: "/installation-box-internet-les-sables-dolonne",
        title: "Installation box Internet",
        text: "Pour installer une nouvelle box et connecter correctement vos appareils.",
      },
      {
        href: "/probleme-tv-box-les-sables-dolonne",
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
        a: "Oui. Justement, l’idée est de vous aider sans jargon, avec des explications claires et une intervention adaptée à votre niveau.",
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
        href: "/probleme-tv-box-les-sables-dolonne",
        title: "TV & appareils connectés",
        text: "Vue globale pour comprendre et améliorer toute votre installation TV.",
      },
      {
        href: "/probleme-box-tv-les-sables-dolonne",
        title: "Problème box TV",
        text: "Si le problème vient du décodeur, des chaînes ou de la box TV.",
      },
      {
        href: "/netflix-ne-fonctionne-plus-les-sables-dolonne",
        title: "Netflix ne fonctionne plus",
        text: "Si l’écran fonctionne mais que les applications ne se lancent pas.",
      },
      {
        href: "/probleme-wifi-internet-les-sables-dolonne",
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
        href: "/probleme-tv-box-les-sables-dolonne",
        title: "TV & appareils connectés",
        text: "Vue globale pour comprendre votre installation TV à domicile.",
      },
      {
        href: "/probleme-tv-les-sables-dolonne",
        title: "TV qui ne fonctionne plus",
        text: "Si le problème concerne l’affichage ou l’écran.",
      },
      {
        href: "/netflix-ne-fonctionne-plus-les-sables-dolonne",
        title: "Netflix ne fonctionne plus",
        text: "Si les applications de la box TV ne fonctionnent pas.",
      },
      {
        href: "/installation-box-internet-les-sables-dolonne",
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
        href: "/probleme-tv-box-les-sables-dolonne",
        title: "TV & appareils connectés",
        text: "Vue globale pour comprendre votre installation TV et vos applications.",
      },
      {
        href: "/probleme-tv-les-sables-dolonne",
        title: "TV qui ne fonctionne plus",
        text: "Si le problème concerne l’écran ou l’affichage.",
      },
      {
        href: "/probleme-box-tv-les-sables-dolonne",
        title: "Problème box TV",
        text: "Si le souci vient du décodeur ou de la box TV.",
      },
      {
        href: "/probleme-wifi-internet-les-sables-dolonne",
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
        a: "Oui. C’est justement l’intérêt : vous aider à y voir clair et à retrouver un usage normal sans jargon technique.",
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
      "Loko vous accompagne à domicile aux Sables d’Olonne si votre ordinateur est devenu lent au quotidien. Démarrage trop long, fichiers qui s’ouvrent mal, ordinateur qui rame ou blocages fréquents : l’objectif est de retrouver un usage plus fluide, plus simple et moins frustrant.",
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
        href: "/depannage-ordinateur-les-sables-dolonne",
        title: "Ordinateur",
        text: "Vue d’ensemble pour l’aide sur ordinateur à domicile aux Sables d’Olonne.",
      },
      {
        href: "/imprimante-ne-fonctionne-plus-les-sables-dolonne",
        title: "Imprimante qui ne fonctionne plus",
        text: "Si le problème concerne aussi l’impression ou un périphérique relié à l’ordinateur.",
      },
      {
        href: "/transfert-de-donnees-les-sables-dolonne",
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
        a: "Oui. Tout est expliqué simplement, sans jargon, avec une approche claire et rassurante.",
      },
    ],
  },
  "/wifi-ne-fonctionne-plus-les-sables-dolonne": {
    title: "Wi-Fi ne fonctionne plus",
    seoTitle: "Wi-Fi ne fonctionne plus aux Sables d’Olonne | Loko",
    seoDescription:
      "Loko intervient à domicile aux Sables d’Olonne si votre Wi-Fi ne fonctionne plus : connexion impossible, appareils déconnectés ou réseau introuvable.",
    hero: "Votre Wi-Fi ne fonctionne plus ?",
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
        href: "/probleme-wifi-internet-les-sables-dolonne",
        title: "Internet & Wi-Fi",
        text: "Vue globale pour comprendre et améliorer votre réseau.",
      },
      {
        href: "/wifi-lent-les-sables-dolonne",
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
    hero: "Installer votre box Internet simplement",
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
        href: "/probleme-wifi-internet-les-sables-dolonne",
        title: "Internet & Wi-Fi",
        text: "Comprendre et améliorer votre installation globale.",
      },
      {
        href: "/wifi-ne-fonctionne-plus-les-sables-dolonne",
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
    hero: "Transférer vos données sans stress",
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
        href: "/transfert-de-donnees-les-sables-dolonne",
        title: "Données & transferts",
        text: "Vue globale sur la gestion des données.",
      },
      {
        href: "/aide-smartphone-les-sables-dolonne",
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
    hero: "Changer de téléphone sans repartir de zéro",
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
        href: "/transfert-donnees-telephone-les-sables-dolonne",
        title: "Transfert données téléphone",
        text: "Récupération complète des données.",
      },
      {
        href: "/aide-smartphone-les-sables-dolonne",
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
        href: "/probleme-wifi-internet-les-sables-dolonne",
        title: "Internet & Wi-Fi",
        text: "Vue globale pour comprendre et améliorer votre connexion à domicile.",
      },
      {
        href: "/wifi-ne-fonctionne-plus-les-sables-dolonne",
        title: "Wi-Fi ne fonctionne plus",
        text: "Si la connexion devient totalement indisponible ou impossible à utiliser.",
      },
      {
        href: "/installation-box-internet-les-sables-dolonne",
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
    hero: "Votre smartphone, simplement maîtrisé",
    intro:
      "Loko vous accompagne à domicile aux Sables d’Olonne pour mieux comprendre et utiliser votre smartphone. Réglages, organisation, transfert de données ou prise en main globale : l’objectif est de rendre votre téléphone plus simple et plus agréable à utiliser.",
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
        href: "/transfert-donnees-telephone-les-sables-dolonne",
        title: "Transfert de données téléphone",
        text: "Pour récupérer photos, contacts et applications lors d’un changement de téléphone.",
      },
      {
        href: "/changement-telephone-les-sables-dolonne",
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
        a: "Oui. Tout est expliqué simplement, sans jargon.",
      },
    ],
  },
  "/depannage-ordinateur-les-sables-dolonne": {
    title: "Ordinateur",
    seoTitle:
      "Aide ordinateur aux Sables d’Olonne | Utilisation, réglages, mails et imprimante",
    seoDescription:
      "Loko vous aide à domicile aux Sables d’Olonne pour votre ordinateur : utilisation, mails, fichiers, imprimante, réglages simples et accompagnement du quotidien.",
    hero: "Aide ordinateur aux Sables d’Olonne : utilisation, réglages et accompagnement à domicile",
    intro:
      "Loko vous accompagne à domicile aux Sables d’Olonne pour tout ce qui concerne l’utilisation de votre ordinateur au quotidien. Mails, fichiers, imprimante, réglages simples, compréhension du fonctionnement ou besoin d’être rassuré : l’objectif est de rendre votre ordinateur plus simple, plus clair et plus agréable à utiliser.",
    symptoms: [
      "Ordinateur difficile à utiliser ou devenu décourageant au quotidien",
      "Difficultés avec les mails, les fichiers ou l’organisation",
      "Imprimante ou périphérique qui ne fonctionne pas correctement",
      "Ordinateur lent, bloqué ou peu agréable à utiliser",
      "Besoin d’aide simple pour reprendre les bases tranquillement",
    ],
    help: [
      "Aide à l’utilisation quotidienne de l’ordinateur",
      "Réglages simples pour retrouver un usage plus fluide",
      "Organisation des fichiers, dossiers et mails",
      "Connexion d’imprimantes et de périphériques",
      "Accompagnement pédagogique à domicile, sans jargon",
    ],
    relatedPages: [
      {
        href: "/ordinateur-lent-les-sables-dolonne",
        title: "Ordinateur lent",
        text: "Quand l’ordinateur rame, démarre lentement ou devient pénible à utiliser au quotidien.",
      },
      {
        href: "/imprimante-ne-fonctionne-plus-les-sables-dolonne",
        title: "Imprimante qui ne fonctionne plus",
        text: "Quand l’imprimante n’est plus reconnue, n’imprime plus ou perd sa connexion.",
      },
      {
        href: "/transfert-de-donnees-les-sables-dolonne",
        title: "Transfert de données",
        text: "Pour déplacer, récupérer ou organiser des fichiers utiles entre plusieurs appareils.",
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
        a: "Oui. L’objectif est justement de vous aider sans jargon, à votre rythme, avec des explications claires et rassurantes.",
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
        href: "/depannage-ordinateur-les-sables-dolonne",
        title: "Ordinateur",
        text: "Aide globale sur l’ordinateur, les fichiers, les mails et les périphériques du quotidien.",
      },
      {
        href: "/ordinateur-lent-les-sables-dolonne",
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
        href: "/probleme-tv-les-sables-dolonne",
        title: "TV qui ne fonctionne plus",
        text: "Écran noir, aucun signal ou télévision qui ne répond plus.",
      },
      {
        href: "/probleme-box-tv-les-sables-dolonne",
        title: "Problème box TV",
        text: "Décodeur bloqué, chaînes indisponibles ou box TV qui ne fonctionne pas correctement.",
      },
      {
        href: "/netflix-ne-fonctionne-plus-les-sables-dolonne",
        title: "Netflix ne fonctionne plus",
        text: "Application qui ne se lance pas, bug, écran noir ou problème de connexion.",
      },
      {
        href: "/probleme-wifi-internet-les-sables-dolonne",
        title: "Internet & Wi-Fi",
        text: "Si votre télévision ou vos applications dépendent d’une connexion Internet instable.",
      },
      {
        href: "/installation-box-internet-les-sables-dolonne",
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
    hero: "Besoin d’un transfert de données ?",
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
        href: "/transfert-donnees-telephone-les-sables-dolonne",
        title: "Transfert de données téléphone",
        text: "Pour transférer simplement les données d’un ancien téléphone vers un nouveau.",
      },
      {
        href: "/changement-telephone-les-sables-dolonne",
        title: "Changement de téléphone",
        text: "Pour configurer un nouveau téléphone et retrouver vos contenus essentiels.",
      },
      {
        href: "/depannage-ordinateur-les-sables-dolonne",
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
      "Loko vous accompagne à domicile aux Sables d’Olonne pour apprendre à utiliser plus sereinement les outils numériques du quotidien. Ordinateur, smartphone, Internet, mails, intelligence artificielle ou usages de base : l’objectif est de rendre les choses plus simples, plus claires et plus accessibles, sans jargon.",
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
        href: "/apprendre-ia-les-sables-dolonne",
        title: "Découverte de l’IA",
        text: "Pour comprendre l’intelligence artificielle et apprendre à l’utiliser simplement.",
      },
      {
        href: "/formation-windows-les-sables-dolonne",
        title: "Apprendre à utiliser un ordinateur Windows",
        text: "Pour mieux comprendre l’usage quotidien d’un PC Windows.",
      },
      {
        href: "/formation-macbook-les-sables-dolonne",
        title: "Apprendre à utiliser un MacBook",
        text: "Pour mieux utiliser un Mac au quotidien, simplement et sans jargon.",
      },
      {
        href: "/formation-smartphone-les-sables-dolonne",
        title: "Apprendre à utiliser un smartphone",
        text: "Pour mieux comprendre son téléphone et gagner en autonomie.",
      },
      {
        href: "/apprendre-internet-les-sables-dolonne",
        title: "Apprendre à utiliser Internet",
        text: "Pour comprendre la navigation, les recherches et les usages du web.",
      },
      {
        href: "/apprendre-mails-les-sables-dolonne",
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
      "Loko accompagne les particuliers aux Sables d’Olonne pour découvrir l’intelligence artificielle, comprendre à quoi elle sert et apprendre à l’utiliser simplement dans la vie quotidienne. L’objectif est de rendre l’IA accessible, utile et concrète, sans jargon technique.",
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
        href: "/apprendre-le-numerique-les-sables-dolonne",
        title: "Apprendre le numérique",
        text: "Vue d’ensemble pour apprendre à mieux utiliser les outils numériques du quotidien.",
      },
      {
        href: "/formation-windows-les-sables-dolonne",
        title: "Apprendre à utiliser un ordinateur Windows",
        text: "Pour mieux utiliser un PC et se sentir plus à l’aise avec le numérique au quotidien.",
      },
      {
        href: "/formation-smartphone-les-sables-dolonne",
        title: "Apprendre à utiliser un smartphone",
        text: "Pour mieux comprendre son téléphone et les usages numériques du quotidien.",
      },
      {
        href: "/apprendre-internet-les-sables-dolonne",
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
      "Envie d’apprendre sans jargon ni stress",
    ],
    help: [
      "Apprentissage des bases d’un ordinateur Windows",
      "Aide à la compréhension des fichiers, dossiers et usages du quotidien",
      "Accompagnement sur les mails, Internet et l’organisation simple",
      "Explications claires et adaptées à votre niveau",
    ],
    relatedPages: [
      {
        href: "/apprendre-le-numerique-les-sables-dolonne",
        title: "Apprendre le numérique",
        text: "Vue d’ensemble pour mieux comprendre les outils numériques du quotidien.",
      },
      {
        href: "/depannage-ordinateur-les-sables-dolonne",
        title: "Ordinateur",
        text: "Pour être aidé concrètement sur l’usage quotidien d’un ordinateur à domicile.",
      },
      {
        href: "/formation-macbook-les-sables-dolonne",
        title: "Apprendre à utiliser un MacBook",
        text: "Si vous utilisez plutôt un ordinateur Apple au quotidien.",
      },
      {
        href: "/apprendre-internet-les-sables-dolonne",
        title: "Apprendre à utiliser Internet",
        text: "Pour mieux comprendre la navigation, les recherches et les usages du web.",
      },
      {
        href: "/apprendre-mails-les-sables-dolonne",
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
      "Envie d’apprendre tranquillement, sans jargon technique",
    ],
    help: [
      "Apprentissage simple des bases du MacBook",
      "Aide à la compréhension des fichiers, dossiers et usages du quotidien",
      "Accompagnement sur Internet, mails et organisation",
      "Explications claires adaptées à votre niveau",
    ],
    relatedPages: [
      {
        href: "/apprendre-le-numerique-les-sables-dolonne",
        title: "Apprendre le numérique",
        text: "Vue d’ensemble pour apprendre à utiliser les outils numériques du quotidien.",
      },
      {
        href: "/formation-windows-les-sables-dolonne",
        title: "Apprendre à utiliser un ordinateur Windows",
        text: "Si vous utilisez aussi ou plutôt un PC Windows.",
      },
      {
        href: "/apprendre-internet-les-sables-dolonne",
        title: "Apprendre à utiliser Internet",
        text: "Pour mieux comprendre la navigation et les usages du web.",
      },
      {
        href: "/apprendre-mails-les-sables-dolonne",
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
        href: "/apprendre-le-numerique-les-sables-dolonne",
        title: "Apprendre le numérique",
        text: "Vue d’ensemble pour apprendre à mieux utiliser les outils numériques du quotidien.",
      },
      {
        href: "/aide-smartphone-les-sables-dolonne",
        title: "Smartphone",
        text: "Pour être aidé concrètement sur l’utilisation et les réglages du téléphone au quotidien.",
      },
      {
        href: "/apprendre-ia-les-sables-dolonne",
        title: "Découverte de l’IA",
        text: "Pour découvrir l’intelligence artificielle simplement sur vos appareils du quotidien.",
      },
      {
        href: "/apprendre-internet-les-sables-dolonne",
        title: "Apprendre à utiliser Internet",
        text: "Pour mieux naviguer et faire des recherches sur le web depuis votre téléphone.",
      },
      {
        href: "/apprendre-mails-les-sables-dolonne",
        title: "Apprendre à utiliser sa messagerie",
        text: "Pour consulter, envoyer et retrouver vos mails plus facilement sur smartphone.",
      },
    ],
    faq: [
      {
        q: "Est-ce adapté si je débute complètement avec mon téléphone ?",
        a: "Oui. Loko part de votre niveau réel et vous aide pas à pas, sans jargon.",
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
        href: "/apprendre-le-numerique-les-sables-dolonne",
        title: "Apprendre le numérique",
        text: "Vue d’ensemble pour apprendre à mieux utiliser les outils numériques du quotidien.",
      },
      {
        href: "/formation-windows-les-sables-dolonne",
        title: "Apprendre à utiliser un ordinateur Windows",
        text: "Pour mieux utiliser Internet sur un PC Windows au quotidien.",
      },
      {
        href: "/formation-smartphone-les-sables-dolonne",
        title: "Apprendre à utiliser un smartphone",
        text: "Pour mieux utiliser Internet depuis votre téléphone.",
      },
      {
        href: "/apprendre-mails-les-sables-dolonne",
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
        href: "/apprendre-le-numerique-les-sables-dolonne",
        title: "Apprendre le numérique",
        text: "Vue d’ensemble pour mieux comprendre les outils numériques du quotidien.",
      },
      {
        href: "/formation-windows-les-sables-dolonne",
        title: "Apprendre à utiliser un ordinateur Windows",
        text: "Pour mieux gérer votre messagerie depuis un PC Windows.",
      },
      {
        href: "/formation-smartphone-les-sables-dolonne",
        title: "Apprendre à utiliser un smartphone",
        text: "Pour mieux consulter et envoyer vos mails depuis votre téléphone.",
      },
      {
        href: "/apprendre-internet-les-sables-dolonne",
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
};

const problemCards = [
  {
    href: "/probleme-wifi-internet-les-sables-dolonne",
    label: "Internet & Wi-Fi",
    desc: "Connexion instable, Wi-Fi lent ou box à installer : on remet tout en place simplement à domicile.",
  },
  {
    href: "/aide-smartphone-les-sables-dolonne",
    label: "Smartphone",
    desc: "Téléphone difficile à utiliser, stockage plein ou réglages compliqués : on vous accompagne pas à pas.",
  },
  {
    href: "/depannage-ordinateur-les-sables-dolonne",
    label: "Ordinateur",
    desc: "Ordinateur lent, mails, fichiers ou imprimante : on simplifie votre usage au quotidien.",
  },
  {
    href: "/probleme-tv-box-les-sables-dolonne",
    label: "TV & appareils connectés",
    desc: "TV, box ou applications qui ne fonctionnent plus : on remet tout en marche sans prise de tête.",
  },
  {
    href: "/transfert-de-donnees-les-sables-dolonne",
    label: "Données & transferts",
    desc: "Changement d’appareil ou peur de perdre vos données : on sécurise et transfère tout pour vous.",
  },
  {
    href: "/apprendre-le-numerique-les-sables-dolonne",
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

function getSchemas(path, currentPage) {
  const schemas = [
    {
      id: "global-business",
      data: getGlobalBusinessSchema(),
    },
  ];

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

function useGlobalAnimations() {
  useEffect(() => {
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
  const currentPage = problemPages[path] || null;

  useEffect(() => {
    const seoData = getSeoData(path, currentPage);
    applySeoMeta(seoData);
  }, [path, currentPage]);

  if (isRdvPage) {
    return <RendezVousPage />;
  }

  if (isPlanPage) {
    return <PlanDuSitePage />;
  }
  if (isCgvPage) {
    return <CGVPage />;
  }
  if (isPrivacyPage) {
    return <PrivacyPage />;
  }
  if (isMentionsPage) {
    return <MentionsPage />;
  }
  if (isCreditImpotPage) {
    return <CreditImpotPage />;
  }
  if (currentPage) {
    return <ProblemPage page={currentPage} />;
  }

  return <HomePage />;
}
function CreditImpotPage() {
  return (
    <div style={styles.page}>
      <SiteHeader />

      <main>
        <section style={styles.heroSection}>
          <div style={styles.containerNarrow}>
            <div style={styles.badge}>Service à la personne • Loko</div>
            <h1 style={styles.heroTitle}>Crédit d’impôt de 50 %</h1>
            <p style={styles.heroText}>
              Avec Loko, certaines prestations d’assistance numérique à domicile
              peuvent vous permettre de bénéficier d’un crédit d’impôt de 50 %.
            </p>
          </div>
        </section>

        <section style={styles.sectionAlt}>
          <div style={styles.containerNarrow}>
            <div style={styles.taxHeroCard}>
              <div style={styles.taxHeroTop}>
                <img
                  src={logoCreditImpot}
                  alt="Crédit d’impôt de 50 %"
                  style={styles.taxLogo}
                />
                <div>
                  <div style={styles.taxHeroLabel}>Exemple simple</div>
                  <div style={styles.taxHeroPriceLine}>
                    79 € → 39,50 € après crédit d’impôt
                  </div>
                </div>
              </div>

              <p style={styles.taxHeroText}>
                Vous payez votre prestation, puis vous pouvez récupérer 50 % du
                montant sous forme de crédit d’impôt, selon votre situation et
                l’éligibilité de la prestation.
              </p>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.containerNarrow}>
            <h2 style={styles.sectionTitle}>Comment ça fonctionne ?</h2>

            <div style={styles.cardGridSingle}>
              <div style={styles.infoCard}>
                <h3 style={styles.cardTitle}>1. Vous prenez rendez-vous</h3>
                <p style={styles.cardText}>
                  Loko intervient à domicile pour vous aider sur vos besoins
                  numériques du quotidien.
                </p>
              </div>

              <div style={styles.infoCard}>
                <h3 style={styles.cardTitle}>2. Vous réglez la prestation</h3>
                <p style={styles.cardText}>
                  Le montant de l’intervention est payé normalement, comme une
                  prestation classique.
                </p>
              </div>

              <div style={styles.infoCard}>
                <h3 style={styles.cardTitle}>
                  3. Vous bénéficiez de l’avantage fiscal
                </h3>
                <p style={styles.cardText}>
                  Selon votre situation, 50 % du montant peut être récupéré sous
                  forme de crédit d’impôt.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.sectionAlt}>
          <div style={styles.containerNarrow}>
            <h2 style={styles.sectionTitle}>Pourquoi c’est intéressant ?</h2>

            <div style={styles.bulletPanel}>
              <div style={styles.bulletItem}>
                • Le coût réel peut être réduit de moitié
              </div>
              <div style={styles.bulletItem}>
                • Vous profitez d’une aide à domicile claire, locale et humaine
              </div>
              <div style={styles.bulletItem}>
                • Vous avancez plus sereinement sur vos besoins numériques
              </div>
              <div style={styles.bulletItem}>
                • Vous gagnez à la fois en aide immédiate et en autonomie
              </div>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.containerNarrow}>
            <div style={styles.taxNoteCard}>
              <h2 style={styles.sectionTitle}>Important</h2>
              <p style={styles.sectionText}>
                Le crédit d’impôt s’applique selon la réglementation en vigueur
                et selon l’éligibilité des prestations concernées.
              </p>
              <p style={styles.sectionText}>
                Si vous avez un doute, Loko peut vous expliquer simplement le
                principe au moment de la prise de rendez-vous.
              </p>
            </div>
          </div>
        </section>

        <section style={styles.sectionAlt}>
          <div style={styles.containerNarrow}>
            <div style={styles.contactCard}>
              <h2 style={styles.sectionTitle}>
                Besoin d’aide ou d’une précision ?
              </h2>
              <p style={styles.sectionText}>
                Contactez Loko pour savoir comment cela peut s’appliquer à votre
                situation.
              </p>
              <div style={styles.heroButtons}>
                <HoverButton href="tel:+33763131515" variant="primary">
                  Appeler Loko
                </HoverButton>
                <HoverButton href="/rendez-vous" variant="secondary">
                  Prendre rendez-vous
                </HoverButton>
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
function StickyActionBar({ pageType = "default" }) {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 280);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  const subtitle =
    pageType === "problem"
      ? "Un appel suffit souvent pour débloquer la situation"
      : "Besoin d’aide à domicile aux Sables d’Olonne ?";

  return (
    <div
      style={{
        ...styles.stickyActionWrap,
        ...(isMobile ? styles.stickyActionWrapMobile : {}),
      }}
    >
      <div
        style={{
          ...styles.stickyActionBar,
          ...(isMobile ? styles.stickyActionBarMobile : {}),
        }}
      >
        {!isMobile && (
          <div style={styles.stickyActionText}>
            <div style={styles.stickyActionTitle}>Loko</div>
            <div style={styles.stickyActionSubtitle}>{subtitle}</div>
          </div>
        )}

        <div
          style={{
            ...styles.stickyActionButtons,
            ...(isMobile ? styles.stickyActionButtonsMobile : {}),
          }}
        >
          <HoverButton
            href="tel:+33763131515"
            baseStyle={{
              ...styles.stickyCallButton,
              ...(isMobile ? styles.stickyCallButtonMobile : {}),
            }}
            hoverStyle={styles.stickyCallButtonHover}
          >
            Appeler
          </HoverButton>

          <HoverButton
            href="/rendez-vous"
            baseStyle={{
              ...styles.stickyBookingButton,
              ...(isMobile ? styles.stickyBookingButtonMobile : {}),
            }}
            hoverStyle={styles.stickyBookingButtonHover}
          >
            Rendez-vous
          </HoverButton>
        </div>
      </div>
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
                Loko – Assistance numérique à domicile
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
                <li>Adresse pour intervention</li>
                <li>Informations de paiement (via prestataires sécurisés)</li>
                <li>Historique et préférences</li>
              </ul>

              <h2 style={styles.legalArticleTitle}>
                4. Utilisation des données
              </h2>
              <ul style={styles.legalList}>
                <li>Gestion des rendez-vous</li>
                <li>Traitement des paiements</li>
                <li>Envoi de confirmations et factures</li>
                <li>Communication (si consentement)</li>
              </ul>

              <h2 style={styles.legalArticleTitle}>5. Stockage et partage</h2>
              <p style={styles.legalText}>
                Données stockées en Europe, uniquement partagées avec des outils
                techniques nécessaires.
              </p>

              <h2 style={styles.legalArticleTitle}>6. Durée de conservation</h2>
              <ul style={styles.legalList}>
                <li>Données clients : durée de relation + 2 ans</li>
                <li>Facturation : 10 ans</li>
                <li>Cookies : 13 mois</li>
              </ul>

              <h2 style={styles.legalArticleTitle}>7. Vos droits</h2>
              <ul style={styles.legalList}>
                <li>Accès</li>
                <li>Rectification</li>
                <li>Suppression</li>
                <li>Portabilité</li>
              </ul>
              <p style={styles.legalText}>Contact : rdvloko@gmail.com</p>

              <h2 style={styles.legalArticleTitle}>8. Cookies</h2>
              <p style={styles.legalText}>
                Utilisés pour le fonctionnement du site et les statistiques.
              </p>

              <h2 style={styles.legalArticleTitle}>9. Sécurité</h2>
              <p style={styles.legalText}>
                Données protégées via chiffrement SSL et accès restreint.
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
function RendezVousPage() {
  return (
    <div style={styles.page}>
      <SiteHeader />

      <main>
        <section style={styles.heroSection}>
          <div style={styles.containerNarrow}>
            <h1 style={styles.heroTitle}>Prendre rendez-vous</h1>

            <p style={styles.heroText}>
              Choisissez la méthode la plus simple pour contacter Loko.
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

                <form
                  action="https://formspree.io/f/mjgjkbjo"
                  method="POST"
                  style={styles.form}
                >
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
                    <option value="Château d’Olonne" />
                    <option value="L’Île d’Olonne" />
                    <option value="La Roche-sur-Yon" />
                    <option value="Talmont-Saint-Hilaire" />
                  </datalist>
                  <textarea
                    name="message"
                    placeholder="Expliquez votre besoin"
                    required
                    style={styles.textarea}
                  />

                  <button type="submit" style={styles.submitButton}>
                    Envoyer la demande
                  </button>
                </form>
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
  const links = [
    { href: "/", title: "Accueil", text: "Page principale de Loko." },
    {
      href: "/rendez-vous",
      title: "Prendre rendez-vous",
      text: "Appeler, choisir un créneau ou envoyer une demande.",
    },
    {
      href: "/probleme-wifi-internet-les-sables-dolonne",
      title: "Problème Wi-Fi / Internet",
      text: "Aide à domicile pour box, Wi-Fi, réseau et connexion.",
    },
    {
      href: "/probleme-internet-les-sables-dolonne",
      title: "Problème Internet",
      text: "Aide à domicile pour les coupures Internet, les box sans connexion et les accès réseau indisponibles.",
    },
    {
      href: "/wifi-ne-fonctionne-plus-les-sables-dolonne",
      title: "Wi-Fi ne fonctionne plus",
      text: "Aide à domicile si le Wi-Fi ne fonctionne plus ou si la connexion est impossible.",
    },
    {
      href: "/installation-box-internet-les-sables-dolonne",
      title: "Installation box Internet",
      text: "Aide à domicile pour installer une box et connecter les appareils.",
    },
    {
      href: "/transfert-donnees-telephone-les-sables-dolonne",
      title: "Transfert de données téléphone",
      text: "Aide à domicile pour transférer photos, contacts et applications.",
    },
    {
      href: "/changement-telephone-les-sables-dolonne",
      title: "Changement de téléphone",
      text: "Aide à domicile pour repartir sur un nouveau téléphone sans stress.",
    },
    {
      href: "/wifi-lent-les-sables-dolonne",
      title: "Wi-Fi lent",
      text: "Aide à domicile pour les lenteurs Wi-Fi, les coupures et les problèmes de couverture réseau.",
    },
    {
      href: "/ordinateur-lent-les-sables-dolonne",
      title: "Ordinateur lent",
      text: "Aide à domicile si votre ordinateur devient trop lent, rame ou bloque au quotidien.",
    },
    {
      href: "/imprimante-ne-fonctionne-plus-les-sables-dolonne",
      title: "Imprimante qui ne fonctionne plus",
      text: "Aide à domicile pour reconnecter ou remettre en route une imprimante bloquée.",
    },
    {
      href: "/aide-smartphone-les-sables-dolonne",
      title: "Aide smartphone",
      text: "Réglages, stockage, transfert de données et accompagnement.",
    },
    {
      href: "/depannage-ordinateur-les-sables-dolonne",
      title: "Dépannage ordinateur",
      text: "Aide du quotidien sur ordinateur, mails, imprimante et fichiers.",
    },
    {
      href: "/probleme-tv-box-les-sables-dolonne",
      title: "TV & box",
      text: "Installation, connexion, applications et accompagnement.",
    },
    {
      href: "/transfert-de-donnees-les-sables-dolonne",
      title: "Transfert de données",
      text: "Migration de téléphone ou d’ordinateur en douceur.",
    },
    {
      href: "/apprendre-le-numerique-les-sables-dolonne",
      title: "Apprendre le numérique",
      text: "Accompagnement à domicile pour apprendre à utiliser les outils numériques du quotidien.",
    },
    {
      href: "/apprendre-ia-les-sables-dolonne",
      title: "Découverte de l’IA",
      text: "Comprendre et utiliser l’intelligence artificielle simplement.",
    },
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
      href: "/probleme-tv-les-sables-dolonne",
      title: "TV qui ne fonctionne plus",
      text: "Aide à domicile si votre télévision affiche un écran noir, aucun signal ou un problème de source.",
    },
    {
      href: "/probleme-box-tv-les-sables-dolonne",
      title: "Problème box TV",
      text: "Aide à domicile pour une box TV bloquée, un décodeur qui bug ou des chaînes indisponibles.",
    },
    {
      href: "/netflix-ne-fonctionne-plus-les-sables-dolonne",
      title: "Netflix ne fonctionne plus",
      text: "Aide à domicile si Netflix ne se lance plus, bug ou fonctionne mal sur votre installation.",
    },
    {
      href: "/formation-windows-les-sables-dolonne",
      title: "Apprendre à utiliser un ordinateur Windows",
      text: "Accompagnement à domicile pour apprendre à utiliser un PC Windows simplement.",
    },
    {
      href: "/formation-macbook-les-sables-dolonne",
      title: "Apprendre à utiliser un MacBook",
      text: "Accompagnement à domicile pour apprendre à utiliser un MacBook simplement.",
    },
    {
      href: "/formation-smartphone-les-sables-dolonne",
      title: "Apprendre à utiliser un smartphone",
      text: "Accompagnement à domicile pour apprendre à mieux utiliser son téléphone au quotidien.",
    },
    {
      href: "/apprendre-internet-les-sables-dolonne",
      title: "Apprendre à utiliser Internet",
      text: "Accompagnement à domicile pour comprendre la navigation et les usages du web.",
    },
    {
      href: "/apprendre-mails-les-sables-dolonne",
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
                  key={link.href}
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

function HoverLink({ href, children, baseStyle, hoverStyle, target, rel }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      style={{
        ...baseStyle,
        ...(isHovered ? hoverStyle : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </a>
  );
}

function HoverButton({
  href,
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

  return (
    <a
      href={href}
      style={{
        ...resolvedBaseStyle,
        ...(isHovered ? resolvedHoverStyle : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </a>
  );
}

function LinkCard({ href, title, text }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      style={{
        ...styles.linkCard,
        ...(isHovered ? styles.linkCardHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3
        style={{
          ...styles.cardTitle,
          ...(isHovered ? styles.cardTitleHover : {}),
        }}
      >
        {title}
      </h3>

      <p
        style={{
          ...styles.cardText,
          ...(isHovered ? styles.cardTextHover : {}),
        }}
      >
        {text}
      </p>
    </a>
  );
}
function SearchSuggestionLink({ href, title }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      style={{
        ...styles.searchSuggestionItem,
        ...(isHovered ? styles.searchSuggestionItemHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        style={{
          ...styles.searchSuggestionLabel,
          ...(isHovered ? styles.searchSuggestionLabelHover : {}),
        }}
      >
        {title}
      </span>

      <span
        style={{
          ...styles.searchSuggestionArrow,
          ...(isHovered ? styles.searchSuggestionArrowHover : {}),
        }}
      >
        →
      </span>
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

function FooterContactCard({ title, value, href }) {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <>
      <div style={styles.footerContactTitle}>{title}</div>
      <div style={styles.footerContactValue}>{value}</div>
    </>
  );

  if (!href) {
    return <div style={styles.footerContactCard}>{content}</div>;
  }

  return (
    <a
      href={href}
      style={{
        ...styles.footerContactCard,
        ...(isHovered ? styles.footerContactCardHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {content}
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

function SiteFooter() {
  const isMobile = useIsMobile();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div
          style={{
            ...styles.footerBottomGrid,
            ...(isMobile ? styles.footerBottomGridMobile : {}),
          }}
        >
          <div
            style={{
              ...styles.footerBrandBlock,
              ...(isMobile ? styles.footerBrandBlockMobile : {}),
            }}
          >
            <div
              style={{
                ...styles.footerLogoBox,
                ...(isMobile ? styles.footerLogoBoxMobile : {}),
              }}
            >
              <img
                src="/logo-loko-footer.png"
                alt="Logo Loko"
                style={{
                  ...styles.footerLogoImage,
                  ...(isMobile ? styles.footerLogoImageMobile : {}),
                }}
              />
            </div>

            <p
              style={{
                ...styles.footerBrandText,
                ...(isMobile ? styles.footerBrandTextMobile : {}),
              }}
            >
              Assistance numérique à domicile aux Sables d’Olonne. Internet,
              Wi-Fi, smartphone, ordinateur, TV, transfert de données et
              découverte de l’IA.
            </p>
          </div>

          <div
            style={{
              ...styles.footerSideColumn,
              ...(isMobile ? styles.footerSideColumnMobile : {}),
            }}
          >
            <div style={styles.footerPanel}>
              <div style={styles.footerPanelTitle}>
                📱 Suivez-nous sur nos réseaux
              </div>
              <div
                style={{
                  ...styles.socialRow,
                  ...(isMobile ? styles.socialRowMobile : {}),
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
                  href="https://www.linkedin.com/company/110110832/admin/dashboard/"
                  label="LinkedIn Loko"
                >
                  <LinkedInIcon />
                </FooterSocialLink>
              </div>
            </div>

            <div style={styles.footerPanel}>
              <div style={styles.footerPanelTitle}>Plan du site</div>
              <div
                style={{
                  ...styles.footerLinkList,
                  ...(isMobile ? styles.footerLinkListMobile : {}),
                }}
              >
                <HoverLink
                  href="/plan-du-site"
                  baseStyle={{
                    ...styles.footerLink,
                    ...(isMobile ? styles.footerLinkMobile : {}),
                  }}
                  hoverStyle={styles.footerLinkHover}
                >
                  Plan du site
                </HoverLink>
                <HoverLink
                  href="/cgv"
                  baseStyle={{
                    ...styles.footerLink,
                    ...(isMobile ? styles.footerLinkMobile : {}),
                  }}
                  hoverStyle={styles.footerLinkHover}
                >
                  CGV
                </HoverLink>
                <HoverLink
                  href="/politique-confidentialite"
                  baseStyle={{
                    ...styles.footerLink,
                    ...(isMobile ? styles.footerLinkMobile : {}),
                  }}
                  hoverStyle={styles.footerLinkHover}
                >
                  Politique de confidentialité
                </HoverLink>
                <HoverLink
                  href="/mentions-legales"
                  baseStyle={{
                    ...styles.footerLink,
                    ...(isMobile ? styles.footerLinkMobile : {}),
                  }}
                  hoverStyle={styles.footerLinkHover}
                >
                  Mentions légales
                </HoverLink>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            ...styles.footerLegalBar,
            ...(isMobile ? styles.footerLegalBarMobile : {}),
          }}
        >
          <span>© {new Date().getFullYear()} Loko — Tous droits réservés</span>
          <span style={styles.footerLegalDot}>•</span>
          <span>Service local d’assistance numérique à domicile</span>
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  const isMobile = useIsMobile();
  const services = [
    {
      title: "Internet & Wi-Fi",
      text: "Connexion instable, Wi-Fi lent ou box à installer : on remet tout en place simplement à domicile.",
      href: "/probleme-wifi-internet-les-sables-dolonne",
    },
    {
      title: "Smartphone",
      text: "Téléphone difficile à utiliser, stockage plein ou réglages compliqués : on vous accompagne pas à pas.",
      href: "/aide-smartphone-les-sables-dolonne",
    },
    {
      title: "Ordinateur",
      text: "Ordinateur lent, mails, fichiers ou imprimante : on simplifie votre usage au quotidien.",
      href: "/depannage-ordinateur-les-sables-dolonne",
    },
    {
      title: "TV & appareils connectés",
      text: "TV, box ou applications qui ne fonctionnent plus : on remet tout en marche sans prise de tête.",
      href: "/probleme-tv-box-les-sables-dolonne",
    },
    {
      title: "Données & transferts",
      text: "Changement d’appareil ou peur de perdre vos données : on sécurise et transfère tout pour vous.",
      href: "/transfert-de-donnees-les-sables-dolonne",
    },
    {
      title: "Apprendre le numérique",
      text: "Ordinateur, smartphone, Internet ou IA : apprenez simplement, à votre rythme, chez vous.",
      href: "/apprendre-le-numerique-les-sables-dolonne",
    },
  ];

  const plans = [
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
  const [search, setSearch] = useState("");
  const [isSearchButtonHovered, setIsSearchButtonHovered] = useState(false);

  const normalizedSearch = search.toLowerCase().trim();

  const searchSuggestions = normalizedSearch
    ? searchData.filter((item) =>
        item.keywords.some(
          (keyword) =>
            keyword.toLowerCase().includes(normalizedSearch) ||
            normalizedSearch.includes(keyword.toLowerCase())
        )
      )
    : [];

  const handleSearch = () => {
    if (searchSuggestions.length > 0) {
      window.location.href = searchSuggestions[0].href;
    } else {
      window.location.href = "/rendez-vous";
    }
  };

  return (
    <div style={styles.page}>
      <SiteHeader />

      <main>
        <section style={styles.heroSection}>
          <div style={styles.container}>
            <div style={styles.heroGrid}>
              <div>
                <div style={styles.badge}>
                  Les Sables d’Olonne • Local • Clair • Humain
                </div>
                <a
                  href="https://www.google.com/search?q=Loko&stick=H4sIAAAAAAAA_-NgU1I1qLAwTExMSkuyTDIzNzQzMjK2MqiwNDK1TE1OSzMySjY0NUtLXsTK4pOfnQ8AyoacgzAAAAA&hl=fr&mat=CTj3n5wFSPq0ElYBTVDHntshTo7_URKAUzU5zj2B4-AIA8kRvNgcDs-cUvm1CYS6L90-9Cm6Bmkfg36yo5DnjpvxYitSupE6LaoX2oqvS8xp_bUQ0-GurVep4rvm6xJZ7Q&authuser=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.socialProofBox}
                >
                  <span style={styles.socialProofStars}>⭐️⭐️⭐️⭐️⭐️</span>
                  <span style={styles.socialProofText}>30 avis</span>
                </a>
                <h1 style={styles.heroTitle}>
                  Assistance numérique à domicile aux Sables d’Olonne.
                </h1>
                <p style={styles.heroText}>
                  Loko est un service d’assistance numérique à domicile aux
                  Sables d’Olonne. Nous vous aidons avec Internet, le Wi-Fi, les
                  smartphones, les ordinateurs, la télévision et les transferts
                  de données.
                </p>

                <div style={styles.heroButtons}>
                  <HoverButton href="/rendez-vous" variant="primary">
                    Prendre rendez-vous
                  </HoverButton>
                  <HoverButton href="#services" variant="secondary">
                    Voir les services
                  </HoverButton>
                </div>
              </div>

              <div style={styles.heroCard}>
                <div style={styles.heroCardGrid}>
                  {[
                    {
                      label: "Box Internet",
                      href: "/installation-box-internet-les-sables-dolonne",
                    },
                    {
                      label: "Télévision",
                      href: "/probleme-tv-box-les-sables-dolonne",
                    },
                    {
                      label: "Smartphone",
                      href: "/aide-smartphone-les-sables-dolonne",
                    },
                    {
                      label: "Ordinateur",
                      href: "/depannage-ordinateur-les-sables-dolonne",
                    },
                    {
                      label: "Transfert de données",
                      href: "/transfert-de-donnees-les-sables-dolonne",
                    },
                    {
                      label: "Aide à l’utilisation",
                      href: "/apprendre-le-numerique-les-sables-dolonne", // 🔥 NOUVELLE PAGE MÈRE
                    },
                    {
                      label: "Formation numérique",
                      href: "/apprendre-le-numerique-les-sables-dolonne", // 🔥 PAGE MÈRE aussi
                    },
                    {
                      label: "Comprendre l’IA",
                      href: "/apprendre-ia-les-sables-dolonne", // 👈 PAGE FILLE
                    },
                  ].map((item) => (
                    <HoverLink
                      key={item.label}
                      href={item.href}
                      baseStyle={styles.miniCard}
                      hoverStyle={styles.miniCardHover}
                    >
                      {item.label}
                    </HoverLink>
                  ))}
                </div>
                <div style={styles.promiseBox}>
                  <div style={styles.promiseLabel}>Promesse Loko</div>
                  <div style={styles.promiseText}>
                    Vous aider, vous expliquer, vous rendre autonome.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.searchSection}>
          <div style={styles.container}>
            <div
              style={{
                ...styles.searchPanel,
                ...(isMobile ? styles.searchPanelMobile : {}),
              }}
            >
              <p
                style={{
                  ...styles.searchHelper,
                  ...(isMobile ? styles.searchHelperMobile : {}),
                }}
              >
                Décrivez votre problème pour trouver la bonne page.
              </p>

              <div
                style={{
                  ...styles.searchBox,
                  ...(isMobile ? styles.searchBoxMobile : {}),
                }}
              >
                <input
                  type="text"
                  placeholder="Ex : mon Wi-Fi est lent, mon imprimante ne marche plus..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  style={{
                    ...styles.searchInput,
                    ...(isMobile ? styles.searchInputMobile : {}),
                  }}
                />
                <button
                  onClick={handleSearch}
                  onMouseEnter={() =>
                    !isMobile && setIsSearchButtonHovered(true)
                  }
                  onMouseLeave={() => setIsSearchButtonHovered(false)}
                  style={{
                    ...styles.searchButton,
                    ...(isMobile ? styles.searchButtonMobile : {}),
                    ...(isSearchButtonHovered && !isMobile
                      ? styles.searchButtonHover
                      : {}),
                  }}
                >
                  Rechercher
                </button>
              </div>

              {searchSuggestions.length > 0 ? (
                <div style={styles.searchSuggestions}>
                  {searchSuggestions.slice(0, 4).map((item) => (
                    <SearchSuggestionLink
                      key={item.href}
                      href={item.href}
                      title={item.title}
                    />
                  ))}
                </div>
              ) : search.trim() ? (
                <div style={styles.searchNoResult}>
                  Aucune page exacte trouvée. Vous pouvez aussi prendre
                  rendez-vous directement.
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section id="services" style={styles.sectionAlt}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>
              Des solutions concrètes pour vos appareils du quotidien
            </h2>
            <p style={styles.sectionText}>
              Loko intervient à domicile pour résoudre les blocages numériques
              les plus fréquents et vous accompagner pas à pas.
            </p>
            <div style={styles.cardGrid}>
              {services.map((card) => (
                <LinkCard
                  key={card.title}
                  href={card.href}
                  title={card.title}
                  text={card.text}
                />
              ))}
            </div>
          </div>
        </section>

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
                  href="/credit-impot"
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
                  href="/rendez-vous"
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
          </div>
        </section>

        <section id="qui-suis-je" style={styles.section}>
          <div style={styles.container}>
            <div style={styles.aboutGrid}>
              <div style={styles.aboutPhotoCard}>
                <img
                  src="/luderic-loko.jpg"
                  alt="Ludéric, fondateur de Loko"
                  style={styles.aboutPhoto}
                />
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
                    "Explications claires et sans jargon",
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

        <section id="contact" style={styles.section}>
          <div style={styles.container}>
            <div style={styles.contactBox}>
              <div>
                <h2 style={styles.sectionTitle}>Besoin d’aide ?</h2>
                <p style={styles.sectionText}>
                  Loko intervient localement pour vous aider à mieux comprendre
                  et utiliser vos appareils numériques à domicile.
                </p>
                <p style={styles.contactMuted}>
                  Intervention à domicile aux Sables d’Olonne, Olonne-sur-Mer,
                  Château d’Olonne et alentours.
                </p>
              </div>
              <div style={styles.contactCard}>
                <div style={styles.contactLabel}>Téléphone</div>
                <div style={styles.contactValue}>07 63 13 15 15</div>
                <div style={styles.contactLabel}>Email</div>
                <div style={styles.contactValue}>rdvloko@gmail.com</div>
                <div style={styles.contactLabel}>Disponibilité</div>
                <div style={styles.contactValue}>Sur rendez-vous</div>
                <HoverButton href="tel:+33763131515" variant="primary">
                  Appeler Loko
                </HoverButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <CookieBanner />
      <StickyActionBar pageType="home" />
    </div>
  );
}

function ProblemPage({ page }) {
  const isMobile = useIsMobile();

  return (
    <div style={styles.page}>
      <SiteHeader />

      <main>
        <section style={styles.heroSection}>
          <div style={styles.container}>
            <div
              style={{
                ...styles.problemHeroGrid,
                ...(isMobile ? styles.problemHeroGridMobile : {}),
              }}
            >
              <div>
                <HoverLink
                  href="/"
                  baseStyle={styles.backLink}
                  hoverStyle={styles.backLinkHover}
                >
                  ← Retour à l’accueil
                </HoverLink>

                <div style={styles.badge}>
                  {page.title} • Les Sables d’Olonne
                </div>

                <h1 style={styles.heroTitle}>{page.hero}</h1>
                <p style={styles.heroText}>{page.intro}</p>

                <p style={styles.sectionText}>
                  À domicile, simplement, avec des explications claires et une
                  approche humaine.
                </p>

                <div style={styles.heroButtons}>
                  <HoverButton href="tel:+33763131515" variant="primary">
                    Appeler Loko
                  </HoverButton>
                  <HoverButton href="/rendez-vous" variant="secondary">
                    Prendre rendez-vous
                  </HoverButton>
                </div>
              </div>

              {page.relatedPages?.length ? (
                <div style={styles.problemHeroSideCard}>
                  <div style={styles.problemHeroSideLabel}>Cas proches</div>
                  <div style={styles.problemHeroSideTitle}>
                    Peut-être que votre besoin ressemble plutôt à ça
                  </div>

                  <div style={styles.problemHeroSideList}>
                    {page.relatedPages.map((item) => (
                      <CompactLinkCard
                        key={item.href}
                        href={item.href}
                        title={item.title}
                        text={item.text}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.problemSplitWrap}>
            <div
              style={{
                ...styles.problemGrid,
                ...(isMobile ? styles.problemGridMobile : {}),
              }}
            >
              <div style={styles.problemLeftCol}>
                <div style={styles.problemEyebrowLeft}>
                  Situations fréquentes
                </div>

                <h2 style={styles.problemLeftTitle}>
                  Ce que vous vivez peut ressembler à ça
                </h2>

                <div style={styles.problemSymptomsList}>
                  {page.symptoms.map((item) => (
                    <div key={item} style={styles.problemSymptomRow}>
                      <span style={styles.problemBullet}>•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.problemRightCol}>
                <div style={styles.problemEyebrowRight}>
                  Comment Loko intervient
                </div>

                <h2 style={styles.problemRightTitle}>
                  Comment Loko peut vous aider
                </h2>

                <p style={styles.sectionText}>
                  Le but n’est pas juste de “faire fonctionner”, mais de
                  remettre les choses au clair et de vous simplifier la vie.
                </p>

                <div style={styles.problemHelpList}>
                  {page.help.map((item, index) => (
                    <div key={item} style={styles.problemHelpCard}>
                      <div style={styles.problemHelpIcon}>
                        {index === 0 && "⌂"}
                        {index === 1 && "◔"}
                        {index === 2 && "↗"}
                        {index === 3 && "✓"}
                        {index === 4 && "⋯"}
                      </div>

                      <div style={styles.problemHelpText}>{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.containerNarrow}>
            <div
              style={{
                ...styles.quickActionCard,
                ...(isMobile ? styles.quickActionCardMobile : {}),
              }}
            >
              <div style={styles.quickActionEyebrow}>Passage à l’action</div>

              <h2 style={styles.quickActionTitle}>
                Vous voulez aller au plus simple ?
              </h2>

              <p style={styles.quickActionText}>
                Le plus rapide est souvent d’appeler directement Loko pour
                expliquer votre situation et voir tout de suite la meilleure
                solution.
              </p>

              <div style={styles.quickActionPoints}>
                <div style={styles.quickActionPoint}>
                  • Échange direct et simple
                </div>
                <div style={styles.quickActionPoint}>
                  • Intervention à domicile
                </div>
                <div style={styles.quickActionPoint}>
                  • Réponse claire, sans jargon
                </div>
              </div>

              <div style={styles.heroButtons}>
                <HoverButton href="tel:+33763131515" variant="primary">
                  Appeler maintenant
                </HoverButton>
                <HoverButton href="/rendez-vous" variant="secondary">
                  Choisir un créneau
                </HoverButton>
              </div>
            </div>
          </div>
        </section>

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
      </main>

      <SiteFooter />
      <CookieBanner />
      <StickyActionBar pageType="home" />
    </div>
  );
}

function CompactLinkCard({ href, title, text }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      style={{
        ...styles.compactLinkCard,
        ...(isHovered ? styles.compactLinkCardHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          ...styles.compactLinkCardTitle,
          ...(isHovered ? styles.compactLinkCardTitleHover : {}),
        }}
      >
        {title}
      </div>

      <div
        style={{
          ...styles.compactLinkCardText,
          ...(isHovered ? styles.compactLinkCardTextHover : {}),
        }}
      >
        {text}
      </div>
    </a>
  );
}

function SiteHeader() {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div
          style={{
            ...styles.headerInner,
            ...(isMobile ? styles.headerInnerMobile : {}),
          }}
        >
          <div style={isMobile ? styles.headerLogoZoneMobile : {}}>
            <SiteLogo />
          </div>
          <nav
            style={{
              ...styles.nav,
              ...(isMobile ? styles.navMobile : {}),
            }}
          >
            <HoverLink
              href="/#services"
              baseStyle={{
                ...styles.navLink,
                ...(isMobile ? styles.navLinkMobile : {}),
              }}
              hoverStyle={styles.navLinkHover}
            >
              Services
            </HoverLink>
            <HoverLink
              href="/#tarifs"
              baseStyle={{
                ...styles.navLink,
                ...(isMobile ? styles.navLinkMobile : {}),
              }}
              hoverStyle={styles.navLinkHover}
            >
              Tarifs
            </HoverLink>
            <HoverLink
              href="/#qui-suis-je"
              baseStyle={{
                ...styles.navLink,
                ...(isMobile ? styles.navLinkMobile : {}),
              }}
              hoverStyle={styles.navLinkHover}
            >
              Qui suis-je ?
            </HoverLink>

            <HoverLink
              href="/#contact"
              baseStyle={{
                ...styles.navLink,
                ...(isMobile ? styles.navLinkMobile : {}),
              }}
              hoverStyle={styles.navLinkHover}
            >
              Contact
            </HoverLink>
          </nav>
          {/* 👉 CTA */}
          <a
            href="tel:+33763131515"
            style={{
              ...styles.headerCTA,
              ...(isMobile ? styles.headerCTAMobile : {}),
              ...(isHovered ? styles.headerCTAHover : {}),
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            📞 Appeler Loko
          </a>
        </div>
      </div>
    </header>
  );
}
function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const cookieChoice = localStorage.getItem("loko-cookie-consent");

    if (!cookieChoice) {
      setIsVisible(true);
    }
  }, []);

  const handleChoice = (choice) => {
    localStorage.setItem("loko-cookie-consent", choice);
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
            Loko utilise des cookies pour assurer le bon fonctionnement du site
            et mesurer sa fréquentation. Vous pouvez accepter ou refuser leur
            utilisation.
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
    background: "#050505",
    color: "#f5f5f5",
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
    background: "rgba(5,5,5,0.82)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 16,
  },

  input: {
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "#050505",
    color: "#fff",
    fontSize: 14,
  },

  textarea: {
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "#050505",
    color: "#fff",
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
    color: "#050505",
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
    color: "#3b82f6",
    marginBottom: 8,
    fontWeight: 700,
  },

  taxHighlightMain: {
    fontSize: "clamp(24px, 4vw, 38px)",
    lineHeight: 1.05,
    letterSpacing: "-0.04em",
    fontWeight: 800,
    color: "#050505",
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
      "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.025) 100%)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.22)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  },

  taxHeroCard: {
    background: "#ffffff",
    color: "#050505",
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
    background: "rgba(255,255,255,0.015)",
    border: "1px solid rgba(255,255,255,0.08)",
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
    color: "rgba(255,255,255,0.65)",
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
    color: "#050505",
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
      "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 28,
    padding: 24,
  },

  creditButton: {
    padding: "14px 20px",
    borderRadius: 12,
    background: "#111",
    border: "2px solid #111",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },

  creditButtonHover: {
    background: "#000",
    border: "2px solid #000",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.18)",
  },

  submitButton: {
    marginTop: 10,
    padding: "12px",
    borderRadius: 14,
    border: "none",
    background: "#ffffff",
    color: "#050505",
    fontWeight: 700,
    cursor: "pointer",
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
    border: "1px solid rgba(255,255,255,0.18)",
  },

  searchSuggestionItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: "14px 16px",
    borderRadius: 16,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    textDecoration: "none",
    color: "#ffffff",
    transition: "all 0.22s ease",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  },

  searchSuggestionItemHover: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.16)",
    transform: "translateY(-2px)",
    boxShadow: "0 14px 32px rgba(0,0,0,0.24)",
  },

  searchSuggestionLabel: {
    fontSize: 15,
    lineHeight: 1.5,
    color: "rgba(255,255,255,0.88)",
    transition: "color 0.22s ease",
  },

  searchSuggestionLabelHover: {
    color: "#ffffff",
  },

  searchSuggestionArrow: {
    fontSize: 18,
    color: "rgba(255,255,255,0.45)",
    transition: "all 0.22s ease",
  },
  problemEyebrowLeft: {
    fontSize: "0.82rem",
    fontWeight: 800,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "rgba(255,95,95,0.92)",
    marginBottom: "14px",
  },
  searchButtonHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 14px 35px rgba(255,255,255,0.12)",
  },

  problemEyebrowRight: {
    fontSize: "0.82rem",
    fontWeight: 800,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "rgba(110,255,150,0.92)",
    marginBottom: "14px",
  },

  problemRightTitle: {
    fontSize: "clamp(1.8rem, 2.3vw, 2.6rem)",
    fontWeight: 800,
    lineHeight: 1.06,
    letterSpacing: "-0.02em",
    color: "rgba(240,255,245,0.98)",
    margin: "0 0 16px 0",
  },

  searchSuggestionArrowHover: {
    color: "#ffffff",
    transform: "translateX(4px)",
  },

  searchHelper: {
    margin: "0 0 16px 0",
    fontSize: "0.98rem",
    lineHeight: 1.5,
    color: "rgba(255,255,255,0.82)",
    textAlign: "center",
  },

  searchNoResult: {
    marginTop: 12,
    padding: "12px 14px",
    borderRadius: 14,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.7)",
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
    color: "rgba(255,255,255,0.55)",
    marginBottom: "14px",
  },

  faqTitle: {
    fontSize: "clamp(1.9rem, 2.8vw, 2.9rem)",
    fontWeight: 800,
    lineHeight: 1.08,
    letterSpacing: "-0.02em",
    color: "#fff",
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
    background: "rgba(10,10,10,0.92)",
    border: "1px solid rgba(255,255,255,0.08)",
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
    color: "#fff",
    fontSize: 15,
    fontWeight: 800,
    lineHeight: 1.1,
  },

  stickyActionSubtitle: {
    color: "rgba(255,255,255,0.72)",
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
    border: "1px solid rgba(255,255,255,0.14)",
    background: "#ffffff",
    color: "#050505",
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
    background: "#ffffff",
    border: "1px solid rgba(255,255,255,0.14)",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(255,255,255,0.14)",
  },

  stickyBookingButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 16px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "transparent",
    color: "#ffffff",
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
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.22)",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.18)",
  },

  faqIntro: {
    fontSize: "1.06rem",
    lineHeight: 1.75,
    color: "rgba(255,255,255,0.78)",
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
      "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.02))",
    border: "1px solid rgba(255,255,255,0.08)",
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
    color: "rgba(110,255,150,0.95)",
    background: "rgba(110,255,150,0.08)",
    border: "1px solid rgba(110,255,150,0.16)",
  },

  faqContent: {
    minWidth: 0,
  },

  faqQuestionEnhanced: {
    fontSize: "1.15rem",
    fontWeight: 700,
    lineHeight: 1.45,
    color: "#fff",
    margin: "0 0 10px 0",
  },

  faqAnswer: {
    fontSize: "1rem",
    lineHeight: 1.75,
    color: "rgba(255,255,255,0.78)",
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
      "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
    border: "1px solid rgba(255,255,255,0.08)",
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
      "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
    border: "1px solid rgba(255,255,255,0.08)",
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
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.035)",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    boxSizing: "border-box",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
  },

  searchButton: {
    minHeight: 54,
    padding: "0 22px",
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "#ffffff",
    color: "#050505",
    fontWeight: 800,
    fontSize: "0.98rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 10px 30px rgba(255,255,255,0.08)",
  },

  aboutPoint: {
    color: "rgba(255,255,255,0.84)",
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
      "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: `
      0 0 0 1px rgba(255,255,255,0.03),
      0 14px 40px rgba(0,0,0,0.20),
      0 0 60px rgba(120,255,165,0.05)
    `,
    textAlign: "left",
  },

  quickActionEyebrow: {
    fontSize: "0.82rem",
    fontWeight: 800,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "rgba(110,255,150,0.92)",
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
    color: "#fff",
    margin: "0 0 16px 0",
  },

  quickActionText: {
    fontSize: "1.08rem",
    lineHeight: 1.75,
    color: "rgba(255,255,255,0.82)",
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
    color: "rgba(255,255,255,0.92)",
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
    filter: "drop-shadow(0 0 12px rgba(255,255,255,0.12))",
  },
  logo: {
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: "-0.03em",
  },
  headerCTA: {
    background: "#ffffff",
    color: "#050505",
    textDecoration: "none",
    padding: "10px 16px",
    borderRadius: 14,
    fontWeight: 700,
    fontSize: 14,
    border: "1px solid rgba(255,255,255,0.12)",
    transition: "all 0.25s ease",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(255,255,255,0.15)",
  },
  headerCTAHover: {
    transform: "translateY(-2px) scale(1.03)",
    boxShadow: "0 12px 30px rgba(255,255,255,0.25)",
    background: "#f4f4f4",
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
    color: "rgba(255,255,255,0.62)",
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
    color: "#3b82f6",
    fontWeight: 800,
  },
  nav: {
    display: "flex",
    gap: 18,
    alignItems: "center",
  },
  taxPriceInlineBlue: {
    color: "#3b82f6",
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
    color: "#ffffff",
    background: "rgba(255,255,255,0.08)",
    boxShadow: "0 0 0 1px rgba(255,255,255,0.08)",
  },
  n: {
    padding: "48px 0 40px",
  },
  cardTitleHover: {
    color: "#050505",
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
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "rgba(255,255,255,0.78)",
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
    color: "rgba(255,255,255,0.74)",
    fontSize: 18,
    lineHeight: 1.75,
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
    background: "#ffffff",
    color: "#050505",
    textDecoration: "none",
    borderRadius: 18,
    padding: "14px 22px",
    fontWeight: 700,
    border: "1px solid rgba(255,255,255,0.12)",
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
      "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.02) 100%)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 14px 40px rgba(0,0,0,0.18)",
  },

  searchHelperMobile: {
    margin: "0 0 12px 0",
    fontSize: "0.92rem",
    lineHeight: 1.4,
    color: "rgba(255,255,255,0.76)",
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
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.1)",
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
    color: "#050505",
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
    color: "#fff",
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
      "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))",
    border: "1px solid rgba(255,255,255,0.08)",
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
    color: "rgba(255,255,255,0.45)",
    marginBottom: 10,
    fontWeight: 700,
  },

  problemHeroSideTitle: {
    fontSize: 24,
    lineHeight: 1.2,
    fontWeight: 700,
    color: "#ffffff",
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
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,90,90,0.12)",
    borderRadius: "24px",
    boxShadow: `
      0 0 0 1px rgba(255,80,80,0.08),
      0 10px 28px rgba(255,60,60,0.10),
      0 0 60px rgba(255,40,40,0.07)
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
      "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.015))",
    border: "1px solid rgba(90,255,145,0.14)",
    color: "#fff",
    fontSize: "1.02rem",
    lineHeight: 1.5,
    boxShadow: `
      0 0 0 1px rgba(90,255,145,0.06),
      0 8px 24px rgba(0,0,0,0.16),
      0 0 48px rgba(90,255,145,0.08)
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
    color: "rgba(120,255,165,0.95)",
    background: "rgba(90,255,145,0.08)",
    border: "1px solid rgba(90,255,145,0.22)",
    boxShadow: "0 0 24px rgba(90,255,145,0.08)",
  },

  problemHelpText: {
    color: "#fff",
    fontSize: "1.02rem",
    lineHeight: 1.5,
  },
  problemBullet: {
    color: "rgba(255,255,255,0.7)",
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
    color: "rgba(255,255,255,0.88)",
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
    color: "#050505",
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
    background: "#050505",
    color: "#ffffff",
    color: "#ffffff",
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
    color: "#050505",
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
    boxShadow: "0 12px 30px rgba(255,255,255,0.18)",
    background: "#f4f4f4",
  },
  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: 18,
    padding: "14px 22px",
    fontWeight: 600,
    border: "1px solid rgba(255,255,255,0.14)",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
  },
  secondaryButtonHover: {
    transform: "translateY(-2px) scale(1.03)",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.22)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
  },
  heroCard: {
    borderRadius: 28,
    padding: 24,
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
    border: "1px solid rgba(255,255,255,0.08)",
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
    background: "rgba(0,0,0,0.32)",
    border: "1px solid rgba(255,255,255,0.07)",
    color: "rgba(255,255,255,0.88)",
    fontSize: 15,
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    transition: "all 0.25s ease",
    cursor: "pointer",
  },
  miniCardHover: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.16)",
    color: "#ffffff",
    transform: "translateY(-2px)",
    boxShadow: "0 12px 24px rgba(0,0,0,0.28)",
  },
  promiseBox: {
    marginTop: 16,
    padding: 18,
    borderRadius: 20,
    background: "rgba(0,0,0,0.34)",
    border: "1px solid rgba(255,255,255,0.07)",
  },
  promiseLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color: "rgba(255,255,255,0.45)",
  },
  promiseText: {
    fontSize: 22,
    lineHeight: 1.3,
    fontWeight: 600,
    marginTop: 8,
  },
  section: {
    padding: "80px 0",
    borderTop: "1px solid rgba(255,255,255,0.04)",
  },

  sectionAlt: {
    padding: "80px 0",
    background: "rgba(255,255,255,0.015)",
    borderTop: "1px solid rgba(255,255,255,0.04)",
  },
  sectionTitle: {
    fontSize: "clamp(30px, 5vw, 46px)",
    lineHeight: 1.05,
    letterSpacing: "-0.04em",
    margin: 0,
    maxWidth: 760,
  },
  sectionText: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 18,
    lineHeight: 1.8,
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
    background: "#0b0b0b",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 24,
    padding: 22,
  },
  linkCard: {
    background: "#0b0b0b",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 24,
    padding: 22,
    textDecoration: "none",
    color: "inherit",
    display: "block",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
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
    border: "1px solid #ffffff",
    background: "#ffffff",
    color: "#050505",
    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
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
    color: "rgba(255,255,255,0.68)",
    fontSize: 16,
    lineHeight: 1.7,
    marginTop: 12,
  },
  socialProof: {
    marginTop: 10,
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
    letterSpacing: "0.02em",
  },
  legalCard: {
    background: "#0b0b0b",
    border: "1px solid rgba(255,255,255,0.08)",
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
    color: "rgba(255,255,255,0.78)",
    fontSize: 16,
    lineHeight: 1.85,
    marginTop: 0,
    marginBottom: 18,
  },
  legalList: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 16,
    lineHeight: 1.85,
    paddingLeft: 22,
    marginTop: 0,
    marginBottom: 18,
  },
  socialProofBox: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    marginTop: 14,
    padding: "10px 16px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    textDecoration: "none",
    transition: "all 0.25s ease",
    cursor: "pointer",
  },
  socialProofStars: {
    display: "inline-block",
    animation: "lokoStarsGlow 2.2s ease-in-out infinite",
    transformOrigin: "center",
  },

  socialProofText: {
    color: "rgba(255,255,255,0.88)",
  },
  bulletPanel: {
    marginTop: 28,
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 28,
    padding: 24,
  },
  bulletItem: {
    color: "rgba(255,255,255,0.82)",
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
    background: "#0b0b0b",
    border: "1px solid rgba(255,255,255,0.08)",
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
    background: "#0b0b0b",
    border: "1px solid rgba(255,255,255,0.08)",
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
      "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 28,
    padding: 24,
    display: "grid",
    gap: 8,
  },
  contactLabel: {
    color: "rgba(255,255,255,0.46)",
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
    color: "rgba(255,255,255,0.55)",
    marginTop: 14,
    fontSize: 16,
  },
  backLink: {
    display: "inline-block",
    color: "rgba(255,255,255,0.7)",
    textDecoration: "none",
    marginBottom: 22,
    fontSize: 15,
    transition: "all 0.2s ease",
    padding: "6px 10px",
    borderRadius: 10,
    cursor: "pointer",
  },
  backLinkHover: {
    color: "#ffffff",
    background: "rgba(255,255,255,0.08)",
  },

  footer: {
    padding: "60px 0 24px",
    background: "rgba(255,255,255,0.015)",
  },
  footerContactCard: {
    background: "#0b0b0b",
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
    color: "#ffffff",
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
    background: "#000000",
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
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 16,
    color: "#ffffff",
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
    background: "#ffffff",
    border: "1px solid rgba(255,255,255,0.16)",
    boxShadow: "0 14px 32px rgba(0,0,0,0.26)",
  },

  compactLinkCardTitle: {
    fontSize: 18,
    lineHeight: 1.25,
    fontWeight: 700,
    marginBottom: 8,
    color: "#ffffff",
    transition: "color 0.22s ease",
  },

  compactLinkCardTitleHover: {
    color: "#050505",
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
    width: 56,
    height: 56,
    borderRadius: 16,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: "#ffffff",
    background: "#111111",
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
    gap: 12,
  },
  footerLink: {
    color: "rgba(255,255,255,0.78)",
    textDecoration: "none",
    fontSize: 15,
    padding: "8px 10px",
    borderRadius: 10,
    transition: "all 0.2s ease",
    display: "inline-block",
    width: "fit-content",
  },
  footerLinkHover: {
    color: "#ffffff",
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
