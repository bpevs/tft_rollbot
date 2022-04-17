/**
 * Entrypoint for starting the Discord Bot server
 */

import "https://deno.land/x/dotenv/load.ts";
import { app, get } from "https://denopkg.com/syumai/dinatra/mod.ts";
import { CommandClient, Intents } from "./deps.ts";

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

app(get("/", () => "Rollbot is a go!"));
