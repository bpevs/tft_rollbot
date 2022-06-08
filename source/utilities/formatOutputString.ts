import type { RollResult, RollResultCollection } from "./roll.ts";

import { ENVIRONMENT, Environment } from "../constants.ts";

const { DISCORD, POWER_SHELL, TERMINAL } = ENVIRONMENT;

interface RollData extends RollResult {
  playerName: string;
  showPlayerName: boolean;
}

type Formatter = (roll: RollData) => string;

const formatters: { [environment: string]: Formatter } = {
  [ENVIRONMENT.DISCORD]: formatPlayerTextForDiscord,
  [ENVIRONMENT.POWER_SHELL]: formatPlayerTextForPowerShell,
  [ENVIRONMENT.TERMINAL]: formatPlayerTextForTerminal,
};

const titleText = "TFT RollBot (Season 6.5):\n\n";

export function formatOutputString(
  rolls: RollResultCollection,
  environment: Environment = ENVIRONMENT.POWER_SHELL,
): string {
  const numPlayers = Object.keys(rolls).length;
  const shouldDisplayPlayerName = numPlayers > 1;

  // Default to POWER_SHELL, because it's the most basic formatter
  const formatter = formatters[environment] || formatters[POWER_SHELL];
  const playerText = Object.keys(rolls)
    .map((playerName: string) => {
      const roll = rolls[playerName];
      const showPlayerName = Object.keys(rolls).length > 1;
      return formatter({ ...roll, playerName, showPlayerName });
    })
    .join("\n");

  return titleText + playerText;
}

function formatPlayerTextForDiscord(roll: RollData) {
  const { showPlayerName, playerName, king, traitOne, traitTwo } = roll;
  const playerNameText = showPlayerName ? `${playerName}\n` : "";
  const kingText = `  👑  ${king}\n`;
  const teamText = `  ⚔  ${traitOne} + ${traitTwo}\n`;

  return playerNameText + kingText + teamText;
}

// PowerShell does not support emoji
function formatPlayerTextForPowerShell(roll: RollData) {
  const { showPlayerName, playerName, king, traitOne, traitTwo } = roll;
  const playerNameText = showPlayerName ? `${playerName}\n` : "";
  const kingText = `  King: ${king}\n`;
  const teamText = `  Team: ${traitOne} + ${traitTwo}\n`;

  return playerNameText + kingText + teamText;
}

function formatPlayerTextForTerminal(roll: RollData) {
  const { showPlayerName, playerName, king, traitOne, traitTwo } = roll;
  const playerNameText = showPlayerName ? `${playerName}\n` : "";
  const kingText = `  👑: ${king}\n`;
  const teamText = `  👨‍👩‍👦: ${traitOne} + ${traitTwo}\n`;

  return playerNameText + kingText + teamText;
}
