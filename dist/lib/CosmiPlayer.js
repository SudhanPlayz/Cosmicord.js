"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmiPlayer = void 0;
const stream_1 = require("stream");
const _1 = require(".");
const interfaces_1 = require("../interfaces");
class CosmiPlayer extends stream_1.EventEmitter {
    node;
    options;
    /**
     * The guild id where the player is created
     * @type {string}
     */
    guildId;
    /**
     * If the player is paused or not
     * @type {boolean}
     * @default false
     */
    paused = false;
    /**
     * Whether loop is enabled or not
     * @type {boolean}
     * @default false
     */
    loop = false;
    /**
     * If the player is playing or not
     * @type {boolean}
     * @default false
     */
    playing = false;
    /**
     * The queue of the player
     * @type {CosmiQueue}
     */
    queue = new _1.CosmiQueue();
    /**
     * The position of the player
     * @type {number}
     */
    position = 0;
    /**
     * The voice state of the player
     * @type {VoiceState}
     */
    voiceState;
    /**
     * The session id
     * @type {string}
     */
    sessionId;
    /**
     * The voice channel the player is connected to
     * @type {string}
     */
    voiceChannel;
    /**
     * The text channel the player is using
     * @type {string}
     */
    textChannel;
    /**
     * Whether the player is self muted or not
     * @type {boolean}
     */
    selfMute;
    /**
     * Whether the player is self deafened or not
     * @type {boolean}
     */
    selfDeaf;
    /**
     * The volume of the player
     * @type {number}
     * @default 100
     */
    volume;
    /**
     * The state of the player
     * @type {PlayerState}
     */
    state = interfaces_1.PlayerState.Disconnected;
    /**
     * The filters of the player
     * @type {Filters}
     */
    filters;
    /**
     * Creates a new player
     * @param {CosmiNode} node - The node the player is connected to
     * @param {CosmiPlayerOptions} options - The options for the player
     */
    constructor(node, options) {
        super();
        this.node = node;
        this.options = options;
        this.state = interfaces_1.PlayerState.Connecting;
        this.guildId = options.guildId;
        this.sessionId = node.socket.sessionId;
        this.filters = options.filters;
        this.voiceChannel = options.voiceChannel;
        this.textChannel = options.textChannel;
        this.selfMute = options.selfMute || false;
        this.selfDeaf = options.selfDeafen || false;
        this.volume = options.volume || 100;
        this.node.manager.players.set(this.guildId, this);
        this.voiceState = Object.assign({
            op: "voiceUpdate",
            guildId: options.guildId,
        });
        this.node.manager.emit("playerCreated", this.node, this);
        this.node.emit("playerCreated", this);
    }
    /**
     * Connects the player to the voice channel
     * @returns {Promise<CosmiPlayer>}
     */
    async connect() {
        if (!this.voiceChannel)
            throw new RangeError("No voice channel has been set.");
        this.state = interfaces_1.PlayerState.Connecting;
        this.node.manager.options.send(this.guildId, {
            op: 4,
            d: {
                guild_id: this.guildId,
                channel_id: this.voiceChannel,
                self_mute: this.options.selfMute,
                self_deaf: this.options.selfDeafen,
            },
        });
        this.state = interfaces_1.PlayerState.Connected;
        return this;
    }
    /**
     * Destroys the player
     * @param {boolean} disconnect - Whether to disconnect the player or not
     * @returns {void}
     */
    destroy(disconnect = true) {
        this.state = interfaces_1.PlayerState.Destroying;
        if (disconnect) {
            this.disconnect();
        }
        this.node.socket.sendData({
            op: "destroy",
            guildId: this.guildId,
        });
        this.node.emit("playerDestoryed", this.guildId);
        this.node.manager.emit("playerDestoryed", this.node, this);
        this.node.manager.players.delete(this.guildId);
    }
    /**
     * Disconnects the player from the voice channel
     * @returns {CosmiPlayer}
     */
    disconnect() {
        if (this.voiceChannel === null)
            return this;
        this.state = interfaces_1.PlayerState.Disconnecting;
        this.pause(true);
        this.node.manager.options.send(this.guildId, {
            op: 4,
            d: {
                guild_id: this.guildId,
                channel_id: null,
                self_mute: false,
                self_deaf: false,
            },
        });
        this.voiceChannel = null;
        this.state = interfaces_1.PlayerState.Disconnected;
        return this;
    }
    /**
     * Pauses the player
     * @param {boolean} pause - Whether to pause the player or not
     * @returns {CosmiPlayer}
     */
    pause(pause) {
        if (typeof pause !== "boolean")
            throw new RangeError('Pause can only be "true" or "false".');
        if (this.paused === pause)
            return this;
        this.playing = !pause;
        this.paused = pause;
        this.node.socket.sendData({
            op: "pause",
            guildId: this.guildId,
            pause,
        });
        return this;
    }
    /**
     * Plays the first track in the queue
     * @returns {Promise<CosmiPlayer>}
     */
    async play() {
        if (this.state !== interfaces_1.PlayerState.Connected)
            throw new Error("Player is not connected.");
        let curTrack = this.queue.current;
        if (!curTrack && this.paused)
            return this.pause(false);
        if (!curTrack && !this.queue[0])
            return;
        let trackToPlay = curTrack || this.queue[0];
        await this.node.socket.sendData({
            op: "play",
            guildId: this.guildId,
            track: trackToPlay.encoded,
        });
        this.playing = true;
        this.paused = false;
        this.queue.shift();
        this.queue.current = trackToPlay;
        return this;
    }
    /**
     * Sets the voice channel of the player
     * @param {string} channel - The voice channel id to set
     * @returns {CosmiPlayer}
     */
    setVoiceChannel(channel) {
        if (typeof channel !== "string")
            throw new TypeError("Channel must be a non-empty string.");
        this.voiceChannel = channel;
        this.connect();
        return this;
    }
    /**
     * Sets the text channel of the player
     * @param {string} channel - The text channel id to set
     * @returns {CosmiPlayer}
     */
    setTextChannel(channel) {
        if (typeof channel !== "string")
            throw new TypeError("Channel must be a non-empty string.");
        this.textChannel = channel;
        return this;
    }
    /**
     * Sets the volume of the player
     * @param {number} volume - The volume to set
     * @returns {CosmiPlayer}
     */
    setVolume(volume) {
        volume = Number(volume);
        if (isNaN(volume))
            throw new TypeError("Volume must be a number.");
        this.volume = Math.max(Math.min(volume, 1000), 0);
        this.node.socket.sendData({
            op: "volume",
            guildId: this.guildId,
            volume: this.volume,
        });
        return this;
    }
    /**
     * Sets the loop
     * @param {boolean} loop - Whether to loop or not
     * @returns {CosmiPlayer}
     */
    setLoop(loop) {
        if (typeof loop !== "boolean")
            throw new TypeError('Repeat can only be "true" or "false".');
        this.loop = loop;
        return this;
    }
    /**
     * Stops the current track.
     * @param {number} amount - The amount of tracks to skip.
     * @returns {CosmiPlayer}
     */
    stop(amount) {
        if (typeof amount === "number" && amount > 1) {
            if (amount > this.queue.length)
                throw new RangeError("Cannot skip more than the queue length.");
            this.queue.splice(0, amount - 1);
        }
        this.node.socket.sendData({
            op: "stop",
            guildId: this.guildId,
        });
        return this;
    }
    /**
     * Seeks to a position in the current track.
     * @param {number} position - The position to seek to.
     * @returns {CosmiPlayer}
     */
    seek(position) {
        if (typeof position !== "number")
            throw new TypeError("Position must be a number.");
        this.node.socket.sendData({
            op: "seek",
            guildId: this.guildId,
            position,
        });
        this.position = position;
        return this;
    }
}
exports.CosmiPlayer = CosmiPlayer;
