import { Client, GatewayIntentBits, Events } from "discord.js";
import { createServer } from "http";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Add your commands here

client.on(Events.Error, (err) => console.error("Client error:", err));

const token = process.env.DISCORD_BOT_TOKEN;
if (!token) {
  console.error("Missing DISCORD_BOT_TOKEN");
  process.exit(1);
}

client.login(token);

// Keep-alive HTTP server so Render doesn't loop waiting for an open port
const PORT = process.env.PORT || 3000;
createServer((_, res) => {
  res.writeHead(200);
  res.end("OK");
}).listen(PORT, () => {
  console.log(`Health check server listening on port ${PORT}`);
});
