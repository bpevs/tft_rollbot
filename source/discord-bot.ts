import { default as rollAll } from "./rollAll.ts";
import { Input, Options, Roll } from "./types.ts";

import { ChannelTypes, Guild, logGreen } from "./mod.ts";

// Entry Message
export const guildCreate = (guild: Guild) => {
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
    const playerNames = new Set(["ben"]);

    const rolls = rollAll({ playerNames });

    let text = "TFT RollBot (Season 6):\n\n";

    rolls.forEach((roll: Roll, name: string) => {
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
