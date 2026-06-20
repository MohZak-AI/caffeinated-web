const STREAMS = [
  {
    id: "react-to-startup",
    d: "M120,560 C140,470 130,370 80,270 C55,215 40,170 80,132",
    stroke: "url(#stream-gradient)",
    className: "animate-stream",
  },
  {
    id: "node-to-coding",
    d: "M620,560 C590,455 540,370 420,315 C315,267 245,207 194,132",
    stroke: "#7c3cff",
    className: "animate-stream-slow",
  },
  {
    id: "code-to-scale",
    d: "M390,560 C445,455 560,355 625,270 C675,205 705,158 705,132",
    stroke: "#ff5ebc",
    className: "animate-stream-pulse",
  },
] as const;

export function DataStreamLayer() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="stream-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#16d8c2" stopOpacity="0" />
          <stop offset="50%" stopColor="#62f3ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#16d8c2" stopOpacity="0" />
        </linearGradient>
      </defs>
      {STREAMS.map((stream) => (
        <path
          key={stream.id}
          data-testid={`code-service-stream-${stream.id}`}
          d={stream.d}
          fill="none"
          stroke={stream.stroke}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="14 18"
          className={stream.className}
          style={{ opacity: 0.68 }}
        />
      ))}
    </svg>
  );
}
