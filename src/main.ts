type Options = 'include-all' | 'no-dedupe';

interface Roll {
  king: string;
  origin: string;
  type: string;
}

interface Input {
  playerNames: Set<string>;
  options: Set<Options>;
}

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
    playerNames.add('default');
  }

  return { playerNames, options };
}

/**
 * Creates a set of rolls based on the names given
 */
function RollAll({
  playerNames,
  options,
}: Input): Set<Roll> {
  const allRolls = new Set<Roll>();

  return allRolls;
}

/**
 * Format the set of rolls into a response string
 */
function formatResponse(rolls): string {
  return '';
}
