/**
 * Incomplete Discord Server Code.
 *
 * @references
 * https://github.com/discordeno/serverless-deno-deploy-template
 * https://dev.to/eternalllight/making-a-discord-bot-with-deno-and-discordeno-3mhm
 */

import { roll } from "./utilities/roll.ts";
import { formatOutputString } from "./utilities/formatOutputString";
import { ChannelTypes, Guild, logGreen } from "./mod.ts";

// Entry Message
export const guildCreate = (guild) => {
  logGreen(
    `[EVENT=GuildCreate]: ${guild.name} with ${guild.memberCount} members.`,
  );
  for (const channel of guild.channels.values()) {
    if (channel.type !== ChannelTypes.GUILD_TEXT) {
      continue;
    }
    channel.sendMessage("Hello there!");
    break;
  }
};

// Setup Roll Command
botCache.command.set("roll", {
  callback: (message) => {
    const rolls = roll(new Set(["player1"]));

    let text = "TFT RollBot (Season 6):\n\n";

    rolls.forEach((roll, name) => {
      const { type, origin, king } = roll;
      text += (
        (rolls.size > 1 ? `${name}\n` : "") +
        `👑 ${king}\n` +
        `👨‍👩‍👦 ${type} + ${origin}\n\n`
      );
    });

    return message.channel.sendMessage(text);
  },
});
