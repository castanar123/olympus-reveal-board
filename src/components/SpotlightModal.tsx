import { useEffect } from "react";

interface SpotlightModalProps {
  number: number;
  hashtag: string;
  onClose: () => void;
}

export function SpotlightModal({ number, hashtag, onClose }: SpotlightModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.code === "Space") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center"
      onClick={onClose}
      style={{
        background:
          "radial-gradient(ellipse at center, oklch(0.09 0.06 268 / 0.7) 0%, oklch(0.05 0.03 268 / 0.95) 70%)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="spotlight-card pulse-glow relative flex flex-col items-center justify-center"
        style={{
          width: "min(70cqw, 70cqh)",
          aspectRatio: "1 / 1",
          padding: "3rem",
          borderRadius: "1.5rem",
          background: "var(--gradient-silver)",
          border: "3px solid oklch(0.95 0.01 250)",
          boxShadow:
            "0 30px 80px oklch(0 0 0 / 0.7), inset 0 0 60px oklch(0 0 0 / 0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Number badge */}
        <div
          className="font-display"
          style={{
            color: "oklch(0.18 0.08 265)",
            fontSize: "clamp(1.5rem, 2.4cqw, 3rem)",
            fontWeight: 600,
            letterSpacing: "0.3em",
            opacity: 0.55,
            marginBottom: "1rem",
          }}
        >
          № {number}
        </div>

        {/* Divider */}
        <div
          style={{
            width: "60%",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, oklch(0.18 0.08 265 / 0.6), transparent)",
            marginBottom: "2rem",
          }}
        />

        {/* Hashtag with god-ray */}
        <div className="god-ray w-full text-center">
          <h2
            className="font-sans"
            style={{
              color: "oklch(0.1 0.04 268)",
              fontSize: "clamp(2rem, 6cqw, 8rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              textShadow: "0 2px 0 oklch(1 0 0 / 0.3)",
              wordBreak: "break-word",
            }}
          >
            {hashtag}
          </h2>
        </div>

        <p
          className="font-display absolute"
          style={{
            bottom: "1.25rem",
            color: "oklch(0.18 0.08 265 / 0.55)",
            fontSize: "0.75rem",
            letterSpacing: "0.4em",
          }}
        >
          PRESS ESC OR SPACE TO RETURN
        </p>
      </div>
    </div>
  );
}
