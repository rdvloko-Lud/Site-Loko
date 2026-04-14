import React, { useState, useEffect } from "react";
const SITE_URL = "https://lokofr.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image-loko.jpg`;
const DEFAULT_SITE_NAME = "Loko";

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

const problemPages = {
  "/probleme-wifi-internet-les-sables-dolonne": {
    title: "Problème Wi-Fi / Internet",
    seoTitle: "Problème Wi-Fi et Internet aux Sables d’Olonne | Loko",
    seoDescription:
      "Loko vous aide à domicile aux Sables d’Olonne pour les problèmes de Wi-Fi, de box Internet, de coupures réseau et de connexion des appareils.",
    hero: "Un problème de Wi-Fi ou d’Internet à domicile ?",
    intro:
      "Loko intervient à domicile aux Sables d’Olonne pour les coupures Internet, les problèmes de Wi-Fi, les box qui ne fonctionnent plus ou les appareils qui refusent de se connecter.",
    symptoms: [
      "Wi-Fi trop lent ou qui coupe souvent",
      "Box Internet mal installée ou mal configurée",
      "Téléphone, TV ou ordinateur qui ne se connecte plus",
      "Nouveau logement, nouvelle box ou changement d’opérateur",
    ],
    help: [
      "Vérification de la box et du réseau domestique",
      "Connexion des appareils au Wi-Fi",
      "Aide à l’installation et à la remise en service",
      "Explications simples pour éviter les blocages futurs",
    ],
    faq: [
      {
        q: "Est-ce que Loko remplace l’opérateur ?",
        a: "Non. Loko intervient à domicile pour vous aider à installer, comprendre et remettre en route votre environnement numérique. Si le problème vient du réseau opérateur, nous vous aidons à l’identifier plus vite.",
      },
      {
        q: "Intervenez-vous si plusieurs appareils ne se connectent plus ?",
        a: "Oui. C’est justement un cas fréquent : TV, smartphone, imprimante ou ordinateur qui perdent l’accès en même temps après un changement de box ou un souci réseau.",
      },
    ],
  },
  "/aide-smartphone-les-sables-dolonne": {
    title: "Aide smartphone",
    seoTitle: "Aide smartphone à domicile aux Sables d’Olonne | Loko",
    seoDescription:
      "Loko propose une aide smartphone à domicile aux Sables d’Olonne pour les réglages, le stockage, les transferts de données et les difficultés d’utilisation du quotidien.",
    hero: "Besoin d’aide avec votre smartphone ?",
    intro:
      "Loko vous aide à domicile aux Sables d’Olonne pour la prise en main de votre smartphone, les réglages, le stockage, les transferts de données et les difficultés d’utilisation du quotidien.",
    symptoms: [
      "Téléphone trop compliqué à utiliser",
      "Manque de place ou stockage saturé",
      "Besoin de transférer les données vers un nouveau téléphone",
      "Comptes, applications ou réglages mal compris",
    ],
    help: [
      "Réglages de base et accompagnement à l’utilisation",
      "Libération de stockage et organisation simple",
      "Aide au transfert de données",
      "Explications pas à pas pour devenir plus autonome",
    ],
    faq: [
      {
        q: "Pouvez-vous aider pour un nouveau téléphone ?",
        a: "Oui. Mise en service, premiers réglages, récupération des contacts, des photos ou des applications : nous vous accompagnons à domicile.",
      },
      {
        q: "Est-ce adapté si la personne n’est pas à l’aise avec le numérique ?",
        a: "Oui. L’approche Loko est justement pédagogique, claire et progressive.",
      },
    ],
  },
  "/depannage-ordinateur-les-sables-dolonne": {
    title: "Dépannage ordinateur",
    seoTitle: "Dépannage ordinateur à domicile aux Sables d’Olonne | Loko",
    seoDescription:
      "Loko intervient à domicile aux Sables d’Olonne pour l’aide sur ordinateur : mails, fichiers, imprimantes, réglages simples et accompagnement numérique du quotidien.",
    hero: "Votre ordinateur vous bloque au quotidien ?",
    intro:
      "Loko intervient à domicile aux Sables d’Olonne pour les usages du quotidien : mails, fichiers, imprimantes, petites installations, compréhension des bases et remise en route simple.",
    symptoms: [
      "Imprimante qui ne fonctionne plus",
      "Difficultés avec les mails ou les fichiers",
      "Ordinateur mal configuré ou trop compliqué à utiliser",
      "Besoin d’aide pour reprendre la main tranquillement",
    ],
    help: [
      "Aide à l’utilisation courante de l’ordinateur",
      "Connexion d’imprimante et réglages simples",
      "Organisation de fichiers et mails",
      "Accompagnement clair et sans jargon",
    ],
    faq: [
      {
        q: "Loko fait-il du dépannage informatique lourd ?",
        a: "Loko se concentre sur l’assistance numérique à domicile, l’usage quotidien, la remise en route simple et l’accompagnement pédagogique.",
      },
      {
        q: "Pouvez-vous aider une personne âgée avec son ordinateur ?",
        a: "Oui. C’est même un cas très courant : l’objectif est de simplifier et de redonner confiance.",
      },
    ],
  },
  "/probleme-tv-box-les-sables-dolonne": {
    title: "TV & box",
    seoTitle: "Problème TV et box aux Sables d’Olonne | Loko",
    seoDescription:
      "Loko vous aide à domicile aux Sables d’Olonne pour les problèmes de TV, box, décodeur, applications, connexion Internet et installation des équipements.",
    hero: "Votre télévision ou votre box pose problème ?",
    intro:
      "Loko intervient à domicile aux Sables d’Olonne pour les problèmes de télévision, de décodeur, de box, d’applications ou de connexion des équipements connectés.",
    symptoms: [
      "TV non connectée à Internet",
      "Décodeur mal branché ou mal configuré",
      "Applications qui ne fonctionnent pas",
      "Nouvelle télévision ou nouveau logement à configurer",
    ],
    help: [
      "Installation et configuration TV / box / décodeur",
      "Connexion au Wi-Fi et aux applications",
      "Explication du fonctionnement des équipements",
      "Accompagnement simple à domicile",
    ],
    faq: [
      {
        q: "Pouvez-vous installer une nouvelle télévision ?",
        a: "Oui. Loko peut intervenir pour la mise en route, la connexion Internet et la compréhension du fonctionnement général.",
      },
      {
        q: "Et si le problème vient d’un abonnement ou d’un opérateur ?",
        a: "Nous vous aidons à identifier le problème et à remettre en état ce qui peut l’être à domicile.",
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
  "/apprendre-ia-les-sables-dolonne": {
    title: "Découverte de l’IA",
    seoTitle: "Apprendre à utiliser l’IA aux Sables d’Olonne | Loko",
    seoDescription:
      "Loko accompagne les particuliers aux Sables d’Olonne pour découvrir l’intelligence artificielle, comprendre ses usages et apprendre à l’utiliser simplement.",
    hero: "Envie de comprendre et utiliser l’intelligence artificielle ?",
    intro:
      "Loko accompagne les particuliers aux Sables d’Olonne pour découvrir l’intelligence artificielle, comprendre à quoi elle sert et apprendre à l’utiliser simplement au quotidien.",
    symptoms: [
      "Curiosité sans savoir par où commencer",
      "Besoin d’exemples concrets et utiles",
      "Peur que ce soit trop compliqué",
      "Envie d’apprendre sans jargon technique",
    ],
    help: [
      "Présentation simple de l’IA et de ses usages",
      "Aide à la prise en main d’outils concrets",
      "Exemples utiles dans la vie quotidienne",
      "Accompagnement pédagogique à domicile",
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
    ],
  },
};

const problemCards = [
  {
    href: "/probleme-wifi-internet-les-sables-dolonne",
    label: "Wi-Fi / Internet",
    desc: "Box, coupures, connexion des appareils et remise en route du réseau domestique.",
  },
  {
    href: "/aide-smartphone-les-sables-dolonne",
    label: "Smartphone",
    desc: "Réglages, stockage, transfert de données et accompagnement à l’utilisation.",
  },
  {
    href: "/depannage-ordinateur-les-sables-dolonne",
    label: "Ordinateur",
    desc: "Mails, fichiers, imprimante, compréhension des bases et aide du quotidien.",
  },
  {
    href: "/probleme-tv-box-les-sables-dolonne",
    label: "TV / Box",
    desc: "Télévision, décodeur, applications, connexion au Wi-Fi et installation à domicile.",
  },
  {
    href: "/transfert-de-donnees-les-sables-dolonne",
    label: "Transfert de données",
    desc: "Téléphone ou ordinateur : récupération des données utiles et remise en route simple.",
  },
  {
    href: "/apprendre-ia-les-sables-dolonne",
    label: "Découverte de l’IA",
    desc: "Comprendre l’intelligence artificielle et apprendre à l’utiliser simplement.",
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
}

function getSeoData(path, currentPage) {
  const cleanPath = path || "/";
  const canonical = `${SITE_URL}${cleanPath}`;

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
                  src="/logo-credit-impot.png"
                  alt="Crédit d’impôt service à la personne"
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
                <h3 style={styles.cardTitle}>📝 Demande de rendez-vous</h3>

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

function HoverButton({ href, children, variant = "primary" }) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle =
    variant === "primary" ? styles.primaryButton : styles.secondaryButton;

  const hoverStyle =
    variant === "primary"
      ? styles.primaryButtonHover
      : styles.secondaryButtonHover;

  return (
    <a
      href={href}
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
  const services = [
    {
      title: "Problème Wi-Fi et Internet à domicile",
      text: "Installation de box, connexion des appareils, remise en service et résolution des blocages du quotidien.",
      href: "/probleme-wifi-internet-les-sables-dolonne",
    },
    {
      title: "TV & appareils connectés",
      text: "Télévision, décodeur, applications, connexion réseau et accompagnement simple à l’utilisation.",
      href: "/probleme-tv-box-les-sables-dolonne",
    },
    {
      title: "Aide smartphone à domicile",
      text: "Prise en main, réglages, stockage, transfert de données et aide concrète au quotidien.",
      href: "/aide-smartphone-les-sables-dolonne",
    },
    {
      title: "Dépannage ordinateur à domicile",
      text: "Mails, imprimantes, fichiers, installation simple, compréhension des bases et aide pratique.",
      href: "/depannage-ordinateur-les-sables-dolonne",
    },
    {
      title: "Accompagnement pédagogique",
      text: "Loko ne fait pas seulement à votre place. Loko explique aussi, pour vous rendre autonome.",
      href: "/transfert-de-donnees-les-sables-dolonne",
    },
    {
      title: "Découverte de l’IA",
      text: "Comprendre l’intelligence artificielle, découvrir son utilité et apprendre à l’utiliser simplement.",
      href: "/apprendre-ia-les-sables-dolonne",
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
                <p style={styles.heroText}>
                  L’objectif n’est pas seulement de dépanner. L’objectif, c’est
                  aussi de vous rendre plus autonome.
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
                    "Box Internet",
                    "Télévision",
                    "Smartphone",
                    "Ordinateur",
                    "Transfert de données",
                    "Aide à l’utilisation",
                    "Formation numérique",
                    "Comprendre l’IA",
                  ].map((item) => (
                    <div key={item} style={styles.miniCard}>
                      {item}
                    </div>
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

        <section id="autonomie" style={styles.section}>
          <div style={styles.container}>
            <div style={styles.twoCol}>
              <div>
                <h2 style={styles.sectionTitle}>
                  Le vrai plus : devenir autonome
                </h2>
                <p style={styles.sectionText}>
                  Beaucoup de gens utilisent leurs appareils sans vraiment les
                  comprendre. Dès qu’un détail change, tout devient bloquant.
                </p>
                <p style={styles.sectionText}>
                  Loko résout le problème, mais prend aussi le temps d’expliquer
                  calmement ce qui se passe, les bons gestes à retenir et les
                  bases utiles au quotidien.
                </p>
              </div>
              <div style={styles.sidePanel}>
                {[
                  "Comprendre ses appareils",
                  "Apprendre les bases utiles",
                  "Gagner en sérénité",
                  "Utiliser Internet plus facilement",
                  "Découvrir l’IA sans jargon",
                ].map((item) => (
                  <div key={item} style={styles.sideItem}>
                    {item}
                  </div>
                ))}
              </div>
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
                  src="/logo-credit-impot.png"
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
                <HoverButton href="/credit-impot" variant="primary">
                  Comprendre le fonctionnement
                </HoverButton>
              </div>
            </div>

            <div style={styles.pricingGrid}>
              {plans.map((plan) => (
                <div key={plan.title} style={styles.priceCard}>
                  <div style={styles.cardTitle}>{plan.title}</div>
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
    </div>
  );
}

function ProblemPage({ page }) {
  return (
    <div style={styles.page}>
      <SiteHeader />

      <main>
        <section style={styles.heroSection}>
          <div style={styles.containerNarrow}>
            <HoverLink
              href="/"
              baseStyle={styles.backLink}
              hoverStyle={styles.backLinkHover}
            >
              ← Retour à l’accueil
            </HoverLink>

            <div style={styles.badge}>{page.title} • Les Sables d’Olonne</div>
            <h1 style={styles.heroTitle}>{page.hero}</h1>
            <p style={styles.heroText}>{page.intro}</p>
            <div style={styles.heroButtons}>
              <HoverButton href="/rendez-vous" variant="primary">
                Prendre rendez-vous
              </HoverButton>
              <HoverButton href="/" variant="secondary">
                Voir tous les services
              </HoverButton>
            </div>
          </div>
        </section>

        <section style={styles.sectionAlt}>
          <div style={styles.containerNarrow}>
            <h2 style={styles.sectionTitle}>Situations fréquentes</h2>
            <div style={styles.bulletPanel}>
              {page.symptoms.map((item) => (
                <div key={item} style={styles.bulletItem}>
                  • {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.containerNarrow}>
            <h2 style={styles.sectionTitle}>Ce que Loko peut faire</h2>
            <div style={styles.cardGridSingle}>
              {page.help.map((item) => (
                <div key={item} style={styles.infoCard}>
                  <p style={styles.cardTextNoMargin}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={styles.sectionAlt}>
          <div style={styles.containerNarrow}>
            <h2 style={styles.sectionTitle}>Questions fréquentes</h2>
            <div style={styles.faqList}>
              {page.faq.map((item) => (
                <div key={item.q} style={styles.faqItem}>
                  <h3 style={styles.faqQuestion}>{item.q}</h3>
                  <p style={styles.cardText}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" style={styles.section}>
          <div style={styles.containerNarrow}>
            <div style={styles.contactCard}>
              <h2 style={styles.sectionTitle}>
                Besoin d’aide pour ce problème ?
              </h2>
              <p style={styles.sectionText}>
                Loko intervient à domicile aux Sables d’Olonne et alentours,
                avec une approche simple, humaine et pédagogique.
              </p>
              <p style={styles.sectionText}>
                Service à la personne éligible au crédit d’impôt de 50%.
              </p>
              <div style={styles.heroButtons}>
                <HoverButton href="tel:+33763131515" variant="primary">
                  Appeler Loko
                </HoverButton>
                <HoverButton
                  href="mailto:rdvloko@gmail.com"
                  variant="secondary"
                >
                  Envoyer un mail
                </HoverButton>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: "40px 0", opacity: 0.6 }}>
          <div style={styles.containerNarrow}>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.62)",
              }}
            >
              Cette page concerne : {page.title} aux Sables d’Olonne, assistance
              numérique à domicile, aide locale, accompagnement simple et
              intervention sur rendez-vous.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
      <CookieBanner />
    </div>
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
              href="/#autonomie"
              baseStyle={{
                ...styles.navLink,
                ...(isMobile ? styles.navLinkMobile : {}),
              }}
              hoverStyle={styles.navLinkHover}
            >
              Autonomie
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
    width: "min(1120px, calc(100% - 24px))",
    margin: "0 auto",
  },
  containerNarrow: {
    width: "min(900px, calc(100% - 24px))",
    margin: "0 auto",
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

  navMobile: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 8,
    justifyItems: "center",
  },

  navLinkMobile: {
    width: "100%",
    textAlign: "center",
    padding: "8px 10px",
    fontSize: 13,
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
  heroSection: {
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
    fontSize: "clamp(40px, 7vw, 72px)",
    lineHeight: 0.98,
    letterSpacing: "-0.05em",
    margin: 0,
    maxWidth: 760,
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
    padding: "72px 0",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  sectionAlt: {
    padding: "72px 0",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.02)",
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
  cardTextNoMargin: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 16,
    lineHeight: 1.7,
    margin: 0,
  },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 24,
    alignItems: "start",
  },
  sidePanel: {
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 28,
    padding: 24,
  },
  sideItem: {
    padding: "14px 0",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    fontSize: 17,
    color: "rgba(255,255,255,0.86)",
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
  footerTopGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 18,
    marginBottom: 32,
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
  footerLogoText: {
    fontSize: 54,
    fontWeight: 800,
    letterSpacing: "-0.05em",
    color: "#ffffff",
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
