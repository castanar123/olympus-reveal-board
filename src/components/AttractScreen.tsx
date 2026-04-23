import logo from "@/assets/mr-ms-ccs-logo.jpg";

export function AttractScreen({ onStart }: { onStart: () => void }) {
  return (
    <div
      className="absolute inset-0 z-40 flex flex-col items-center justify-center cursor-pointer"
      onClick={onStart}
      role="button"
      aria-label="Tap to begin"
    >
      <div className="logo-pulse" style={{ maxWidth: "min(55vh, 45vw)" }}>
        <img
          src={logo}
          alt="Mr. & Ms. CCS 2026"
          className="w-full h-auto rounded-3xl"
          style={{
            boxShadow:
              "0 0 80px oklch(0.55 0.22 260 / 0.6), 0 30px 60px oklch(0 0 0 / 0.6)",
            border: "3px solid oklch(0.82 0.01 250 / 0.6)",
          }}
        />
      </div>

      <div className="mt-10 text-center">
        <p
          className="font-display silver-text"
          style={{
            fontSize: "clamp(0.7rem, 1.2vw, 1rem)",
            letterSpacing: "0.6em",
            opacity: 0.85,
          }}
        >
          OLYMPUS REVEAL · HASHTAG SYSTEM
        </p>
        <p
          className="font-sans mt-4"
          style={{
            color: "oklch(0.82 0.01 250 / 0.7)",
            fontSize: "0.875rem",
            letterSpacing: "0.2em",
          }}
        >
          ▸ TAP ANYWHERE TO ENTER THE STAGE ◂
        </p>
      </div>
    </div>
  );
}
