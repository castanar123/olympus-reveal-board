// Default hashtag pool — operator can swap categories (Mr. / Ms.) via reset.
export const MR_HASHTAGS: string[] = [
  "#CodeOfHonor",
  "#KingOfQueries",
  "#BinaryRoyalty",
  "#OlympusOnline",
  "#TheRootUser",
  "#AlphaAlgorithm",
  "#ZeusOfZeroes",
  "#TheMainframe",
  "#SovereignSyntax",
  "#CrownedCoder",
  "#PrinceOfPython",
  "#TitanOfTech",
  "#TheGoldenGate",
  "#KernelKing",
  "#ApolloProtocol",
  "#MajesticMethod",
  "#RegalRender",
  "#ImperialInput",
  "#NobleNetwork",
  "#MonarchMode",
];

export const MS_HASHTAGS: string[] = [
  "#QueenOfQueries",
  "#AthenaOnline",
  "#SovereignScript",
  "#BinaryBeauty",
  "#CrownedCompiler",
  "#PrincessOfPixels",
  "#GoddessOfGigabytes",
  "#RoyalRuntime",
  "#DivineDebug",
  "#MajesticMatrix",
  "#TheDataDuchess",
  "#EmpressOfEnigma",
  "#StellarSyntax",
  "#NobleNeural",
  "#OlympicOutput",
  "#LuminaryLogic",
  "#GraceOfGoogle",
  "#MuseOfMachines",
  "#CelestialCode",
  "#RadiantRender",
];

export function shuffle<T>(array: T[]): T[] {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
