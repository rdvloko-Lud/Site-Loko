import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";

// Thème de Noël du site : habille le logo, l'en-tête (guirlande), les cartes
// (neige + ornements), les titres, les boutons, le fond, le pied de page, et
// ajoute une neige, un traîneau qui passe et un compte à rebours.
//
// Pour le retirer : supprimer <ChristmasTheme />, <NoelBand /> et <SantaHat />
// (+ le bloc « noel » de SiteBackground) dans App.js.
//
// Activation : automatique du 1er novembre au 6 janvier. Le visiteur peut le
// couper (double-clic sur le sapin) : choix mémorisé. Forcer : ?noel=1 / ?noel=0.

const STORAGE_KEY = "loko-noel";
const CONFETTI = ["⭐", "🎁", "✨", "🔔", "🍬", "❄️"];
const ORNAMENTS = ["🎄", "⭐", "🎁", "🔔", "❄️", "🍬"];

/* ---------- état partagé (activé / coupé) ---------- */

function isSeason(now = new Date()) {
  const m = now.getMonth();
  const d = now.getDate();
  return m === 10 || m === 11 || (m === 0 && d <= 6);
}

function readInitialState() {
  if (typeof window === "undefined") return false;
  try {
    const q = new URLSearchParams(window.location.search).get("noel");
    if (q === "1") return true;
    if (q === "0") return false;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "on") return true;
    if (saved === "off") return false;
  } catch (e) {}
  return isSeason();
}

let noelOn = null;
const listeners = new Set();

function getSnapshot() {
  if (noelOn === null) noelOn = readInitialState();
  return noelOn;
}
function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
export function setNoel(value) {
  noelOn = value;
  try {
    window.localStorage.setItem(STORAGE_KEY, value ? "on" : "off");
  } catch (e) {}
  listeners.forEach((fn) => fn());
}
export function useNoel() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/* ---------- guirlande de l'en-tête (SVG en fond, 2 calques qui clignotent) ---------- */

const BULBS = [
  [20, 10, "%23d93a49"],
  [40, 13, "%23f2b93b"],
  [60, 10, "%232fa66a"],
  [100, 10, "%234a90d9"],
  [120, 13, "%23d93a49"],
  [140, 10, "%23f2b93b"],
];

function garlandTile(which) {
  const bulbs = BULBS.map(([x, y, c], i) => {
    const lit = i % 2 === which;
    return (
      `<rect x='${x - 2}' y='${y - 3}' width='4' height='4' rx='1' fill='%23555'/>` +
      `<ellipse cx='${x}' cy='${y + 4}' rx='3.4' ry='4.6' fill='${c}' opacity='${lit ? 1 : 0.35}'/>`
    );
  }).join("");
  const wire =
    "<path d='M0 2 Q40 24 80 2 Q120 24 160 2' fill='none' stroke='%232c3a31' stroke-width='1.6'/>";
  return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='30' viewBox='0 0 160 30'>${wire}${bulbs}</svg>")`;
}

const CSS = `
@keyframes lkNoelBob { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-6px) rotate(3deg)} }
@keyframes lkNoelUp { to{transform:translate(var(--dx),var(--dy)) rotate(var(--r));opacity:0} }
@keyframes lkNoelBlinkA { 0%,100%{opacity:1} 50%{opacity:.25} }
@keyframes lkNoelBlinkB { 0%,100%{opacity:.25} 50%{opacity:1} }
@keyframes lkNoelSleigh {
  0% { transform: translateX(-30vw) translateY(0); }
  8% { transform: translateX(10vw) translateY(14px); }
  16% { transform: translateX(50vw) translateY(-6px); }
  24% { transform: translateX(95vw) translateY(10px); }
  26%,100% { transform: translateX(130vw) translateY(0); }
}
@keyframes lkNoelStripe { to { background-position: 40px 0; } }
@keyframes lkNoelSway { 0%,100%{transform:rotate(-14deg)} 50%{transform:rotate(-7deg)} }
@keyframes lkNoelPulse { 0%,100%{box-shadow:0 8px 22px rgba(198,45,59,.28)} 50%{box-shadow:0 8px 30px rgba(198,45,59,.5)} }

.lk-noel-hat { display: none; }
html.lk-noel .lk-noel-hat { display: block; }

/* Guirlande sous l'en-tête */
html.lk-noel header { position: sticky; }
html.lk-noel header::before,
html.lk-noel header::after {
  content: ""; position: absolute; left: 0; right: 0; top: 100%; height: 30px;
  background-repeat: repeat-x; background-size: 160px 30px; pointer-events: none; z-index: 2;
  filter: drop-shadow(0 0 5px rgba(255,255,255,.45));
}
html.lk-noel header::before { background-image: ${garlandTile(0)}; animation: lkNoelBlinkA 1.8s ease-in-out infinite; }
html.lk-noel header::after { background-image: ${garlandTile(1)}; animation: lkNoelBlinkB 1.8s ease-in-out infinite; }

/* Cartes : neige posée dessus + ornement */
.lk-noel-rel { position: relative; }
html.lk-noel .lk-noel-card::before {
  content: ""; position: absolute; top: -7px; left: var(--sl, 16px); right: var(--sr, 16px); height: 13px;
  border-radius: 12px 12px 9px 9px; pointer-events: none; z-index: 1;
  background: linear-gradient(#ffffff, #e6eff9);
  box-shadow: 0 1px 2px rgba(60,90,130,.28), inset 0 -2px 0 rgba(255,255,255,.8);
}
html.lk-noel .lk-noel-card::after {
  content: attr(data-orn); position: absolute; top: -14px; right: var(--or, 16px);
  font-size: 22px; line-height: 1; pointer-events: none; z-index: 2;
  filter: drop-shadow(0 2px 2px rgba(0,0,0,.18)); transform-origin: 50% 100%;
  animation: lkNoelBob 5s ease-in-out infinite;
}

/* Titres, accents, boutons */
html.lk-noel h2::after { content: " ✦"; color: #c62d3b; font-size: .55em; vertical-align: super; }
html.lk-noel h1 span[style*="color: rgb(37, 99, 235)"],
html.lk-noel h1 span[style*="color: rgb(59, 130, 246)"] {
  background: linear-gradient(100deg, #c62d3b, #1f7a4d); -webkit-background-clip: text;
  background-clip: text; color: transparent !important;
}
html.lk-noel button[style*="background: rgb(28, 36, 51)"],
html.lk-noel a[style*="background: rgb(28, 36, 51)"] {
  background: linear-gradient(135deg, #c62d3b, #a5212f) !important;
  border-color: #a5212f !important; box-shadow: 0 8px 22px rgba(198,45,59,.28);
}

/* Pied de page : congère de neige */
html.lk-noel footer { position: relative; margin-top: 18px; }
html.lk-noel footer::before {
  content: ""; position: absolute; left: 0; right: 0; top: -14px; height: 14px; pointer-events: none;
  background: radial-gradient(circle at 14px 14px, #f6f9fd 13px, transparent 14px) repeat-x;
  background-size: 28px 14px; filter: drop-shadow(0 -1px 1px rgba(60,90,130,.25));
}

/* Bandeau festif */
.lk-noel-band {
  position: relative; overflow: hidden; color: #fff; text-align: center;
  font: 600 13.5px/1.3 system-ui, -apple-system, sans-serif; padding: 9px 14px;
  background: repeating-linear-gradient(45deg, #b3202f 0 20px, #c62d3b 20px 40px);
  background-size: 40px 40px; animation: lkNoelStripe 2.4s linear infinite;
}
.lk-noel-band b { font-variant-numeric: tabular-nums; background: rgba(0,0,0,.18); border-radius: 8px; padding: 2px 8px; margin-left: 4px; }

@media (prefers-reduced-motion: reduce) {
  html.lk-noel header::before, html.lk-noel header::after { animation: none; }
  .lk-noel-band, html.lk-noel .lk-noel-card::after { animation: none; }
}
`;

/* ---------- bonnet de Père Noël (à poser dans un conteneur relatif) ---------- */

export function SantaHat({ size = 46, style }) {
  return (
    <svg
      className="lk-noel-hat"
      aria-hidden="true"
      viewBox="0 0 40 36"
      style={{
        position: "absolute",
        width: "30%",
        height: "auto",
        top: "-27%",
        left: "7%",
        pointerEvents: "none",
        transformOrigin: "20% 90%",
        animation: "lkNoelSway 3.4s ease-in-out infinite",
        filter: "drop-shadow(0 3px 3px rgba(0,0,0,.3))",
        zIndex: 3,
        ...style,
      }}
    >
      <path d="M4 32 Q 8 3 30 4 Q 24 14 36 30 Z" fill="#c62d3b" />
      <rect x="2" y="27" width="36" height="8" rx="4" fill="#fff" />
      <circle cx="31" cy="5" r="5" fill="#fff" />
    </svg>
  );
}

/* ---------- bandeau « Joyeuses fêtes » + compte à rebours ---------- */

export function NoelBand() {
  const on = useNoel();
  const [left, setLeft] = useState(null);

  useEffect(() => {
    if (!on) return undefined;
    const tick = () => {
      const now = new Date();
      let target = new Date(now.getFullYear(), 11, 25);
      if (now > target) target = new Date(now.getFullYear() + 1, 11, 25);
      const s = Math.max(0, Math.floor((target - now) / 1000));
      setLeft({
        d: Math.floor(s / 86400),
        h: Math.floor((s % 86400) / 3600),
        m: Math.floor((s % 3600) / 60),
      });
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [on]);

  if (!on) return null;
  const todayIsXmas = new Date().getMonth() === 11 && new Date().getDate() === 25;
  return (
    <div className="lk-noel-band" role="note">
      🎄 Toute l’équipe Loko vous souhaite de joyeuses fêtes 🎁
      {left && !todayIsXmas && (
        <b>
          🎅 Noël dans {left.d} j {String(left.h).padStart(2, "0")} h
        </b>
      )}
    </div>
  );
}

/* ---------- neige qui tombe ---------- */

function Snow() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const reduced = prefersReducedMotion();
    let W = 0;
    let H = 0;
    let raf = 0;
    let mx = 0;
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    const count = window.innerWidth < 700 ? 40 : 80;
    const glyphs = ["❄", "❅", "❆", "•", "•", "•"];
    const flakes = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 8 + 4,
      v: Math.random() * 0.8 + 0.4,
      s: Math.random() * Math.PI * 2,
      g: glyphs[Math.floor(Math.random() * glyphs.length)],
      o: Math.random() * 0.4 + 0.4,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const f of flakes) {
        if (!reduced) {
          f.y += f.v;
          f.s += 0.012;
          f.x += Math.sin(f.s) * 0.5 + mx * 1.2;
          if (f.y > H + 10) {
            f.y = -10;
            f.x = Math.random() * W;
          }
          if (f.x > W + 10) f.x = -10;
          if (f.x < -10) f.x = W + 10;
        }
        ctx.globalAlpha = f.o;
        ctx.font = `${f.r * 2}px sans-serif`;
        ctx.fillStyle = "#8fb0d8";
        ctx.fillText(f.g, f.x, f.y);
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onMove = (e) => {
      mx = e.clientX / W - 0.5;
    };
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 9990,
        pointerEvents: "none",
      }}
    />
  );
}

/* ---------- cartes : neige + ornement posés automatiquement ---------- */

function useDecoratedCards(on) {
  useEffect(() => {
    if (!on) return undefined;
    let n = 0;
    let timer = 0;

    const scan = () => {
      const els = document.querySelectorAll(
        '[style*="background: rgb(255, 255, 255)"]:not(.lk-noel-card)'
      );
      els.forEach((el) => {
        if (el.closest("header, footer, [role='dialog']")) return;
        const cs = window.getComputedStyle(el);
        const radius = parseFloat(cs.borderRadius);
        const r = el.getBoundingClientRect();
        if (radius < 14 || radius > 60 || r.width < 200 || r.height < 70) return;
        if (cs.position === "static") el.classList.add("lk-noel-rel");
        el.classList.add("lk-noel-card");
        el.setAttribute("data-orn", ORNAMENTS[n % ORNAMENTS.length]);
        el.style.setProperty("--sl", `${12 + ((n * 7) % 26)}px`);
        el.style.setProperty("--sr", `${12 + ((n * 11) % 30)}px`);
        el.style.setProperty("--or", `${14 + ((n * 13) % 40)}px`);
        n += 1;
      });
    };

    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(scan, 350);
    };
    scan();
    const obs = new MutationObserver(schedule);
    obs.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", schedule);
    return () => {
      obs.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener("resize", schedule);
      document.querySelectorAll(".lk-noel-card").forEach((el) => {
        el.classList.remove("lk-noel-card", "lk-noel-rel");
        el.removeAttribute("data-orn");
      });
    };
  }, [on]);
}

/* ---------- composant principal ---------- */

export default function ChristmasTheme() {
  const on = useNoel();
  const [bits, setBits] = useState([]);

  useEffect(() => {
    document.documentElement.classList.toggle("lk-noel", on);
    return () => document.documentElement.classList.remove("lk-noel");
  }, [on]);

  useDecoratedCards(on);

  const burst = (e) => {
    const x = e.clientX || 60;
    const y = e.clientY || window.innerHeight - 60;
    const id = Date.now();
    const items = Array.from({ length: 16 }, (_, i) => ({
      k: `${id}-${i}`,
      c: CONFETTI[i % CONFETTI.length],
      x,
      y,
      dx: Math.random() * 300 - 150,
      dy: -Math.random() * 240 - 40,
      r: Math.random() * 540 - 270,
    }));
    setBits((b) => [...b, ...items]);
    setTimeout(() => setBits((b) => b.filter((it) => !it.k.startsWith(String(id)))), 1500);
  };

  return (
    <>
      <style>{CSS}</style>
      {on ? (
        <>
          <Snow />
          {!prefersReducedMotion() && (
            <div
              aria-hidden="true"
              style={{
                position: "fixed",
                top: 150,
                left: 0,
                zIndex: 9989,
                fontSize: 38,
                whiteSpace: "nowrap",
                pointerEvents: "none",
                animation: "lkNoelSleigh 55s linear infinite",
                filter: "drop-shadow(0 4px 4px rgba(0,0,0,.2))",
              }}
            >
              <span style={{ display: "inline-block", transform: "scaleX(-1)" }}>
                🦌🦌🛷
              </span>
            </div>
          )}
          <button
            type="button"
            aria-label="Thème de Noël : cliquer pour des confettis, double-clic pour couper"
            title="Clique ! (double-clic pour couper le thème)"
            onClick={burst}
            onDoubleClick={() => setNoel(false)}
            style={{
              position: "fixed",
              left: 14,
              bottom: 10,
              zIndex: 9992,
              border: 0,
              background: "transparent",
              padding: 0,
              cursor: "pointer",
              fontSize: 52,
              lineHeight: 1,
              filter: "drop-shadow(0 6px 6px rgba(0,0,0,0.25))",
              animation: "lkNoelBob 4s ease-in-out infinite",
            }}
          >
            🎄
          </button>
          {bits.map((b) => (
            <span
              key={b.k}
              aria-hidden="true"
              style={{
                position: "fixed",
                left: b.x,
                top: b.y,
                zIndex: 9995,
                fontSize: 22,
                pointerEvents: "none",
                "--dx": `${b.dx}px`,
                "--dy": `${b.dy}px`,
                "--r": `${b.r}deg`,
                animation: "lkNoelUp 1.4s ease-out forwards",
              }}
            >
              {b.c}
            </span>
          ))}
        </>
      ) : (
        <button
          type="button"
          aria-label="Activer le thème de Noël"
          title="Activer le thème de Noël"
          onClick={() => setNoel(true)}
          style={{
            position: "fixed",
            left: 14,
            bottom: 14,
            zIndex: 9992,
            border: "1px solid rgba(0,0,0,0.08)",
            background: "#fff",
            borderRadius: 999,
            width: 40,
            height: 40,
            fontSize: 20,
            cursor: "pointer",
            opacity: 0.55,
          }}
        >
          🎄
        </button>
      )}
    </>
  );
}
