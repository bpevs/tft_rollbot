import type { RollResults } from "../utilities/roll.ts";

import { Command, CommandBuilder, CommandContext } from "harmony";

import { ENVIRONMENT } from "../constants.ts";
import { formatOutputString } from "../utilities/formatOutputString.ts";
import { roll } from "../utilities/roll.ts";

export interface BuildCommandArgs {
  aliases?: string | string[];
  name: string;
  contextMessage?: string;
}

const commandsToRoll = ["rr", "roll"];

const buildCommand = ({
  aliases = "",
  name,
  contextMessage,
}: BuildCommandArgs): Command => {
  return new CommandBuilder()
    .setName(name)
    .setAlias(aliases)
    .onBeforeExecute((ctx: CommandContext) => {
      const isRolling = commandsToRoll.includes(name);
      const tooManyPlayers = ctx.rawArgs.length > 8;

      if (isRolling && tooManyPlayers) {
        ctx.message.reply("You ain't playing TFT with more than 8 players");
        return false;
      }

      return true;
    })
    .onExecute((ctx: CommandContext) => {
      if (name === "help") {
        ctx.message.reply(contextMessage);
      } else {
        const args = ctx?.rawArgs || [];
        // Default to rolling for 1 player
        const rolls = roll(new Set(args.length ? args : ["default"]));
        ctx.message.reply(formatOutputString(rolls, ENVIRONMENT.DISCORD));
      }
    });
};

export const rollCommand = buildCommand({
  aliases: commandsToRoll,
  name: "roll",
});

export const helpCommand = buildCommand({
  name: "help",
  contextMessage: "Hello! I can roll your comps for Ultimate Bravery!\n\n" +
    "**Single Roll:** `!roll` or `!rr`\n" +
    "**Party Roll:** `!roll player1 player2 player3`\n\n",
});
