import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { StageFrame } from "@/components/StageFrame";
import { AuraTile } from "@/components/AuraTile";
import { SpotlightModal } from "@/components/SpotlightModal";
import { AttractScreen } from "@/components/AttractScreen";
import { ResetDialog } from "@/components/ResetDialog";
import { DEFAULT_HASHTAGS } from "@/lib/hashtags";
import {
  loadOrCreateBoard,
  loadFlipped,
  saveFlipped,
  resetBoard,
} from "@/lib/hashtag-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Olympus Reveal · Mr. & Ms. CCS 2026" },
      {
        name: "description",
        content:
          "The official hashtag reveal system for Mr. & Ms. CCS 2026 — Digital Royalty Edition.",
      },
      { property: "og:title", content: "Olympus Reveal · Mr. & Ms. CCS 2026" },
      {
        property: "og:description",
        content: "Live hashtag reveal stage for Mr. & Ms. CCS 2026.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  // Attract screen always shown on first mount (acts as accidental-click guard).
  const [showAttract, setShowAttract] = useState(true);

  // SSR-safe defaults; real persisted board + flipped set are loaded on the client.
  const [hashtags, setHashtags] = useState<string[]>(DEFAULT_HASHTAGS);
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [spotlight, setSpotlight] = useState<number | null>(null);
  const [showReset, setShowReset] = useState(false);

  // Hydrate from localStorage on mount: persists across accidental refresh.
  useEffect(() => {
    setHashtags(loadOrCreateBoard());
    setFlipped(new Set(loadFlipped()));
  }, []);

  // Operator shortcuts: F11 fullscreen, Ctrl+Shift+R for reset.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "F11") {
        e.preventDefault();
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen?.().catch(() => {});
        } else {
          document.exitFullscreen?.().catch(() => {});
        }
      }
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "r") {
        e.preventDefault();
        setShowReset(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleFlip = (idx: number) => {
    if (flipped.has(idx) || spotlight !== null || showAttract) return;
    const next = new Set(flipped);
    next.add(idx);
    setFlipped(next);
    saveFlipped(next);
    setSpotlight(idx);
  };

  const handleReset = () => {
    const { board } = resetBoard();
    setHashtags(board);
    setFlipped(new Set());
    setSpotlight(null);
    setShowReset(false);
  };

  const tiles = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        idx: i,
        number: i + 1,
        hashtag: hashtags[i],
      })),
    [hashtags]
  );

  return (
    <StageFrame>
      {/* Safe-zone wrapper — keeps text & tile borders inside the visible area on
          LED walls / projectors that have bezel or 5% overscan. */}
      <div className="stage-safe absolute inset-0">
        <header
          className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between"
          style={{ padding: "1rem 1.5rem" }}
        >
          <div
            className="font-display silver-text"
            style={{ fontSize: "0.7rem", letterSpacing: "0.5em" }}
          >
            OLYMPUS · REVEAL
          </div>
          <div
            className="font-display silver-emboss text-center"
            style={{
              fontSize: "clamp(1rem, 1.6cqw, 2rem)",
              fontWeight: 700,
              letterSpacing: "0.25em",
            }}
          >
            MR. & MS. CCS · HASHTAG REVEAL
          </div>
          <div
            className="font-sans"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              color: "oklch(0.82 0.01 250 / 0.6)",
            }}
          >
            {flipped.size}/20 REVEALED
          </div>
        </header>

        <main
          className="absolute inset-0 flex items-center justify-center"
          style={{ padding: "3.25rem 1rem 2.25rem" }}
        >
          <div
            className="grid w-full h-full"
            style={{
              gridTemplateColumns: "repeat(5, 1fr)",
              gridTemplateRows: "repeat(4, 1fr)",
              gap: "clamp(0.4rem, 0.7cqw, 1rem)",
            }}
          >
            {tiles.map((t) => (
              <AuraTile
                key={t.idx}
                number={t.number}
                hashtag={t.hashtag}
                flipped={flipped.has(t.idx)}
                delay={t.idx * 60}
                onClick={() => handleFlip(t.idx)}
              />
            ))}
          </div>
        </main>

        <footer
          className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between"
          style={{ padding: "0.5rem 1.5rem", gap: "1rem" }}
        >
          <span
            className="font-sans"
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              color: "oklch(0.82 0.01 250 / 0.45)",
            }}
          >
            F11 · FULLSCREEN
          </span>
          <span
            className="font-sans"
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              color: "oklch(0.82 0.01 250 / 0.45)",
            }}
          >
            ESC / SPACE · CLOSE SPOTLIGHT
          </span>
          <div className="flex items-center gap-2">
            <Link
              to="/admin"
              className="font-sans"
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                color: "oklch(0.82 0.01 250 / 0.55)",
                padding: "0.25rem 0.6rem",
                border: "1px solid oklch(0.82 0.01 250 / 0.3)",
                borderRadius: "0.35rem",
              }}
            >
              ADMIN
            </Link>
            <button
              onClick={() => setShowReset(true)}
              className="font-sans"
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                color: "oklch(0.82 0.01 250 / 0.45)",
                padding: "0.25rem 0.5rem",
                cursor: "pointer",
              }}
            >
              ⌃⇧R · RESET
            </button>
          </div>
        </footer>
      </div>

      {spotlight !== null && (
        <SpotlightModal
          number={spotlight + 1}
          hashtag={hashtags[spotlight]}
          onClose={() => setSpotlight(null)}
        />
      )}

      <ResetDialog
        open={showReset}
        onClose={() => setShowReset(false)}
        onConfirm={handleReset}
      />

      {showAttract && <AttractScreen onStart={() => setShowAttract(false)} />}
    </StageFrame>
  );
}
