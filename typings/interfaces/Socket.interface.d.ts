export type MessagePayload = ReadyPayload | PlayerUpdatePayload | StatsPayload | TrackStartEventPayload | TrackEndEventPayload | TrackExceptionEventPayload | TrackStuckEventPayload | WebSocketClosedEventPayload;
export type EventsPayload = TrackStartEventPayload | TrackEndEventPayload | TrackExceptionEventPayload | TrackStuckEventPayload;
export declare enum TrackExceptionSeverity {
    Common = "COMMON",
    Suspected = "SUSPICIOUS",
    Fault = "FAULT"
}
export interface SocketPayload {
    op: string;
    d: {
        guild_id: string;
        channel_id: string | null;
        self_mute: boolean;
        self_deaf: boolean;
    };
}
export declare enum TrackEndReason {
    Finished = "FINISHED",
    LoadFailed = "LOAD_FAILED",
    Stopped = "STOPPED",
    Replaced = "REPLACED",
    Cleanup = "CLEANUP"
}
export interface TrackException {
    message: string;
    severity: TrackExceptionSeverity;
    cause: string;
}
export interface SocketVoiceState {
    /**
     * Unix timestamp in milliseconds
     */
    time: number;
    /**
     * If Lavalink is connected to the voice gateway
     */
    connected: boolean;
    /**
     * The ping of the node to the Discord voice server in milliseconds (-1 if not connected)
     */
    ping: number;
    /**
     * The position of the track in milliseconds
     */
    position: number;
}
export interface ReadyPayload {
    op: "ready";
    resumed: boolean;
    sessionId: string;
}
export interface PlayerUpdatePayload {
    op: "playerUpdate";
    guildId: string;
    state: SocketVoiceState;
}
export interface StatsPayload {
    op: "stats";
    players: number;
    playingPlayers: number;
    uptime: number;
    memory: {
        free: number;
        used: number;
        allocated: number;
        reservable: number;
    };
    cpu: {
        cores: number;
        systemLoad: number;
        lavalinkLoad: number;
    };
    frameStats?: {
        sent?: number;
        nulled?: number;
        deficit?: number;
    };
}
export interface EventPayload {
    op: "event";
    type: string;
    guildId: string;
}
export interface TrackStartEventPayload extends EventPayload {
    type: "TrackStartEvent";
    encodedTrack: string;
    track: string;
}
export interface TrackEndEventPayload extends EventPayload {
    type: "TrackEndEvent";
    track: string;
    reason: TrackEndReason;
}
export interface TrackExceptionEventPayload extends EventPayload {
    type: "TrackExceptionEvent";
    track: string;
    exception: string;
}
export interface TrackStuckEventPayload extends EventPayload {
    type: "TrackStuckEvent";
    encodedTrack: string;
    track: string;
    thresholdMs: number;
}
export interface WebSocketClosedEventPayload extends EventPayload {
    type: "WebSocketClosedEvent";
    code: number;
    reason: string;
    byRemote: boolean;
}
