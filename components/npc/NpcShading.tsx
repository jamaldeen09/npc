export default function NpcShading() {
    return (
        <div
            className="absolute pointer-events-none opacity-70 blur-[10px]"
            style={{
                inset: "30% 10% 5% 12%",
                borderRadius: "50%",
                background: "radial-gradient(closest-side, rgba(120,20,0,0.45), transparent 70%)",
            }}
        />
    );
}