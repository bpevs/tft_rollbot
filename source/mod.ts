// Dependencies are used for Discord Bot

import { Guild } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v4/structures/guild.ts";
import { ChannelTypes } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v4/types/channel.ts";
import { logGreen } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v4/utils/logger.ts";
import { Message } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v4/structures/message.ts";
import { Command } from "./src/types/commands.ts";

interface Command {
  dmOnly?: boolean;
  guildOnly?: boolean;
  nsfw?: boolean;
  callback: (message: Message, args: string[], guild?: Guild) => unknown;
}

export const botCache = {
  commands: new Map<string, Command>(),
  commandAliases: new Map<string, string>(),
  guildPrefixes: new Map<string, string>(),
  inhibitors: new Map<
    string,
    (message: Message, command: Command, guild?: Guild) => boolean
  >(),
};

export { ChannelTypes, Guild, logGreen, Message };
