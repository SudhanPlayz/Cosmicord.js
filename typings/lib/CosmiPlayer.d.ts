import { EventEmitter } from "stream";
import { CosmiNode, CosmiQueue } from ".";
import { CosmiPlayerOptions, Filters, VoiceState } from "../interfaces";
import { PlayerState } from "../interfaces";
export declare class CosmiPlayer extends EventEmitter {
    node: CosmiNode;
    options: CosmiPlayerOptions;
    /**
     * The guild id where the player is created
     * @type {string}
     */
    guildId: string;
    /**
     * If the player is paused or not
     * @type {boolean}
     * @default false
     */
    paused: boolean;
    /**
     * Whether loop is enabled or not
     * @type {boolean}
     * @default false
     */
    loop: boolean;
    /**
     * If the player is playing or not
     * @type {boolean}
     * @default false
     */
    playing: boolean;
    /**
     * The queue of the player
     * @type {CosmiQueue}
     */
    queue: CosmiQueue;
    /**
     * The position of the player
     * @type {number}
     */
    position: number;
    /**
     * The voice state of the player
     * @type {VoiceState}
     */
    voiceState: VoiceState;
    /**
     * The session id
     * @type {string}
     */
    sessionId?: string;
    /**
     * The voice channel the player is connected to
     * @type {string}
     */
    voiceChannel?: string;
    /**
     * The text channel the player is using
     * @type {string}
     */
    textChannel?: string;
    /**
     * Whether the player is self muted or not
     * @type {boolean}
     */
    selfMute?: boolean;
    /**
     * Whether the player is self deafened or not
     * @type {boolean}
     */
    selfDeaf?: boolean;
    /**
     * The volume of the player
     * @type {number}
     * @default 100
     */
    volume?: number;
    /**
     * The state of the player
     * @type {PlayerState}
     */
    state: PlayerState;
    /**
     * The filters of the player
     * @type {Filters}
     */
    filters?: Filters;
    /**
     * Creates a new player
     * @param {CosmiNode} node - The node the player is connected to
     * @param {CosmiPlayerOptions} options - The options for the player
     */
    constructor(node: CosmiNode, options: CosmiPlayerOptions);
    /**
     * Connects the player to the voice channel
     * @returns {Promise<CosmiPlayer>}
     */
    connect(): Promise<CosmiPlayer>;
    /**
     * Destroys the player
     * @param {boolean} disconnect - Whether to disconnect the player or not
     * @returns {void}
     */
    destroy(disconnect?: boolean): void;
    /**
     * Disconnects the player from the voice channel
     * @returns {CosmiPlayer}
     */
    disconnect(): this;
    /**
     * Pauses the player
     * @param {boolean} pause - Whether to pause the player or not
     * @returns {CosmiPlayer}
     */
    pause(pause: boolean): this;
    /**
     * Plays the first track in the queue
     * @returns {Promise<CosmiPlayer>}
     */
    play(): Promise<this>;
    /**
     * Sets the voice channel of the player
     * @param {string} channel - The voice channel id to set
     * @returns {CosmiPlayer}
     */
    setVoiceChannel(channel: string): this;
    /**
     * Sets the text channel of the player
     * @param {string} channel - The text channel id to set
     * @returns {CosmiPlayer}
     */
    setTextChannel(channel: string): this;
    /**
     * Sets the volume of the player
     * @param {number} volume - The volume to set
     * @returns {CosmiPlayer}
     */
    setVolume(volume: number): this;
    /**
     * Sets the loop
     * @param {boolean} loop - Whether to loop or not
     * @returns {CosmiPlayer}
     */
    setLoop(loop: boolean): this;
    /**
     * Stops the current track.
     * @param {number} amount - The amount of tracks to skip.
     * @returns {CosmiPlayer}
     */
    stop(amount?: number): this;
    /**
     * Seeks to a position in the current track.
     * @param {number} position - The position to seek to.
     * @returns {CosmiPlayer}
     */
    seek(position: number): this;
}
