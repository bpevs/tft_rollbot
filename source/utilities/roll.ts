import { Season, season } from "../data/tft-season-6.ts";

const { types, origins } = season;

export interface RollResult {
  king: string;
  origin: string;
  type: string;
}

export type RollResultCollection = {
  [playerName: string]: RollResult;
};

export type RollResults = { [playerName: string]: RollResult };
type ChampionSet = { [name: string]: string[] };

/**
 * Creates a set of rolls based on the names given
 */
export function roll(playerNames: Set<string> = new Set()): RollResults {
  const results: RollResults = {};

  const championTypes: ChampionSet = filter(types, hasMoreThan2Champions);
  const championOrigins: ChampionSet = filter(origins, hasMoreThan2Champions);

  const takenKings: string[] = [];
  let availableTypes = Object.keys(championTypes);
  let availableOrigins = Object.keys(championOrigins);

  playerNames.forEach((name) => {
    const type: string = getRandom(availableTypes);
    const origin: string = getRandom(availableOrigins);

    const availableKings: Set<string> = new Set();

    championTypes[type]
      .concat(championOrigins[origin])
      .forEach((champion: string) => {
        availableKings.add(champion);
      });

    const king: string = getRandom(
      Array.from(availableKings).filter(
        (king: string) => !takenKings.includes(king),
      ),
    );

    results[name] = { king, origin, type };

    // Update type, origin, and king, so they aren't used by subsequent players
    availableTypes = availableTypes.filter(
      (typeName: string) => typeName !== type,
    );

    availableOrigins = availableOrigins.filter(
      (originName: string) => originName !== origin,
    );

    takenKings.push(king);
  });

  return results;
}

// Get a randon string from an array
function getRandom(arr: string[]): string {
  return arr[(arr.length * Math.random()) << 0];
}

// It sucks to get a set with only 2 or 1 champions,
// so let's ignore these cases
function hasMoreThan2Champions(champions: string[]) {
  return champions.length > 2;
}

// Iterate and filter over objects
function filter(
  collection: { [name: string]: any },
  func: (item: any, index: string) => boolean,
): { [name: string]: any } {
  const result: { [name: string]: any } = {};

  for (const index in collection) {
    if (collection.hasOwnProperty(index)) {
      const item = collection[index];
      if (func(item, index)) result[index] = item;
    }
  }

  return result;
}
