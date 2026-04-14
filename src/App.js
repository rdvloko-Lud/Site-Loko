import React, { useState, useEffect } from "react";

const problemPages = {
  "/probleme-wifi-internet-les-sables-dolonne": {
    title: "Problème Wi-Fi / Internet",
    seoTitle: "Problème Wi-Fi et Internet aux Sables d’Olonne | Loko",
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
  const currentPage = problemPages[path] || null;

  if (isRdvPage) {
    return <RendezVousPage />;
  }

  if (isPlanPage) {
    return <PlanDuSitePage />;
  }

  if (typeof document !== "undefined") {
    document.title = currentPage
      ? currentPage.seoTitle
      : "Assistance numérique à domicile aux Sables d’Olonne | Loko";
  }

  if (currentPage) {
    return <ProblemPage page={currentPage} />;
  }

  return <HomePage />;
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
  ];

  if (typeof document !== "undefined") {
    document.title = "Plan du site | Loko";
  }

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
      text: "79€ soit 39,50€ après crédit d’impôt (service à la personne).",
    },
    {
      title: "Intervention à domicile urgente",
      price: "99€",
      text: "99€ soit 49,50€ après crédit d’impôt (service à la personne).",
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
              Service à la personne éligible au crédit d’impôt de 50% aux Sables
              d’Olonne.
            </p>
            <div style={styles.pricingGrid}>
              {plans.map((plan) => (
                <div key={plan.title} style={styles.priceCard}>
                  <div style={styles.cardTitle}>{plan.title}</div>
                  <div style={styles.price}>{plan.price}</div>
                  <p style={styles.cardText}>{plan.text}</p>
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
    gap: 18,
    padding: "20px 0 18px",
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
    gap: 12,
    justifyItems: "center",
  },

  navLinkMobile: {
    width: "100%",
    textAlign: "center",
    padding: "10px 12px",
    fontSize: 15,
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
    padding: "12px 20px",
    fontSize: 15,
    marginTop: 10,
    borderRadius: 999,
  },
  sublogo: {
    color: "rgba(255,255,255,0.62)",
    marginTop: 4,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 1.4,
  },
  logoWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    textAlign: "center",
  },
  nav: {
    display: "flex",
    gap: 18,
    alignItems: "center",
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
    width: "clamp(80px, 10vw, 120px)",
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
