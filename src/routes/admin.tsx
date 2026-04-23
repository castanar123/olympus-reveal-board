import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { loadPool, savePool, resetPool } from "@/lib/hashtag-store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin · Olympus Reveal" },
      { name: "description", content: "Edit the hashtag pool for Mr. & Ms. CCS 2026." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [list, setList] = useState<string[]>(Array(20).fill(""));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setList(loadPool());
  }, []);

  const update = (idx: number, value: string) => {
    setList((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
    setSaved(false);
  };

  const ensureHash = (v: string) => {
    const t = v.trim();
    if (!t) return "";
    return t.startsWith("#") ? t : `#${t}`;
  };

  const handleSave = () => {
    const cleaned = list.map(ensureHash);
    savePool(cleaned);
    setList(cleaned);
    setSaved(true);
    setTimeout(() => setSaved(false), 2400);
  };

  const handleReset = () => {
    if (!confirm("Reset to the default hashtag pool? Your custom edits will be lost.")) return;
    setList(resetPool());
    setSaved(false);
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "var(--gradient-bg)",
        color: "oklch(0.96 0.01 250)",
        overflow: "auto",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "1100px", padding: "3rem 1.5rem 5rem" }}>
        <div className="flex items-center justify-between mb-2">
          <Link
            to="/"
            className="font-sans text-xs"
            style={{
              color: "oklch(0.82 0.01 250 / 0.7)",
              letterSpacing: "0.3em",
              padding: "0.5rem 0.75rem",
              border: "1px solid oklch(0.82 0.01 250 / 0.3)",
              borderRadius: "0.5rem",
            }}
          >
            ← BACK TO STAGE
          </Link>
          <span
            className="font-display silver-text"
            style={{ fontSize: "0.7rem", letterSpacing: "0.5em" }}
          >
            ADMIN · HASHTAG EDITOR
          </span>
        </div>

        <h1
          className="font-display silver-emboss mt-6"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: "0.05em" }}
        >
          Hashtag Pool
        </h1>
        <p className="mt-2 font-sans" style={{ color: "oklch(0.82 0.01 250 / 0.7)" }}>
          One shared pool of 20 hashtags used for all candidates. Saved entries persist on this
          device. Click <strong>Reset & Reshuffle</strong> on the stage to deal a fresh board.
        </p>

        <div
          className="grid gap-3 mt-8"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
        >
          {list.map((value, idx) => (
            <label
              key={idx}
              className="flex items-center gap-3"
              style={{
                background: "oklch(0.22 0.07 265 / 0.45)",
                border: "1px solid oklch(0.82 0.01 250 / 0.25)",
                borderRadius: "0.6rem",
                padding: "0.65rem 0.8rem",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                className="font-display silver-text shrink-0"
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  width: "2rem",
                  textAlign: "center",
                }}
              >
                {idx + 1}
              </span>
              <input
                type="text"
                value={value}
                onChange={(e) => update(idx, e.target.value)}
                onBlur={(e) => update(idx, ensureHash(e.target.value))}
                placeholder={`#Hashtag${idx + 1}`}
                className="font-sans flex-1 bg-transparent outline-none"
                style={{
                  color: "oklch(0.96 0.01 250)",
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                }}
              />
            </label>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-8">
          <button
            onClick={handleSave}
            className="font-display"
            style={{
              padding: "0.85rem 1.75rem",
              borderRadius: "0.6rem",
              letterSpacing: "0.2em",
              fontWeight: 700,
              background: "var(--gradient-silver)",
              color: "oklch(0.18 0.08 265)",
              boxShadow: "0 4px 16px oklch(0 0 0 / 0.4)",
              cursor: "pointer",
            }}
          >
            SAVE CHANGES
          </button>
          <button
            onClick={handleReset}
            className="font-display"
            style={{
              padding: "0.85rem 1.5rem",
              borderRadius: "0.6rem",
              letterSpacing: "0.2em",
              fontWeight: 600,
              background: "transparent",
              color: "oklch(0.82 0.01 250 / 0.85)",
              border: "1px solid oklch(0.82 0.01 250 / 0.4)",
              cursor: "pointer",
            }}
          >
            RESET POOL TO DEFAULT
          </button>
          {saved && (
            <span
              className="font-sans"
              style={{
                color: "oklch(0.85 0.18 150)",
                fontSize: "0.85rem",
                letterSpacing: "0.15em",
              }}
            >
              ✓ SAVED · USE STAGE'S RESET TO RESHUFFLE
            </span>
          )}
        </div>

        <p
          className="mt-10 font-sans text-xs"
          style={{ color: "oklch(0.82 0.01 250 / 0.5)", lineHeight: 1.6 }}
        >
          Note: editing the pool here does not change the current board. The stage keeps its
          shuffled order and any revealed tiles even after a refresh — only the operator's Reset
          action redeals the board.
        </p>
      </div>
    </div>
  );
}
