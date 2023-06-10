import { EventEmitter } from "stream";
import { CosmiNode, CosmiQueue } from ".";
import { CosmiPlayerOptions, Equalizer, Filters, VoiceState } from "../interfaces";
import { PlayerState } from "../interfaces";

export class CosmiPlayer extends EventEmitter {
  /** The guild id of the player. */
  public guildId: string;

  /** Whether the player is paused or not. */
  public paused: boolean = false;

  /** Whether the player is playing or not. */
  public loop: boolean = false;

  /** Whether the player is playing or not. */
  public playing: boolean = false;

  /** Queue for the player. */
  public queue = new CosmiQueue(this);

  /** Position of the current track. */
  public position: number = 0;

  /** Voice State of the player. */
  public voiceState: VoiceState;

  /** Session Id of the player. */
  public sessionId?: string;

  /** Voice Channel of the player. */
  public voiceChannel?: string;

  /** Text Channel of the player. */
  public textChannel?: string;

  /** Whether the player is self muted or not. */
  public selfMute?: boolean;

  /** Whether the player is self deafened or not. */
  public selfDeaf?: boolean;

  /** Volume of the player. */
  public volume?: number;

  /** State of the player. */
  public state: PlayerState = PlayerState.Disconnected;

  /** Filters for the player. */
  public filters?: Filters;

  /** Creates a new player */
  constructor(public node: CosmiNode, public options: CosmiPlayerOptions) {
    super();
    this.state = PlayerState.Connecting;
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
  public async connect(): Promise<CosmiPlayer> {
    if (!this.voiceChannel)
      throw new RangeError("No voice channel has been set.");
    this.state = PlayerState.Connecting;

    this.node.manager.options.send(this.guildId, {
      op: 4,
      d: {
        guild_id: this.guildId,
        channel_id: this.voiceChannel,
        self_mute: this.options.selfMute,
        self_deaf: this.options.selfDeafen,
      },
    });

    this.state = PlayerState.Connected;
    return this;
  }

  /** Destroys the player. */
  public destroy(disconnect = true) {
    this.state = PlayerState.Destroying;

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
  public disconnect(): this {
    if (this.voiceChannel === null) return this;
    this.state = PlayerState.Disconnecting;

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
    this.state = PlayerState.Disconnected;
    return this;
  }

  /** Sets the paused state of the player. */
  public pause(pause: boolean) {
    if (typeof pause !== "boolean")
      throw new RangeError('Pause can only be "true" or "false".');

    if (this.paused === pause) return this;

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
  public async play() {
    if (this.state !== PlayerState.Connected)
      throw new Error("Player is not connected.");

    let curTrack = this.queue.current;

    if (!curTrack && this.paused) return this.pause(false);
    if (!curTrack && !this.queue[0]) return;

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
  public setVoiceChannel(channel: string) {
    if (typeof channel !== "string")
      throw new TypeError("Channel must be a non-empty string.");

    this.voiceChannel = channel;
    this.connect();
    return this;
  }

  /** Sets the text channel of the player. */
  public setTextChannel(channel: string) {
    if (typeof channel !== "string")
      throw new TypeError("Channel must be a non-empty string.");

    this.textChannel = channel;
    return this;
  }

  /** Sets the volume of the player. */
  public setVolume(volume: number): this {
    volume = Number(volume);

    if (isNaN(volume)) throw new TypeError("Volume must be a number.");
    this.volume = Math.max(Math.min(volume, 1000), 0);

    this.node.socket.sendData({
      op: "volume",
      guildId: this.guildId,
      volume: this.volume,
    });

    return this;
  }

  /** Sets the loop state of the player. */
  public setLoop(loop: boolean): this {
    if (typeof loop !== "boolean")
      throw new TypeError('Repeat can only be "true" or "false".');

    this.loop = loop;

    return this;
  }

  /** Stops the current track, or skips to the next one. */
  public stop(amount?: number) {
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
  public seek(position: number) {
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

  /** Add filters to the player */
  public setFilters(filters: Filters) {
    this.filters = filters;

    this.node.socket.sendData({
      op: "filters",
      guildId: this.guildId,
      ...filters,
    });

    return this;
  }

  /** Clear filters from the player */
  public clearFilters() {
    this.filters = null;

    this.node.socket.sendData({
      op: "filters",
      guildId: this.guildId,
    });

    return this;
  }
}
