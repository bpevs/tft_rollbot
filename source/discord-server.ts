/**
 * Entrypoint for starting the Discord Bot server
 */

import "load-env";
import { CommandClient, Intents } from "harmony";

import { helpCommand, rollCommand } from "./utilities/commands.ts";

const client = new CommandClient({
  prefix: "!",
});

// Register the commands
client.commands.add(rollCommand);
client.commands.add(helpCommand);

client.on("ready", () => {
  console.log("Ready to troll!");
});

client.connect(Deno.env.get("DISCORD_TOKEN"), Intents.None);
