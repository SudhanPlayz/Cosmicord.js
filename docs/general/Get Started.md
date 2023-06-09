# Get Started

Download the latest Lavalink binary from their [GitHub](https://github.com/lavalink-devs/Lavalink/releases) and run it. You can find more information about Lavalink [here](https://github.com/lavalink-devs/Lavalink)

# Example

Create the discord client and Cosmicord client

```ts
// Import the required classes
import { Cosmicord } from "cosmicord.js";
import { Client } from "discord.js";

// Create the discord client
const client = new Client({
  intents: ["Guilds", "GuildVoiceStates"],
});

// Create the Cosmicord client
const cosmicord = new Cosmicord({
  nodes: [
    {
      host: "localhost",
      port: 2333,
      password: "youshallnotpass",
      identifier: "Main-Node",
    },
  ],
  send: (id, payload) => {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  },
});
```

Initialize the Cosmicord client when the discord client is ready

```ts
// ...
client.on("ready", () => {
  // Log to the console that the client is ready
  console.log("Client is ready!");

  // Initialize the Cosmicord client
  cosmicord.init(client.user.id);
});
```

Send the voice server update and voice state update to Cosmicord
If you don't send these events, Cosmicord won't be able to play music

```ts
// ...
client.on("raw", (packet) => {
  cosmicord.updateVoiceState(packet);
});
```

How to play a track

```ts
import { RestLoadResultType } from "cosmicord.js";

// Search for a track
const res = await cosmicord.search(
  {
    query: "Never Gonna Give You Up",
  },
  "requester id"
);

// Check if the search was successful
if (res.loadType === RestLoadResultType.LoadFailed) {
  return console.log("Failed to load track");
} else if (res.loadType === RestLoadResultType.NoMatches) {
  return console.log("No matches found");
} else if (res.loadType === RestLoadResultType.PlaylistLoaded) {
  return console.log("Playlist loaded");
}

// Create the player
const player = cosmicord.createPlayer({
  guildId: "guild id",
  voiceChannel: "voice channel id",
  textChannel: "text channel id",
  selfDeafen: true,
});

// Add the track to the queue
player.queue.add(res.tracks[0]);

// Play the track
if (!player.playing) await player.play();
```
