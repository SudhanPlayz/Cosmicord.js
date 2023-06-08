import { EventEmitter } from "stream";
import { NodeEvents, CosmiNodeOptions, NodeStats } from "../interfaces";
import { CosmiPlayer, CosmiREST, CosmiSocket, Cosmicord } from "./";
import { Collection } from "discord.js";

export interface CosmiNode {
  on<Key extends keyof NodeEvents>(
    event: Key,
    listener: (...args: NodeEvents[Key]) => void
  ): this;

  emit<Key extends keyof NodeEvents>(
    event: Key,
    ...args: NodeEvents[Key]
  ): boolean;
}

export class CosmiNode extends EventEmitter {
  /**
   * The host for the node.
   * @type {string}
   */
  public host: string;

  /**
   * The port for the node.
   * @default 2333
   * @type {number}
   */
  public port: number = 2333;

  /**
   * The password for the node.
   * @default "youshallnotpass"
   * @type {string}
   */
  public password: string = "youshallnotpass";

  /**
   * Whether the host uses SSL.
   * @default false
   * @type {boolean}
   */
  public secure: boolean = false;

  /**
   * The identifier for the node.
   * @default "Cosmicord"
   * @type {string}
   */
  public identifier: string = "Cosmicord";

  /**
   * The retryAmount for the node.
   * @default 5
   * @type {number}
   */
  public retryAmount: number = 5;

  /**
   * The amount of retries for the node.
   * @default 0
   * @type {number}
   */
  private retries: number = 0;

  /**
   * The retryDelay for the node.
   * @default 5000
   * @type {number}
   */
  public retryDelay: number = 5000;

  /**
   * The timeout used for api calls
   * @default 10000
   * @type {number}
   */
  public requestTimeout: number = 10000;

  /**
   * Whether the node is connected or not.
   * @type {boolean}
   * @default false
   */
  public connected: boolean = false;

  /**
   * The stats for the node.
   * @type {NodeStats}
   */
  public stats: NodeStats = {
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
  public calls: number = 0;

  /**
   * Websocket for the node.
   * @type {CosmiSocket}
   */
  public socket: CosmiSocket;

  /**
   * Lavalink version for the node.
   * @type {string}
   */
  public version?: string;

  /**
   * The rest for the node.
   * @type {CosmiREST}
   */
  public rest: CosmiREST;

  /**
   * The manager for the node.
   * @type {Cosmicord}
   */
  public manager: Cosmicord;

  /**
   * The players in the node.
   * @type {Collection<string, CosmiPlayer>}
   */
  public players: Collection<string, CosmiPlayer>;

  /**
   * The client id for the node.
   * @type {string}
   */
  public clientId?: string;

  /**
   * Whether the node is ready or not.
   * @type {boolean}
   * @default false
   */
  public isReady: boolean = false;

  /**
   * Creates a new Node instance
   * @param {Cosmicord} manager The manager for the node.
   * @param {CosmiNodeOptions} options The options for the node.
   */
  constructor(manager: Cosmicord, options: CosmiNodeOptions) {
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
  public connectSocket(): Promise<boolean> {
    return new Promise((res) => {
      this.socket = new CosmiSocket(
        this.manager,
        this,
        this.url.replace("http", "ws") + "/v3/websocket",
        {
          headers: {
            Authorization: this.password,
            "User-Id": this.clientId,
            "Client-Name": "Cosmicord/v1.0.0",
          },
        }
      );

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
  public get url(): string {
    return `${this.secure ? "https" : "http"}://${this.host}:${this.port}`;
  }

  /**
   * Connect the socket to the node.
   * @returns {Promise<boolean>} Whether the node connected or not.
   */
  public connect(): Promise<boolean> {
    return new Promise(async (res) => {
      try {
        const rest = new CosmiREST(this, this.url, this.requestTimeout);
        this.version = await rest.getVersion();

        if (this.version.startsWith("3")) {
          rest.setBaseURL(this.url + "/v3");
          this.rest = rest;
          res(await this.connectSocket());
        } else throw new Error("Unsupported Lavalink version. (v3 required)");
      } catch (e) {
        this.manager.emit("debug", e.toString());
        await new Promise((r) => setTimeout(r, this.retryDelay));
        if (this.retryAmount === this.retries) {
          throw new Error(
            `Failed to connect to node ${this.identifier} after ${this.retries} retries.`
          );
        } else {
          res(await this.reconnect());
        }
      }
    });
  }

  /**
   * Destroy the node.
   * @returns {void}
   */
  public destroy(): void {
    if (this.socket) this.socket.close();
    if (this.rest) delete this.rest;

    this.connected = false;
    this.emit("destroyed");
    this.manager.emit("nodeDestroyed", this);

    this.manager.nodes = this.manager.nodes.filter((n) => n.url !== this.url);
  }

  /**
   * Reconnect the node.
   * @returns {Promise<boolean>} Whether the node reconnected or not.
   */
  public reconnect(): Promise<boolean> {
    return new Promise(async (res) => {
      this.destroy();
      res(await this.connect());
    });
  }
}
