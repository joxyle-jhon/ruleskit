import * as React from "react";

export default function IcebergIllustration() {
  return (
    <div className="w-full h-full max-w-[650px] aspect-[800/650] relative animate-iceberg-float select-none pointer-events-none">
      <svg
        viewBox="0 0 800 650"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Primary Glow Filter */}
          <filter id="primary-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Accent Glow Filter */}
          <filter id="accent-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Waterline Gradient */}
          <linearGradient id="waterline-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0" />
            <stop offset="15%" stopColor="var(--color-primary)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--color-success)" stopOpacity="0.8" />
            <stop offset="85%" stopColor="var(--color-primary)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>

          {/* Peak Gradients */}
          <linearGradient id="peak-grad-1" x1="400" y1="60" x2="395" y2="250" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="peak-grad-2" x1="400" y1="60" x2="310" y2="250" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="peak-grad-3" x1="400" y1="60" x2="490" y2="250" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.02" />
          </linearGradient>

          {/* Base Gradients */}
          <linearGradient id="base-grad-1" x1="320" y1="250" x2="300" y2="500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="base-grad-2" x1="400" y1="250" x2="400" y2="560" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Ambient Back Glows behind the Iceberg */}
        <circle cx="400" cy="180" r="130" fill="var(--color-primary)" opacity="0.04" filter="url(#primary-glow)" />
        <circle cx="400" cy="400" r="180" fill="var(--color-accent)" opacity="0.06" filter="url(#accent-glow)" />

        {/* ================= ABOVE WATER (PEAK) ================= */}
        <g id="iceberg-peak">
          {/* Main Peak Facets */}
          <polygon points="400,60 330,160 460,180" fill="url(#peak-grad-1)" stroke="var(--color-primary)" strokeWidth="1.5" filter="url(#primary-glow)" />
          <polygon points="400,60 280,250 330,160" fill="url(#peak-grad-2)" stroke="var(--color-primary)" strokeWidth="1" strokeDasharray="3,3" opacity="0.8" />
          <polygon points="400,60 460,180 520,250" fill="url(#peak-grad-3)" stroke="var(--color-primary)" strokeWidth="1.5" />
          
          <polygon points="330,160 280,250 380,250" fill="url(#peak-grad-2)" stroke="var(--color-primary)" strokeWidth="1.2" />
          <polygon points="460,180 380,250 520,250" fill="url(#peak-grad-3)" stroke="var(--color-primary)" strokeWidth="1" strokeDasharray="2,2" opacity="0.7" />
          <polygon points="330,160 460,180 380,250" fill="url(#peak-grad-1)" stroke="var(--color-primary)" strokeWidth="1.5" filter="url(#primary-glow)" />

          {/* Above-Water Ice Shard Particles */}
          <polygon points="260,180 263,185 260,190 257,185" fill="var(--color-primary)" opacity="0.4" />
          <polygon points="530,120 534,124 530,128 526,124" fill="var(--color-primary)" opacity="0.5" />
          <polygon points="310,90 312,93 310,96 308,93" fill="var(--color-primary)" opacity="0.6" />
        </g>

        {/* ================= WATERLINE ================= */}
        <g id="waterline" className="origin-center animate-water-ripple">
          <line x1="50" y1="250" x2="750" y2="250" stroke="url(#waterline-grad)" strokeWidth="2.5" />
          <line x1="150" y1="250" x2="650" y2="250" stroke="var(--color-accent)" strokeWidth="1.2" opacity="0.4" filter="url(#accent-glow)" />
        </g>

        {/* ================= SUBMERGED BASE (UNDERWATER) ================= */}
        <g id="iceberg-base" opacity="0.85">
          {/* Submerged low-poly body */}
          <polygon points="280,250 180,340 320,360" fill="url(#base-grad-1)" stroke="var(--color-accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <polygon points="340,250 320,360 480,380" fill="url(#base-grad-2)" stroke="var(--color-accent)" strokeWidth="1" strokeOpacity="0.3" />
          <polygon points="450,250 480,380 620,360" fill="url(#base-grad-1)" stroke="var(--color-accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <polygon points="520,250 620,360 480,380" fill="url(#base-grad-2)" stroke="var(--color-accent)" strokeWidth="1" strokeOpacity="0.3" />
          
          <polygon points="180,340 220,480 320,360" fill="url(#base-grad-1)" stroke="var(--color-accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <polygon points="320,360 390,470 480,380" fill="url(#base-grad-2)" stroke="var(--color-accent)" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="3,3" filter="url(#accent-glow)" />
          <polygon points="620,360 480,380 580,470" fill="url(#base-grad-1)" stroke="var(--color-accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          
          <polygon points="220,480 400,560 390,470" fill="url(#base-grad-2)" stroke="var(--color-accent)" strokeWidth="1.5" strokeOpacity="0.7" filter="url(#accent-glow)" />
          <polygon points="580,470 400,560 390,470" fill="url(#base-grad-2)" stroke="var(--color-accent)" strokeWidth="1.5" strokeOpacity="0.7" filter="url(#accent-glow)" />
          
          <polygon points="320,360 390,470 220,480" fill="url(#base-grad-1)" stroke="var(--color-accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <polygon points="480,380 390,470 580,470" fill="url(#base-grad-1)" stroke="var(--color-accent)" strokeWidth="1.2" strokeOpacity="0.4" />

          {/* Extra deep structure lines mapping complexity */}
          <line x1="320" y1="360" x2="400" y2="560" stroke="var(--color-accent)" strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="5,5" />
          <line x1="480" y1="380" x2="400" y2="560" stroke="var(--color-accent)" strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="5,5" />
          <line x1="180" y1="340" x2="390" y2="470" stroke="var(--color-accent)" strokeWidth="0.8" strokeOpacity="0.2" />
          <line x1="620" y1="360" x2="390" y2="470" stroke="var(--color-accent)" strokeWidth="0.8" strokeOpacity="0.2" />

          {/* Under-Water floating particles */}
          <circle cx="210" cy="400" r="1.5" fill="var(--color-accent)" opacity="0.3" />
          <circle cx="600" cy="420" r="2" fill="var(--color-accent)" opacity="0.4" />
          <circle cx="340" cy="510" r="1.5" fill="var(--color-accent)" opacity="0.3" />
          <circle cx="450" cy="480" r="2.5" fill="var(--color-accent)" opacity="0.2" />
        </g>
      </svg>
    </div>
  );
}
