import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { json, serve, validateRequest } from "https://deno.land/x/sift/mod.ts";
import nacl from "https://cdn.skypack.dev/tweetnacl@v1.0.3?dts";

import { ENVIRONMENT } from "./constants.ts";
import { formatOutputString } from "./utilities/formatOutputString.ts";
import { roll } from "./utilities/roll.ts";

const headers = ["X-Signature-Ed25519", "X-Signature-Timestamp"];

enum RequestType {
  PING = 1,
  COMMAND = 2,
}

serve({ "/": handle });

async function handle(request: Request) {
  const { error } = await validateRequest(request, { POST: { headers } });
  if (error) return json({ error: error.message }, { status: error.status });

  const { valid, body } = await verifySignature(request);
  if (!valid) return json({ error: "Invalid request" }, { status: 401 });

  const { type = 0, data } = JSON.parse(body);
  const options = data?.options || [];

  if (type === RequestType.PING) return json({ type: 1 });

  if (type === RequestType.COMMAND) {
    console.log("Attempting to Roll...");
    console.log("Players:", options);
    const players = (options[0]?.value || "").split(" ").filter(Boolean) || [];

    if (players.length > 8) {
      return json({ type: 4, data: { content: "Too many players!" } });
    }

    // Default to rolling for 1 player
    const rolls = roll(new Set(players.length ? players : ["default"]));
    const content = formatOutputString(rolls, ENVIRONMENT.DISCORD);
    // Type 4 responds with the below message retaining the user's input at top
    return json({ type: 4, data: { content } });
  }

  return json({ error: "bad request" }, { status: 400 });
}

// Verify whether the request is coming from Discord.
async function verifySignature(
  request: Request,
): Promise<{ valid: boolean; body: string }> {
  const PUBLIC_KEY = Deno.env.get("PUBLIC_KEY")!;
  // Discord sends these headers with every request.
  const signature = request.headers.get("X-Signature-Ed25519")!;
  const timestamp = request.headers.get("X-Signature-Timestamp")!;
  const body = await request.text();
  const valid = nacl.sign.detached.verify(
    new TextEncoder().encode(timestamp + body),
    hexToUint8Array(signature),
    hexToUint8Array(PUBLIC_KEY),
  );

  return { valid, body };
}

// Convert hexadecimal string to Uint8Array
function hexToUint8Array(hex: string) {
  return new Uint8Array(hex.match(/.{1,2}/g)!.map((val) => parseInt(val, 16)));
}
