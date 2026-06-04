import * as React from "react";

export default function AmbientGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-background">
      {/* Primary Muted Green/Lime Orb */}
      <div className="absolute top-[10%] left-[15%] w-[60vw] h-[60vw] rounded-full bg-primary/4 blur-[140px] animate-drift pointer-events-none" />
      
      {/* Secondary Soft Accent/Teal Orb */}
      <div className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-accent/3.5 blur-[160px] animate-drift-slow pointer-events-none" />
      
      {/* Tertiary Faint Emerald Orb */}
      <div className="absolute top-[60%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-success/3 blur-[130px] animate-drift pointer-events-none" />
    </div>
  );
}
