import { CosmiNode } from "./CosmiNode";
import { BodyInit } from "node-fetch";
import { RestError, RestInfo, RestLavalinkStats, RestPlayer, RestPlayerUpdate, RestSessionInfo, RestTrack, RestTrackDecode, RestTrackLoadResult } from "../interfaces";
export declare class CosmiREST {
    /**
     * The base URL of the REST API
     * @type {string}
     */
    baseURL: string;
    /**
     * The lavalink node
     * @type {CosmiNode}
     */
    node: CosmiNode;
    /**
     * The timeout for requests
     * @type {number}
     */
    timeout: number;
    /**
     * Creates a new RestAPI instance
     * @param {CosmiNode} node - The cosminode
     * @param {string} baseURL - The base URL of the REST API
     * @param {number} timeout - The timeout for requests
     */
    constructor(node: CosmiNode, baseURL: string, timeout: number);
    /**
     * Sets the base URL of the REST API
     * @param {string} baseURL - The base URL of the REST API
     * @returns {void}
     */
    setBaseURL(baseURL: string): void;
    /**
     * Sends a GET request to the REST API
     * @param {string} endpoint - The endpoint to send the request to
     * @returns {any} The response
     */
    get(endpoint: string): Promise<any>;
    /**
     * Sends a POST request to the REST API
     * @param {string} endpoint - The endpoint to send the request to
     * @param {BodyInit} body - The body to send
     * @returns {any} The response
     */
    post(endpoint: string, body?: BodyInit): Promise<any>;
    /**
     * Sends a PUT request to the REST API
     * @param {string} endpoint - The endpoint to send the request to
     * @param {BodyInit} body - The body to send
     * @returns {any} The response
     */
    put(endpoint: string, body?: BodyInit): Promise<any>;
    /**
     * Sends a DELETE request to the REST API
     * @param {string} endpoint - The endpoint to send the request to
     * @returns {any} The response
     */
    delete(endpoint: string): Promise<any>;
    /**
     * Sends a PATCH request to the REST API
     * @param {string} endpoint - The endpoint to send the request to
     * @param {BodyInit} body - The body to send
     * @returns {any} The response
     */
    patch(endpoint: string, body?: BodyInit): Promise<any>;
    /**
     * Sends a request to the REST API
     * @param {string} method - The method to use
     * @param {string} endpoint - The endpoint to send the request to
     * @param {BodyInit} body - The body to send
     * @param {boolean} text - Whether to return the response as text
     * @returns {any} The response
     */
    request(method: string, endpoint: string, body?: BodyInit, text?: boolean): Promise<any>;
    /**
     * Checks if the response is an error
     * @param {any} res - The response
     * @returns {boolean} Whether the response is an error
     */
    isError(res: any): res is RestError;
    /**
     * Get all the players from a session
     * @param {string} sessionId - The session to get the players from
     * @param {boolean} trace - Whether to include the trace
     * @returns {RestPlayer[]} The players
     */
    getPlayersFromSession(sessionId: string, trace?: boolean): Promise<RestPlayer[]>;
    /**
     * Returns the player for this guild in this session.
     * @param {string} sessionId - The session to get the player from
     * @param {string} guildId - The guild id of the player
     * @param {boolean} trace - Whether to include the trace
     * @returns {RestPlayer} The player
     */
    getPlayer(sessionId: string, guildId: string, trace?: boolean): Promise<RestPlayer>;
    /**
     * Updates or creates the player for this guild if it doesn't already exist.
     * @param {string} sessionId - The session to update the player from
     * @param {string} guildId - The guild id of the player
     * @param {RestPlayerUpdate} options - The options to update the player with
     * @param {boolean} noReplace - Whether to replace the player or not
     * @param {boolean} trace - Whether to include the trace
     * @returns {RestPlayer} The player
     */
    updatePlayer(sessionId: string, guildId: string, options: RestPlayerUpdate, noReplace?: boolean, trace?: boolean): Promise<RestPlayer>;
    /**
     * Deletes the player for this guild.
     * @param {string} sessionId - The session to delete the player from
     * @param {string} guildId - The guild id of the player
     * @param {boolean} trace - Whether to include the trace
     * @returns {void}
     */
    deletePlayer(sessionId: string, guildId: string, trace?: boolean): Promise<void>;
    /**
     * Updates the session with a resuming key and timeout.
     * @param {string} sessionId - The session to update
     * @param {string} resumingKey - The resuming key
     * @param {number} timeout - The timeout
     * @param {boolean} trace - Whether to include the trace
     * @returns {RestSessionInfo} The session info
     */
    updateSession(sessionId: string, resumingKey?: string, timeout?: number, trace?: boolean): Promise<RestSessionInfo>;
    /**
     * Loads a track
     * @param {string} identifier - The track identifier
     * @returns {RestTrackLoadResult} The track load result
     */
    loadTracks(identifier: string): Promise<RestTrackLoadResult>;
    /**
     * Decode a single track into its info, where BASE64 is the encoded base64 data.
     * @param {string} base64 - The base64 data
     * @param {boolean} trace - Whether to include the trace
     * @returns {RestTrackDecode} The decoded track
     */
    decodeTrack(base64: string, trace?: boolean): Promise<RestTrackDecode>;
    /**
     * Decode multiple tracks
     * @param {string[]} trackData - The track data
     * @param {boolean} trace - Whether to include the trace
     * @returns {RestTrack[]} The decoded tracks
     */
    decodeTracks(trackData: string[], trace?: boolean): Promise<RestTrack[]>;
    /**
     * Get lavalink info
     * @param {boolean} trace - Whether to include the trace
     * @returns {RestInfo} The info
     */
    getInfo(trace?: boolean): Promise<RestInfo>;
    /**
     * Get lavalink stats
     * @param {boolean} trace - Whether to include the trace
     * @returns {RestLavalinkStats} The stats
     */
    getStats(trace?: boolean): Promise<RestLavalinkStats>;
    /**
     * Get lavalink version
     * @returns {string} The version
     */
    getVersion(): Promise<string>;
}
