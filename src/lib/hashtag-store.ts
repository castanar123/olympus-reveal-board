// Persistent hashtag store (localStorage) so the admin page and the stage share state.
import { MR_HASHTAGS as DEFAULT_MR, MS_HASHTAGS as DEFAULT_MS } from "./hashtags";

const KEY_MR = "olympus.hashtags.MR";
const KEY_MS = "olympus.hashtags.MS";

function pad(arr: string[], fallback: string[], n = 20): string[] {
  const out = [...arr];
  while (out.length < n) out.push(fallback[out.length] ?? `#Hashtag${out.length + 1}`);
  return out.slice(0, n);
}

export function loadHashtags(category: "MR" | "MS"): string[] {
  if (typeof window === "undefined") {
    return category === "MR" ? DEFAULT_MR : DEFAULT_MS;
  }
  try {
    const raw = localStorage.getItem(category === "MR" ? KEY_MR : KEY_MS);
    if (!raw) return category === "MR" ? DEFAULT_MR : DEFAULT_MS;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error("bad");
    return pad(
      parsed.map((s: unknown) => String(s ?? "")),
      category === "MR" ? DEFAULT_MR : DEFAULT_MS
    );
  } catch {
    return category === "MR" ? DEFAULT_MR : DEFAULT_MS;
  }
}

export function saveHashtags(category: "MR" | "MS", list: string[]): void {
  if (typeof window === "undefined") return;
  const cleaned = pad(
    list.map((s) => s.trim()).filter((s) => s.length > 0),
    category === "MR" ? DEFAULT_MR : DEFAULT_MS
  );
  localStorage.setItem(category === "MR" ? KEY_MR : KEY_MS, JSON.stringify(cleaned));
}

export function resetHashtags(category: "MR" | "MS"): string[] {
  if (typeof window !== "undefined") {
    localStorage.removeItem(category === "MR" ? KEY_MR : KEY_MS);
  }
  return category === "MR" ? DEFAULT_MR : DEFAULT_MS;
}
