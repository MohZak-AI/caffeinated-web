"use client";

import { motion, useReducedMotion } from "motion/react";
import { landingContent } from "@/app/_content/landing";

export function AnimatedAgencyIllustration() {
  const reduceMotion = useReducedMotion();
  const float = reduceMotion
    ? {}
    : {
        y: [0, -12, 0],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const },
      };
  const pulse = reduceMotion
    ? {}
    : {
        opacity: [0.6, 1, 0.6],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
      };
  const spin = reduceMotion
    ? {}
    : {
        rotate: 360,
        transition: { duration: 12, repeat: Infinity, ease: "linear" as const },
      };

  return (
    <svg
      role="img"
      aria-labelledby="illustration-title illustration-desc"
      viewBox="0 0 800 640"
      className="h-auto w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="illustration-title">{landingContent.illustration.title}</title>
      <desc id="illustration-desc">
        {landingContent.illustration.description}
      </desc>

      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff8e7" />
          <stop offset="100%" stopColor="#e8f4ff" />
        </linearGradient>
        <linearGradient id="streamGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#16d8c2" />
          <stop offset="50%" stopColor="#62f3ff" />
          <stop offset="100%" stopColor="#7c3cff" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="800" height="640" fill="url(#bgGrad)" rx="40" />

      {/* Doha skyline motif */}
      <g aria-hidden="true" opacity="0.15">
        <path
          d="M0 640 L0 580 L30 580 L30 540 L50 540 L50 590 L70 590 L70 510 L100 510 L100 590 L120 590 L120 550 L150 550 L150 590 L180 590 L180 520 L210 520 L210 590 L240 590 L240 560 L260 560 L260 590 L300 590 L300 500 L340 500 L340 590 L380 590 L380 540 L420 540 L420 590 L460 590 L460 505 L500 505 L500 590 L540 590 L540 555 L570 555 L570 590 L600 590 L600 515 L630 515 L630 590 L660 590 L660 545 L690 545 L690 590 L720 590 L720 525 L750 525 L750 590 L780 590 L780 560 L800 560 L800 640 Z"
          fill="#ff8a2a"
        />
      </g>
      <g stroke="#24194a" strokeOpacity="0.08" strokeWidth="2">
        {[...Array(9)].map((_, i) => (
          <line key={`v${i}`} x1={100 + i * 80} y1="0" x2={100 + i * 80} y2="600" />
        ))}
        {[...Array(8)].map((_, i) => (
          <line key={`h${i}`} x1="0" y1={80 + i * 70} x2="800" y2={80 + i * 70} />
        ))}
      </g>

      {/* Data streams */}
      <g fill="none" stroke="url(#streamGrad)" strokeWidth="4" strokeLinecap="round" filter="url(#glow)">
        <motion.path
          d="M120 180 C 220 180, 260 280, 360 280"
          animate={reduceMotion ? {} : { strokeDashoffset: [0, -60] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" as const }}
          strokeDasharray="20 40"
        />
        <motion.path
          d="M680 180 C 580 180, 540 280, 440 280"
          animate={reduceMotion ? {} : { strokeDashoffset: [0, 60] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" as const }}
          strokeDasharray="20 40"
        />
        <motion.path
          d="M200 420 C 300 420, 350 320, 400 320"
          animate={reduceMotion ? {} : { strokeDashoffset: [0, -50] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" as const }}
          strokeDasharray="15 35"
        />
        <motion.path
          d="M600 420 C 500 420, 450 320, 400 320"
          animate={reduceMotion ? {} : { strokeDashoffset: [0, 50] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" as const }}
          strokeDasharray="15 35"
        />
      </g>

      {/* Floating screens */}
      <motion.g animate={float}>
        <rect x="80" y="80" width="160" height="110" rx="18" fill="#7c3cff" stroke="#24194a" strokeWidth="3" />
        <rect x="95" y="95" width="130" height="80" rx="10" fill="#15112b" />
        <text x="105" y="125" fill="#62f3ff" fontFamily="var(--font-geist-mono)" fontSize="12">
          {landingContent.codeMotifs.react}
        </text>
        <text x="105" y="145" fill="#16d8c2" fontFamily="var(--font-geist-mono)" fontSize="10">
          {"<motion.div"}
        </text>
        <text x="105" y="160" fill="#ffffff" fontFamily="var(--font-geist-mono)" fontSize="10">
          {"  animate={{ y: 0 }}"}
        </text>
      </motion.g>

      <motion.g
        animate={
          reduceMotion
            ? {}
            : { y: [0, -10, 0], transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const } }
        }
      >
        <rect x="560" y="90" width="160" height="110" rx="18" fill="#29a7ff" stroke="#24194a" strokeWidth="3" />
        <rect x="575" y="105" width="130" height="80" rx="10" fill="#15112b" />
        <text x="585" y="135" fill="#ffd84d" fontFamily="var(--font-geist-mono)" fontSize="12">
          {landingContent.codeMotifs.node}
        </text>
        <text x="585" y="155" fill="#ff8a2a" fontFamily="var(--font-geist-mono)" fontSize="10">
          {"const app ="}
        </text>
        <text x="585" y="170" fill="#ffffff" fontFamily="var(--font-geist-mono)" fontSize="10">
          {"  express()"}
        </text>
      </motion.g>

      <motion.g
        animate={
          reduceMotion
            ? {}
            : { y: [0, -14, 0], transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" as const, delay: 0.5 } }
        }
      >
        <rect x="300" y="40" width="200" height="90" rx="18" fill="#ffffff" stroke="#24194a" strokeWidth="3" />
        <rect x="315" y="55" width="170" height="20" rx="6" fill="#ff5ebc" />
        <rect x="315" y="85" width="120" height="12" rx="4" fill="#16d8c2" />
        <rect x="315" y="105" width="90" height="12" rx="4" fill="#ffd84d" />
      </motion.g>

      {/* Central desk/table */}
      <path d="M180 460 L620 460 L640 520 L160 520 Z" fill="#16d8c2" stroke="#24194a" strokeWidth="3" />
      <rect x="170" y="520" width="30" height="60" fill="#24194a" />
      <rect x="600" y="520" width="30" height="60" fill="#24194a" />

      {/* Characters */}
      <g transform="translate(240, 320)">
        {/* Character 1 - coder */}
        <circle cx="40" cy="40" r="35" fill="#ff8a2a" stroke="#24194a" strokeWidth="3" />
        <circle cx="28" cy="35" r="4" fill="#24194a" />
        <circle cx="52" cy="35" r="4" fill="#24194a" />
        <path d="M28 55 Q40 65 52 55" fill="none" stroke="#24194a" strokeWidth="3" strokeLinecap="round" />
        <rect x="5" y="75" width="70" height="70" rx="16" fill="#7c3cff" stroke="#24194a" strokeWidth="3" />
        <rect x="40" y="100" width="55" height="35" rx="6" fill="#15112b" stroke="#24194a" strokeWidth="2" transform="rotate(-10 67 117)" />
        <rect x="50" y="108" width="35" height="4" rx="2" fill="#62f3ff" transform="rotate(-10 67 117)" />
        <rect x="50" y="118" width="25" height="4" rx="2" fill="#16d8c2" transform="rotate(-10 67 117)" />
      </g>

      <g transform="translate(360, 300)">
        {/* Character 2 - designer */}
        <circle cx="40" cy="40" r="35" fill="#16d8c2" stroke="#24194a" strokeWidth="3" />
        <circle cx="28" cy="35" r="4" fill="#24194a" />
        <circle cx="52" cy="35" r="4" fill="#24194a" />
        <path d="M28 55 Q40 65 52 55" fill="none" stroke="#24194a" strokeWidth="3" strokeLinecap="round" />
        <rect x="5" y="75" width="70" height="70" rx="16" fill="#ff5ebc" stroke="#24194a" strokeWidth="3" />
        <rect x="-15" y="105" width="45" height="30" rx="6" fill="#ffffff" stroke="#24194a" strokeWidth="2" />
        <rect x="-8" y="112" width="30" height="4" rx="2" fill="#7c3cff" />
        <rect x="-8" y="122" width="20" height="4" rx="2" fill="#29a7ff" />
      </g>

      <g transform="translate(480, 320)">
        {/* Character 3 - planner */}
        <circle cx="40" cy="40" r="35" fill="#ffd84d" stroke="#24194a" strokeWidth="3" />
        <circle cx="28" cy="35" r="4" fill="#24194a" />
        <circle cx="52" cy="35" r="4" fill="#24194a" />
        <path d="M28 55 Q40 65 52 55" fill="none" stroke="#24194a" strokeWidth="3" strokeLinecap="round" />
        <rect x="5" y="75" width="70" height="70" rx="16" fill="#29a7ff" stroke="#24194a" strokeWidth="3" />
        <circle cx="60" cy="95" r="18" fill="#ffffff" stroke="#24194a" strokeWidth="2" />
        <path d="M60 85 L60 95 L68 100" fill="none" stroke="#24194a" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Rocket */}
      <motion.g
        animate={
          reduceMotion
            ? {}
            : { y: [0, -18, 0], rotate: [-3, 3, -3], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const } }
        }
      >
        <g transform="translate(680, 360)">
          <path d="M0 70 L25 0 L50 70 L25 55 Z" fill="#ff8a2a" stroke="#24194a" strokeWidth="3" />
          <circle cx="25" cy="28" r="12" fill="#ffffff" stroke="#24194a" strokeWidth="2" />
          <circle cx="25" cy="28" r="6" fill="#62f3ff" />
          <path d="M-10 70 L0 50 L15 70 Z" fill="#ffd84d" stroke="#24194a" strokeWidth="2" />
          <path d="M50 70 L60 50 L75 70 Z" fill="#ffd84d" stroke="#24194a" strokeWidth="2" />
          <motion.path
            d="M15 75 L25 105 L35 75 Z"
            fill="#ff5ebc"
            stroke="#24194a"
            strokeWidth="2"
            animate={reduceMotion ? {} : { scaleY: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" as const }}
          />
        </g>
      </motion.g>

      {/* Gears */}
      <motion.g animate={spin} style={{ originX: "120px", originY: "500px" }}>
        <g transform="translate(120, 500)">
          <circle r="28" fill="#ffd84d" stroke="#24194a" strokeWidth="3" />
          <circle r="10" fill="#ffffff" stroke="#24194a" strokeWidth="2" />
          {[...Array(8)].map((_, i) => (
            <rect
              key={i}
              x="-4"
              y="-34"
              width="8"
              height="12"
              rx="2"
              fill="#ff8a2a"
              stroke="#24194a"
              strokeWidth="2"
              transform={`rotate(${i * 45})`}
            />
          ))}
        </g>
      </motion.g>

      <motion.g
        animate={
          reduceMotion
            ? {}
            : { rotate: -360, transition: { duration: 16, repeat: Infinity, ease: "linear" as const } }
        }
        style={{ originX: "680px", originY: "500px" }}
      >
        <g transform="translate(680, 500)">
          <circle r="22" fill="#16d8c2" stroke="#24194a" strokeWidth="3" />
          <circle r="8" fill="#ffffff" stroke="#24194a" strokeWidth="2" />
          {[...Array(6)].map((_, i) => (
            <rect
              key={i}
              x="-3"
              y="-28"
              width="6"
              height="10"
              rx="2"
              fill="#7c3cff"
              stroke="#24194a"
              strokeWidth="2"
              transform={`rotate(${i * 60})`}
            />
          ))}
        </g>
      </motion.g>

      {/* Service icons */}
      <g transform="translate(60, 560)" data-testid="illustration-service-startup">
        {/* Startup acceleration - flying office */}
        <motion.g
          animate={reduceMotion ? {} : { y: [0, -6, 0], transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" as const } }}
        >
          <rect x="0" y="10" width="60" height="40" rx="8" fill="#ffffff" stroke="#24194a" strokeWidth="3" />
          <rect x="8" y="20" width="18" height="18" rx="4" fill="#29a7ff" />
          <rect x="32" y="20" width="20" height="8" rx="2" fill="#16d8c2" />
          <path d="M-10 50 L-18 60 M70 50 L78 60" stroke="#24194a" strokeWidth="3" strokeLinecap="round" />
        </motion.g>
      </g>

      <g transform="translate(360, 560)" data-testid="illustration-service-coding">
        {/* Custom coding - robot typing */}
        <motion.g
          animate={reduceMotion ? {} : { y: [0, -6, 0], transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" as const, delay: 0.3 } }}
        >
          <rect x="10" y="0" width="40" height="35" rx="10" fill="#7c3cff" stroke="#24194a" strokeWidth="3" />
          <circle cx="22" cy="14" r="4" fill="#62f3ff" />
          <circle cx="38" cy="14" r="4" fill="#62f3ff" />
          <rect x="8" y="22" width="14" height="3" rx="1.5" fill="#ffffff" />
          <rect x="30" y="22" width="22" height="3" rx="1.5" fill="#ffffff" />
          <rect x="0" y="38" width="60" height="22" rx="6" fill="#15112b" stroke="#24194a" strokeWidth="3" />
          <rect x="8" y="46" width="44" height="6" rx="2" fill="#16d8c2" />
        </motion.g>
      </g>

      <g transform="translate(660, 560)" data-testid="illustration-service-scalable">
        {/* Scalable solutions - growing structures */}
        <motion.g
          animate={reduceMotion ? {} : { y: [0, -6, 0], transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" as const, delay: 0.6 } }}
        >
          <rect x="20" y="30" width="20" height="30" rx="4" fill="#ff8a2a" stroke="#24194a" strokeWidth="3" />
          <rect x="0" y="20" width="20" height="40" rx="4" fill="#16d8c2" stroke="#24194a" strokeWidth="3" />
          <rect x="40" y="10" width="20" height="50" rx="4" fill="#29a7ff" stroke="#24194a" strokeWidth="3" />
          <motion.path
            d="M10 20 L30 10 L50 0"
            fill="none"
            stroke="#24194a"
            strokeWidth="3"
            strokeLinecap="round"
            animate={reduceMotion ? {} : { pathLength: [0, 1], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const } }}
          />
        </motion.g>
      </g>

      {/* Decorative flourishes */}
      <g aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={i}
            cx={60 + i * 170}
            cy={30 + (i % 2) * 20}
            r="6"
            fill="#ffd84d"
            stroke="#24194a"
            strokeWidth="2"
            animate={pulse}
          />
        ))}
        <motion.circle cx="30" cy="300" r="8" fill="#ff5ebc" stroke="#24194a" strokeWidth="2" animate={pulse} />
        <motion.circle cx="770" cy="250" r="6" fill="#16d8c2" stroke="#24194a" strokeWidth="2" animate={pulse} />
        <path d="M50 120 Q80 90 110 120 T170 120" fill="none" stroke="#b86cff" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        <path d="M630 140 Q660 110 690 140 T750 140" fill="none" stroke="#b86cff" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      </g>
    </svg>
  );
}
