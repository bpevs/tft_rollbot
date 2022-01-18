import { Command, CommandBuilder, CommandContext } from "./deps.ts";

import type { RollResults } from "../utilities/roll.ts";
import { formatOutputString } from "../utilities/formatOutputString.ts";
import { roll } from "../utilities/roll.ts";

type buildCommandArgs = {
  aliases?: string | string[];
  name: string;
  contextMessage?: string;
};

const commandsToRoll = ["rr", "roll"];

let rolls: RollResults;

const buildCommand = ({
  aliases = "",
  name,
  contextMessage,
}: buildCommandArgs): Command => {
  return new CommandBuilder()
    .setName(name)
    .setAlias(aliases)
    .onBeforeExecute((ctx: CommandContext) => {
      if (!ctx.rawArgs.length && commandsToRoll.includes(name)) {
        ctx.message.reply("missing player names");
        return false;
      } else {
        rolls = roll(new Set(ctx.rawArgs));
        return true;
      }
    })
    .onExecute((ctx: CommandContext) => {
      if (name === "help") {
        ctx.message.reply(contextMessage);
      } else {
        ctx.message.reply(formatOutputString(rolls));
      }
    });
};

export const rollCommand = buildCommand({
  aliases: commandsToRoll,
  name: "roll",
});

export const helpCommand = buildCommand({
  name: "help",
  contextMessage: `To roll/reroll: !rr / !roll [player_names_separated_by_spaces]`,
});
