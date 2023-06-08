import { EventEmitter } from "stream";
import { CosmiEvents, CosmiLoadedTracks, CosmiNodeOptions, CosmiOptions, CosmiPlayerOptions, CosmiSearchQuery, VoicePacket, VoiceServer, VoiceState } from "../interfaces";
import { Collection } from "@discordjs/collection";
import { CosmiNode, CosmiPlayer } from ".";
export interface Cosmicord {
    on<Key extends keyof CosmiEvents>(event: Key, listener: (...args: CosmiEvents[Key]) => void): this;
    emit<Key extends keyof CosmiEvents>(event: Key, ...args: CosmiEvents[Key]): boolean;
}
export declare class Cosmicord extends EventEmitter {
    options: CosmiOptions;
    /**
     * The nodes for the cosmicord client.
     * @type {CosmiNode[]}
     */
    nodes: CosmiNode[];
    /**
     * The client id
     * @type {string}
     */
    clientId?: string;
    /**
     * The players for the cosmicord client.
     * @type {Collection<string, CosmiPlayer>}
     */
    players: Collection<string, CosmiPlayer>;
    /**
     * Creates a new cosmicord client.
     * @param {CosmiOptions} options The options for the cosmicord client.
     */
    constructor(options: CosmiOptions);
    /**
     * Initializes the cosmicord client.
     * @param {string} clientId - The client id.
     * @returns {Promise<void>}
     */
    init(clientId?: string): Promise<void>;
    /**
     * Searches a track.
     * @param {CosmiSearchQuery} query - The query to search for.
     * @param {string} requesterId - The requester id.
     * @returns {Promise<CosmiLoadedTracks>}
     */
    search(query: CosmiSearchQuery, requesterId?: string): Promise<CosmiLoadedTracks>;
    /**
     * Creates a new node.
     * @param {CosmiNodeOptions} options - The options for the node.
     * @returns {CosmiNode}
     */
    createNode(options: CosmiNodeOptions): CosmiNode;
    /**
     * Destroys a node.
     * @param {CosmiNode} node - The node to destroy.
     * @returns {void}
     */
    destoryNode(node: CosmiNode): void;
    /**
     * Creates a new player.
     * @param {CosmiPlayerOptions} options - The options for the player.
     * @param {CosmiNode} node - The node to create the player on.
     * @returns {CosmiPlayer}
     */
    createPlayer(options: CosmiPlayerOptions, node?: CosmiNode): CosmiPlayer;
    /**
     * Destroys a player.
     * @param {string} guildId - The guild id of the player.
     * @returns {void}
     */
    destroyPlayer(guildId: string): void;
    /**
     * Get the least used node.
     * @returns {CosmiNode}
     */
    getLeastUsedNode(): CosmiNode;
    /**
     * Updates the voice state from a discord voice packet.
     * @param {VoicePacket | VoiceServer | VoiceState} data - The data to update the voice state with.
     * @returns {Promise<void>}
     */
    updateVoiceState(data: VoicePacket | VoiceServer | VoiceState): Promise<void>;
}
