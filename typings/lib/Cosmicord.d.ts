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
    /** The nodes for the cosmicord client. */
    nodes: CosmiNode[];
    /** The client id */
    clientId?: string;
    /** The players for the cosmicord client. */
    players: Collection<string, CosmiPlayer>;
    /** The constructor for the cosmicord client. */
    constructor(options: CosmiOptions);
    /** Initializes the cosmicord client. */
    init(clientId?: string): Promise<void>;
    /** Searches for tracks. */
    search(query: CosmiSearchQuery, requesterId?: string): Promise<CosmiLoadedTracks>;
    /** Creates a new node. */
    createNode(options: CosmiNodeOptions): CosmiNode;
    /** Destroys a node. */
    destoryNode(node: CosmiNode): void;
    /** Creates a new player. */
    createPlayer(options: CosmiPlayerOptions, node?: CosmiNode): CosmiPlayer;
    /** Destroys a player. */
    destroyPlayer(guildId: string): void;
    /** Gets a player. */
    getLeastUsedNode(): CosmiNode;
    /** Gets a player. */
    updateVoiceState(data: VoicePacket | VoiceServer | VoiceState): Promise<void>;
}
