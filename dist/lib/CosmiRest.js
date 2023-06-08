"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmiREST = void 0;
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
class CosmiREST {
    /** The base URL of the REST API */
    baseURL;
    /** The cosminode */
    node;
    /** The timeout for requests */
    timeout;
    /** Creates a new REST API */
    constructor(node, baseURL, timeout) {
        this.node = node;
        this.baseURL = baseURL;
        this.timeout = timeout;
    }
    /** Sets the base URL of the REST API */
    setBaseURL(baseURL) {
        this.baseURL = baseURL;
    }
    /** Sends a GET request to the REST API */
    async get(endpoint) {
        return this.request("GET", endpoint);
    }
    /** Sends a POST request to the REST API */
    async post(endpoint, body) {
        return this.request("POST", endpoint, body);
    }
    /** Sends a PUT request to the REST API */
    async put(endpoint, body) {
        return this.request("PUT", endpoint, body);
    }
    /** Sends a DELETE request to the REST API */
    async delete(endpoint) {
        return this.request("DELETE", endpoint);
    }
    /** Sends a PATCH request to the REST API */
    async patch(endpoint, body) {
        return this.request("PATCH", endpoint, body);
    }
    /** Sends a request to the REST API and returns the text/json */
    async request(method, endpoint, body, text = false) {
        const res = await (0, node_fetch_1.default)(`${this.baseURL}${endpoint}`, {
            method,
            body,
            headers: {
                Authorization: this.node.password,
                "Content-Type": "application/json",
            },
            timeout: this.timeout,
        });
        this.node.calls++;
        if (text)
            return await res.text();
        const json = await res.json();
        return json;
    }
    /** Checks if the response is an error */
    isError(res) {
        return "error" in res;
    }
    /** Gets the info of the node */
    async getPlayersFromSession(sessionId, trace = false) {
        const res = await this.get(`/sessions/${sessionId}/players?trace=${trace}`);
        if (this.isError(res))
            throw new Error(res.error);
        return res;
    }
    /** Returns the player for this guild if it exists. */
    async getPlayer(sessionId, guildId, trace = false) {
        const res = await this.get(`/sessions/${sessionId}/player/${guildId}?trace=${trace}`);
        if (this.isError(res))
            throw new Error(res.error);
        return res;
    }
    /** Updates or creates the player for this guild. */
    async updatePlayer(sessionId, guildId, options, noReplace = false, trace = false) {
        const res = await this.patch(`/sessions/${sessionId}/player/${guildId}?noReplace=${noReplace}?trace=${trace}`, JSON.stringify(options));
        if (this.isError(res))
            throw new Error(res.error);
        return res;
    }
    /** Deletes the player for this guild. */
    async deletePlayer(sessionId, guildId, trace = false) {
        const res = await this.delete(`/sessions/${sessionId}/player/${guildId}?trace=${trace}`);
        if (this.isError(res))
            throw new Error(res.error);
    }
    /** Update session information */
    async updateSession(sessionId, resumingKey, timeout, trace = false) {
        const res = await this.patch(`/sessions/${sessionId}?trace=${trace}`, JSON.stringify({ resumingKey, timeout }));
        if (this.isError(res))
            throw new Error(res.error);
        return res;
    }
    /** Loads the tracks from the node */
    async loadTracks(identifier) {
        const res = await this.get(`/loadtracks?identifier=${identifier}`);
        if (this.isError(res))
            throw new Error(res.error);
        return res;
    }
    /** Decodes the track */
    async decodeTrack(base64, trace = false) {
        const res = await this.get(`/decodetrack?encodedTrack=${base64}?trace=${trace}`);
        if (this.isError(res))
            throw new Error(res.error);
        return res;
    }
    /** Decode multiple tracks */
    async decodeTracks(trackData, trace = false) {
        const res = await this.post(`/decodetracks?trace=${trace}`, JSON.stringify(trackData));
        if (this.isError(res))
            throw new Error(res.error);
        return res;
    }
    /** Get lavalink info */
    async getInfo(trace = false) {
        const res = await this.get(`/info?trace=${trace}`);
        if (this.isError(res))
            throw new Error(res.error);
        return res;
    }
    /** Get lavalink stats */
    async getStats(trace = false) {
        const res = await this.get(`/stats?trace=${trace}`);
        if (this.isError(res))
            throw new Error(res.error);
        return res;
    }
    /** Get lavalink version */
    async getVersion() {
        const res = await this.request("GET", "/version", null, true);
        return res;
    }
}
exports.CosmiREST = CosmiREST;
