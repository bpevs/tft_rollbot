import traits from "../../db/data.json" assert { type: "json" };

export interface RollResult {
  king: string;
  traitOne: string;
  traitTwo: string;
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

  const championTraits: ChampionSet = filter(traits, hasMoreThan2Champions);

  const takenKings: string[] = [];
  let availableTraits = Object.keys(championTraits);

  playerNames.forEach((name) => {
    const indexOne: number = getRandomIndex(availableTraits);
    const traitOne: string = availableTraits[indexOne];

    const indexTwo: number = getRandomIndex(availableTraits, indexOne);
    const traitTwo: string = availableTraits[indexTwo]

    const availableKings: Set<string> = new Set();

    championTraits[traitOne]
      .concat(championTraits[traitTwo])
      .forEach((champion: string) => {
        availableKings.add(champion);
      });

    const kingIndex: number = getRandomIndex(
      Array.from(availableKings).filter(
        (king: string) => !takenKings.includes(king),
      ),
    );
    const king: string = Array.from(availableKings)[kingIndex];

    results[name] = { king, traitOne, traitTwo };

    // Update type, origin, and king, so they aren't used by subsequent players
    availableTraits = availableTraits.filter(
      (traitName: string) => traitName !== traitOne && traitName !== traitTwo,
    );

    takenKings.push(king);
  });

  return results;
}

// Get a randon string from an array
function getRandomIndex(arr: string[], illegalIndex?: number): number {
  let index = (arr.length * Math.random()) << 0;
  while (illegalIndex != null && illegalIndex === index) {
    index = (arr.length * Math.random()) << 0;
  }
  return index;
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
