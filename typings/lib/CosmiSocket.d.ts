import { EventsPayload, PlayerUpdatePayload, StatsPayload, TrackEndEventPayload, TrackExceptionEventPayload, TrackStartEventPayload, TrackStuckEventPayload, ReadyPayload } from "../interfaces";
import { CosmiNode, Cosmicord } from "./";
import WebSocket from "ws";
export declare class CosmiSocket extends WebSocket {
    /** The cosmicord manager */
    manager: Cosmicord;
    /** The cosminode */
    node: CosmiNode;
    /** The session id of the socket */
    sessionId: string;
    /** Creates a new websocket */
    constructor(manager: Cosmicord, node: CosmiNode, url: string, options?: WebSocket.ClientOptions);
    /** Sends data to the websocket */
    sendData(data: any): Promise<unknown>;
    /** Emits when the socket is ready */
    protected ready(payload: ReadyPayload): void;
    /** Emits when a event is received */
    protected event(payload: EventsPayload): void;
    /** Emits when stats are received */
    protected stats(payload: StatsPayload): void;
    /** Emits when a player is updated */
    protected playerUpdate(payload: PlayerUpdatePayload): void;
    /** Emits when a track starts */
    protected trackStart(payload: TrackStartEventPayload): void;
    /** Emits when a track ends */
    protected trackEnd(payload: TrackEndEventPayload): void;
    /** Emits when a track errors */
    protected trackException(payload: TrackExceptionEventPayload): void;
    /** Emits when a track gets stuck */
    protected trackStuck(payload: TrackStuckEventPayload): void;
}
