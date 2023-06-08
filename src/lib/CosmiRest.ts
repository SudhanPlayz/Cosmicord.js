import { CosmiNode } from "./CosmiNode";
import fetch, { BodyInit } from "node-fetch";
import {
  RestError,
  RestInfo,
  RestLavalinkStats,
  RestPlayer,
  RestPlayerUpdate,
  RestSessionInfo,
  RestTrack,
  RestTrackDecode,
  RestTrackLoadResult,
} from "../interfaces";

export class CosmiREST {
  /**
   * The base URL of the REST API
   * @type {string}
   */
  public baseURL: string;

  /**
   * The lavalink node
   * @type {CosmiNode}
   */
  public node: CosmiNode;

  /**
   * The timeout for requests
   * @type {number}
   */
  public timeout: number;

  /**
   * Creates a new RestAPI instance
   * @param {CosmiNode} node - The cosminode
   * @param {string} baseURL - The base URL of the REST API
   * @param {number} timeout - The timeout for requests
   */
  constructor(node: CosmiNode, baseURL: string, timeout: number) {
    this.node = node;
    this.baseURL = baseURL;
    this.timeout = timeout;
  }

  /**
   * Sets the base URL of the REST API
   * @param {string} baseURL - The base URL of the REST API
   * @returns {void}
   */
  public setBaseURL(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * Sends a GET request to the REST API
   * @param {string} endpoint - The endpoint to send the request to
   * @returns {any} The response
   */
  public async get(endpoint: string): Promise<any> {
    return this.request("GET", endpoint);
  }

  /**
   * Sends a POST request to the REST API
   * @param {string} endpoint - The endpoint to send the request to
   * @param {BodyInit} body - The body to send
   * @returns {any} The response
   */
  public async post(endpoint: string, body?: BodyInit): Promise<any> {
    return this.request("POST", endpoint, body);
  }

  /**
   * Sends a PUT request to the REST API
   * @param {string} endpoint - The endpoint to send the request to
   * @param {BodyInit} body - The body to send
   * @returns {any} The response
   */
  public async put(endpoint: string, body?: BodyInit): Promise<any> {
    return this.request("PUT", endpoint, body);
  }

  /**
   * Sends a DELETE request to the REST API
   * @param {string} endpoint - The endpoint to send the request to
   * @returns {any} The response
   */
  public async delete(endpoint: string): Promise<any> {
    return this.request("DELETE", endpoint);
  }

  /**
   * Sends a PATCH request to the REST API
   * @param {string} endpoint - The endpoint to send the request to
   * @param {BodyInit} body - The body to send
   * @returns {any} The response
   */
  public async patch(endpoint: string, body?: BodyInit): Promise<any> {
    return this.request("PATCH", endpoint, body);
  }

  /**
   * Sends a request to the REST API
   * @param {string} method - The method to use
   * @param {string} endpoint - The endpoint to send the request to
   * @param {BodyInit} body - The body to send
   * @param {boolean} text - Whether to return the response as text
   * @returns {any} The response
   */
  public async request(
    method: string,
    endpoint: string,
    body?: BodyInit,
    text = false
  ): Promise<any> {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method,
      body,
      headers: {
        Authorization: this.node.password,
        "Content-Type": "application/json",
      },
      timeout: this.timeout,
    });

    this.node.calls++;

    if (text) return await res.text();

    const json = await res.json();
    return json;
  }

  /**
   * Checks if the response is an error
   * @param {any} res - The response
   * @returns {boolean} Whether the response is an error
   */
  public isError(res: any): res is RestError {
    return "error" in res;
  }

  /**
   * Get all the players from a session
   * @param {string} sessionId - The session to get the players from
   * @param {boolean} trace - Whether to include the trace
   * @returns {RestPlayer[]} The players
   */
  public async getPlayersFromSession(
    sessionId: string,
    trace = false
  ): Promise<RestPlayer[]> {
    const res = await this.get(`/sessions/${sessionId}/players?trace=${trace}`);
    if (this.isError(res)) throw new Error(res.error);

    return res as RestPlayer[];
  }

  /**
   * Returns the player for this guild in this session.
   * @param {string} sessionId - The session to get the player from
   * @param {string} guildId - The guild id of the player
   * @param {boolean} trace - Whether to include the trace
   * @returns {RestPlayer} The player
   */
  public async getPlayer(
    sessionId: string,
    guildId: string,
    trace = false
  ): Promise<RestPlayer> {
    const res = await this.get(
      `/sessions/${sessionId}/player/${guildId}?trace=${trace}`
    );
    if (this.isError(res)) throw new Error(res.error);

    return res as RestPlayer;
  }

  /**
   * Updates or creates the player for this guild if it doesn't already exist.
   * @param {string} sessionId - The session to update the player from
   * @param {string} guildId - The guild id of the player
   * @param {RestPlayerUpdate} options - The options to update the player with
   * @param {boolean} noReplace - Whether to replace the player or not
   * @param {boolean} trace - Whether to include the trace
   * @returns {RestPlayer} The player
   */
  public async updatePlayer(
    sessionId: string,
    guildId: string,
    options: RestPlayerUpdate,
    noReplace = false,
    trace = false
  ): Promise<RestPlayer> {
    const res = await this.patch(
      `/sessions/${sessionId}/player/${guildId}?noReplace=${noReplace}?trace=${trace}`,
      JSON.stringify(options)
    );
    if (this.isError(res)) throw new Error(res.error);

    return res as RestPlayer;
  }

  /**
   * Deletes the player for this guild.
   * @param {string} sessionId - The session to delete the player from
   * @param {string} guildId - The guild id of the player
   * @param {boolean} trace - Whether to include the trace
   * @returns {void}
   */
  public async deletePlayer(
    sessionId: string,
    guildId: string,
    trace = false
  ): Promise<void> {
    const res = await this.delete(
      `/sessions/${sessionId}/player/${guildId}?trace=${trace}`
    );
    if (this.isError(res)) throw new Error(res.error);
  }

  /**
   * Updates the session with a resuming key and timeout.
   * @param {string} sessionId - The session to update
   * @param {string} resumingKey - The resuming key
   * @param {number} timeout - The timeout
   * @param {boolean} trace - Whether to include the trace
   * @returns {RestSessionInfo} The session info
   */
  public async updateSession(
    sessionId: string,
    resumingKey?: string,
    timeout?: number,
    trace = false
  ): Promise<RestSessionInfo> {
    const res = await this.patch(
      `/sessions/${sessionId}?trace=${trace}`,
      JSON.stringify({ resumingKey, timeout })
    );
    if (this.isError(res)) throw new Error(res.error);

    return res as RestSessionInfo;
  }

  /**
   * Loads a track
   * @param {string} identifier - The track identifier
   * @returns {RestTrackLoadResult} The track load result
   */
  public async loadTracks(
    identifier: string
  ): Promise<RestTrackLoadResult> {
    const res = await this.get(
      `/loadtracks?identifier=${identifier}`
    );
    if (this.isError(res)) throw new Error(res.error);

    return res as RestTrackLoadResult;
  }

  /**
   * Decode a single track into its info, where BASE64 is the encoded base64 data.
   * @param {string} base64 - The base64 data
   * @param {boolean} trace - Whether to include the trace
   * @returns {RestTrackDecode} The decoded track
   */
  public async decodeTrack(
    base64: string,
    trace = false
  ): Promise<RestTrackDecode> {
    const res = await this.get(
      `/decodetrack?encodedTrack=${base64}?trace=${trace}`
    );
    if (this.isError(res)) throw new Error(res.error);

    return res as RestTrackDecode;
  }

  /**
   * Decode multiple tracks
   * @param {string[]} trackData - The track data
   * @param {boolean} trace - Whether to include the trace
   * @returns {RestTrack[]} The decoded tracks
   */
  public async decodeTracks(
    trackData: string[],
    trace = false
  ): Promise<RestTrack[]> {
    const res = await this.post(
      `/decodetracks?trace=${trace}`,
      JSON.stringify(trackData)
    );
    if (this.isError(res)) throw new Error(res.error);

    return res as RestTrack[];
  }

  /**
   * Get lavalink info
   * @param {boolean} trace - Whether to include the trace
   * @returns {RestInfo} The info
   */
  public async getInfo(trace = false): Promise<RestInfo> {
    const res = await this.get(`/info?trace=${trace}`);
    if (this.isError(res)) throw new Error(res.error);

    return res as RestInfo;
  }

  /**
   * Get lavalink stats
   * @param {boolean} trace - Whether to include the trace
   * @returns {RestLavalinkStats} The stats
   */
  public async getStats(trace = false): Promise<RestLavalinkStats> {
    const res = await this.get(`/stats?trace=${trace}`);
    if (this.isError(res)) throw new Error(res.error);

    return res as RestLavalinkStats;
  }

  /**
   * Get lavalink version
   * @returns {string} The version
   */
  public async getVersion(): Promise<string> {
    const res = await this.request("GET", "/version", null, true);

    return res as string;
  }
}
