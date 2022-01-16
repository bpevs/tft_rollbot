/**
 * Incomplete Discord Server Code.
 *
 * @references
 * https://github.com/discordeno/serverless-deno-deploy-template
 * https://discordeno.mod.land/gettingstarted.html
 * https://github.com/discordeno/template/tree/main/beginner
 */

// For pulling token and id from env variables or .env file
import "https://deno.land/x/dotenv/load.ts";

import { startBot } from "https://deno.land/x/discordeno@12.0.1/mod.ts";
import { formatOutputString } from "./utilities/formatOutputString.ts";
import { roll } from "./utilities/roll.ts";

// Ripped from examples, but Code doesn't work idk why.
startBot({
  token: Deno.env.get("DISCORD_TOKEN"),
  intents: ["GUILDS", "GUILD_MESSAGES"],
  eventHandlers: {
    ready() {
      console.log("Successfully connected to gateway");
    },
    messageCreate(message) {
      if (message.content === "!roll") {
        // parse message for player names here?

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

        message.reply(text);
      }
    },
  },
});
