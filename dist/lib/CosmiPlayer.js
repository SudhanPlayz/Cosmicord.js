"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmiPlayer = void 0;
const stream_1 = require("stream");
const _1 = require(".");
const interfaces_1 = require("../interfaces");
class CosmiPlayer extends stream_1.EventEmitter {
    node;
    options;
    /** The guild id of the player. */
    guildId;
    /** Whether the player is paused or not. */
    paused = false;
    /** Whether the player is playing or not. */
    loop = false;
    /** Whether the player is playing or not. */
    playing = false;
    /** Queue for the player. */
    queue = new _1.CosmiQueue();
    /** Position of the current track. */
    position = 0;
    /** Voice State of the player. */
    voiceState;
    /** Session Id of the player. */
    sessionId;
    /** Voice Channel of the player. */
    voiceChannel;
    /** Text Channel of the player. */
    textChannel;
    /** Whether the player is self muted or not. */
    selfMute;
    /** Whether the player is self deafened or not. */
    selfDeaf;
    /** Volume of the player. */
    volume;
    /** State of the player. */
    state = interfaces_1.PlayerState.Disconnected;
    /** Filters for the player. */
    filters;
    /** Creates a new player */
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
    /** Connects the player to the voice channel. */
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
    /** Destroys the player. */
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
    /** Disconnects the player from the voice channel. */
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
    /** Sets the paused state of the player. */
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
    /** Plays the next track in the queue. */
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
    /** Sets the voice channel of the player. */
    setVoiceChannel(channel) {
        if (typeof channel !== "string")
            throw new TypeError("Channel must be a non-empty string.");
        this.voiceChannel = channel;
        this.connect();
        return this;
    }
    /** Sets the text channel of the player. */
    setTextChannel(channel) {
        if (typeof channel !== "string")
            throw new TypeError("Channel must be a non-empty string.");
        this.textChannel = channel;
        return this;
    }
    /** Sets the volume of the player. */
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
    /** Sets the loop state of the player. */
    setLoop(loop) {
        if (typeof loop !== "boolean")
            throw new TypeError('Repeat can only be "true" or "false".');
        this.loop = loop;
        return this;
    }
    /** Stops the current track, or skips to the next one. */
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
    /** Seeks to the specified position in the current track. */
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
