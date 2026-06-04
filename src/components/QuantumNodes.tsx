import * as React from "react";

// ------ Utils ------
function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function withAlpha(hexOrRgba: string, alpha: number): string {
  if (
    /^rgba\(/i.test(hexOrRgba) ||
    /^hsla\(/i.test(hexOrRgba) ||
    /^oklch\(/i.test(hexOrRgba)
  ) {
    return hexOrRgba;
  }
  const hex = hexOrRgba.trim();
  if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) {
    return hexOrRgba;
  }
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`;
}

function makeRng(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 1831565813;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function useInView(
  ref: React.RefObject<Element | null>,
  options?: IntersectionObserverInit
) {
  const [isInView, setIsInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [ref, options?.root, options?.rootMargin, options?.threshold]);

  return isInView;
}

interface Node {
  x: number;
  y: number;
}

export interface QuantumNodesProps {
  mode?: "grid" | "random";
  backgroundColor?: string;
  nodeColorIdle?: string;
  nodeColorActive?: string;
  nodeRadiusIdle?: number;
  nodeRadiusActive?: number;
  nodeOpacityIdle?: number;
  glowColor?: string;
  glowStrength?: number;
  connectToCursor?: boolean;
  cursorConnectDistance?: number;
  cursorLineColor?: string;
  cursorLineWidth?: number;
  cursorLineOpacity?: number;
  connectNodes?: boolean;
  nodeConnectDistance?: number;
  nodeLineColor?: string;
  nodeLineWidth?: number;
  nodeLineOpacity?: number;
  maxNodeConnectionsPerNode?: number;
  gridSpacing?: number;
  randomNodeCount?: number;
  jitter?: number;
  pauseWhenOffscreen?: boolean;
  style?: React.CSSProperties;
}

export default function QuantumNodes(props: QuantumNodesProps) {
  const {
    mode = "grid",
    backgroundColor = "#080808",
    nodeColorIdle = "#FFFFFF",
    nodeColorActive = "#96ffc8",
    nodeRadiusIdle = 2,
    nodeRadiusActive = 3,
    nodeOpacityIdle = 1,
    glowColor = "#96ffc8",
    glowStrength = 1,
    connectToCursor = true,
    cursorConnectDistance = 150,
    cursorLineColor = "#96ffc8",
    cursorLineWidth = 2,
    cursorLineOpacity = 0.4,
    connectNodes = false,
    nodeConnectDistance = 90,
    nodeLineColor = "rgba(255,255,255,0.25)",
    nodeLineWidth = 1,
    nodeLineOpacity = 0.25,
    maxNodeConnectionsPerNode = 4,
    gridSpacing = 50,
    randomNodeCount = 120,
    jitter = 10,
    pauseWhenOffscreen = true,
    style,
  } = props;

  const isStatic = typeof window === "undefined";
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const rafRef = React.useRef<number | null>(null);
  const nodesRef = React.useRef<Node[]>([]);
  const mouseRef = React.useRef({ x: -99999, y: -99999, inside: false });
  const sizeRef = React.useRef({ w: 0, h: 0, dpr: 1 });
  const inView = useInView(wrapRef, { rootMargin: "100px" });
  const shouldAnimate = !isStatic && (!pauseWhenOffscreen || inView);

  const seed = React.useMemo(() => 1337, []);

  const rebuildNodes = React.useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const w = sizeRef.current.w;
    const h = sizeRef.current.h;
    if (w <= 2 || h <= 2) return;
    const rng = makeRng(seed ^ (w * 73856093) ^ (h * 19349663));
    const nodes: Node[] = [];
    const j = clamp(jitter, 0, 200);
    const halfJ = j * 0.5;
    if (mode === "grid") {
      const spacing = Math.max(8, gridSpacing);
      const startX = spacing * 0.5;
      const startY = spacing * 0.5;
      for (let y = startY; y <= h; y += spacing) {
        for (let x = startX; x <= w; x += spacing) {
          const dx = (rng() * j - halfJ) * 0.6;
          const dy = (rng() * j - halfJ) * 0.6;
          nodes.push({ x: clamp(x + dx, 0, w), y: clamp(y + dy, 0, h) });
        }
      }
    } else {
      const count = Math.max(1, Math.floor(randomNodeCount));
      for (let i = 0; i < count; i++) {
        const x = rng() * w;
        const y = rng() * h;
        const dx = rng() * j - halfJ;
        const dy = rng() * j - halfJ;
        nodes.push({ x: clamp(x + dx, 0, w), y: clamp(y + dy, 0, h) });
      }
    }
    nodesRef.current = nodes;
  }, [gridSpacing, jitter, mode, randomNodeCount, seed]);

  const resizeCanvasToContainer = React.useCallback(() => {
    const el = wrapRef.current;
    const c = canvasRef.current;
    if (!el || !c) return;
    const rect = el.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    const dpr = typeof window !== "undefined" ? clamp(window.devicePixelRatio || 1, 1, 3) : 1;
    sizeRef.current = { w, h, dpr };
    const nextW = Math.max(1, Math.floor(w * dpr));
    const nextH = Math.max(1, Math.floor(h * dpr));
    if (c.width !== nextW) c.width = nextW;
    if (c.height !== nextH) c.height = nextH;
    c.style.width = `${w}px`;
    c.style.height = `${h}px`;
    rebuildNodes();
  }, [rebuildNodes]);

  const drawFrame = React.useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const { w, h, dpr } = sizeRef.current;
    if (w <= 0 || h <= 0) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Background
    if (backgroundColor === "transparent") {
      ctx.clearRect(0, 0, w, h);
    } else {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, w, h);
    }

    const nodes = nodesRef.current;
    const mouse = mouseRef.current;
    const maxCursorDist = Math.max(1, cursorConnectDistance);
    const maxNodeDist = Math.max(1, nodeConnectDistance);

    // Node-to-node connections
    if (connectNodes && nodes.length > 1) {
      const maxPer = clamp(Math.floor(maxNodeConnectionsPerNode), 1, 24);
      ctx.lineWidth = nodeLineWidth;
      ctx.strokeStyle = nodeLineColor;
      ctx.globalAlpha = 1;

      const cellSize = maxNodeDist;
      const cols = Math.max(1, Math.ceil(w / cellSize));
      const rows = Math.max(1, Math.ceil(h / cellSize));
      const buckets = new Array<number[]>(cols * rows);
      for (let i = 0; i < buckets.length; i++) buckets[i] = [];
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const cx = clamp(Math.floor(n.x / cellSize), 0, cols - 1);
        const cy = clamp(Math.floor(n.y / cellSize), 0, rows - 1);
        buckets[cy * cols + cx].push(i);
      }
      const connCount = new Array<number>(nodes.length).fill(0);
      const neighborOffsets = [
        [-1, -1], [0, -1], [1, -1],
        [-1, 0],  [0, 0],  [1, 0],
        [-1, 1],  [0, 1],  [1, 1]
      ];
      for (let i = 0; i < nodes.length; i++) {
        if (connCount[i] >= maxPer) continue;
        const a = nodes[i];
        const acx = clamp(Math.floor(a.x / cellSize), 0, cols - 1);
        const acy = clamp(Math.floor(a.y / cellSize), 0, rows - 1);
        for (const [ox, oy] of neighborOffsets) {
          if (connCount[i] >= maxPer) break;
          const nx = acx + ox;
          const ny = acy + oy;
          if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
          const list = buckets[ny * cols + nx];
          for (let k = 0; k < list.length; k++) {
            const j = list[k];
            if (j <= i) continue;
            if (connCount[i] >= maxPer) break;
            if (connCount[j] >= maxPer) continue;
            const b = nodes[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.hypot(dx, dy);
            if (dist > maxNodeDist) continue;
            const t = 1 - dist / maxNodeDist;
            ctx.globalAlpha = clamp(nodeLineOpacity * t, 0, 1);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            connCount[i]++;
            connCount[j]++;
          }
        }
      }
      ctx.globalAlpha = 1;
    }

    // Cursor connections
    if (connectToCursor && mouse.inside) {
      ctx.lineWidth = cursorLineWidth;
      ctx.strokeStyle = cursorLineColor;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const d = Math.hypot(mouse.x - n.x, mouse.y - n.y);
        if (d > maxCursorDist) continue;
        const t = 1 - d / maxCursorDist;
        ctx.globalAlpha = clamp(cursorLineOpacity * t, 0, 1);
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    // Nodes (with distance-based glow)
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const d = mouse.inside ? Math.hypot(mouse.x - n.x, mouse.y - n.y) : Number.POSITIVE_INFINITY;
      const active = d < maxCursorDist;
      const t = active ? clamp(1 - d / maxCursorDist, 0, 1) : 0;
      const r = active ? nodeRadiusIdle + (nodeRadiusActive - nodeRadiusIdle) * t : nodeRadiusIdle;

      // Glow
      if (t > 0) {
        ctx.save();
        ctx.globalAlpha = clamp(t * glowStrength, 0, 1);
        ctx.shadowColor = withAlpha(glowColor, 1);
        ctx.shadowBlur = 18 * (0.35 + t);
        ctx.fillStyle = withAlpha(glowColor, 0.9);
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 1.05, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Dot
      ctx.globalAlpha = active ? 1 : clamp(nodeOpacityIdle, 0, 1);
      ctx.fillStyle = active ? nodeColorActive : nodeColorIdle;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, [
    backgroundColor,
    connectNodes,
    connectToCursor,
    cursorConnectDistance,
    cursorLineColor,
    cursorLineOpacity,
    cursorLineWidth,
    glowColor,
    glowStrength,
    maxNodeConnectionsPerNode,
    nodeColorActive,
    nodeColorIdle,
    nodeConnectDistance,
    nodeLineColor,
    nodeLineOpacity,
    nodeLineWidth,
    nodeOpacityIdle,
    nodeRadiusActive,
    nodeRadiusIdle,
  ]);

  const loop = React.useCallback(() => {
    if (!shouldAnimate) return;
    drawFrame();
    rafRef.current = requestAnimationFrame(loop);
  }, [drawFrame, shouldAnimate]);

  React.useEffect(() => {
    resizeCanvasToContainer();
    const el = wrapRef.current;
    if (!el) return;
    let ro: ResizeObserver | null = null;
    if (typeof window !== "undefined" && typeof window.ResizeObserver !== "undefined") {
      ro = new window.ResizeObserver(() => resizeCanvasToContainer());
      ro.observe(el);
    } else {
      const onResize = () => resizeCanvasToContainer();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }
    return () => {
      if (ro) ro.disconnect();
    };
  }, [resizeCanvasToContainer]);

  React.useEffect(() => {
    if (isStatic) {
      resizeCanvasToContainer();
      drawFrame();
      return;
    }
    if (!shouldAnimate) {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      drawFrame();
      return;
    }
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [drawFrame, isStatic, loop, resizeCanvasToContainer, shouldAnimate]);

  React.useEffect(() => {
    if (isStatic) return;

    const handlePointerMove = (e: PointerEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      mouseRef.current = { x, y, inside };
    };

    const handlePointerLeave = () => {
      mouseRef.current.inside = false;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [isStatic]);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: backgroundColor === "transparent" ? "transparent" : backgroundColor,
        ...style,
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}
