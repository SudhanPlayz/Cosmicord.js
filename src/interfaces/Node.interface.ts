import { CosmiPlayer } from "../lib";

export interface NodeEvents {
  connected: [];
  destroyed: [];
  stats: [NodeStats];
  
  playerCreated: [CosmiPlayer];
  playerDestoryed: [string];
}

export interface CosmiNodeOptions {
  /** The host for the node. */
  host: string;

  /** The port for the node. */
  port?: number;

  /** The password for the node. */
  password?: string;

  /** Whether the host uses SSL. */
  secure?: boolean;

  /** The identifier for the node. */
  identifier?: string;

  /** The retryAmount for the node. */
  retryAmount?: number;

  /** The retryDelay for the node. */
  retryDelay?: number;

  /** The timeout used for api calls */
  requestTimeout?: number;
}

export interface NodeStats {
  /** The amount of players on the node. */
  players: number;

  /** The amount of playing players on the node. */
  playingPlayers: number;

  /** The uptime of the node. */
  uptime: number;

  /** The memory stats of the node. */
  memory: {
    /** The free memory of the node. */
    free: number;

    /** The used memory of the node. */
    used: number;

    /** The allocated memory of the node. */
    allocated: number;

    /** The reservable memory of the node. */
    reservable: number;
  };

  /** The cpu stats of the node. */
  cpu: {
    /** The amount of cores the node has. */
    cores: number;

    /** The system load of the node. */
    systemLoad: number;

    /** The lavalink load of the node. */
    lavalinkLoad: number;
  };

  /** The frame stats of the node. */
  frameStats?: {
    /** The amount of frames sent to Discord. */
    sent: number;

    /** The amount of frames that were nulled. */
    nulled: number;

    /** The amount of frames that were deficit. */
    deficit: number;
  };
}
