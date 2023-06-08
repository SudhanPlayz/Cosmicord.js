import { EventEmitter } from "stream";
import { NodeEvents, CosmiNodeOptions, NodeStats } from "../interfaces";
import { CosmiPlayer, CosmiREST, CosmiSocket, Cosmicord } from "./";
import { Collection } from "discord.js";
export interface CosmiNode {
    on<Key extends keyof NodeEvents>(event: Key, listener: (...args: NodeEvents[Key]) => void): this;
    emit<Key extends keyof NodeEvents>(event: Key, ...args: NodeEvents[Key]): boolean;
}
export declare class CosmiNode extends EventEmitter {
    /** The host for the node. */
    host: string;
    /** The port for the node. */
    port: number;
    /** The password for the node. */
    password: string;
    /** Whether the node is secure or not. */
    secure: boolean;
    /** The identifier for the node. */
    identifier: string;
    /** The amount of retries for the node. */
    retryAmount: number;
    /** The amount of retries made for the node. */
    private retries;
    /** The delay for the node. */
    retryDelay: number;
    /** The request timeout for the node. */
    requestTimeout: number;
    /** Whether the node is connected or not. */
    connected: boolean;
    /** The stats for the node. */
    stats: NodeStats;
    /** The amount of calls made to the node. */
    calls: number;
    /** The socket for the node. */
    socket: CosmiSocket;
    /** The version for the node. */
    version?: string;
    /** The rest client for the node. */
    rest: CosmiREST;
    /** The manager of the node */
    manager: Cosmicord;
    /** Players of the node. */
    players: Collection<string, CosmiPlayer>;
    /** The client id of the bot */
    clientId?: string;
    /** Whether the node is ready or not. */
    isReady: boolean;
    /** Creates a new node. */
    constructor(manager: Cosmicord, options: CosmiNodeOptions);
    /** Connect to the node with websocket. */
    connectSocket(): Promise<boolean>;
    /** Get the url for the node. */
    get url(): string;
    /** Connects to the node. */
    connect(): Promise<boolean>;
    /** Destroys the node. */
    destroy(): void;
    /** Reconnects to the node. */
    reconnect(): Promise<boolean>;
}
