import { EventEmitter } from "stream";
import { NodeEvents, CosmiNodeOptions, NodeStats } from "../interfaces";
import { CosmiPlayer, CosmiREST, CosmiSocket, Cosmicord } from "./";
import { Collection } from "discord.js";
export interface CosmiNode {
    on<Key extends keyof NodeEvents>(event: Key, listener: (...args: NodeEvents[Key]) => void): this;
    emit<Key extends keyof NodeEvents>(event: Key, ...args: NodeEvents[Key]): boolean;
}
export declare class CosmiNode extends EventEmitter {
    /**
     * The host for the node.
     * @type {string}
     */
    host: string;
    /**
     * The port for the node.
     * @default 2333
     * @type {number}
     */
    port: number;
    /**
     * The password for the node.
     * @default "youshallnotpass"
     * @type {string}
     */
    password: string;
    /**
     * Whether the host uses SSL.
     * @default false
     * @type {boolean}
     */
    secure: boolean;
    /**
     * The identifier for the node.
     * @default "Cosmicord"
     * @type {string}
     */
    identifier: string;
    /**
     * The retryAmount for the node.
     * @default 5
     * @type {number}
     */
    retryAmount: number;
    /**
     * The amount of retries for the node.
     * @default 0
     * @type {number}
     */
    private retries;
    /**
     * The retryDelay for the node.
     * @default 5000
     * @type {number}
     */
    retryDelay: number;
    /**
     * The timeout used for api calls
     * @default 10000
     * @type {number}
     */
    requestTimeout: number;
    /**
     * Whether the node is connected or not.
     * @type {boolean}
     * @default false
     */
    connected: boolean;
    /**
     * The stats for the node.
     * @type {NodeStats}
     */
    stats: NodeStats;
    /**
     * The amount of public calls made to the node.
     * @type {number}
     * @default 0
     */
    calls: number;
    /**
     * Websocket for the node.
     * @type {CosmiSocket}
     */
    socket: CosmiSocket;
    /**
     * Lavalink version for the node.
     * @type {string}
     */
    version?: string;
    /**
     * The rest for the node.
     * @type {CosmiREST}
     */
    rest: CosmiREST;
    /**
     * The manager for the node.
     * @type {Cosmicord}
     */
    manager: Cosmicord;
    /**
     * The players in the node.
     * @type {Collection<string, CosmiPlayer>}
     */
    players: Collection<string, CosmiPlayer>;
    /**
     * The client id for the node.
     * @type {string}
     */
    clientId?: string;
    /**
     * Whether the node is ready or not.
     * @type {boolean}
     * @default false
     */
    isReady: boolean;
    /**
     * Creates a new Node instance
     * @param {Cosmicord} manager The manager for the node.
     * @param {CosmiNodeOptions} options The options for the node.
     */
    constructor(manager: Cosmicord, options: CosmiNodeOptions);
    /**
     * Connect the socket to the node.
     * @returns {Promise<boolean>} Whether the node connected or not.
     */
    connectSocket(): Promise<boolean>;
    /**
     * @type {string} The url for the node.
     */
    get url(): string;
    /**
     * Connect the socket to the node.
     * @returns {Promise<boolean>} Whether the node connected or not.
     */
    connect(): Promise<boolean>;
    /**
     * Destroy the node.
     * @returns {void}
     */
    destroy(): void;
    /**
     * Reconnect the node.
     * @returns {Promise<boolean>} Whether the node reconnected or not.
     */
    reconnect(): Promise<boolean>;
}
