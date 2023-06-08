"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmiNode = void 0;
const stream_1 = require("stream");
const _1 = require("./");
class CosmiNode extends stream_1.EventEmitter {
    /** The host for the node. */
    host;
    /** The port for the node. */
    port = 2333;
    /** The password for the node. */
    password = "youshallnotpass";
    /** Whether the node is secure or not. */
    secure = false;
    /** The identifier for the node. */
    identifier = "Cosmicord";
    /** The amount of retries for the node. */
    retryAmount = 5;
    /** The amount of retries made for the node. */
    retries = 0;
    /** The delay for the node. */
    retryDelay = 5000;
    /** The request timeout for the node. */
    requestTimeout = 10000;
    /** Whether the node is connected or not. */
    connected = false;
    /** The stats for the node. */
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
    /** The amount of calls made to the node. */
    calls = 0;
    /** The socket for the node. */
    socket;
    /** The version for the node. */
    version;
    /** The rest client for the node. */
    rest;
    /** The manager of the node */
    manager;
    /** Players of the node. */
    players;
    /** The client id of the bot */
    clientId;
    /** Whether the node is ready or not. */
    isReady = false;
    /** Creates a new node. */
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
    /** Connect to the node with websocket. */
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
    /** Get the url for the node. */
    get url() {
        return `${this.secure ? "https" : "http"}://${this.host}:${this.port}`;
    }
    /** Connects to the node. */
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
    /** Destroys the node. */
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
    /** Reconnects to the node. */
    reconnect() {
        return new Promise(async (res) => {
            this.destroy();
            res(await this.connect());
        });
    }
}
exports.CosmiNode = CosmiNode;
