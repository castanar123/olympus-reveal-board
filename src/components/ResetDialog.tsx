import { useState } from "react";

const RESET_PASSCODE = "ccs2026";

interface ResetDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ResetDialog({ open, onClose, onConfirm }: ResetDialogProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  if (!open) return null;

  const submit = () => {
    if (code === RESET_PASSCODE) {
      setCode("");
      setError(false);
      onConfirm();
    } else {
      setError(true);
    }
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      style={{
        background: "oklch(0.05 0.03 268 / 0.85)",
        backdropFilter: "blur(20px)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="font-sans"
        style={{
          width: "min(440px, 90%)",
          padding: "2rem",
          borderRadius: "1rem",
          background: "var(--gradient-tile)",
          border: "2px solid oklch(0.82 0.01 250 / 0.5)",
          boxShadow: "0 30px 60px oklch(0 0 0 / 0.7), 0 0 40px oklch(0.55 0.22 260 / 0.3)",
          backdropFilter: "blur(20px)",
        }}
      >
        <h3
          className="font-display silver-text text-center"
          style={{ fontSize: "1.6rem", fontWeight: 700, letterSpacing: "0.05em" }}
        >
          RESET & RESHUFFLE
        </h3>
        <p
          className="text-center mt-2"
          style={{
            color: "oklch(0.82 0.01 250 / 0.75)",
            fontSize: "0.78rem",
            letterSpacing: "0.12em",
            lineHeight: 1.5,
          }}
        >
          This will clear all revealed tiles and deal a brand new shuffled board.
        </p>

        <input
          type="password"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Enter operator passcode"
          autoFocus
          className="w-full mt-6 px-4 py-3 rounded-lg outline-none"
          style={{
            background: "oklch(0.1 0.05 268 / 0.6)",
            border: `1px solid ${error ? "oklch(0.65 0.25 25)" : "oklch(0.82 0.01 250 / 0.4)"}`,
            color: "oklch(0.96 0.01 250)",
            letterSpacing: "0.2em",
          }}
        />
        {error && (
          <p style={{ color: "oklch(0.7 0.22 25)", fontSize: "0.75rem", marginTop: "0.5rem" }}>
            Incorrect passcode.
          </p>
        )}

        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={onClose}
            className="py-3 rounded-lg font-display"
            style={{
              background: "transparent",
              color: "oklch(0.82 0.01 250 / 0.85)",
              letterSpacing: "0.2em",
              fontWeight: 600,
              border: "1px solid oklch(0.82 0.01 250 / 0.4)",
              cursor: "pointer",
            }}
          >
            CANCEL
          </button>
          <button
            onClick={submit}
            className="py-3 rounded-lg font-display font-semibold transition-transform hover:scale-[1.03]"
            style={{
              background: "var(--gradient-silver)",
              color: "oklch(0.18 0.08 265)",
              letterSpacing: "0.2em",
              boxShadow: "0 4px 16px oklch(0 0 0 / 0.4)",
              cursor: "pointer",
            }}
          >
            RESHUFFLE
          </button>
        </div>
      </div>
    </div>
  );
}
