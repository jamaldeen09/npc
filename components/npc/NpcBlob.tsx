import NpcHighlight from "./NpcHighlight";
import NpcShading from "./NpcShading";
import { NpcFace } from "./NpcFace";

interface NpcBlobProps {
  colors: {
    light: string;
    lighter: string;
    primary: string;
    dark: string;
    darker: string;
    glow: string;
  };
  size: number;
  state: string;
  speaking?: boolean;
}

export default function NpcBlob({ colors, size, state, speaking = false }: NpcBlobProps) {
  const faceScale = size / 520;
  return (
    <div
      className="npc relative w-[62%] aspect-square"
      style={{
        background: `radial-gradient(circle at 35% 28%, ${colors.lighter} 0%, ${colors.light} 18%, ${colors.primary} 42%, ${colors.dark} 78%, ${colors.darker} 100%)`,
        boxShadow: `
          inset 14px 14px 28px rgba(255,255,255,0.45),
          inset -14px -16px 32px rgba(0,0,0,0.28),
          inset 0 0 60px rgba(255, 200, 120, 0.15),
          0 30px 80px ${colors.glow}59,
          0 0 120px ${colors.primary}73,
          0 0 220px ${colors.dark}59
        `,
        transformOrigin: "center",
        willChange: "transform, border-radius, filter",
        transition: "filter 0.6s ease, background 0.6s ease",
      }}
    >
      <NpcHighlight />
      <NpcShading />
      <NpcFace faceScale={faceScale} state={state} speaking={speaking}/>
    </div>
  );
}