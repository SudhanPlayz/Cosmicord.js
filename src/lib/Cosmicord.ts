import { EventEmitter } from "stream";
import {
  CosmiEvents,
  CosmiLoadedTracks,
  CosmiNodeOptions,
  CosmiOptions,
  CosmiPlayerOptions,
  CosmiSearchQuery,
  SearchFrom,
  VoicePacket,
  VoiceServer,
  VoiceState,
} from "../interfaces";
import { Collection } from "@discordjs/collection";
import { CosmiNode, CosmiPlayer, CosmiTrack } from ".";

export interface Cosmicord {
  on<Key extends keyof CosmiEvents>(
    event: Key,
    listener: (...args: CosmiEvents[Key]) => void
  ): this;

  emit<Key extends keyof CosmiEvents>(
    event: Key,
    ...args: CosmiEvents[Key]
  ): boolean;
}

export class Cosmicord extends EventEmitter {
  /**
   * The nodes for the cosmicord client.
   * @type {CosmiNode[]}
   */
  public nodes: CosmiNode[] = [];

  /**
   * The client id
   * @type {string}
   */
  public clientId?: string;

  /**
   * The players for the cosmicord client.
   * @type {Collection<string, CosmiPlayer>}
   */
  public players: Collection<string, CosmiPlayer> = new Collection();

  /**
   * Creates a new cosmicord client.
   * @param {CosmiOptions} options The options for the cosmicord client.
   */
  constructor(public options: CosmiOptions) {
    super();

    if (options.clientId) this.clientId = options.clientId;
    if (options.nodes) {
      for (const node of options.nodes) {
        this.createNode(node);
      }
    }
  }

  /**
   * Initializes the cosmicord client.
   * @param {string} clientId - The client id.
   * @returns {Promise<void>}
   */
  public async init(clientId?: string) {
    if (!this.nodes.length || this.nodes.length < 1)
      throw new Error("No nodes were provided.");

    if (clientId) this.clientId = clientId;

    for (const node of this.nodes) {
      if (clientId) node.clientId = clientId;
      await node.connect();
    }
  }

  /**
   * Searches a track.
   * @param {CosmiSearchQuery} query - The query to search for.
   * @param {string} requesterId - The requester id.
   * @returns {Promise<CosmiLoadedTracks>}
   */
  public async search(query: CosmiSearchQuery, requesterId?: string) {
    const node = this.getLeastUsedNode();
    if (!node) throw new Error("No nodes were found.");

    if (!query.source) query.source = SearchFrom.YouTube;
    let searchQuery = query.source + query.query;

    if (
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi.test(
        query.query
      )
    ) {
      query.source = SearchFrom.YouTube;
      searchQuery = query.source + query.query;
    }

    let tracks = await node.rest.loadTracks(encodeURIComponent(searchQuery));
    let cosmiTracks: CosmiLoadedTracks;

    if (tracks.tracks) {
      cosmiTracks = {
        ...tracks,
        tracks: tracks.tracks.map(
          (track) => new CosmiTrack(track, requesterId)
        ),
      };
    }

    return cosmiTracks;
  }

  /**
   * Creates a new node.
   * @param {CosmiNodeOptions} options - The options for the node.
   * @returns {CosmiNode}
   */
  public createNode(options: CosmiNodeOptions) {
    const node = new CosmiNode(this, options);
    this.nodes.push(node);
    return node;
  }

  /**
   * Destroys a node.
   * @param {CosmiNode} node - The node to destroy.
   * @returns {void}
   */
  public destoryNode(node: CosmiNode) {
    node.destroy();
  }

  /**
   * Creates a new player.
   * @param {CosmiPlayerOptions} options - The options for the player.
   * @param {CosmiNode} node - The node to create the player on.
   * @returns {CosmiPlayer}
   */
  public createPlayer(
    options: CosmiPlayerOptions,
    node: CosmiNode = this.getLeastUsedNode()
  ) {
    if (!node) throw new Error("No nodes were found.");

    if (this.players.has(options.guildId))
      return this.players.get(options.guildId);

    const player = new CosmiPlayer(node, options);

    this.players.set(player.options.guildId, player);
    this.emit("playerCreated", node, player);
    node.emit("playerCreated", player);

    return player;
  }

  /**
   * Destroys a player.
   * @param {string} guildId - The guild id of the player.
   * @returns {void}
   */
  public destroyPlayer(guildId: string) {
    const player = this.players.get(guildId);
    if (!player)
      throw new Error("No player was found with the given guild id.");

    player.destroy();
  }

  /**
   * Get the least used node.
   * @returns {CosmiNode}
   */
  public getLeastUsedNode() {
    return this.nodes.reduce((prev, curr) => {
      if (prev.stats.players > curr.stats.players) return curr;
      return prev;
    });
  }

  /**
   * Updates the voice state from a discord voice packet.
   * @param {VoicePacket | VoiceServer | VoiceState} data - The data to update the voice state with.
   * @returns {Promise<void>}
   */
  public async updateVoiceState(data: VoicePacket | VoiceServer | VoiceState) {
    if (
      "t" in data &&
      !["VOICE_STATE_UPDATE", "VOICE_SERVER_UPDATE"].includes(data.t)
    )
      return;

    const update: VoiceServer | VoiceState = "d" in data ? data.d : data;
    if (!update || (!("token" in update) && !("session_id" in update))) return;

    const player = this.players.get(update.guild_id);
    if (!player) return;

    if ("token" in update) {
      player.voiceState.event = update;
    } else {
      if (update.user_id !== this.clientId) {
        return;
      }

      if (update.channel_id) {
        if (player.voiceChannel !== update.channel_id) {
          this.emit(
            "playerMoved",
            player.node,
            player,
            player.voiceChannel,
            update.channel_id
          );
        }

        player.voiceState.sessionId = update.session_id;
        player.voiceChannel = update.channel_id;
      } else {
        this.emit("playerDestoryed", player.node, player);
        player.voiceChannel = null;
        player.voiceState = Object.assign({});
        player.pause(true);
      }
    }

    if (
      ["event", "guildId", "op", "sessionId"].every(
        (key) => key in player.voiceState
      )
    ) {
      player.node.socket.sendData(player.voiceState);
    }
  }
}
