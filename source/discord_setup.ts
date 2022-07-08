import "https://deno.land/x/dotenv@v3.2.0/load.ts";

const rollCommand = {
  name: "roll",
  description: "Roll a TFT Comp",
  options: [{
    name: "names",
    description: "Adding player names avoids overlapping comps",
    required: false,
    // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
    type: 3,
  }],
};

const BOT_TOKEN = Deno.env.get("BOT_TOKEN")!;
const CLIENT_ID = Deno.env.get("CLIENT_ID")!;

const resp = await fetch(
  `https://discord.com/api/v8/applications/${CLIENT_ID}/commands`,
  {
    body: JSON.stringify(rollCommand),
    headers: {
      Authorization: `Bot ${BOT_TOKEN}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  },
);

console.log(resp);
