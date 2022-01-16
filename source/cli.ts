/**
 * Entrypoint for using Rollbot as a command line utility.
 */
import { roll } from "./utilities/roll.ts";
import { formatOutputString } from "./utilities/formatOutputString.ts";

const playerNames = new Set<string>(Deno.args);

if (playerNames.size === 0) {
  playerNames.add("default");
}

if (playerNames.size > 8) {
  throw new Error("Too many players!  TFT has a maximum of 8 players.");
}

console.log(formatOutputString(roll(playerNames)));
