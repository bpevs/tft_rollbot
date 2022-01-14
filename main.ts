type Options = "include-all" | "no-dedupe";

interface Roll {
  king: string;
  origin: string;
  type: string;
}

interface Input {
  playerNames: Set<string>;
  options: Set<Options>;
}

import { Season, season } from "./sets/tft-season-6.ts";

const availableOptions = new Set([
  "--include-all",
  "--no-dedupe",
]);

console.log(main());

function main() {
  const { playerNames, options } = getTerminalArgs();

  const rolls = RollAll({ playerNames, options });

  return formatResponse(rolls);
}

/**
 * Normalize input options from Terminal
 */
function getTerminalArgs(): Input {
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

/**
 * Normalize input options from Discord
 */
function getDiscordArgs() {}

/**
 * Creates a set of rolls based on the names given
 */
function RollAll({
  playerNames,
  options,
}: Input): Map<string, Roll> {
  const allRolls = new Map<string, Roll>();
  const { Types, Origins } = season;

  const takenKings: string[] = [];

  let availableTypes = options.has("include-all")
    ? Object.keys(Types)
    : Object.keys(Types).filter(
      (key: string) => Types[key].length > 2,
    );

  let availableOrigins = options.has("include-all")
    ? Object.keys(Origins)
    : Object.keys(Origins).filter(
      (key: string) => Origins[key].length > 2,
    );

  playerNames.forEach((name) => {
    const type = getRandom(availableTypes);
    const origin = getRandom(availableOrigins);
    const availableChampions: Set<string> = new Set();

    Types[type].forEach(
      (champion: string) => availableChampions.add(champion),
    );

    Origins[origin].forEach(
      (champion: string) => availableChampions.add(champion),
    );

    // If "no-dedupe" is not selected, make sure different players don't get
    // the same King, Type, or Origin as other players
    if (!options.has("no-dedupe")) {
      availableTypes = availableTypes.filter(
        (key: string) => (key !== type),
      );

      availableOrigins = availableOrigins.filter(
        (key: string) => (key !== origin),
      );

      takenKings.forEach((champion: string) => {
        availableChampions.delete(champion);
      });
    }

    const king: string = getRandom(Array.from(availableChampions));

    if (!options.has("no-dedupe")) {
      takenKings.push(king);
    }

    allRolls.set(name, { king, origin, type });
  });

  return allRolls;
}

/**
 * Get a randon string from an array
 */
function getRandom(arr: string[]): string {
  return arr[arr.length * Math.random() << 0];
}

/**
 * Format the set of rolls into a response string
 */
function formatResponse(rolls: Map<string, Roll>): string {
  let text = "TFT RollBot (Season 6):\n\n";

  rolls.forEach((roll: Roll, name: string) => {
    const { type, origin, king } = roll;
    text += (
      (rolls.size > 1 ? `${name}\n` : "") +
      `👑 ${king}\n` +
      `👨‍👩‍👦 ${type} + ${origin}\n\n`
    );
  });

  return text;
}
