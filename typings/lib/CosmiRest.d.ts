import { CosmiNode } from "./CosmiNode";
import { BodyInit } from "node-fetch";
import { RestError, RestInfo, RestLavalinkStats, RestPlayer, RestPlayerUpdate, RestSessionInfo, RestTrack, RestTrackDecode, RestTrackLoadResult } from "../interfaces";
export declare class CosmiREST {
    /** The base URL of the REST API */
    baseURL: string;
    /** The cosminode */
    node: CosmiNode;
    /** The timeout for requests */
    timeout: number;
    /** Creates a new REST API */
    constructor(node: CosmiNode, baseURL: string, timeout: number);
    /** Sets the base URL of the REST API */
    setBaseURL(baseURL: string): void;
    /** Sends a GET request to the REST API */
    get(endpoint: string): Promise<any>;
    /** Sends a POST request to the REST API */
    post(endpoint: string, body?: BodyInit): Promise<any>;
    /** Sends a PUT request to the REST API */
    put(endpoint: string, body?: BodyInit): Promise<any>;
    /** Sends a DELETE request to the REST API */
    delete(endpoint: string): Promise<any>;
    /** Sends a PATCH request to the REST API */
    patch(endpoint: string, body?: BodyInit): Promise<any>;
    /** Sends a request to the REST API and returns the text/json */
    request(method: string, endpoint: string, body?: BodyInit, text?: boolean): Promise<any>;
    /** Checks if the response is an error */
    isError(res: any): res is RestError;
    /** Gets the info of the node */
    getPlayersFromSession(sessionId: string, trace?: boolean): Promise<RestPlayer[]>;
    /** Returns the player for this guild if it exists. */
    getPlayer(sessionId: string, guildId: string, trace?: boolean): Promise<RestPlayer>;
    /** Updates or creates the player for this guild. */
    updatePlayer(sessionId: string, guildId: string, options: RestPlayerUpdate, noReplace?: boolean, trace?: boolean): Promise<RestPlayer>;
    /** Deletes the player for this guild. */
    deletePlayer(sessionId: string, guildId: string, trace?: boolean): Promise<void>;
    /** Update session information */
    updateSession(sessionId: string, resumingKey?: string, timeout?: number, trace?: boolean): Promise<RestSessionInfo>;
    /** Loads the tracks from the node */
    loadTracks(identifier: string): Promise<RestTrackLoadResult>;
    /** Decodes the track */
    decodeTrack(base64: string, trace?: boolean): Promise<RestTrackDecode>;
    /** Decode multiple tracks */
    decodeTracks(trackData: string[], trace?: boolean): Promise<RestTrack[]>;
    /** Get lavalink info */
    getInfo(trace?: boolean): Promise<RestInfo>;
    /** Get lavalink stats */
    getStats(trace?: boolean): Promise<RestLavalinkStats>;
    /** Get lavalink version */
    getVersion(): Promise<string>;
}
