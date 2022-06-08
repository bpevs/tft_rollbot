// deno-lint-ignore-file no-explicit-any
import data from "./cache.json" assert { type: "json" };

const SET_NAME: string = "7";

/**
 *  There is no auto-generated static content for TFT currently...
 *  Latest update is from set 5....
 *  https://developer.riotgames.com/docs/tft#static-data
 *
 *  Therefore, use community-driven site cdragon:
 *    - https://www.communitydragon.org
 *
 *  We may need to add some set-specific filters if the set has
 *  unobtainable champions
 */
 interface Data {
  items: any[];
  setData: SetData[];
  sets: any;
}

interface SetData {
  champions: Champion[];
  mutator: string;
  name: string;
  number: number;
  traits: Trait[];
}

interface Champion {
  apiName: string;
  cost: number;
  icon: string;
  name: string;
  traits: string[];
  ability: any;
  stats: any;
}

interface Trait {
  apiName: string;
  desc: string;
  effects: any[];
  icon: string;
  name: string;
}

const { champions, traits } = data.sets[SET_NAME];

const traitsSet: Set<string> = new Set();
traits.forEach(({ name }) => traitsSet.add(name));

const results: { [name: string]: string[] } = {};
traitsSet.forEach((trait: string) => {
  results[trait] = [];
});

champions.forEach((champion: Champion) => {
  champion.traits.forEach((trait: string) => {
    results[trait].push(champion.name);
  });
});

Deno.writeTextFileSync(`./db/data.json`, JSON.stringify(results, null, 2));
