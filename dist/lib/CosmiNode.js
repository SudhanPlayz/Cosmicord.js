"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmiNode = void 0;
const stream_1 = require("stream");
const _1 = require("./");
class CosmiNode extends stream_1.EventEmitter {
    /**
     * The host for the node.
     * @type {string}
     */
    host;
    /**
     * The port for the node.
     * @default 2333
     * @type {number}
     */
    port = 2333;
    /**
     * The password for the node.
     * @default "youshallnotpass"
     * @type {string}
     */
    password = "youshallnotpass";
    /**
     * Whether the host uses SSL.
     * @default false
     * @type {boolean}
     */
    secure = false;
    /**
     * The identifier for the node.
     * @default "Cosmicord"
     * @type {string}
     */
    identifier = "Cosmicord";
    /**
     * The retryAmount for the node.
     * @default 5
     * @type {number}
     */
    retryAmount = 5;
    /**
     * The amount of retries for the node.
     * @default 0
     * @type {number}
     */
    retries = 0;
    /**
     * The retryDelay for the node.
     * @default 5000
     * @type {number}
     */
    retryDelay = 5000;
    /**
     * The timeout used for api calls
     * @default 10000
     * @type {number}
     */
    requestTimeout = 10000;
    /**
     * Whether the node is connected or not.
     * @type {boolean}
     * @default false
     */
    connected = false;
    /**
     * The stats for the node.
     * @type {NodeStats}
     */
    stats = {
        players: 0,
        playingPlayers: 0,
        uptime: 0,
        cpu: {
            cores: 0,
            lavalinkLoad: 0,
            systemLoad: 0,
        },
        memory: {
            allocated: 0,
            free: 0,
            reservable: 0,
            used: 0,
        },
    };
    /**
     * The amount of public calls made to the node.
     * @type {number}
     * @default 0
     */
    calls = 0;
    /**
     * Websocket for the node.
     * @type {CosmiSocket}
     */
    socket;
    /**
     * Lavalink version for the node.
     * @type {string}
     */
    version;
    /**
     * The rest for the node.
     * @type {CosmiREST}
     */
    rest;
    /**
     * The manager for the node.
     * @type {Cosmicord}
     */
    manager;
    /**
     * The players in the node.
     * @type {Collection<string, CosmiPlayer>}
     */
    players;
    /**
     * The client id for the node.
     * @type {string}
     */
    clientId;
    /**
     * Whether the node is ready or not.
     * @type {boolean}
     * @default false
     */
    isReady = false;
    /**
     * Creates a new Node instance
     * @param {Cosmicord} manager The manager for the node.
     * @param {CosmiNodeOptions} options The options for the node.
     */
    constructor(manager, options) {
        super();
        this.host = options.host;
        this.port = options.port || this.port;
        this.password = options.password || this.password;
        this.secure = options.secure || this.secure;
        this.identifier = options.identifier || this.identifier;
        this.retryAmount = options.retryAmount || this.retryAmount;
        this.retryDelay = options.retryDelay || this.retryDelay;
        this.requestTimeout = options.requestTimeout || this.requestTimeout;
        this.manager = manager;
        this.clientId = manager.clientId;
        this.players = manager.players;
    }
    /**
     * Connect the socket to the node.
     * @returns {Promise<boolean>} Whether the node connected or not.
     */
    connectSocket() {
        return new Promise((res) => {
            this.socket = new _1.CosmiSocket(this.manager, this, this.url.replace("http", "ws") + "/v3/websocket", {
                headers: {
                    Authorization: this.password,
                    "User-Id": this.clientId,
                    "Client-Name": "Cosmicord/v1.0.0",
                },
            });
            this.socket.on("error", (err) => {
                throw new Error(err.message);
            });
            this.on("connected", () => {
                this.connected = true;
                this.manager.emit("nodeConnected", this);
                res(this.connected);
            });
        });
    }
    /**
     * @type {string} The url for the node.
     */
    get url() {
        return `${this.secure ? "https" : "http"}://${this.host}:${this.port}`;
    }
    /**
     * Connect the socket to the node.
     * @returns {Promise<boolean>} Whether the node connected or not.
     */
    connect() {
        return new Promise(async (res) => {
            try {
                const rest = new _1.CosmiREST(this, this.url, this.requestTimeout);
                this.version = await rest.getVersion();
                if (this.version.startsWith("3")) {
                    rest.setBaseURL(this.url + "/v3");
                    this.rest = rest;
                    res(await this.connectSocket());
                }
                else
                    throw new Error("Unsupported Lavalink version. (v3 required)");
            }
            catch (e) {
                this.manager.emit("debug", e.toString());
                await new Promise((r) => setTimeout(r, this.retryDelay));
                if (this.retryAmount === this.retries) {
                    throw new Error(`Failed to connect to node ${this.identifier} after ${this.retries} retries.`);
                }
                else {
                    res(await this.reconnect());
                }
            }
        });
    }
    /**
     * Destroy the node.
     * @returns {void}
     */
    destroy() {
        if (this.socket)
            this.socket.close();
        if (this.rest)
            delete this.rest;
        this.connected = false;
        this.emit("destroyed");
        this.manager.emit("nodeDestroyed", this);
        this.manager.nodes = this.manager.nodes.filter((n) => n.url !== this.url);
    }
    /**
     * Reconnect the node.
     * @returns {Promise<boolean>} Whether the node reconnected or not.
     */
    reconnect() {
        return new Promise(async (res) => {
            this.destroy();
            res(await this.connect());
        });
    }
}
exports.CosmiNode = CosmiNode;
