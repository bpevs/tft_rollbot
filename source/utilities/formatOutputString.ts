import { RollResult } from "./roll.ts";

// Format rolls into a response string
export function formatOutputString(rolls: {
  [playerName: string]: RollResult;
}): string {
  let text = "TFT RollBot (Season 6):\n\n";
  const numPlayers = Object.keys(rolls).length;

  Object.keys(rolls).forEach((playerName: string) => {
    const roll = rolls[playerName];
    const { type, origin, king } = roll;

    text +=
      (numPlayers > 1 ? `${playerName}\n` : "") +
      `👑  King/Queen: ${king}\n` +
      `⚔   Team: ${type} + ${origin}\n\n`;
  });

  return text;
}
