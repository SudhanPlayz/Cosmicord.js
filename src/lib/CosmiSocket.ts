import {
  EventsPayload,
  MessagePayload,
  PlayerUpdatePayload,
  StatsPayload,
  TrackEndEventPayload,
  TrackExceptionEventPayload,
  TrackStartEventPayload,
  TrackStuckEventPayload,
  NodeStats,
  ReadyPayload,
} from "../interfaces";
import { CosmiNode, Cosmicord } from "./";
import WebSocket from "ws";

export class CosmiSocket extends WebSocket {
  /** The cosmicord manager */
  public manager: Cosmicord;

  /** The cosminode */
  public node: CosmiNode;

  /** The session id of the socket */
  public sessionId: string;

  /** Creates a new websocket */
  constructor(
    manager: Cosmicord,
    node: CosmiNode,
    url: string,
    options?: WebSocket.ClientOptions
  ) {
    super(url, options);

    this.manager = manager;
    this.node = node;

    this.on("message", (data: Buffer) => {
      let payload: MessagePayload = JSON.parse(
        data.toString()
      ) as MessagePayload;

      switch (payload.op) {
        case "playerUpdate":
          this.playerUpdate(payload);
          break;

        case "stats":
          this.stats(payload);
          break;

        case "event":
          this.event(payload as EventsPayload);
          break;

        case "ready":
          this.ready(payload);
          break;

        default:
          this.manager.emit("debug", `Unknown payload\n${payload}`);
          break;
      }
    });
  }

  /** Sends data to the websocket */
  public sendData(data: any) {
    return new Promise((resolve, reject) => {
      if (!data || !JSON.stringify(data).startsWith("{")) {
        return reject(false);
      }

      const dataToSend = JSON.stringify(data, null, 3);
      this.manager.emit("payload", dataToSend);
      this.node.calls++;

      this.send(dataToSend, (error: Error) => {
        if (error) reject(error);
        else resolve(true);
      });
    });
  }

  /** Emits when the socket is ready */
  protected ready(payload: ReadyPayload) {
    this.sessionId = payload.sessionId;
    this.node.isReady = true;
    this.node.emit("connected");
  }

  /** Emits when a event is received */
  protected event(payload: EventsPayload) {
    switch (payload.type) {
      case "TrackStartEvent":
        this.trackStart(payload);
        break;

      case "TrackEndEvent":
        this.trackEnd(payload);
        break;

      case "TrackExceptionEvent":
        this.trackException(payload);
        break;

      case "TrackStuckEvent":
        this.trackStuck(payload);
        break;

      default:
        this.manager.emit("debug", `Unknown event\n${payload}`);
        break;
    }
  }

  /** Emits when stats are received */
  protected stats(payload: StatsPayload) {
    let stats: NodeStats = {
      players: payload.players,
      playingPlayers: payload.playingPlayers,
      uptime: payload.uptime,
      memory: {
        allocated: payload.memory.allocated,
        free: payload.memory.free,
        reservable: payload.memory.reservable,
        used: payload.memory.used,
      },
      cpu: {
        cores: payload.cpu.cores,
        lavalinkLoad: payload.cpu.lavalinkLoad,
        systemLoad: payload.cpu.systemLoad,
      },
    };

    this.node.stats = stats;

    this.node.emit("stats", stats);
    this.manager.emit("nodeStats", this.node, stats);
  }

  /** Emits when a player is updated */
  protected playerUpdate(payload: PlayerUpdatePayload) {
    const player = this.manager.players.get(payload.guildId);
    if (!player) return;

    player.position = payload.state.position || 0;
  }

  /** Emits when a track starts */
  protected trackStart(payload: TrackStartEventPayload) {
    const player = this.manager.players.get(payload.guildId);
    if (!player) return;

    player.playing = true;
    player.paused = false;

    player.node.manager.emit("trackStart", player, player.queue.current);
  }

  /** Emits when a track ends */
  protected trackEnd(payload: TrackEndEventPayload) {
    const player = this.manager.players.get(payload.guildId);
    if (!player) return;

    this.manager.emit("trackEnd", player, player.queue.current, payload.reason);

    if (player.loop) {
      player.seek(0);
      return;
    }

    if (player.queue.length > 0) {
      player.queue.current = null;
      player.play();
    } else {
      player.playing = false;
      player.paused = false;
      player.queue.current = null;
      player.queue.clear();

      this.manager.emit("queueEnd", player);
      player.destroy();
    }
  }

  /** Emits when a track errors */
  protected trackException(payload: TrackExceptionEventPayload) {
    const player = this.manager.players.get(payload.guildId);
    if (!player) return;

    this.manager.emit("trackError", player, new Error(payload.exception));
  }

  /** Emits when a track gets stuck */
  protected trackStuck(payload: TrackStuckEventPayload) {
    const player = this.manager.players.get(payload.guildId);
    if (!player) return;

    this.manager.emit("trackStruck", player, payload);
  }
}
