import * as React from "react";

// ====== Constants ======
const Z_NEAR = 0.12;
const Z_FAR = 0.98;
const OFFSCREEN_MARGIN = 50;

// ---------- Utils ----------
function saturate(t: number): number {
  return t < 0 ? 0 : t > 1 ? 1 : t;
}

function smooth01(t: number): number {
  return t * t * (3 - 2 * t);
}

interface ParsedColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

function parseColor(input: string): ParsedColor {
  const c = (input || "#000000").trim().toLowerCase();
  if (c[0] === "#") {
    const h = c.slice(1);
    if (h.length === 3 || h.length === 4) {
      const r = parseInt(h[0] + h[0], 16);
      const g = parseInt(h[1] + h[1], 16);
      const b = parseInt(h[2] + h[2], 16);
      const a = h.length === 4 ? parseInt(h[3] + h[3], 16) / 255 : 1;
      return { r, g, b, a };
    }
    if (h.length === 6 || h.length === 8) {
      const r = parseInt(h.slice(0, 2), 16);
      const g = parseInt(h.slice(2, 4), 16);
      const b = parseInt(h.slice(4, 6), 16);
      const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
      return { r, g, b, a };
    }
  }
  const m = c.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+)\s*)?\)/);
  if (m) {
    const r = Math.max(0, Math.min(255, Number(m[1])));
    const g = Math.max(0, Math.min(255, Number(m[2])));
    const b = Math.max(0, Math.min(255, Number(m[3])));
    const a = m[4] !== undefined ? Math.max(0, Math.min(1, Number(m[4]))) : 1;
    return { r, g, b, a };
  }
  return { r: 0, g: 0, b: 0, a: 1 };
}

interface Star {
  x: number;
  y: number;
  z: number;
  px: number | null;
  py: number | null;
  phase: number;
  twinkle: number;
  size: number;
  cr: number;
  cg: number;
  cb: number;
}

export interface StarsfieldProps {
  starCount?: number;
  speed?: number;
  spread?: number;
  focal?: number;
  twinkle?: number;
  trail?: number;
  starSize?: number;
  bgColor?: string;
  starColor?: string;
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  fadeInRange?: number;
  reverseFly?: boolean;
  stopMotionInEditor?: boolean;
  followCursor?: boolean;
  galaxyMode?: boolean;
  direction?: "none" | "left" | "right" | "top" | "bottom";
  randomColors?: boolean;
  starImage?: string;
}

export default function Starsfield(props: StarsfieldProps) {
  const {
    starCount = 300,
    speed = 0.2,
    spread = 2,
    focal = 0.6,
    twinkle = 0.3,
    trail = 0.3,
    starSize = 0.5,
    bgColor = "#000000",
    starColor = "#FFFFFF",
    color1 = "#FF0000",
    color2 = "#00FF00",
    color3 = "#0000FF",
    color4 = "#FFFF00",
    fadeInRange = 0.3,
    reverseFly = false,
    followCursor = false,
    galaxyMode = false,
    direction = "none",
    randomColors = false,
    starImage = "",
  } = props;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const starsRef = React.useRef<Star[]>([]);
  const rafRef = React.useRef<number | null>(null);
  const lastTimeRef = React.useRef<number>(performance.now());
  const pausedRef = React.useRef<boolean>(false);

  // Visibility State (Intersection Observer)
  const [isInView, setIsInView] = React.useState(true);

  // Cursor tracking
  const followTargetRef = React.useRef({ x: 0, y: 0 });
  const followRef = React.useRef({ x: 0, y: 0 });

  // Offscreen Sprite (for custom image)
  const spriteRef = React.useRef<HTMLCanvasElement | null>(null);
  const [, setSpriteReady] = React.useState(false);

  // Live settings ref
  const settingsRef = React.useRef({
    starCount,
    speed,
    spread,
    focal,
    twinkle,
    trail,
    starSize,
    bgColor,
    starColor,
    color1,
    color2,
    color3,
    color4,
    fadeInRange,
    reverseFly,
    followCursor,
    galaxyMode,
    direction,
    randomColors,
    starImage,
  });

  // Sync settings
  settingsRef.current = {
    starCount,
    speed,
    spread,
    focal,
    twinkle,
    trail,
    starSize,
    bgColor,
    starColor,
    color1,
    color2,
    color3,
    color4,
    fadeInRange,
    reverseFly,
    followCursor,
    galaxyMode,
    direction,
    randomColors,
    starImage,
  };

  // Cache parsed colors
  const colorCacheRef = React.useRef({
    bg: parseColor(bgColor),
    star: parseColor(starColor),
    palette: [parseColor(color1), parseColor(color2), parseColor(color3), parseColor(color4)],
  });

  // --- Intersection Observer ---
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.01 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // --- 1. Load and Tint Sprite Image ---
  React.useEffect(() => {
    if (!starImage) {
      spriteRef.current = null;
      setSpriteReady(false);
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = starImage;
    img.onload = () => {
      const size = 64;
      const off = document.createElement("canvas");
      off.width = size;
      off.height = size;
      const ctx = off.getContext("2d");
      if (!ctx) return;
      const aspect = img.width / img.height;
      let dw = size;
      let dh = size;
      if (aspect > 1) dh = size / aspect;
      else dw = size * aspect;
      const dx = (size - dw) / 2;
      const dy = (size - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.globalCompositeOperation = "source-in";
      ctx.fillStyle = starColor;
      ctx.fillRect(0, 0, size, size);
      spriteRef.current = off;
      setSpriteReady(true);
    };
  }, [starImage, starColor]);

  // --- 2. Resize Logic (Balanced for Quality/Perf) ---
  const resize = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const w = Math.max(1, parent.clientWidth);
    const h = Math.max(1, parent.clientHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.resetTransform?.();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }, []);

  function respawnStar(
    s: Star,
    w: number,
    h: number,
    f: number,
    reversed: boolean,
    spread: number,
    starSize: number,
    baseColor: ParsedColor,
    useRandomColor: boolean,
    palette: ParsedColor[],
    zOverride?: number,
  ) {
    const z = zOverride ?? (reversed ? Z_NEAR : Z_FAR);
    const halfW = w / 2;
    const halfH = h / 2;
    const sx = (Math.random() * 2 - 1) * (halfW * spread + OFFSCREEN_MARGIN);
    const sy = (Math.random() * 2 - 1) * (halfH * spread + OFFSCREEN_MARGIN);
    s.z = z;
    s.x = (sx * z) / f;
    s.y = (sy * z) / f;
    s.px = null;
    s.py = null;
    s.phase = Math.random() * Math.PI * 2;
    s.twinkle = 0.5 + Math.random() * 1.5;
    s.size = starSize * (0.6 + Math.random() * 0.8);
    if (useRandomColor) {
      const randIndex = Math.floor(Math.random() * 4);
      const c = palette[randIndex] || baseColor;
      s.cr = c.r;
      s.cg = c.g;
      s.cb = c.b;
    } else {
      s.cr = baseColor.r;
      s.cg = baseColor.g;
      s.cb = baseColor.b;
    }
  }

  const initStars = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = Math.max(1, canvas.clientWidth);
    const h = Math.max(1, canvas.clientHeight);
    const { focal, spread, starSize, starCount, randomColors } = settingsRef.current;
    const f = Math.min(w, h) * focal;
    const baseStarColor = colorCacheRef.current.star;
    const palette = colorCacheRef.current.palette;
    const arr = new Array(starCount).fill(0).map(() => {
      const s: Star = {
        x: 0,
        y: 0,
        z: 0.5,
        px: null,
        py: null,
        phase: 0,
        twinkle: 1,
        size: starSize,
        cr: baseStarColor.r,
        cg: baseStarColor.g,
        cb: baseStarColor.b,
      };
      const z = Z_NEAR + Math.random() * (Z_FAR - Z_NEAR);
      s.z = z;
      const worldW = (w * z) / f;
      const worldH = (h * z) / f;
      s.x = (Math.random() - 0.5) * worldW * spread;
      s.y = (Math.random() - 0.5) * worldH * spread;
      s.phase = Math.random() * Math.PI * 2;
      s.twinkle = 0.5 + Math.random() * 1.5;
      s.size = starSize * (0.6 + Math.random() * 0.8);
      if (randomColors) {
        const randIndex = Math.floor(Math.random() * 4);
        const c = palette[randIndex] || baseStarColor;
        s.cr = c.r;
        s.cg = c.g;
        s.cb = c.b;
      } else {
        s.cr = baseStarColor.r;
        s.cg = baseStarColor.g;
        s.cb = baseStarColor.b;
      }
      return s;
    });
    starsRef.current = arr;
  }, []);

  const drawFrame = React.useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, now: number, dt: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const baseCx = w / 2;
      const baseCy = h / 2;
      const {
        speed,
        spread,
        focal,
        twinkle,
        trail,
        starSize,
        fadeInRange,
        reverseFly,
        galaxyMode,
        direction,
        followCursor,
        randomColors,
      } = settingsRef.current;
      const { bg, star, palette } = colorCacheRef.current;
      const sprite = spriteRef.current;

      // Clear Screen / Motion Blur
      ctx.globalCompositeOperation = "source-over";
      if (trail > 0.01) {
        const clearA = (1 - Math.min(0.95, Math.max(0, trail))) * bg.a;
        ctx.fillStyle = `rgba(${bg.r},${bg.g},${bg.b},${clearA})`;
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.clearRect(0, 0, w, h);
      }

      // Camera movement
      let camX = baseCx;
      let camY = baseCy;
      if (followCursor) {
        const follow = followRef.current;
        const target = followTargetRef.current;
        const k = dt > 0 ? Math.min(1, dt * 6) : 0;
        follow.x += (target.x - follow.x) * k;
        follow.y += (target.y - follow.y) * k;
        const followAmount = 0.2;
        camX = baseCx - follow.x * w * followAmount;
        camY = baseCy - follow.y * h * followAmount;
      } else {
        followRef.current.x = 0;
        followRef.current.y = 0;
      }

      const f = Math.min(w, h) * focal;
      const speedFactor = dt * speed * 0.7 * (reverseFly ? 1 : -1);
      const twinkleSpeed = now * 0.0015;
      const depthSpan = Z_FAR - Z_NEAR;
      const range = Math.max(0.05, Math.min(fadeInRange, depthSpan));
      const invRange = 1 / range;

      interface StarPath {
        x: number;
        y: number;
        size: number;
        alpha: number;
        r: number;
        g: number;
        b: number;
      }
      const starPaths: StarPath[] = [];
      const rgbaCache = randomColors ? null : new Map<number, string>();
      const getCachedColor = (alpha: number, r: number, g: number, b: number) => {
        if (!rgbaCache) return `rgba(${r},${g},${b},${alpha})`;
        const key = Math.round(alpha * 1e3);
        if (!rgbaCache.has(key)) {
          rgbaCache.set(key, `rgba(${star.r},${star.g},${star.b},${alpha})`);
        }
        return rgbaCache.get(key)!;
      };

      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        // Move Z
        s.z += speedFactor;
        if ((!reverseFly && s.z <= Z_NEAR) || (reverseFly && s.z >= Z_FAR)) {
          respawnStar(s, w, h, f, reverseFly, spread, starSize, star, randomColors, palette);
          continue;
        }

        // Move XY (Galaxy/Drift)
        if (galaxyMode) {
          const dx = s.x;
          const dy = s.y;
          const r = Math.sqrt(dx * dx + dy * dy);
          if (r > 1e-4) {
            const angle = Math.atan2(dy, dx);
            const spinDir = reverseFly ? -1 : 1;
            const spinSpeed = Math.max(0.1, speed * 1);
            const newAngle = angle + spinDir * spinSpeed * dt;
            s.x = Math.cos(newAngle) * r;
            s.y = Math.sin(newAngle) * r;
          }
        } else if (direction !== "none") {
          const driftBase = speed * 0.7;
          const drift = driftBase * dt;
          if (direction === "left") s.x -= drift;
          else if (direction === "right") s.x += drift;
          else if (direction === "top") s.y -= drift;
          else if (direction === "bottom") s.y += drift;
        }

        const invz = 1 / s.z;
        const x2d = s.x * f * invz + camX;
        const y2d = s.y * f * invz + camY;
        if (
          x2d < -OFFSCREEN_MARGIN ||
          x2d > w + OFFSCREEN_MARGIN ||
          y2d < -OFFSCREEN_MARGIN ||
          y2d > h + OFFSCREEN_MARGIN
        ) {
          respawnStar(s, w, h, f, reverseFly, spread, starSize, star, randomColors, palette);
          continue;
        }

        const twk = Math.max(
          0,
          Math.min(1, 0.65 + twinkle * 0.35 * Math.sin(s.phase + twinkleSpeed * s.twinkle)),
        );
        const tFar = (Z_FAR - s.z) * invRange;
        const tNear = (s.z - Z_NEAR) * invRange;
        const appear = smooth01(saturate(tFar)) * smooth01(saturate(tNear));
        const perspectiveSize = s.size * invz;
        const size = perspectiveSize * appear;
        const baseAlpha = Math.min(1, (0.15 + twk * 0.9) * star.a);
        const alpha = baseAlpha * appear;
        if (size < 0.1 || alpha < 0.01) {
          continue;
        }

        const sr = randomColors ? s.cr : star.r;
        const sg = randomColors ? s.cg : star.g;
        const sb = randomColors ? s.cb : star.b;

        starPaths.push({ x: x2d, y: y2d, size: size, alpha, r: sr, g: sg, b: sb });
      }

      // Draw Stars
      if (sprite) {
        for (let i = 0; i < starPaths.length; i++) {
          const st = starPaths[i];
          ctx.globalAlpha = st.alpha;
          const s = st.size * 2.5;
          ctx.drawImage(sprite, st.x - s / 2, st.y - s / 2, s, s);
        }
        ctx.globalAlpha = 1;
      } else {
        for (let i = 0; i < starPaths.length; i++) {
          const st = starPaths[i];
          ctx.fillStyle = getCachedColor(st.alpha, st.r, st.g, st.b);
          if (st.size < 2) {
            ctx.fillRect(st.x, st.y, st.size, st.size);
          } else {
            ctx.beginPath();
            ctx.arc(st.x, st.y, st.size * 0.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    },
    [],
  );

  // Animation Loop
  React.useEffect(() => {
    if (starsRef.current.length === 0) {
      resize();
      initStars();
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!isInView) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      return;
    }

    pausedRef.current = false;
    lastTimeRef.current = performance.now();
    const loop = () => {
      const now = performance.now();
      const dt = Math.min(0.05, (now - lastTimeRef.current) / 1000);
      lastTimeRef.current = now;
      drawFrame(ctx, canvas, now, dt);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const onResize = () => {
      resize();
      initStars();
      if (pausedRef.current && canvas && ctx) {
        drawFrame(ctx, canvas, 0, 0);
      }
    };
    window.addEventListener("resize", onResize);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      window.removeEventListener("resize", onResize);
    };
  }, [initStars, resize, drawFrame, isInView]);

  // Re-init on props change
  React.useEffect(() => {
    initStars();
  }, [
    starCount,
    reverseFly,
    spread,
    focal,
    initStars,
    randomColors,
    color1,
    color2,
    color3,
    color4,
  ]);

  // Re-cache colors
  React.useEffect(() => {
    colorCacheRef.current = {
      bg: parseColor(bgColor),
      star: parseColor(starColor),
      palette: [parseColor(color1), parseColor(color2), parseColor(color3), parseColor(color4)],
    };
  }, [bgColor, starColor, color1, color2, color3, color4]);

  // Pointer tracking for cursor follow
  React.useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!settingsRef.current.followCursor) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (!w || !h) return;
      const nx = event.clientX / w;
      const ny = event.clientY / h;
      followTargetRef.current.x = (nx - 0.5) * 2;
      followTargetRef.current.y = (ny - 0.5) * 2;
    };
    const handlePointerLeave = () => {
      followTargetRef.current.x = 0;
      followTargetRef.current.y = 0;
    };
    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", background: bgColor, overflow: "hidden" }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
