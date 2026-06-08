"use client";
import { motion } from "framer-motion";

interface NpcMouthProps {
  faceScale: number;
  state?: string;
  speaking?: boolean; 
}

export default function NpcMouth({ faceScale, state, speaking = false }: NpcMouthProps) {
  const idleWidth = 24 * faceScale;
  const idleHeight = 12 * faceScale;
  const idleSmallRadius = 6 * faceScale;
  const idleLargeRadius = 20 * faceScale;

  const getMouthValues = () => {
    switch (state) {
      case "is-listening":
        return {
          width: `${16 * faceScale}px`,
          height: `${5 * faceScale}px`,
          borderRadius: `${4 * faceScale}px ${4 * faceScale}px ${12 * faceScale}px ${12 * faceScale}px`,
        };
      case "is-angry":
        return {
          width: `${20 * faceScale}px`,
          height: `${5 * faceScale}px`,
          borderRadius: `${16 * faceScale}px ${16 * faceScale}px ${4 * faceScale}px ${4 * faceScale}px`,
        };

        case "is-sleep":
          return {
            width: `${16 * faceScale}px`,
            height: `${6 * faceScale}px`,
            borderRadius: `${3 * faceScale}px ${3 * faceScale}px ${12 * faceScale}px ${12 * faceScale}px`,
          };

          case "is-sad":
            return {
              width: `${20 * faceScale}px`,
              height: `${5 * faceScale}px`,
              borderRadius: `${16 * faceScale}px ${16 * faceScale}px ${4 * faceScale}px ${4 * faceScale}px`,
            };
      case "is-thinking":
        return {
          width: `${16 * faceScale}px`,
          height: `${5 * faceScale}px`,
          borderRadius: `${4 * faceScale}px ${4 * faceScale}px ${12 * faceScale}px ${12 * faceScale}px`,
        };

      case "is-speaking":
        // Standalone speak state uses idle-like base
        return {
          width: `${idleWidth}px`,
          height: `${idleHeight}px`,
          borderRadius: `${idleSmallRadius}px ${idleSmallRadius}px ${idleLargeRadius}px ${idleLargeRadius}px`,
        };

      case "is-happy":
        return {
          width: `${28 * faceScale}px`,
          height: `${10 * faceScale}px`,
          borderRadius: `${4 * faceScale}px ${4 * faceScale}px ${22 * faceScale}px ${22 * faceScale}px`,
        };
      default:
        return {
          width: `${idleWidth}px`,
          height: `${idleHeight}px`,
          borderRadius: `${idleSmallRadius}px ${idleSmallRadius}px ${idleLargeRadius}px ${idleLargeRadius}px`,
        };
    }
  };

  const base = getMouthValues();

  // Determine if we should animate: either the legacy "is-speaking" state OR the new speaking prop
  const shouldAnimate = speaking || state === "is-speaking";

  // Function to derive an open mouth shape from any base shape
  const getOpenShape = () => {
    const parsePx = (val: string) => parseFloat(val);
    const baseWidth = parsePx(base.width);
    const baseHeight = parsePx(base.height);
    const radii = base.borderRadius.split(" ").map(parsePx);

    return {
      width: `${baseWidth * 0.9}px`,
      height: `${baseHeight * 1.5}px`,
      borderRadius: radii
        .map((r) => `${r * 1.5}px`)
        .join(" "),
    };
  };

  const open = getOpenShape();

  // Build keyframe arrays: if speaking, use 3 steps (closed → open → closed);
  // otherwise a single-value array (no animation)
  const heightKeyframes = shouldAnimate
    ? [base.height, open.height, base.height]
    : [base.height];

  const widthKeyframes = shouldAnimate
    ? [base.width, open.width, base.width]
    : [base.width];

  const borderRadiusKeyframes = shouldAnimate
    ? [base.borderRadius, open.borderRadius, base.borderRadius]
    : [base.borderRadius];

  return (
    <motion.div
      className="mouth bg-[#1a1310] relative overflow-hidden"
      style={{
        boxShadow: "inset 1px 2px 4px rgba(0, 0, 0, 0.6)",
        width: base.width,
        height: base.height,
        borderRadius: base.borderRadius,
      }}
      animate={{
        height: heightKeyframes,
        width: widthKeyframes,
        borderRadius: borderRadiusKeyframes,
      }}
      transition={{
        duration: shouldAnimate ? 0.28 : 0.3,
        repeat: shouldAnimate ? Infinity : 0,
        ease: "easeInOut",
      }}
    />
  );
}