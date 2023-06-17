import { EventEmitter } from "stream";
import { CosmiNode, CosmiQueue } from ".";
import { CosmiPlayerOptions, Filters, VoiceState } from "../interfaces";
import { PlayerState } from "../interfaces";
import { Collection } from "discord.js";
export declare class CosmiPlayer extends EventEmitter {
    node: CosmiNode;
    options: CosmiPlayerOptions;
    /** The guild id of the player. */
    guildId: string;
    /** Whether the player is paused or not. */
    paused: boolean;
    /** Whether the player is playing or not. */
    loop: boolean;
    /** Whether the player is playing or not. */
    playing: boolean;
    /** Queue for the player. */
    queue: CosmiQueue;
    /** Position of the current track. */
    position: number;
    /** Voice State of the player. */
    voiceState: VoiceState;
    /** Session Id of the player. */
    sessionId?: string;
    /** Voice Channel of the player. */
    voiceChannel?: string;
    /** Text Channel of the player. */
    textChannel?: string;
    /** Whether the player is self muted or not. */
    selfMute?: boolean;
    /** Whether the player is self deafened or not. */
    selfDeaf?: boolean;
    /** Volume of the player. */
    volume?: number;
    /** State of the player. */
    state: PlayerState;
    /** Filters for the player. */
    filters?: Filters;
    /** Custom metadata */
    metadata: Collection<string, any>;
    /** Creates a new player */
    constructor(node: CosmiNode, options: CosmiPlayerOptions);
    /** Connects the player to the voice channel. */
    connect(): Promise<CosmiPlayer>;
    /** Destroys the player. */
    destroy(disconnect?: boolean): void;
    /** Disconnects the player from the voice channel. */
    disconnect(): this;
    /** Sets the paused state of the player. */
    pause(pause: boolean): this;
    /** Plays the next track in the queue. */
    play(): Promise<this>;
    /** Sets the voice channel of the player. */
    setVoiceChannel(channel: string): this;
    /** Sets the text channel of the player. */
    setTextChannel(channel: string): this;
    /** Sets the volume of the player. */
    setVolume(volume: number): this;
    /** Sets the loop state of the player. */
    setLoop(loop: boolean): this;
    /** Stops the current track, or skips to the next one. */
    stop(amount?: number): this;
    /** Seeks to the specified position in the current track. */
    seek(position: number): this;
    /** Set a value to a key */
    set(key: string, value: any): this;
    /** Get a value from a key */
    get<T>(key: string): T;
}
