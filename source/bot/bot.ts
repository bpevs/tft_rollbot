import "https://deno.land/x/dotenv/load.ts";

import { CommandClient, Intents } from "./deps.ts";
import { helpCommand, rollCommand } from "./commands.ts";

const client = new CommandClient({
  prefix: "!",
});

// Register the commands
client.commands.add(rollCommand);
client.commands.add(helpCommand);

client.on("ready", () => {
  console.log("Ready to troll!");
});

client.connect(Deno.env.get("DISCORD_BOT_TOKEN"), Intents.None);
