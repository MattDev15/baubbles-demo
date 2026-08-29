import clsx from "clsx";
import { PawPrint } from "lucide-react";

const PALETTES = [
  ["#3D5A50", "#D8C9B8"],
  ["#D98862", "#F0EBE3"],
  ["#2B433B", "#D98862"],
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function PetPlaceholder({ seed, className }: { seed: string; className?: string }) {
  const idx = hashString(seed) % PALETTES.length;
  const [c1, c2] = PALETTES[idx];

  return (
    <div
      className={clsx("relative flex items-center justify-center overflow-hidden", className)}
      style={{ background: `linear-gradient(135deg, ${c1}22, ${c2}55)` }}
      aria-hidden="true"
    >
      <PawPrint size={48} color={c1} strokeWidth={1.5} className="opacity-60" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.35), transparent 60%)" }} />
    </div>
  );
}
