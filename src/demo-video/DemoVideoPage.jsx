import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  STAGE,
  lastStage,
  stageDurationsMs,
  stageScroll,
  stageCaption,
  introLines,
  compositeCaption,
  outro,
} from "./demoData";
import "./demoVideo.css";

// Vidéo de démonstration Lockpit pour le SITE Loko — autonome.
// Le VRAI site est chargé EN DIRECT dans une iframe (même origine) et défile de
// section en section, entre l'intro et la signature Lockpit. Les animations du
// site tournent réellement (carrousel d'avis, mot rotatif du hero…).
//
// URLs :
//   /demo-video?stage=0..8          → afficher une étape précise
//   /demo-video?play=1              → enchaîner automatiquement (~28 s)
//   /demo-video?format=vertical     → variante 9:16 (paysage 16:9 par défaut)
//   /demo-video?delay=4000          → retarder le début de la lecture auto
// Clavier : ← / → pour changer d'étape.

const FONT =
  "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const lockpit = {
  navy: "#1A2E3D",
  navyLight: "#24394A",
  cream: "#FCEFE3",
  orange: "#FFB627",
};

const SITE_URL = "/"; // page d'accueil du vrai site (même origine)

function readParam(search, key) {
  return new URLSearchParams(search).get(key) || undefined;
}

// Masquer le bandeau cookies du site dans l'iframe (consentement pré-réglé).
// Même origine → l'iframe lit le même localStorage.
if (typeof window !== "undefined") {
  try {
    if (!localStorage.getItem("loko-cookie-consent")) {
      localStorage.setItem("loko-cookie-consent", "refused");
    }
  } catch (e) {}
}

// ---------------------------------------------------------------------------
// Icône Lockpit animée
// ---------------------------------------------------------------------------

function LockpitIcon({ size = 76 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <rect width="24" height="24" rx="6" fill={lockpit.navyLight} stroke={lockpit.cream} strokeOpacity="0.14" />
      <path
        className="dv-icon-arc"
        d="M 16 5 A 8 8 0 1 0 16 19"
        fill="none"
        stroke={lockpit.cream}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <line
        className="dv-icon-hand"
        x1="12"
        y1="12"
        x2="17.5"
        y2="6.5"
        stroke={lockpit.orange}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle className="dv-icon-dot" cx="12" cy="12" r="1.7" fill={lockpit.orange} />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Cadre navigateur contenant le vrai site (iframe live)
// ---------------------------------------------------------------------------

function BrowserMockup({ frameRef, iframeRef, onLoad, innerW, innerH, logicalW }) {
  const barH = 44;
  const scale = innerW / logicalW;
  const logicalH = Math.round((innerH - barH) / scale);

  return (
    <div
      ref={frameRef}
      style={{
        width: innerW,
        height: innerH,
        borderRadius: 16,
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 40px 80px -30px rgba(0,0,0,0.6)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Barre de navigateur */}
      <div
        style={{
          height: barH,
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "0 16px",
          background: "#F1EEE8",
          borderBottom: "1px solid rgba(28,36,51,0.08)",
        }}
      >
        <div style={{ display: "flex", gap: 7 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <span key={c} style={{ width: 12, height: 12, borderRadius: 999, background: c }} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            maxWidth: 360,
            margin: "0 auto",
            textAlign: "center",
            fontSize: 13,
            fontWeight: 600,
            color: "#1C2433",
            background: "#fff",
            borderRadius: 999,
            padding: "6px 14px",
            fontFamily: FONT,
          }}
        >
          www.lokofr.com
        </div>
        <div style={{ width: 40 }} />
      </div>

      {/* Le vrai site, à l'échelle */}
      <div style={{ width: innerW, height: innerH - barH, overflow: "hidden" }}>
        <iframe
          ref={iframeRef}
          src={SITE_URL}
          title="Site Loko"
          onLoad={onLoad}
          style={{
            width: logicalW,
            height: logicalH,
            border: "none",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Scènes (intro / signature) en surcouche
// ---------------------------------------------------------------------------

function IntroOverlay({ stage }) {
  const visible = stage === STAGE.intro;
  return (
    <div
      className={`dv-overlay ${visible ? "" : "dv-overlay-hidden"}`}
      style={overlayStyle}
    >
      <div style={{ textAlign: "center" }}>
        {visible ? <LockpitIcon size={76} /> : null}
        <div style={{ marginTop: 26 }}>
          {introLines.map((line, i) => (
            <p
              key={line}
              className="dv-line-in"
              style={{
                margin: 0,
                fontSize: 32,
                fontWeight: 800,
                lineHeight: 1.3,
                animationDelay: `${700 + i * 450}ms`,
                color: i === introLines.length - 1 ? lockpit.orange : lockpit.cream,
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompositeOverlay({ stage }) {
  const visible = stage === STAGE.ensemble;
  return (
    <div
      className={`dv-overlay ${visible ? "" : "dv-overlay-hidden"}`}
      style={{ ...overlayStyle, background: `${lockpit.navy}E6` }}
    >
      {visible ? (
        <div style={{ textAlign: "center" }}>
          <p className="dv-line-in" style={{ margin: 0, fontSize: 38, fontWeight: 800, color: lockpit.cream }}>
            {compositeCaption.title}
          </p>
          <p
            className="dv-line-in"
            style={{ margin: "14px 0 0", fontSize: 18, animationDelay: "250ms", color: `${lockpit.cream}AA` }}
          >
            {compositeCaption.subtitle}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function OutroOverlay({ stage }) {
  const visible = stage >= STAGE.signature;
  return (
    <div className={`dv-overlay ${visible ? "" : "dv-overlay-hidden"}`} style={overlayStyle}>
      <div style={{ textAlign: "center" }}>
        {visible ? (
          <>
            <LockpitIcon size={92} />
            <p
              className="dv-line-in"
              style={{ margin: "26px 0 0", fontSize: 40, fontWeight: 800, animationDelay: "500ms", color: lockpit.cream }}
            >
              Créé par <span style={{ color: lockpit.orange }}>Lockpit</span>
            </p>
            <p
              className="dv-line-in"
              style={{
                margin: "16px 0 0",
                fontSize: 16,
                fontWeight: 500,
                letterSpacing: "0.02em",
                animationDelay: "900ms",
                color: `${lockpit.cream}99`,
              }}
            >
              {outro.subtitle}
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "absolute",
  inset: 0,
  zIndex: 30,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 32,
  background: lockpit.navy,
  fontFamily: FONT,
};

// ---------------------------------------------------------------------------
// Scaling du canvas
// ---------------------------------------------------------------------------

function useCanvasScale(width, height) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    function update() {
      setScale(Math.min(window.innerWidth / width, window.innerHeight / height));
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [width, height]);
  return scale;
}

// Défilement fluide piloté manuellement (rAF, pas par pas) — fiable dans une
// iframe, contrairement à scroll-behavior:smooth. `token` annule un tween en
// cours quand l'étape change.
function tweenScroll(win, to, token, getToken, duration = 950) {
  const start = win.scrollY || 0;
  const dist = to - start;
  if (Math.abs(dist) < 2) {
    win.scrollTo(0, to);
    return;
  }
  const t0 = (win.performance || performance).now();
  const step = (now) => {
    if (getToken() !== token) return; // étape changée → on abandonne
    const p = Math.min(1, (now - t0) / duration);
    const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; // easeInOutQuad
    win.scrollTo(0, Math.round(start + dist * e));
    if (p < 1) win.requestAnimationFrame(step);
  };
  win.requestAnimationFrame(step);
}

// Calcule la position de défilement (px) dans le document du site pour une étape.
function targetScrollTop(doc, descriptor) {
  if (!doc || !descriptor) return 0;
  const topOf = (sel) => {
    const el = doc.querySelector(sel);
    return el ? el.getBoundingClientRect().top + (doc.defaultView.scrollY || 0) : null;
  };
  if (descriptor.type === "top") return 0;
  if (descriptor.type === "sel") {
    const t = topOf(descriptor.sel);
    return t == null ? 0 : Math.max(0, t - 40);
  }
  if (descriptor.type === "mid") {
    const a = topOf(descriptor.a);
    const b = topOf(descriptor.b);
    if (a == null || b == null) return a == null ? 0 : Math.max(0, a - 40);
    return Math.max(0, (a + b) / 2 - 200);
  }
  return 0;
}

export default function DemoVideoPage() {
  const search = typeof window !== "undefined" ? window.location.search : "";

  const initialStage = useMemo(() => {
    const raw = parseInt(readParam(search, "stage") || "0", 10);
    if (Number.isNaN(raw)) return 0;
    return Math.min(Math.max(raw, 0), lastStage);
  }, [search]);

  const autoPlay = readParam(search, "play") === "1";
  const vertical = readParam(search, "format") === "vertical";
  const startDelay = parseInt(readParam(search, "delay") || "0", 10) || 0;

  const canvas = vertical ? { width: 540, height: 960 } : { width: 1280, height: 720 };
  // Largeur logique du site dans l'iframe (vue desktop pour avoir le carrousel
  // d'avis et la mise en page large).
  const logicalW = vertical ? 1180 : 1366;

  const scale = useCanvasScale(canvas.width, canvas.height);
  const [stage, setStage] = useState(initialStage);
  const [ready, setReady] = useState(false);
  const iframeRef = useRef(null);
  const scrollTokenRef = useRef(0);

  // Au chargement de l'iframe (même origine) : masquer les barres de défilement
  // du site pour un rendu propre, puis activer le pilotage du défilement.
  const handleIframeLoad = () => {
    const iframe = iframeRef.current;
    try {
      const doc = iframe && iframe.contentDocument;
      if (doc) {
        const style = doc.createElement("style");
        // scroll-behavior:auto !important — le site force `smooth` sur <html>, ce
        // qui annulerait le tween rAF (chaque pas relancerait une mini-animation).
        style.textContent =
          "::-webkit-scrollbar{width:0;height:0;display:none} html,body{scrollbar-width:none;scroll-behavior:auto !important}";
        doc.head.appendChild(style);
        doc.documentElement.style.scrollBehavior = "auto";
        if (doc.body) doc.body.style.scrollBehavior = "auto";
      }
    } catch (e) {}
    setReady(true);
  };

  // Lecture automatique.
  useEffect(() => {
    if (!autoPlay || stage >= lastStage) return undefined;
    const timer = window.setTimeout(
      () => setStage((c) => Math.min(c + 1, lastStage)),
      stageDurationsMs[stage] + (stage === 0 ? startDelay : 0)
    );
    return () => window.clearTimeout(timer);
  }, [autoPlay, stage, startDelay]);

  // Navigation clavier.
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "ArrowRight") setStage((c) => Math.min(c + 1, lastStage));
      else if (e.key === "ArrowLeft") setStage((c) => Math.max(c - 1, 0));
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Défilement du vrai site (iframe) à chaque étape. On réessaie tant que la
  // section visée n'est pas encore montée (le SPA peut rendre après le `load`).
  useEffect(() => {
    if (!ready) return undefined;
    let cancelled = false;
    let tries = 0;
    const desc = stageScroll[stage];
    const needsSel = desc && (desc.type === "sel" || desc.type === "mid");
    const token = scrollTokenRef.current + 1;
    scrollTokenRef.current = token;
    const getToken = () => scrollTokenRef.current;

    const attempt = () => {
      if (cancelled || getToken() !== token) return;
      const iframe = iframeRef.current;
      const win = iframe && iframe.contentWindow;
      const doc = iframe && iframe.contentDocument;
      if (win && doc) {
        const present =
          !needsSel ||
          (desc.type === "sel"
            ? doc.querySelector(desc.sel)
            : doc.querySelector(desc.a) && doc.querySelector(desc.b));
        if (present || tries > 30) {
          tweenScroll(win, targetScrollTop(doc, desc), token, getToken);
          if (present) return;
        }
      }
      tries += 1;
      window.setTimeout(attempt, 100);
    };
    attempt();
    return () => {
      cancelled = true;
    };
  }, [stage, ready]);

  const innerW = vertical ? canvas.width - 28 : canvas.width - 100;
  const innerH = vertical ? canvas.height - 150 : canvas.height - 110;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, overflow: "hidden", background: "#0a0a0a" }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: canvas.width,
          height: canvas.height,
          overflow: "hidden",
          background: lockpit.navy,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        {/* Scène site (toujours montée pour que l'iframe charge tôt) */}
        <main
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: lockpit.navy,
            fontFamily: FONT,
          }}
        >
          <BrowserMockup
            iframeRef={iframeRef}
            onLoad={handleIframeLoad}
            innerW={innerW}
            innerH={innerH}
            logicalW={logicalW}
          />

          {/* Légende basse */}
          <div style={{ position: "absolute", left: 0, right: 0, bottom: vertical ? 40 : 26, textAlign: "center" }}>
            <span
              key={stageCaption[stage] || "none"}
              className={stageCaption[stage] ? "dv-line-in" : ""}
              style={{
                display: stageCaption[stage] ? "inline-block" : "none",
                padding: "10px 20px",
                borderRadius: 999,
                background: "rgba(14,16,20,0.6)",
                backdropFilter: "blur(6px)",
                color: lockpit.cream,
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              {stageCaption[stage]}
            </span>
          </div>
        </main>

        <IntroOverlay stage={stage} />
        <CompositeOverlay stage={stage} />
        <OutroOverlay stage={stage} />
      </div>
    </div>
  );
}
