export default function NpcHighlight() {
    return (
        <div
            className="absolute pointer-events-none mix-blend-screen blur-[6px]"
            style={{
                inset: "6% 8% 40% 14%",
                borderRadius: "50% 50% 60% 40% / 60% 60% 40% 40%",
                background: "radial-gradient(closest-side, rgba(255,255,255,0.55), rgba(255,255,255,0.05) 60%, transparent 75%)",
                animation: "highlight-drift 7s ease-in-out infinite",
            }}
        />
    );
}