import { NpcState } from "./NpcAvatar";

interface NpcControlsProps {
  activeState: NpcState;
  onStateChange: (state: NpcState) => void;
  colors: {
    primary: string;
    dark: string;
  };
}

const states: { state: NpcState; label: string }[] = [
  { state: "is-idle", label: "Idle" },
  { state: "is-listening", label: "Listen" },
  { state: "is-thinking", label: "Think" },
  { state: "is-speaking", label: "Speak" },
  { state: "is-angry", label: "Angry" },
  { state: "is-happy", label: "Happy" },
  { state: "is-sleep", label: "Sleep" },
  { state: "is-sad", label: "Sad" },
];
export default function NpcControls({ activeState, onStateChange, colors }: NpcControlsProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const btn = (e.target as HTMLElement).closest("button");
    if (!btn) return;
    const next = btn.dataset.state as NpcState;
    if (next) onStateChange(next);
  };

  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 p-2.5 bg-white/[0.04] border border-white/[0.08] rounded-full backdrop-blur-[12px]"
      style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}
      onClick={handleClick}
    >
      {states.map(({ state, label }) => (
        <button
          key={state}
          data-state={state}
          className="appearance-none border border-white/[0.08] bg-white/[0.03] text-[#e6edf3] px-[18px] py-2.5 text-[13px] font-semibold tracking-[0.02em] rounded-full cursor-pointer transition-all duration-200 hover:bg-orange-500/15 hover:border-orange-500/50 hover:text-[#ffd2a8]"
          style={activeState === state ? {
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.dark})`,
            borderColor: "transparent",
            color: "#fff",
            boxShadow: `0 6px 20px ${colors.primary}8c`,
          } : {}}
        >
          {label}
        </button>
      ))}
    </div>
  );
}