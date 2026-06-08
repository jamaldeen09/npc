import NpcEyes from "./NpcEyes";
import NpcMouth from "./NpcMouth";

interface NpcFaceProps {
  faceScale: number;
  state?: string;
  speaking?: boolean;
}

export function NpcFace({ faceScale, state, speaking = false }: NpcFaceProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none">
      <div
        className="flex flex-col items-center"
        style={{ gap: `${2 * faceScale}px` }}
      >
        <NpcEyes faceScale={faceScale} state={state} />
        <NpcMouth faceScale={faceScale} state={state} speaking={speaking}/>
      </div>
    </div>
  );
}