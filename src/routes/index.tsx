import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { StageFrame } from "@/components/StageFrame";
import { AuraTile } from "@/components/AuraTile";
import { SpotlightModal } from "@/components/SpotlightModal";
import { AttractScreen } from "@/components/AttractScreen";
import { ResetDialog } from "@/components/ResetDialog";
import { MR_HASHTAGS, shuffle } from "@/lib/hashtags";
import { loadHashtags } from "@/lib/hashtag-store";

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

type Category = "MR" | "MS";

function Index() {
  const [showAttract, setShowAttract] = useState(true);
  const [category, setCategory] = useState<Category>("MR");
  // SSR-safe: start with deterministic order, then load saved + shuffle on client.
  const [hashtags, setHashtags] = useState<string[]>(MR_HASHTAGS);
  useEffect(() => {
    setHashtags(shuffle(loadHashtags(category)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [spotlight, setSpotlight] = useState<number | null>(null);
  const [showReset, setShowReset] = useState(false);

  // Operator shortcuts: F11 fullscreen, R for reset
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
      // Hidden reset shortcut: Ctrl+Shift+R
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "r") {
        e.preventDefault();
        setShowReset(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleFlip = (idx: number) => {
    if (flipped.has(idx) || spotlight !== null) return;
    const next = new Set(flipped);
    next.add(idx);
    setFlipped(next);
    setSpotlight(idx);
  };

  const handleReset = (cat: Category) => {
    setCategory(cat);
    setHashtags(shuffle(loadHashtags(cat)));
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
      {/* Header */}
      <header
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between"
        style={{ padding: "1.25rem 2rem" }}
      >
        <div className="font-display silver-text" style={{ fontSize: "0.7rem", letterSpacing: "0.5em" }}>
          OLYMPUS · REVEAL
        </div>
        <div
          className="font-display silver-emboss text-center"
          style={{ fontSize: "clamp(1rem, 1.6cqw, 2rem)", fontWeight: 700, letterSpacing: "0.25em" }}
        >
          MR. & MS. CCS · {category === "MR" ? "GENTLEMEN" : "LADIES"}
        </div>
        <div
          className="font-sans"
          style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "oklch(0.82 0.01 250 / 0.6)" }}
        >
          {flipped.size}/20 REVEALED
        </div>
      </header>

      {/* Grid 5x4 — fills available stage space */}
      <main
        className="absolute inset-0 flex items-center justify-center"
        style={{ padding: "3.5rem 2rem 2rem" }}
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
              key={`${category}-${t.idx}`}
              number={t.number}
              hashtag={t.hashtag}
              flipped={flipped.has(t.idx)}
              delay={t.idx * 60}
              onClick={() => handleFlip(t.idx)}
            />
          ))}
        </div>
      </main>

      {/* Footer hint */}
      <footer
        className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between"
        style={{ padding: "0.75rem 2rem" }}
      >
        <span
          className="font-sans"
          style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "oklch(0.82 0.01 250 / 0.45)" }}
        >
          F11 · FULLSCREEN
        </span>
        <span
          className="font-sans"
          style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "oklch(0.82 0.01 250 / 0.45)" }}
        >
          ESC / SPACE · CLOSE SPOTLIGHT
        </span>
        <button
          onClick={() => setShowReset(true)}
          className="font-sans"
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            color: "oklch(0.82 0.01 250 / 0.45)",
            padding: "0.25rem 0.5rem",
          }}
        >
          ⌃⇧R · RESET
        </button>
      </footer>

      {/* Spotlight */}
      {spotlight !== null && (
        <SpotlightModal
          number={spotlight + 1}
          hashtag={hashtags[spotlight]}
          onClose={() => setSpotlight(null)}
        />
      )}

      {/* Reset dialog */}
      <ResetDialog
        open={showReset}
        onClose={() => setShowReset(false)}
        onConfirm={handleReset}
      />

      {/* Attract intro overlay */}
      {showAttract && <AttractScreen onStart={() => setShowAttract(false)} />}
    </StageFrame>
  );
}
