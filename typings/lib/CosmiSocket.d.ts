import { EventsPayload, PlayerUpdatePayload, StatsPayload, TrackEndEventPayload, TrackExceptionEventPayload, TrackStartEventPayload, TrackStuckEventPayload, ReadyPayload } from "../interfaces";
import { CosmiNode, Cosmicord } from "./";
import WebSocket from "ws";
export declare class CosmiSocket extends WebSocket {
    /**
     * The cosmicord client
     * @type {Cosmicord}
     */
    manager: Cosmicord;
    /**
     * The lavalink node
     * @type {CosmiNode}
     */
    node: CosmiNode;
    /**
     * The session id
     * @type {string}
     */
    sessionId: string;
    constructor(manager: Cosmicord, node: CosmiNode, url: string, options?: WebSocket.ClientOptions);
    /**
     * Sends data to the websocket
     * @param {any} data - The data to send
     * @returns {Promise<boolean>}
     */
    sendData(data: any): Promise<unknown>;
    /**
     * Emits when the websocket is ready
     * @param {ReadyPayload} payload - The payload of the ready event
     * @returns {void}
     */
    protected ready(payload: ReadyPayload): void;
    /**
     * Emits when an event is received
     * @param {EventsPayload} payload - The payload of the event
     * @returns {void}
     */
    protected event(payload: EventsPayload): void;
    /**
     * Emits when stats are received
     * @param {StatsPayload} payload - The payload of the stats
     * @returns {void}
     */
    protected stats(payload: StatsPayload): void;
    /**
     * Emits when the player is updated
     * @param {PlayerUpdatePayload} payload - The payload of the player update
     * @returns {void}
     */
    protected playerUpdate(payload: PlayerUpdatePayload): void;
    /**
     * Emits when a track starts
     * @param {TrackStartEventPayload} payload - The payload of the track start event
     * @returns {void}
     */
    protected trackStart(payload: TrackStartEventPayload): void;
    /**
     * Emits when a track ends
     * @param {TrackEndEventPayload} payload - The payload of the track end event
     * @returns {void}
     */
    protected trackEnd(payload: TrackEndEventPayload): void;
    /**
     * Emits when a track errors
     * @param {TrackExceptionEventPayload} payload - The payload of the track error event
     * @returns {void}
     */
    protected trackException(payload: TrackExceptionEventPayload): void;
    /**
     * Emits when a track gets stuck
     * @param {TrackStuckEventPayload} payload - The payload of the track stuck event
     * @returns {void}
     */
    protected trackStuck(payload: TrackStuckEventPayload): void;
}
