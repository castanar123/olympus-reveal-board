// Single shared hashtag pool for all candidates.
export const DEFAULT_HASHTAGS: string[] = [
  "#CodeOfHonor",
  "#OlympusOnline",
  "#BinaryRoyalty",
  "#SovereignSyntax",
  "#CrownedCompiler",
  "#DivineDebug",
  "#StellarSyntax",
  "#RoyalRuntime",
  "#CelestialCode",
  "#RadiantRender",
  "#MajesticMatrix",
  "#NobleNeural",
  "#ApolloProtocol",
  "#AthenaOnline",
  "#TitanOfTech",
  "#KernelKing",
  "#LuminaryLogic",
  "#OlympicOutput",
  "#RegalRender",
  "#MonarchMode",
];

export function shuffle<T>(array: T[]): T[] {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
