"use client";

import { motion } from "framer-motion";

interface NpcEyesProps {
    faceScale: number;
    state?: string;
}

export default function NpcEyes({ faceScale, state }: NpcEyesProps) {
    const eyeWidth = 14 * faceScale;
    const eyeHeight = 26 * faceScale;
    const eyebrowWidth = 20 * faceScale;
    const eyebrowHeight = 4 * faceScale;
    const gap = 32 * faceScale;
    const gapBetween = 6 * faceScale;

    // ---- Static eyebrow positions (spring transitions) ----
    const getEyebrowAnimation = (side: "left" | "right") => {
        const base = { y: 0, rotate: 0 };
        switch (state) {
            case "is-listening":
            case "is-speaking":
            case "is-happy":
            case "is-sleep":
                return base;
            case "is-thinking":
                return {
                    y: side === "left" ? -2 : 1,
                    rotate: side === "left" ? 10 : -10,
                };

                case "is-sad":
                    return {
                      y: -2,
                      rotate: side === "left" ? -15 : 15,
                    };
            case "is-angry":
                return {
                    y: 3,
                    rotate: side === "left" ? 24 : -24,
                };
            default:
                return base;
        }
    };

    // ---- Eyebrow continuous float (CSS class) ----
    const getEyebrowFloatClass = () => {
        switch (state) {
            case "is-listening":
                return "listening-float";
            case "is-speaking":
                return "speaking-float";
            case "is-happy":
                return "happy-float";
            default:
                return "";
        }
    };

    // ---- Eye shape (spring transitions) ----
    const getEyeShape = () => {
        switch (state) {
            case "is-angry":
                return { scaleY: 0.75 };
            case "is-happy":
                return { scale: 1.08 };
            case "is-sleep":
                return { scaleY: 0.05 };
                case "is-sad":
  return { scaleY: 0.9 };
            default:
                return { scaleY: 1, scale: 1 };
        }
    };

    const leftEyebrow = getEyebrowAnimation("left");
    const rightEyebrow = getEyebrowAnimation("right");
    const eyeShape = getEyeShape();
    const eyebrowFloatClass = getEyebrowFloatClass();
    return (
        <div
            className="flex relative"
            style={{ gap: `${gap}px`, paddingBottom: `${2 * faceScale}px` }}
        >
            {/* Left Eye Group */}
            <div
                className="flex flex-col items-center relative"
                style={{ gap: `${gapBetween}px` }}
            >
                <motion.div
                    className={`eyebrow left ${eyebrowFloatClass} bg-[#1a1310] rounded-full`}
                    style={{
                        width: `${eyebrowWidth}px`,
                        height: `${eyebrowHeight}px`,
                        borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
                        transformOrigin: "left center",
                    }}
                    animate={leftEyebrow}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                />

                {/* Outer wrapper – only for scaling/clipping */}
                <motion.div
                    className="overflow-hidden rounded-full"
                    style={{
                        width: `${eyeWidth}px`,
                        height: `${eyeHeight}px`,
                    }}
                    animate={eyeShape}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                    {/* Inner eye – original design with box‑shadow and blink */}
                    <div
                        className="eye left bg-[#1a1310] w-full h-full"
                        style={{
                            boxShadow: `
                inset 1.5px 2px 4px rgba(0,0,0,0.8),
                inset -1px -1px 2px rgba(255,255,255,0.1),
                0 0 1px rgba(255,255,255,0.4)
              `,
                            animation: "blink 4.5s infinite",
                            transformOrigin: "center",
                        }}
                    />
                </motion.div>
            </div>

            {/* Right Eye Group */}
            <div
                className="flex flex-col items-center relative"
                style={{ gap: `${gapBetween}px` }}
            >
                <motion.div
                    className={`eyebrow right ${eyebrowFloatClass} bg-[#1a1310] rounded-full`}
                    style={{
                        width: `${eyebrowWidth}px`,
                        height: `${eyebrowHeight}px`,
                        borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
                        transformOrigin: "right center",
                    }}
                    animate={rightEyebrow}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                />

                <motion.div
                    className="overflow-hidden rounded-full"
                    style={{
                        width: `${eyeWidth}px`,
                        height: `${eyeHeight}px`,
                    }}
                    animate={eyeShape}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                    <div
                        className="eye right bg-[#1a1310] w-full h-full"
                        style={{
                            boxShadow: `
                inset 1.5px 2px 4px rgba(0,0,0,0.8),
                inset -1px -1px 2px rgba(255,255,255,0.1),
                0 0 1px rgba(255,255,255,0.4)
              `,
                            animation: "blink 4.5s infinite",
                            animationDelay: "0.15s",
                            transformOrigin: "center",
                        }}
                    />
                </motion.div>
            </div>
        </div>
    );
}