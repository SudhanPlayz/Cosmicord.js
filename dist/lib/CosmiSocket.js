"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmiSocket = void 0;
const tslib_1 = require("tslib");
const ws_1 = tslib_1.__importDefault(require("ws"));
class CosmiSocket extends ws_1.default {
    /** The cosmicord manager */
    manager;
    /** The cosminode */
    node;
    /** The session id of the socket */
    sessionId;
    /** Creates a new websocket */
    constructor(manager, node, url, options) {
        super(url, options);
        this.manager = manager;
        this.node = node;
        this.on("message", (data) => {
            let payload = JSON.parse(data.toString());
            switch (payload.op) {
                case "playerUpdate":
                    this.playerUpdate(payload);
                    break;
                case "stats":
                    this.stats(payload);
                    break;
                case "event":
                    this.event(payload);
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
    sendData(data) {
        return new Promise((resolve, reject) => {
            if (!data || !JSON.stringify(data).startsWith("{")) {
                return reject(false);
            }
            const dataToSend = JSON.stringify(data, null, 3);
            this.manager.emit("payload", dataToSend);
            this.node.calls++;
            this.send(dataToSend, (error) => {
                if (error)
                    reject(error);
                else
                    resolve(true);
            });
        });
    }
    /** Emits when the socket is ready */
    ready(payload) {
        this.sessionId = payload.sessionId;
        this.node.isReady = true;
        this.node.emit("connected");
    }
    /** Emits when a event is received */
    event(payload) {
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
                console.log("Unknown event:", payload);
                break;
        }
    }
    /** Emits when stats are received */
    stats(payload) {
        let stats = {
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
    playerUpdate(payload) {
        const player = this.manager.players.get(payload.guildId);
        if (!player)
            return;
        player.position = payload.state.position || 0;
    }
    /** Emits when a track starts */
    trackStart(payload) {
        const player = this.manager.players.get(payload.guildId);
        if (!player)
            return;
        player.playing = true;
        player.paused = false;
        player.node.manager.emit("trackStart", player, player.queue.current);
    }
    /** Emits when a track ends */
    trackEnd(payload) {
        const player = this.manager.players.get(payload.guildId);
        if (!player)
            return;
        this.manager.emit("trackEnd", player, player.queue.current, payload.reason);
        if (player.loop) {
            player.seek(0);
            return;
        }
        if (player.queue.length > 0) {
            player.queue.current = null;
            player.play();
        }
    }
    /** Emits when a track errors */
    trackException(payload) {
        const player = this.manager.players.get(payload.guildId);
        if (!player)
            return;
        this.manager.emit("trackError", player, new Error(payload.exception));
    }
    /** Emits when a track gets stuck */
    trackStuck(payload) {
        const player = this.manager.players.get(payload.guildId);
        if (!player)
            return;
        this.manager.emit("trackStruck", player, payload);
    }
}
exports.CosmiSocket = CosmiSocket;
