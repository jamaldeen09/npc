interface NpcAuraProps {
    colors: {
        light: string;
        primary: string;
        dark: string;
    };
}

export default function NpcAura({ colors }: NpcAuraProps) {
    return (
        <>
            <div
                className="aura absolute -inset-[20%] rounded-full pointer-events-none blur-[40px]"
                style={{
                    background: `radial-gradient(closest-side, ${colors.light}73, ${colors.primary}2e 45%, transparent 70%)`,
                    animation: "aura-pulse 6s ease-in-out infinite",
                }}
            />
            <div
                className="aura two absolute -inset-[10%] rounded-full pointer-events-none blur-[28px] opacity-90 mix-blend-screen"
                style={{
                    background: `radial-gradient(closest-side, ${colors.dark}8c, transparent 65%)`,
                    animation: "aura-pulse 4.5s ease-in-out infinite",
                }}
            />
        </>
    );
}