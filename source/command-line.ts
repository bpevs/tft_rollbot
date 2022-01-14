import { default as rollAll } from "./rollAll.ts";
import { Input, Options, Roll } from "./types.ts";

const availableOptions = new Set([
  "--include-all",
  "--no-dedupe",
]);

export function main() {
  const { playerNames, options }: Input = getTerminalArgs();
  console.log(formatTerminalResponse(rollAll({ playerNames, options })));
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

/**
 * Format the set of rolls into a response string
 */
function formatTerminalResponse(rolls: Map<string, Roll>): string {
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
