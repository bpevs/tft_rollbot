import "dotenv";
import * as deploy from "deploy";
import { ApplicationCommandType, ApplicationCommandInteraction, SlashCommandOptionType } from "harmony";

import { ENVIRONMENT } from "./constants.ts";
import { formatOutputString } from "./utilities/formatOutputString.ts";
import { roll } from "./utilities/roll.ts";

deploy.init({ env: true });

const commands = await deploy.commands.all();

if (commands.size !== 1) {
  deploy.commands.bulkEdit([
    {
      name: "roll",
      description: "Roll a TFT Comp",
      options: [
        {
          name: "names",
          description: "Adding player names avoids overlapping comps",
          required: false,
          type: SlashCommandOptionType.STRING,
        },
      ],
    },
  ]);
}

deploy.handle("roll", (i: ApplicationCommandInteraction) => {
  const options = i?.options;
  console.log('Attempting to Roll...');
  console.log('Players:', i?.options);
  const players = (options[0]?.value || "").split(" ").filter(Boolean);
  const tooManyPlayers = players.length > 8;
  if (tooManyPlayers) i.reply({ content: "Too many players!" });

  // Default to rolling for 1 player
  const rolls = roll(new Set(players.length ? players : ["default"]));
  const content = formatOutputString(rolls, ENVIRONMENT.DISCORD);
  i.reply({ content });
}, ApplicationCommandType.MESSAGE);

console.log("Setup Complete");
