import type { ReactNode } from "react";
import bg from "@/assets/olympus-bg.jpg";
import { Particles } from "./Particles";

export function StageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="stage-frame">
      <div className="stage-inner">
        <img
          src={bg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, oklch(0.09 0.06 268 / 0.6) 70%, oklch(0.05 0.03 268 / 0.95) 100%)",
          }}
          aria-hidden="true"
        />
        <Particles />
        <div className="relative z-10 h-full w-full">{children}</div>
      </div>
    </div>
  );
}
