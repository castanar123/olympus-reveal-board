// Persistent shared store: hashtag pool, current shuffled board, and flipped state.
// Survives accidental refresh — only the explicit Reset action wipes it.
import { DEFAULT_HASHTAGS, shuffle } from "./hashtags";

const KEY_POOL = "olympus.pool";
const KEY_BOARD = "olympus.board";
const KEY_FLIPPED = "olympus.flipped";

const TOTAL = 20;

function pad(arr: string[]): string[] {
  const out = arr.map((s) => String(s ?? "").trim()).filter((s) => s.length > 0);
  while (out.length < TOTAL) out.push(DEFAULT_HASHTAGS[out.length] ?? `#Hashtag${out.length + 1}`);
  return out.slice(0, TOTAL);
}

/* ---------- Editable pool (admin) ---------- */

export function loadPool(): string[] {
  if (typeof window === "undefined") return DEFAULT_HASHTAGS;
  try {
    const raw = localStorage.getItem(KEY_POOL);
    if (!raw) return DEFAULT_HASHTAGS;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error("bad");
    return pad(parsed.map(String));
  } catch {
    return DEFAULT_HASHTAGS;
  }
}

export function savePool(list: string[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_POOL, JSON.stringify(pad(list)));
}

export function resetPool(): string[] {
  if (typeof window !== "undefined") localStorage.removeItem(KEY_POOL);
  return DEFAULT_HASHTAGS;
}

/* ---------- Live board state (stage) ---------- */

/** Returns the persisted shuffled board, or creates+saves a fresh shuffle. */
export function loadOrCreateBoard(): string[] {
  if (typeof window === "undefined") return DEFAULT_HASHTAGS;
  try {
    const raw = localStorage.getItem(KEY_BOARD);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === TOTAL) return parsed.map(String);
    }
  } catch {
    /* fall through */
  }
  const fresh = shuffle(loadPool());
  localStorage.setItem(KEY_BOARD, JSON.stringify(fresh));
  return fresh;
}

export function loadFlipped(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY_FLIPPED);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(Number).filter((n) => Number.isInteger(n) && n >= 0 && n < TOTAL);
  } catch {
    return [];
  }
}

export function saveFlipped(flipped: Set<number>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_FLIPPED, JSON.stringify(Array.from(flipped)));
}

/** Explicit reset: reshuffle the board AND clear flipped tiles. */
export function resetBoard(): { board: string[]; flipped: number[] } {
  const board = shuffle(loadPool());
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY_BOARD, JSON.stringify(board));
    localStorage.removeItem(KEY_FLIPPED);
  }
  return { board, flipped: [] };
}
