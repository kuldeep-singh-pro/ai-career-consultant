import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

interface LogoProps {
  sidebarOpen?: boolean;
  showText?: boolean;
  className?: string;
}

const NODES = [
  { id: 0,  x: 64,  y: 14,  r: 3.2 },
  { id: 1,  x: 42,  y: 20,  r: 2.6 },
  { id: 2,  x: 86,  y: 20,  r: 2.6 },
  { id: 3,  x: 26,  y: 36,  r: 2.4 },
  { id: 4,  x: 50,  y: 30,  r: 2.8 },
  { id: 5,  x: 78,  y: 30,  r: 2.8 },
  { id: 6,  x: 102, y: 36,  r: 2.4 },
  { id: 7,  x: 18,  y: 56,  r: 2.2 },
  { id: 8,  x: 38,  y: 48,  r: 2.6 },
  { id: 9,  x: 64,  y: 44,  r: 3.6 },
  { id: 10, x: 90,  y: 48,  r: 2.6 },
  { id: 11, x: 110, y: 56,  r: 2.2 },
  { id: 12, x: 22,  y: 76,  r: 2.2 },
  { id: 13, x: 44,  y: 68,  r: 2.4 },
  { id: 14, x: 64,  y: 64,  r: 2.8 },
  { id: 15, x: 84,  y: 68,  r: 2.4 },
  { id: 16, x: 106, y: 76,  r: 2.2 },
  { id: 17, x: 30,  y: 94,  r: 2.0 },
  { id: 18, x: 50,  y: 86,  r: 2.2 },
  { id: 19, x: 64,  y: 82,  r: 2.6 },
  { id: 20, x: 78,  y: 86,  r: 2.2 },
  { id: 21, x: 98,  y: 94,  r: 2.0 },
  { id: 22, x: 40,  y: 104, r: 1.8 },
  { id: 23, x: 64,  y: 100, r: 2.2 },
  { id: 24, x: 88,  y: 104, r: 1.8 },
  { id: 25, x: 52,  y: 116, r: 1.6 },
  { id: 26, x: 64,  y: 118, r: 2.0 },
  { id: 27, x: 76,  y: 116, r: 1.6 },
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

export const Logo: React.FC<LogoProps> = ({
  sidebarOpen = true,
  showText    = true,
  className   = "",
}) => {
  const svgRef      = useRef<SVGSVGElement>(null);
  const brainRef    = useRef<SVGPathElement>(null);
  const stemRef     = useRef<SVGPathElement>(null);
  const edgeRefs    = useRef<(SVGLineElement | null)[]>([]);
  const nodeRefs    = useRef<(SVGCircleElement | null)[]>([]);
  const ringRefs    = useRef<(SVGCircleElement | null)[]>([]);
  const sigRefs     = useRef<(SVGCircleElement | null)[]>([]);
  const orbitRef    = useRef<SVGCircleElement>(null);
  const scanRef     = useRef<SVGLineElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const LOOP = 12.0;

      const drawPath = (el: SVGPathElement | null, dur: number, delay: number) => {
        if (!el) return;
        const len = el.getTotalLength?.() ?? 400;
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(el, {
          strokeDashoffset: 0, duration: dur, delay,
          ease: "power2.inOut", repeat: -1, repeatDelay: LOOP - dur,
          onRepeat: () => gsap.set(el, { strokeDashoffset: len }),
        });
      };

      drawPath(brainRef.current, 3.0, 0);
      drawPath(stemRef.current, 0.8, 2.2);

      edgeRefs.current.forEach((el, i) => {
        if (!el) return;
        const len = 180;
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
        gsap.to(el, {
          strokeDashoffset: 0, opacity: 0.6,
          duration: 0.45, delay: 3.0 + i * 0.05,
          ease: "power1.out", repeat: -1, repeatDelay: LOOP - 0.45,
          onRepeat: () => gsap.set(el, { strokeDashoffset: len, opacity: 0 }),
        });
      });

      nodeRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { scale: 0, opacity: 0, transformOrigin: "center center" });
        gsap.to(el, {
          scale: 1, opacity: 1, duration: 0.38,
          delay: 3.5 + i * 0.08,
          ease: "back.out(3.5)",
          repeat: -1, repeatDelay: LOOP - 0.38,
          onRepeat: () => gsap.set(el, { scale: 0, opacity: 0 }),
        });
        gsap.to(el, {
          scale: 1.6, opacity: 0.5,
          duration: 0.85 + (i % 6) * 0.13,
          delay: 5.0 + i * 0.09,
          repeat: -1, yoyo: true, ease: "sine.inOut",
        });
      });

      ringRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { scale: 1, opacity: 0, transformOrigin: "center center" });
        const fire = () => {
          gsap.set(el, { scale: 1, opacity: 0.9 });
          gsap.to(el, { scale: 3.8, opacity: 0, duration: 1.4, ease: "power2.out" });
        };
        fire();
        gsap.delayedCall(1.8 + i * 0.7, () => {
          fire();
          setInterval(fire, 4.5 + i * 0.3);
        });
      });

      SIGNAL_SEQS.forEach((seq, si) => {
        const el = sigRefs.current[si];
        if (!el) return;
        const pathId = `#sigp${si}`;
        const dur = 1.8 + si * 0.4;
        const startAt = 3.8 + si * 0.8;
        gsap.set(el, { opacity: 0 });
        gsap.to(el, {
          motionPath: { path: pathId, align: pathId, alignOrigin: [0.5, 0.5] },
          duration: dur, delay: startAt, ease: "none",
          repeat: -1, repeatDelay: LOOP - dur,
        });
        gsap.to(el, {
          opacity: 1, duration: 0.15, delay: startAt,
          repeat: -1, repeatDelay: LOOP - 0.15,
        });
        gsap.to(el, {
          opacity: 0, duration: 0.2, delay: startAt + dur - 0.25,
          repeat: -1, repeatDelay: LOOP - 0.2,
        });
      });

      gsap.to(orbitRef.current, {
        motionPath: { path: "#orbitEllipse", align: "#orbitEllipse", alignOrigin: [0.5, 0.5] },
        duration: 5.0, delay: 4.5, ease: "none", repeat: -1,
      });
      gsap.to(orbitRef.current, {
        scale: 2.0, opacity: 0.5, duration: 0.8,
        delay: 4.5, repeat: -1, yoyo: true, ease: "sine.inOut",
        transformOrigin: "center center",
      });

      gsap.set(scanRef.current, { opacity: 0, attr: { y1: 8, y2: 8 } });
      const fireScan = () => {
        gsap.set(scanRef.current, { opacity: 0.5, attr: { y1: 8, y2: 8 } });
        gsap.to(scanRef.current, {
          attr: { y1: 122, y2: 122 }, opacity: 0,
          duration: 2.0, ease: "power1.inOut",
        });
      };
      fireScan();
      gsap.delayedCall(0.3, () => setInterval(fireScan, LOOP));

    }, svgRef);
    return () => ctx.revert();
  }, []);

  const buildSigD = (seq: number[]) =>
    seq.map((ni, i) => `${i === 0 ? "M" : "L"} ${NODES[ni].x} ${NODES[ni].y}`).join(" ");

  const I900 = "#1E1B4B";
  const I700 = "#3730A3";
  const I500 = "#4F46E5";
  const I400 = "#6366F1";
  const I300 = "#818CF8";
  const I200 = "#A5B4FC";
  const I100 = "#C7D2FE";
  const SPARK = "#FFFFFF";

  const HUB_IDS = [9, 14, 0, 19, 23];

  return (
    <Link to="/" className={`flex items-center gap-3 select-none ${className}`}>
      <svg
        ref={svgRef}
        viewBox="0 0 128 148"
        width="60"
        height="70"
        style={{ overflow: "visible" }}
        aria-label="Career AI brain logo"
      >
        <defs>
          <filter id="gXL" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="gL" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="gM" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="gS" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="0.8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          <radialGradient id="brainAura" cx="50%" cy="45%" r="52%">
            <stop offset="0%"   stopColor={I400} stopOpacity="0.18"/>
            <stop offset="100%" stopColor={I400} stopOpacity="0"/>
          </radialGradient>

          <clipPath id="brainClip">
            <path d="
              M 64 6
              C 44 4  20 16  14 38
              C 8  56  14 72  20 84
              C 24 92  26 98  24 106
              C 22 114  28 124  40 128
              C 50 132  58 130  64 128
              C 70 130  78 132  88 128
              C 100 124  106 114  104 106
              C 102 98  104 92  108 84
              C 114 72  120 56  114 38
              C 108 16  84 4   64 6 Z
            "/>
          </clipPath>

          <ellipse id="orbitEllipse" cx="64" cy="66"
            rx="58" ry="14" fill="none" stroke="none"
            transform="rotate(-15 64 66)"/>

          {SIGNAL_SEQS.map((seq, si) => (
            <path key={`spd${si}`} id={`sigp${si}`}
              d={buildSigD(seq)} fill="none" stroke="none"/>
          ))}
        </defs>

        <ellipse cx="64" cy="66" rx="56" ry="62"
          fill="url(#brainAura)"/>

        <ellipse cx="64" cy="66" rx="62" ry="16"
          fill="none" stroke={I200} strokeWidth="0.7"
          strokeDasharray="5 7" opacity="0.3"
          transform="rotate(-15 64 66)"
          filter="url(#gS)"/>

        <line ref={scanRef}
          x1="12" y1="8" x2="116" y2="8"
          stroke={I100} strokeWidth="0.8" opacity="0"
          clipPath="url(#brainClip)"/>

        <path
          ref={brainRef}
          d="
            M 64 6
            C 44 4  20 16  14 38
            C 8  56  14 72  20 84
            C 24 92  26 98  24 106
            C 22 114  28 124  40 128
            C 50 132  58 130  64 128
            C 70 130  78 132  88 128
            C 100 124  106 114  104 106
            C 102 98  104 92  108 84
            C 114 72  120 56  114 38
            C 108 16  84 4   64 6 Z
          "
          fill="none"
          stroke={I500}
          strokeWidth="2.8"
          strokeLinejoin="round"
          filter="url(#gS)"
        />

        <line x1="64" y1="6" x2="64" y2="128"
          stroke={I300} strokeWidth="1.0"
          strokeDasharray="3.5 4.5" opacity="0.4"/>

        <path d="M 44 112 Q 64 120 84 112"
          fill="none" stroke={I400} strokeWidth="2"
          strokeLinecap="round" opacity="0.7"/>

        <path
          ref={stemRef}
          d="
            M 56 128 C 55 134 54 138 55 142
            C 56 145  58 147  60 148
            C 62 149  66 149  68 148
            C 70 147  72 145  73 142
            C 74 138  73 134  72 128
          "
          fill="none"
          stroke={I700}
          strokeWidth="4.5"
          strokeLinecap="round"
          filter="url(#gS)"
        />
        <path d="M 52 138 Q 64 143 76 138"
          fill="none" stroke={I500} strokeWidth="2.8"
          strokeLinecap="round" opacity="0.75"/>

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
                strokeWidth={isShort ? 1.1 : 0.8}
                strokeLinecap="round"
                opacity="0"
              />
            );
          })}

          {NODES.map((n, i) => {
            const isHub = HUB_IDS.includes(i);
            return (
              <React.Fragment key={`node${i}`}>
                {isHub && (
                  <circle
                    ref={el => { ringRefs.current[HUB_IDS.indexOf(i)] = el; }}
                    cx={n.x} cy={n.y}
                    r={n.r + 1.5}
                    fill="none"
                    stroke={i === 9 ? SPARK : I300}
                    strokeWidth="1.2"
                    opacity="0"
                    filter="url(#gL)"
                  />
                )}
                <circle
                  ref={el => { nodeRefs.current[i] = el; }}
                  cx={n.x} cy={n.y}
                  r={n.r}
                  fill={i === 9 ? SPARK : isHub ? I200 : I400}
                  filter={i === 9 ? "url(#gXL)" : isHub ? "url(#gL)" : "url(#gM)"}
                />
              </React.Fragment>
            );
          })}
        </g>

        {SIGNAL_SEQS.map((_, si) => (
          <circle
            key={`sig${si}`}
            ref={el => { sigRefs.current[si] = el; }}
            r={si === 0 ? 3.2 : si === 2 ? 2.8 : 2.2}
            fill={si === 0 ? SPARK : si === 2 ? I100 : I300}
            filter={si < 2 ? "url(#gXL)" : "url(#gL)"}
          />
        ))}

        <circle
          ref={orbitRef}
          cx="64" cy="52" r="2.6"
          fill={I200}
          filter="url(#gL)"
        />
      </svg>

      {showText && sidebarOpen && (
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span
              className="text-slate-900 dark:text-white"
              style={{
                fontSize: "20px",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                fontFamily: "'Inter var','Inter',system-ui,sans-serif",
                lineHeight: 1,
              }}
            >
              Career
            </span>
            <span style={{
              fontSize: "10.5px",
              fontWeight: 800,
              color: "#ffffff",
              background: I500,
              padding: "2px 7px 3px",
              borderRadius: "6px",
              fontFamily: "'Inter var','Inter',system-ui,sans-serif",
              letterSpacing: "0.06em",
              lineHeight: 1.5,
              boxShadow: `0 2px 12px ${I400}55`,
            }}>
              AI
            </span>
          </div>
          <span style={{
            fontSize: "8px",
            fontWeight: 600,
            letterSpacing: "0.32em",
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