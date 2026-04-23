interface AuraTileProps {
  number: number;
  hashtag: string;
  flipped: boolean;
  delay: number;
  onClick: () => void;
}

export function AuraTile({ number, hashtag, flipped, delay, onClick }: AuraTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={flipped}
      className={`aura-tile tile-enter ${flipped ? "flipped disabled" : ""}`}
      style={{ animationDelay: `${delay}ms` }}
      aria-label={`Tile ${number}${flipped ? `, revealed: ${hashtag}` : ""}`}
    >
      <div className="aura-tile-inner">
        {/* FRONT */}
        <div className="aura-face aura-face-front">
          <span
            className="font-display silver-emboss leading-none"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            {number}
          </span>
        </div>
        {/* BACK */}
        <div className="aura-face aura-face-back">
          <span
            className="font-sans text-center leading-tight"
            style={{
              color: "oklch(0.12 0.04 268)",
              fontSize: "clamp(0.7rem, 1.4vw, 1.25rem)",
              fontWeight: 800,
              letterSpacing: "-0.01em",
              textShadow: "0 1px 0 oklch(1 0 0 / 0.3)",
            }}
          >
            {hashtag}
          </span>
        </div>
      </div>
    </button>
  );
}
