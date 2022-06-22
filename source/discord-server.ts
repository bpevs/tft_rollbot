import "dotenv";
import {
  ApplicationCommandInteraction,
  Client,
  event,
  Intents,
  slash,
  SlashCommandOptionType,
  SlashCommandPartial,
} from "harmony";
import { ENVIRONMENT } from "./constants.ts";
import { formatOutputString } from "./utilities/formatOutputString.ts";
import { roll } from "./utilities/roll.ts";

const commands: SlashCommandPartial[] = [
  {
    name: "roll",
    description: "Roll a TFT Comp",
    options: [
      {
        name: "names",
        description: "Add player names to avoid overlapping comps",
        required: false,
        type: SlashCommandOptionType.STRING,
      },
    ],
  },
];

class TagBot extends Client {
  @event()
  ready() {
    console.log("Ready!");
    commands.forEach((command) => {
      this.slash.commands.create(command)
        .then((cmd) => console.log(`Created Slash Command ${cmd.name}!`))
        .catch((err) => console.log(`Failed to create command!`, err));
    });
  }

  @slash()
  roll(i: ApplicationCommandInteraction) {
    const options = i?.options;
    const players = (options[0]?.value || "").split(" ").filter(Boolean);
    const tooManyPlayers = players.length > 8;
    if (tooManyPlayers) i.respond({ content: "Too many players!" });

    // Default to rolling for 1 player
    const rolls = roll(new Set(players.length ? players : ["default"]));
    const content = formatOutputString(rolls, ENVIRONMENT.DISCORD);
    i.respond({ content });
  }
}

const bot = new TagBot();
bot.connect(Deno.env.get("DISCORD_TOKEN"), Intents.None);
