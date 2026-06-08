"use client";
import { useState, useCallback } from "react";
import NpcAura from "./NpcAura";
import NpcBlob from "./NpcBlob";
import NpcControls from "./NpcControls";

export type NpcState =
  | "is-idle"
  | "is-listening"
  | "is-thinking"
  | "is-speaking"
  | "is-angry"
  | "is-happy"
  | "is-sleep"
  | "is-sad";

interface NpcAvatarProps {
  primaryColor?: string;
  size?: number;
  speaking?: boolean;
}

export default function NpcAvatar({ primaryColor = "#FF6B00", size = 520, speaking = false }: NpcAvatarProps) {
  const [activeState, setActiveState] = useState<NpcState>("is-idle");
  const isSpeaking = speaking || activeState === "is-speaking";

  // The emotional expression to show (ignore "is-speaking" as an emotion)
  const expressionState: NpcState =
    activeState === "is-speaking" ? "is-idle" : activeState;

  const handleStateChange = useCallback((state: NpcState) => {
    setActiveState(state);
  }, []);

  // Generate lighter/darker variants from primary color
  const colors = {
    primary: primaryColor,
    light: lightenColor(primaryColor, 30),
    lighter: lightenColor(primaryColor, 60),
    dark: darkenColor(primaryColor, 20),
    darker: darkenColor(primaryColor, 40),
    glow: primaryColor,
  };
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: `radial-gradient(1200px 700px at 50% 55%, ${colors.glow}1a, transparent 60%), #0D1117`,
        color: "#e6edf3",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Inter, sans-serif",
      }}
    >
      <div className="fixed top-7 left-1/2 -translate-x-1/2 text-xs tracking-[0.25em] uppercase text-white/50">
        Npc · Fluid Avatar
      </div>

      <div
        className={`relative grid place-items-center ${activeState}`}
        style={{
          perspective: "800px",
          width: `min(${size}px, 80vmin)`,
          aspectRatio: "1 / 1",
        }}
      >
         <NpcAura colors={colors} />
        <NpcBlob
          colors={colors}
          size={size}
          state={expressionState}
          speaking={isSpeaking}   // pass down
        />
      </div>

      <NpcControls activeState={activeState} onStateChange={handleStateChange} colors={colors} />
    </div>
  );
}

// Helper functions to generate color variants
function lightenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
  const B = Math.min(255, (num & 0x0000ff) + amt);
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}

function darkenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, (num >> 16) - amt);
  const G = Math.max(0, ((num >> 8) & 0x00ff) - amt);
  const B = Math.max(0, (num & 0x0000ff) - amt);
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}