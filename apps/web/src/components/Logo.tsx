import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

interface LogoProps {
  sidebarOpen?: boolean;
  showText?: boolean;
  className?: string;
}

const NODES = [
  { id: 0,  x: 64,  y: 14,  r: 3.4 },
  { id: 1,  x: 42,  y: 20,  r: 2.8 },
  { id: 2,  x: 86,  y: 20,  r: 2.8 },
  { id: 3,  x: 26,  y: 36,  r: 2.5 },
  { id: 4,  x: 50,  y: 30,  r: 3.0 },
  { id: 5,  x: 78,  y: 30,  r: 3.0 },
  { id: 6,  x: 102, y: 36,  r: 2.5 },
  { id: 7,  x: 18,  y: 56,  r: 2.3 },
  { id: 8,  x: 38,  y: 48,  r: 2.8 },
  { id: 9,  x: 64,  y: 44,  r: 4.0 },
  { id: 10, x: 90,  y: 48,  r: 2.8 },
  { id: 11, x: 110, y: 56,  r: 2.3 },
  { id: 12, x: 22,  y: 76,  r: 2.3 },
  { id: 13, x: 44,  y: 68,  r: 2.6 },
  { id: 14, x: 64,  y: 64,  r: 3.2 },
  { id: 15, x: 84,  y: 68,  r: 2.6 },
  { id: 16, x: 106, y: 76,  r: 2.3 },
  { id: 17, x: 30,  y: 94,  r: 2.1 },
  { id: 18, x: 50,  y: 86,  r: 2.4 },
  { id: 19, x: 64,  y: 82,  r: 2.8 },
  { id: 20, x: 78,  y: 86,  r: 2.4 },
  { id: 21, x: 98,  y: 94,  r: 2.1 },
  { id: 22, x: 40,  y: 104, r: 2.0 },
  { id: 23, x: 64,  y: 100, r: 2.4 },
  { id: 24, x: 88,  y: 104, r: 2.0 },
  { id: 25, x: 52,  y: 116, r: 1.8 },
  { id: 26, x: 64,  y: 118, r: 2.2 },
  { id: 27, x: 76,  y: 116, r: 1.8 },
];

const EDGES: [number, number][] = [
  [0,1],[0,2],[0,4],[0,5],
  [1,3],[1,4],[1,8],
  [2,5],[2,6],[2,10],
  [3,7],[3,8],[3,12],
  [4,8],[4,9],[4,5],
  [5,9],[5,10],[5,6],
  [6,10],[6,11],[6,16],
  [7,12],[7,8],
  [8,9],[8,13],[8,12],
  [9,10],[9,13],[9,14],[9,15],
  [10,15],[10,11],[10,16],
  [11,16],
  [12,13],[12,17],
  [13,14],[13,18],[13,17],
  [14,15],[14,18],[14,19],[14,20],
  [15,16],[15,20],[15,21],
  [16,21],
  [17,18],[17,22],
  [18,19],[18,22],[18,23],
  [19,20],[19,23],
  [20,21],[20,23],[20,24],
  [21,24],
  [22,23],[22,25],
  [23,24],[23,25],[23,26],[23,27],
  [24,27],
  [25,26],
  [26,27],
];

const SIGNAL_SEQS = [
  [0,2,6,11,16,21,24,27,26],
  [0,1,3,7,12,17,22,25,26],
  [0,4,9,14,19,23,26],
  [3,8,9,10,16],
  [7,8,13,14,15,11],
  [22,23,24,21,16],
];

const HUB_IDS = [9, 14, 0, 19, 23];

const I700 = "#3730A3";
const I500 = "#4F46E5";
const I400 = "#6366F1";
const I300 = "#818CF8";
const I200 = "#A5B4FC";
const I100 = "#C7D2FE";
const SPARK = "#FFFFFF";

function lerpAlongPolyline(
  points: { x: number; y: number }[],
  t: number
): { x: number; y: number } {
  if (points.length === 0) return { x: 0, y: 0 };
  if (t <= 0) return points[0];
  if (t >= 1) return points[points.length - 1];
  const segs: number[] = [];
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const d = Math.hypot(points[i+1].x - points[i].x, points[i+1].y - points[i].y);
    segs.push(d);
    total += d;
  }
  let target = t * total;
  for (let i = 0; i < segs.length; i++) {
    if (target <= segs[i]) {
      const frac = segs[i] > 0 ? target / segs[i] : 0;
      return {
        x: points[i].x + frac * (points[i+1].x - points[i].x),
        y: points[i].y + frac * (points[i+1].y - points[i].y),
      };
    }
    target -= segs[i];
  }
  return points[points.length - 1];
}

function posOnEllipse(
  cx: number, cy: number, rx: number, ry: number,
  rotateDeg: number, t: number
): { x: number; y: number } {
  const a = t * 2 * Math.PI;
  const r = (rotateDeg * Math.PI) / 180;
  const lx = rx * Math.cos(a);
  const ly = ry * Math.sin(a);
  return {
    x: cx + lx * Math.cos(r) - ly * Math.sin(r),
    y: cy + lx * Math.sin(r) + ly * Math.cos(r),
  };
}

export const Logo: React.FC<LogoProps> = ({
  sidebarOpen = true,
  showText    = true,
  className   = "",
}) => {
  const svgRef   = useRef<SVGSVGElement>(null);
  const brainRef = useRef<SVGPathElement>(null);
  const stemRef  = useRef<SVGPathElement>(null);
  const edgeRefs = useRef<(SVGLineElement | null)[]>([]);
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);
  const ringRefs = useRef<(SVGCircleElement | null)[]>([]);
  const sigRefs  = useRef<(SVGCircleElement | null)[]>([]);
  const orbitRef = useRef<SVGCircleElement>(null);
  const scanRef  = useRef<SVGLineElement>(null);

  useEffect(() => {
    const LOOP = 12.0;
    const timers: ReturnType<typeof setInterval>[] = [];
    const ctx = gsap.context(() => {

      const drawPath = (el: SVGPathElement | null, dur: number, delay: number) => {
        if (!el) return;
        const len = el.getTotalLength?.() ?? 400;
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(el, {
          strokeDashoffset: 0, duration: dur, delay,
          ease: "power2.inOut", repeat: -1, repeatDelay: LOOP - dur,
          onRepeat() { gsap.set(el, { strokeDashoffset: len }); },
        });
      };

      drawPath(brainRef.current, 3.0, 0);
      drawPath(stemRef.current, 0.8, 2.2);

      edgeRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { strokeDasharray: 180, strokeDashoffset: 180, opacity: 0 });
        gsap.to(el, {
          strokeDashoffset: 0, opacity: 0.65,
          duration: 0.45, delay: 3.0 + i * 0.05,
          ease: "power1.out", repeat: -1, repeatDelay: LOOP - 0.45,
          onRepeat() { gsap.set(el, { strokeDashoffset: 180, opacity: 0 }); },
        });
      });

      nodeRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { scale: 0, opacity: 0, transformOrigin: "center center" });
        gsap.to(el, {
          scale: 1, opacity: 1, duration: 0.38,
          delay: 3.5 + i * 0.08, ease: "back.out(3.5)",
          repeat: -1, repeatDelay: LOOP - 0.38,
          onRepeat() { gsap.set(el, { scale: 0, opacity: 0 }); },
        });
        gsap.to(el, {
          scale: 1.7, opacity: 0.5,
          duration: 0.85 + (i % 6) * 0.13,
          delay: 5.0 + i * 0.09,
          repeat: -1, yoyo: true, ease: "sine.inOut",
        });
      });

      ringRefs.current.forEach((el, i) => {
        if (!el) return;
        const fire = () => {
          if (!el) return;
          gsap.set(el, { scale: 1, opacity: 0.9, transformOrigin: "center center" });
          gsap.to(el, { scale: 4.2, opacity: 0, duration: 1.6, ease: "power2.out" });
        };
        fire();
        const t1 = setTimeout(() => {
          fire();
          const id = setInterval(fire, 4500 + i * 300);
          timers.push(id);
        }, (1.8 + i * 0.7) * 1000);
        timers.push(t1 as unknown as ReturnType<typeof setInterval>);
      });

      SIGNAL_SEQS.forEach((seq, si) => {
        const el = sigRefs.current[si];
        if (!el) return;
        const points = seq.map(ni => ({ x: NODES[ni].x, y: NODES[ni].y }));
        const dur = 1.8 + si * 0.4;
        const startDelay = 3.8 + si * 0.8;

        const animate = (extraDelay: number) => {
          const proxy = { t: 0 };
          gsap.set(el, { opacity: 0 });
          const s = lerpAlongPolyline(points, 0);
          el.setAttribute("cx", String(s.x));
          el.setAttribute("cy", String(s.y));
          gsap.to(proxy, {
            t: 1, duration: dur, delay: extraDelay, ease: "none",
            onStart() { gsap.to(el, { opacity: 1, duration: 0.15 }); },
            onUpdate() {
              const pos = lerpAlongPolyline(points, proxy.t);
              el.setAttribute("cx", String(pos.x));
              el.setAttribute("cy", String(pos.y));
              if (proxy.t > 0.85) {
                gsap.to(el, { opacity: 0, duration: 0.2, overwrite: "auto" });
              }
            },
            onComplete() { gsap.set(el, { opacity: 0 }); },
          });
        };

        animate(startDelay);
        const id = setInterval(() => animate(0), LOOP * 1000);
        timers.push(id);
      });

      const orbitEl = orbitRef.current;
      if (orbitEl) {
        const proxy = { t: 0 };
        gsap.set(orbitEl, { opacity: 0 });
        gsap.delayedCall(4.5, () => {
          gsap.to(orbitEl, { opacity: 0.9, duration: 0.5 });
          gsap.to(proxy, {
            t: 1, duration: 5.0, ease: "none", repeat: -1,
            onUpdate() {
              const p = posOnEllipse(64, 66, 62, 16, -15, proxy.t);
              orbitEl.setAttribute("cx", String(p.x));
              orbitEl.setAttribute("cy", String(p.y));
            },
          });
          gsap.to(orbitEl, {
            attr: { r: 5.2 }, opacity: 0.35,
            duration: 0.8, repeat: -1, yoyo: true, ease: "sine.inOut",
          });
        });
      }

      const scanEl = scanRef.current;
      if (scanEl) {
        const fireScan = () => {
          gsap.set(scanEl, { opacity: 0.5, attr: { y1: 8, y2: 8 } });
          gsap.to(scanEl, { attr: { y1: 122, y2: 122 }, opacity: 0, duration: 2.2, ease: "power1.inOut" });
        };
        fireScan();
        const id = setInterval(fireScan, LOOP * 1000);
        timers.push(id);
      }

    }, svgRef);

    return () => {
      ctx.revert();
      timers.forEach(id => clearInterval(id));
    };
  }, []);

  return (
    <Link to="/" className={`flex items-center gap-3 select-none ${className}`}>
      <svg
        ref={svgRef}
        viewBox="0 0 128 152"
        width="62"
        height="72"
        style={{ overflow: "visible" }}
        aria-label="Career AI brain logo"
      >
        <defs>
          <filter id="gXL" x="-250%" y="-250%" width="600%" height="600%">
            <feGaussianBlur stdDeviation="6" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="gL" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="3.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="gM" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="gS" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.0" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="stemGlow" x="-80%" y="-40%" width="260%" height="180%">
            <feGaussianBlur stdDeviation="2.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="scanGlow" x="-20%" y="-200%" width="140%" height="500%">
            <feGaussianBlur stdDeviation="1.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <radialGradient id="brainAura" cx="50%" cy="42%" r="55%">
            <stop offset="0%"   stopColor={I400} stopOpacity="0.22"/>
            <stop offset="70%"  stopColor={I500} stopOpacity="0.08"/>
            <stop offset="100%" stopColor={I400} stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="hubGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1"/>
            <stop offset="100%" stopColor={I300} stopOpacity="0.8"/>
          </radialGradient>
          <linearGradient id="stemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor={I500}/>
            <stop offset="100%" stopColor={I700}/>
          </linearGradient>
          <clipPath id="brainClip">
            <path d="M 64 6 C 44 4 20 16 14 38 C 8 56 14 72 20 84 C 24 92 26 98 24 106 C 22 114 28 124 40 128 C 50 132 58 130 64 128 C 70 130 78 132 88 128 C 100 124 106 114 104 106 C 102 98 104 92 108 84 C 114 72 120 56 114 38 C 108 16 84 4 64 6 Z"/>
          </clipPath>
        </defs>

        <ellipse cx="64" cy="66" rx="58" ry="64" fill="url(#brainAura)"/>

        <ellipse cx="64" cy="66" rx="62" ry="16"
          fill="none" stroke={I200} strokeWidth="0.75"
          strokeDasharray="5 7" opacity="0.28"
          transform="rotate(-15 64 66)"
          filter="url(#gS)"/>

        <line ref={scanRef}
          x1="12" y1="8" x2="116" y2="8"
          stroke={I100} strokeWidth="1.0" opacity="0"
          clipPath="url(#brainClip)"
          filter="url(#scanGlow)"/>

        <path
          ref={brainRef}
          d="M 64 6 C 44 4 20 16 14 38 C 8 56 14 72 20 84 C 24 92 26 98 24 106 C 22 114 28 124 40 128 C 50 132 58 130 64 128 C 70 130 78 132 88 128 C 100 124 106 114 104 106 C 102 98 104 92 108 84 C 114 72 120 56 114 38 C 108 16 84 4 64 6 Z"
          fill="none"
          stroke={I500}
          strokeWidth="3.0"
          strokeLinejoin="round"
          filter="url(#gS)"
        />

        <line x1="64" y1="6" x2="64" y2="128"
          stroke={I300} strokeWidth="1.0"
          strokeDasharray="3.5 4.5" opacity="0.35"/>

        <path d="M 44 112 Q 64 120 84 112"
          fill="none" stroke={I400} strokeWidth="2.2"
          strokeLinecap="round" opacity="0.65"/>

        <path
          ref={stemRef}
          d="M 56 128 C 55 134 54 138 55 142 C 56 145 58 147 60 148 C 62 149 66 149 68 148 C 70 147 72 145 73 142 C 74 138 73 134 72 128"
          fill="none"
          stroke="url(#stemGrad)"
          strokeWidth="5.0"
          strokeLinecap="round"
          filter="url(#stemGlow)"
        />
        <path d="M 52 138 Q 64 143 76 138"
          fill="none" stroke={I500} strokeWidth="3.0"
          strokeLinecap="round" opacity="0.7"/>

        <g clipPath="url(#brainClip)">
          {EDGES.map(([a, b], i) => {
            const na = NODES[a], nb = NODES[b];
            const dist = Math.hypot(nb.x - na.x, nb.y - na.y);
            const isShort = dist < 28;
            return (
              <line
                key={`e${i}`}
                ref={el => { edgeRefs.current[i] = el; }}
                x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke={isShort ? I400 : I300}
                strokeWidth={isShort ? 1.2 : 0.9}
                strokeLinecap="round"
                opacity="0"
              />
            );
          })}

          {NODES.map((n, i) => {
            const isHub = HUB_IDS.includes(i);
            const isSpark = i === 9;
            return (
              <React.Fragment key={`node${i}`}>
                {isHub && (
                  <circle
                    ref={el => { ringRefs.current[HUB_IDS.indexOf(i)] = el; }}
                    cx={n.x} cy={n.y}
                    r={n.r + 2.0}
                    fill="none"
                    stroke={isSpark ? SPARK : I300}
                    strokeWidth="1.4"
                    opacity="0"
                    filter="url(#gL)"
                  />
                )}
                <circle
                  ref={el => { nodeRefs.current[i] = el; }}
                  cx={n.x} cy={n.y} r={n.r}
                  fill={isSpark ? SPARK : isHub ? "url(#hubGrad)" : I400}
                  opacity={isSpark ? 1 : isHub ? 0.95 : 0.85}
                  filter={isSpark ? "url(#gXL)" : isHub ? "url(#gL)" : "url(#gM)"}
                />
              </React.Fragment>
            );
          })}
        </g>

        {SIGNAL_SEQS.map((seq, si) => (
          <circle
            key={`sig${si}`}
            ref={el => { sigRefs.current[si] = el; }}
            cx={NODES[seq[0]].x}
            cy={NODES[seq[0]].y}
            r={si === 0 ? 3.4 : si === 2 ? 3.0 : 2.4}
            fill={si === 0 ? SPARK : si === 2 ? I100 : I300}
            filter={si < 2 ? "url(#gXL)" : "url(#gL)"}
            opacity="0"
          />
        ))}

        <circle
          ref={orbitRef}
          cx="64" cy="52" r="2.8"
          fill={I200}
          filter="url(#gL)"
          opacity="0"
        />
      </svg>

      {showText && sidebarOpen && (
        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              className="text-slate-900 dark:text-white"
              style={{
                fontSize: "21px",
                fontWeight: 800,
                letterSpacing: "-0.045em",
                fontFamily: "'Inter var','Inter',system-ui,sans-serif",
                lineHeight: 1,
              }}
            >
              Career
            </span>
            <span style={{
              fontSize: "11px",
              fontWeight: 800,
              color: "#ffffff",
              background: `linear-gradient(135deg, ${I500}, ${I700})`,
              padding: "2.5px 8px 3px",
              borderRadius: "7px",
              fontFamily: "'Inter var','Inter',system-ui,sans-serif",
              letterSpacing: "0.07em",
              lineHeight: 1.5,
              boxShadow: `0 2px 14px ${I400}66, inset 0 1px 0 rgba(255,255,255,0.2)`,
            }}>
              AI
            </span>
          </div>
          <span style={{
            fontSize: "8.5px",
            fontWeight: 600,
            letterSpacing: "0.34em",
            textTransform: "uppercase" as const,
            color: I300,
            fontFamily: "'Inter var','Inter',system-ui,sans-serif",
            lineHeight: 1,
          }}>
            Consultant
          </span>
        </div>
      )}
    </Link>
  );
};