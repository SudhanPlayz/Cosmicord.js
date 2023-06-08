"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cosmicord = void 0;
const stream_1 = require("stream");
const interfaces_1 = require("../interfaces");
const collection_1 = require("@discordjs/collection");
const _1 = require(".");
class Cosmicord extends stream_1.EventEmitter {
    options;
    /**
     * The nodes for the cosmicord client.
     * @type {CosmiNode[]}
     */
    nodes = [];
    /**
     * The client id
     * @type {string}
     */
    clientId;
    /**
     * The players for the cosmicord client.
     * @type {Collection<string, CosmiPlayer>}
     */
    players = new collection_1.Collection();
    /**
     * Creates a new cosmicord client.
     * @param {CosmiOptions} options The options for the cosmicord client.
     */
    constructor(options) {
        super();
        this.options = options;
        if (options.clientId)
            this.clientId = options.clientId;
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
    async init(clientId) {
        if (!this.nodes.length || this.nodes.length < 1)
            throw new Error("No nodes were provided.");
        if (clientId)
            this.clientId = clientId;
        for (const node of this.nodes) {
            if (clientId)
                node.clientId = clientId;
            await node.connect();
        }
    }
    /**
     * Searches a track.
     * @param {CosmiSearchQuery} query - The query to search for.
     * @param {string} requesterId - The requester id.
     * @returns {Promise<CosmiLoadedTracks>}
     */
    async search(query, requesterId) {
        const node = this.getLeastUsedNode();
        if (!node)
            throw new Error("No nodes were found.");
        if (!query.source)
            query.source = interfaces_1.SearchFrom.YouTube;
        let searchQuery = query.source + query.query;
        if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi.test(query.query)) {
            query.source = interfaces_1.SearchFrom.YouTube;
            searchQuery = query.source + query.query;
        }
        let tracks = await node.rest.loadTracks(encodeURIComponent(searchQuery));
        let cosmiTracks;
        if (tracks.tracks) {
            cosmiTracks = {
                ...tracks,
                tracks: tracks.tracks.map((track) => new _1.CosmiTrack(track, requesterId)),
            };
        }
        return cosmiTracks;
    }
    /**
     * Creates a new node.
     * @param {CosmiNodeOptions} options - The options for the node.
     * @returns {CosmiNode}
     */
    createNode(options) {
        const node = new _1.CosmiNode(this, options);
        this.nodes.push(node);
        return node;
    }
    /**
     * Destroys a node.
     * @param {CosmiNode} node - The node to destroy.
     * @returns {void}
     */
    destoryNode(node) {
        node.destroy();
    }
    /**
     * Creates a new player.
     * @param {CosmiPlayerOptions} options - The options for the player.
     * @param {CosmiNode} node - The node to create the player on.
     * @returns {CosmiPlayer}
     */
    createPlayer(options, node = this.getLeastUsedNode()) {
        if (!node)
            throw new Error("No nodes were found.");
        if (this.players.has(options.guildId))
            return this.players.get(options.guildId);
        const player = new _1.CosmiPlayer(node, options);
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
    destroyPlayer(guildId) {
        const player = this.players.get(guildId);
        if (!player)
            throw new Error("No player was found with the given guild id.");
        player.destroy();
    }
    /**
     * Get the least used node.
     * @returns {CosmiNode}
     */
    getLeastUsedNode() {
        return this.nodes.reduce((prev, curr) => {
            if (prev.stats.players > curr.stats.players)
                return curr;
            return prev;
        });
    }
    /**
     * Updates the voice state from a discord voice packet.
     * @param {VoicePacket | VoiceServer | VoiceState} data - The data to update the voice state with.
     * @returns {Promise<void>}
     */
    async updateVoiceState(data) {
        if ("t" in data &&
            !["VOICE_STATE_UPDATE", "VOICE_SERVER_UPDATE"].includes(data.t))
            return;
        const update = "d" in data ? data.d : data;
        if (!update || (!("token" in update) && !("session_id" in update)))
            return;
        const player = this.players.get(update.guild_id);
        if (!player)
            return;
        if ("token" in update) {
            player.voiceState.event = update;
        }
        else {
            if (update.user_id !== this.clientId) {
                return;
            }
            if (update.channel_id) {
                if (player.voiceChannel !== update.channel_id) {
                    this.emit("playerMoved", player.node, player, player.voiceChannel, update.channel_id);
                }
                player.voiceState.sessionId = update.session_id;
                player.voiceChannel = update.channel_id;
            }
            else {
                this.emit("playerDestoryed", player.node, player);
                player.voiceChannel = null;
                player.voiceState = Object.assign({});
                player.pause(true);
            }
        }
        if (["event", "guildId", "op", "sessionId"].every((key) => key in player.voiceState)) {
            player.node.socket.sendData(player.voiceState);
        }
    }
}
exports.Cosmicord = Cosmicord;
