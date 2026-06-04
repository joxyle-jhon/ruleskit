import type { PackConfig } from "@/core/types";

interface Props {
  packs: PackConfig[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const ICONS: Record<string, string> = {
  layout: "▢",
  server: "▤",
  cloud: "☁",
  smartphone: "▯",
};

export function PackGrid({ packs, selectedId, onSelect }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {packs.map((p) => {
        const stable = p.status === "stable";
        const selected = stable && selectedId === p.id;
        return (
          <button
            key={p.id}
            onClick={() => stable && onSelect(p.id)}
            disabled={!stable}
            className={`group relative flex flex-col items-start gap-3 rounded-lg border p-5 text-left transition ${
              selected
                ? "border-primary bg-primary/10 glow-primary"
                : stable
                  ? "border-border bg-surface hover:border-border-strong hover:bg-surface-elevated"
                  : "cursor-not-allowed border-border bg-surface/40 opacity-60"
            }`}
          >
            <div className="flex w-full items-center justify-between">
              <span className="text-2xl text-primary">{ICONS[p.icon] ?? "◆"}</span>
              <span
                className={`rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${
                  stable ? "border-success/50 text-success" : "border-warning/50 text-warning"
                }`}
              >
                {stable ? "stable" : "soon"}
              </span>
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">{p.label}</div>
              <div className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {p.description}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
