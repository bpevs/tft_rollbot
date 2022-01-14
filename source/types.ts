export type Options = "include-all" | "no-dedupe";

export interface Roll {
  king: string;
  origin: string;
  type: string;
}

export interface Input {
  playerNames: Set<string>;
  options?: Set<Options>;
}
