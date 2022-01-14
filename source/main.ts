import { default as rollAll } from "./rollAll.ts";
import { Options, Input } from "./types.ts";

const availableOptions = new Set([
  "--include-all",
  "--no-dedupe",
]);

console.log(main(getTerminalArgs()));

export function main({ playerNames, options }: Input) {
  return rollAll({ playerNames, options });
}

/**
 * Normalize input options from Terminal
 */
export function getTerminalArgs(): Input {
  const args = Deno.args;

  const playerNames = new Set<string>(
    Deno.args.filter((arg: string) => !availableOptions.has(arg)),
  );

  const options = new Set<Options>();

  if (playerNames.size === 0) {
    playerNames.add("default");
  }

  if (playerNames.size > 8) {
    throw new Error("Too many players!  TFT has a maximum of 8 players.");
  }

  return { playerNames, options };
}
