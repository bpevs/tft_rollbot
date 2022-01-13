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

interface Season {
  Origins: { [name: string]: string[] };
  Types: { [name: string]: string[] };
}

import { parse } from "https://deno.land/std@0.97.0/encoding/yaml.ts";
const data: Season = parse(
  Deno.readTextFileSync("./src/sets/tft-season-6.yaml"),
) as Season;

console.log(main());

function main() {
  const { playerNames, options } = parseInput();

  const rolls = RollAll({ playerNames, options });

  return formatResponse(rolls);
}

/**
 * Normalize input options from Discord or Terminal
 */
function parseInput(): Input {
  const playerNames = new Set<string>();
  const options = new Set<Options>();

  if (playerNames.size === 0) {
    playerNames.add("default");
  }

  return { playerNames, options };
}

/**
 * Creates a set of rolls based on the names given
 */
function RollAll({
  playerNames,
  options,
}: Input): Map<string, Roll> {
  const allRolls = new Map<string, Roll>();

  playerNames.forEach((name) => {
    const type = getRandom(Object.keys(data.Types));
    const origin = getRandom(Object.keys(data.Origins));
    const champions: Set<string> = new Set();

    data.Types[type].forEach(
      (champion: string) => champions.add(champion),
    );
    data.Origins[origin].forEach(
      (champion: string) => champions.add(champion),
    );

    const king: string = getRandom(Array.from(champions));

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
  let text = "";

  rolls.forEach((roll: Roll, name: string) => {
    const { type, origin, king } = roll;
    text += (
      `TFT RollBot (Season 6):\n` +
      `👑 ${king}\n` +
      `👨‍👩‍👦 ${type} + ${origin}\n`
    );
  });

  return text;
}
