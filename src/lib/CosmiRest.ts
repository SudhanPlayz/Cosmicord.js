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
  /** The base URL of the REST API */
  public baseURL: string;

  /** The cosminode */
  public node: CosmiNode;

  /** The timeout for requests */
  public timeout: number;

  /** Creates a new REST API */
  constructor(node: CosmiNode, baseURL: string, timeout: number) {
    this.node = node;
    this.baseURL = baseURL;
    this.timeout = timeout;
  }

  /** Sets the base URL of the REST API */
  public setBaseURL(baseURL: string) {
    this.baseURL = baseURL;
  }

  /** Sends a GET request to the REST API */
  public async get(endpoint: string): Promise<any> {
    return this.request("GET", endpoint);
  }

  /** Sends a POST request to the REST API */
  public async post(endpoint: string, body?: BodyInit): Promise<any> {
    return this.request("POST", endpoint, body);
  }

  /** Sends a PUT request to the REST API */
  public async put(endpoint: string, body?: BodyInit): Promise<any> {
    return this.request("PUT", endpoint, body);
  }

  /** Sends a DELETE request to the REST API */
  public async delete(endpoint: string): Promise<any> {
    return this.request("DELETE", endpoint);
  }

  /** Sends a PATCH request to the REST API */
  public async patch(endpoint: string, body?: BodyInit): Promise<any> {
    return this.request("PATCH", endpoint, body);
  }

  /** Sends a request to the REST API and returns the text/json */
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

  /** Checks if the response is an error */
  public isError(res: any): res is RestError {
    return "error" in res;
  }

  /** Gets the info of the node */
  public async getPlayersFromSession(
    sessionId: string,
    trace = false
  ): Promise<RestPlayer[]> {
    const res = await this.get(`/sessions/${sessionId}/players?trace=${trace}`);
    if (this.isError(res)) throw new Error(res.error);

    return res as RestPlayer[];
  }

  /** Returns the player for this guild if it exists. */
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

  /** Updates or creates the player for this guild. */
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

  /** Deletes the player for this guild. */
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

  /** Update session information */
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

  /** Loads the tracks from the node */
  public async loadTracks(
    identifier: string
  ): Promise<RestTrackLoadResult> {
    const res = await this.get(
      `/loadtracks?identifier=${identifier}`
    );
    if (this.isError(res)) throw new Error(res.error);

    return res as RestTrackLoadResult;
  }

  /** Decodes the track */
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

  /** Decode multiple tracks */
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

  /** Get lavalink info */
  public async getInfo(trace = false): Promise<RestInfo> {
    const res = await this.get(`/info?trace=${trace}`);
    if (this.isError(res)) throw new Error(res.error);

    return res as RestInfo;
  }

  /** Get lavalink stats */
  public async getStats(trace = false): Promise<RestLavalinkStats> {
    const res = await this.get(`/stats?trace=${trace}`);
    if (this.isError(res)) throw new Error(res.error);

    return res as RestLavalinkStats;
  }

  /** Get lavalink version */
  public async getVersion(): Promise<string> {
    const res = await this.request("GET", "/version", null, true);

    return res as string;
  }
}
