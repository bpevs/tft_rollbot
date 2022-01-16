/**
 * Incomplete Discord Server Code.
 *
 * @references
 * https://github.com/discordeno/serverless-deno-deploy-template
 * https://discordeno.mod.land/gettingstarted.html
 */

import { roll } from "./utilities/roll.ts";
import { formatOutputString } from "./utilities/formatOutputString.ts";
import { ChannelTypes, logGreen } from "./deps.ts";

// Setup Roll Command
botCache.command.set("roll", {
  callback: (message) => {
    const rolls = roll(new Set(["player1"]));

    let text = "TFT RollBot (Season 6):\n\n";

    Object.keys(rolls).forEach((playerName) => {
      const roll = rolls[playerName];
      const { type, origin, king } = roll;

      text += (
        (numPlayers > 1 ? `${playerName}\n` : "") +
        `  King: ${king}\n` +
        `  Team: ${type} + ${origin}\n\n`
      );
    });

    return message.channel.sendMessage(text);
  },
});
