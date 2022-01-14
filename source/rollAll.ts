import { Roll, Input } from "./types.ts";
import { Season, season } from "./sets/tft-season-6.ts";

/**
 * Creates a set of rolls based on the names given
 */
export default function RollAll({
  playerNames,
  options,
}: Input): string {
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

  return formatResponse(allRolls);
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
