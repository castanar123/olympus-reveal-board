import logo from "@/assets/mr-ms-ccs-logo.jpg";

export function AttractScreen({ onStart }: { onStart: () => void }) {
  return (
    <div
      className="absolute inset-0 z-40 flex flex-col items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Attract intro"
      style={{
        background:
          "radial-gradient(ellipse at center, oklch(0.09 0.06 268 / 0.65) 0%, oklch(0.05 0.03 268 / 0.92) 75%)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="logo-pulse" style={{ maxWidth: "min(55cqh, 45cqw)" }}>
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

      <p
        className="font-display silver-text mt-10"
        style={{
          fontSize: "clamp(0.7rem, 1cqw, 1.4rem)",
          letterSpacing: "0.6em",
          opacity: 0.85,
        }}
      >
        OLYMPUS REVEAL · HASHTAG SYSTEM
      </p>

      {/* Explicit dismiss button — prevents accidental tile clicks right after the logo fades. */}
      <button
        onClick={onStart}
        className="font-display mt-8"
        style={{
          padding: "1rem 2.5rem",
          borderRadius: "0.6rem",
          letterSpacing: "0.35em",
          fontWeight: 700,
          fontSize: "0.95rem",
          background: "var(--gradient-silver)",
          color: "oklch(0.18 0.08 265)",
          border: "2px solid oklch(0.95 0.01 250)",
          boxShadow:
            "0 8px 30px oklch(0 0 0 / 0.6), 0 0 40px oklch(0.82 0.01 250 / 0.4)",
          cursor: "pointer",
        }}
      >
        ENTER THE STAGE
      </button>

      <p
        className="font-sans mt-4"
        style={{
          color: "oklch(0.82 0.01 250 / 0.55)",
          fontSize: "0.7rem",
          letterSpacing: "0.3em",
        }}
      >
        Click the button to begin
      </p>
    </div>
  );
}
