import Header from './Header';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">

      {/* ── Background landscape ── */}
      <div className="fixed inset-0 -z-10">

        {/* Sky gradient */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #dff0e8 0%, #c8dfc0 30%, #b8d4aa 60%, #9fc090 100%)' }} />

        {/* Sun glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 rounded-full opacity-30"
          style={{ background: 'radial-gradient(ellipse, #ffffff 0%, transparent 70%)' }} />

        {/* Distant misty hills */}
        <svg className="absolute w-full" style={{ top: '18%' }} viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path d="M0 140 Q180 60 360 120 Q540 80 720 110 Q900 70 1080 115 Q1260 80 1440 130 L1440 200 L0 200 Z"
            fill="#c5dbb5" opacity="0.5" />
          <path d="M0 155 Q200 100 400 140 Q600 100 800 135 Q1000 105 1200 138 Q1350 115 1440 145 L1440 200 L0 200 Z"
            fill="#b5cf9f" opacity="0.6" />
        </svg>

        {/* Mid-ground trees (dark silhouette) */}
        <svg className="absolute w-full" style={{ top: '28%' }} viewBox="0 0 1440 180" preserveAspectRatio="none">
          {/* Tree cluster left */}
          <ellipse cx="60" cy="80" rx="28" ry="40" fill="#2d6b35" opacity="0.85" />
          <ellipse cx="95" cy="65" rx="22" ry="35" fill="#245a2c" opacity="0.9" />
          <ellipse cx="130" cy="72" rx="25" ry="38" fill="#2d6b35" opacity="0.8" />
          <rect x="87" y="100" width="8" height="30" fill="#1a4a20" opacity="0.9"/>
          {/* Tree cluster left-mid */}
          <ellipse cx="220" cy="75" rx="20" ry="32" fill="#356b3a" opacity="0.8" />
          <ellipse cx="250" cy="68" rx="24" ry="38" fill="#2d6b35" opacity="0.85" />
          <rect x="244" y="102" width="7" height="28" fill="#1a4a20" opacity="0.9"/>
          {/* Tree cluster right */}
          <ellipse cx="1310" cy="70" rx="28" ry="42" fill="#2d6b35" opacity="0.85" />
          <ellipse cx="1345" cy="62" rx="22" ry="36" fill="#245a2c" opacity="0.9" />
          <ellipse cx="1380" cy="68" rx="26" ry="40" fill="#2d6b35" opacity="0.8" />
          <rect x="1336" y="98" width="8" height="32" fill="#1a4a20" opacity="0.9"/>
          {/* Tree cluster right-mid */}
          <ellipse cx="1190" cy="76" rx="20" ry="30" fill="#356b3a" opacity="0.8" />
          <ellipse cx="1160" cy="68" rx="24" ry="36" fill="#2d6b35" opacity="0.85" />
          <rect x="1182" y="102" width="7" height="26" fill="#1a4a20" opacity="0.9"/>
          {/* Scattered mid trees */}
          <ellipse cx="500" cy="82" rx="16" ry="26" fill="#2d6b35" opacity="0.6" />
          <ellipse cx="530" cy="75" rx="14" ry="24" fill="#245a2c" opacity="0.65" />
          <ellipse cx="900" cy="80" rx="18" ry="28" fill="#2d6b35" opacity="0.6" />
          <ellipse cx="930" cy="72" rx="15" ry="25" fill="#245a2c" opacity="0.65" />
          <path d="M0 130 Q360 110 720 120 Q1080 112 1440 125 L1440 180 L0 180 Z" fill="#4a8c4a" opacity="0.5"/>
        </svg>

        {/* Foreground green fields with paths */}
        <svg className="absolute w-full" style={{ bottom: '0', top: '45%' }} viewBox="0 0 1440 400" preserveAspectRatio="none">
          {/* Base field */}
          <rect x="0" y="0" width="1440" height="400" fill="#5aA05a" />
          {/* Field strips - lighter patches */}
          <path d="M0 0 Q360 40 720 20 Q1080 0 1440 30 L1440 120 Q1080 90 720 110 Q360 130 0 100 Z"
            fill="#6ab56a" opacity="0.7" />
          <path d="M0 80 Q360 110 720 90 Q1080 70 1440 100 L1440 200 Q1080 175 720 190 Q360 205 0 180 Z"
            fill="#4e9650" opacity="0.8" />
          {/* Perspective paths / furrows */}
          <path d="M580 0 Q620 150 640 400" stroke="#3a7a3a" strokeWidth="6" fill="none" opacity="0.4"/>
          <path d="M680 0 Q720 150 740 400" stroke="#3a7a3a" strokeWidth="8" fill="none" opacity="0.4"/>
          <path d="M780 0 Q810 150 840 400" stroke="#3a7a3a" strokeWidth="6" fill="none" opacity="0.4"/>
          {/* Dirt path */}
          <path d="M600 0 Q660 200 680 400 Q700 200 760 0 Z" fill="#7ab87a" opacity="0.3"/>
          {/* Water reflection strip */}
          <path d="M0 50 Q360 30 720 45 Q1080 60 1440 40 L1440 80 Q1080 100 720 85 Q360 70 0 90 Z"
            fill="#a8cfa0" opacity="0.25" />
          {/* Darker foreground strip */}
          <path d="M0 320 Q360 300 720 310 Q1080 300 1440 315 L1440 400 L0 400 Z"
            fill="#3a7a3a" opacity="0.6" />
        </svg>

        {/* Mist / fog overlay at horizon */}
        <div className="absolute w-full h-32 opacity-40"
          style={{ top: '40%', background: 'linear-gradient(180deg, rgba(220,240,220,0.8) 0%, transparent 100%)' }} />

        {/* Overall light tint to keep UI readable */}
        <div className="absolute inset-0 opacity-20"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.15) 100%)' }} />

        {/* ── Decorative leaves bottom-left ── */}
        <svg className="absolute bottom-0 left-0 w-52 opacity-70" viewBox="0 0 180 260" fill="none">
          <path d="M10 260 C10 220 30 170 20 110 C50 140 60 190 40 260 Z" fill="#2d7a2d"/>
          <path d="M10 220 C10 220 30 170 20 110" stroke="#1a5a1a" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M35 260 C30 215 55 155 45 90 C80 125 85 180 60 260 Z" fill="#3a8a3a"/>
          <path d="M35 230 C35 230 55 175 45 90" stroke="#1a5a1a" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M0 260 C5 225 18 180 10 125 C38 152 40 200 20 260 Z" fill="#4aaa4a" opacity="0.8"/>
          <path d="M60 260 C52 230 70 185 62 140 C88 162 88 210 72 260 Z" fill="#2d7a2d" opacity="0.7"/>
        </svg>

        {/* ── Decorative leaves bottom-right ── */}
        <svg className="absolute bottom-0 right-0 w-52 opacity-70" viewBox="0 0 180 260" fill="none">
          <path d="M170 260 C170 220 150 170 160 110 C130 140 120 190 140 260 Z" fill="#2d7a2d"/>
          <path d="M170 220 C170 220 150 170 160 110" stroke="#1a5a1a" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M145 260 C150 215 125 155 135 90 C100 125 95 180 120 260 Z" fill="#3a8a3a"/>
          <path d="M145 230 C145 230 125 175 135 90" stroke="#1a5a1a" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M180 260 C175 225 162 180 170 125 C142 152 140 200 160 260 Z" fill="#4aaa4a" opacity="0.8"/>
          <path d="M120 260 C128 230 110 185 118 140 C92 162 92 210 108 260 Z" fill="#2d7a2d" opacity="0.7"/>
        </svg>

        {/* Birds silhouette */}
        <svg className="absolute opacity-25" style={{ top: '10%', left: '20%' }} viewBox="0 0 120 30" fill="none" width="100">
          <path d="M0 15 Q8 6 16 15 Q24 6 32 15" stroke="#1a4a20" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          <path d="M50 10 Q57 3 64 10 Q71 3 78 10" stroke="#1a4a20" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M90 18 Q95 13 100 18 Q105 13 110 18" stroke="#1a4a20" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        </svg>
      </div>

      {/* ── Header ── */}
      <Header />

      {/* ── Page content ── */}
      <main className="flex-1 flex items-start justify-center px-4 py-6 relative z-10">
        {children}
      </main>
    </div>
  );
}
