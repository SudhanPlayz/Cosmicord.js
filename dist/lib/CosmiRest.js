"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmiREST = void 0;
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
class CosmiREST {
    /**
     * The base URL of the REST API
     * @type {string}
     */
    baseURL;
    /**
     * The lavalink node
     * @type {CosmiNode}
     */
    node;
    /**
     * The timeout for requests
     * @type {number}
     */
    timeout;
    /**
     * Creates a new RestAPI instance
     * @param {CosmiNode} node - The cosminode
     * @param {string} baseURL - The base URL of the REST API
     * @param {number} timeout - The timeout for requests
     */
    constructor(node, baseURL, timeout) {
        this.node = node;
        this.baseURL = baseURL;
        this.timeout = timeout;
    }
    /**
     * Sets the base URL of the REST API
     * @param {string} baseURL - The base URL of the REST API
     * @returns {void}
     */
    setBaseURL(baseURL) {
        this.baseURL = baseURL;
    }
    /**
     * Sends a GET request to the REST API
     * @param {string} endpoint - The endpoint to send the request to
     * @returns {any} The response
     */
    async get(endpoint) {
        return this.request("GET", endpoint);
    }
    /**
     * Sends a POST request to the REST API
     * @param {string} endpoint - The endpoint to send the request to
     * @param {BodyInit} body - The body to send
     * @returns {any} The response
     */
    async post(endpoint, body) {
        return this.request("POST", endpoint, body);
    }
    /**
     * Sends a PUT request to the REST API
     * @param {string} endpoint - The endpoint to send the request to
     * @param {BodyInit} body - The body to send
     * @returns {any} The response
     */
    async put(endpoint, body) {
        return this.request("PUT", endpoint, body);
    }
    /**
     * Sends a DELETE request to the REST API
     * @param {string} endpoint - The endpoint to send the request to
     * @returns {any} The response
     */
    async delete(endpoint) {
        return this.request("DELETE", endpoint);
    }
    /**
     * Sends a PATCH request to the REST API
     * @param {string} endpoint - The endpoint to send the request to
     * @param {BodyInit} body - The body to send
     * @returns {any} The response
     */
    async patch(endpoint, body) {
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
    /**
     * Checks if the response is an error
     * @param {any} res - The response
     * @returns {boolean} Whether the response is an error
     */
    isError(res) {
        return "error" in res;
    }
    /**
     * Get all the players from a session
     * @param {string} sessionId - The session to get the players from
     * @param {boolean} trace - Whether to include the trace
     * @returns {RestPlayer[]} The players
     */
    async getPlayersFromSession(sessionId, trace = false) {
        const res = await this.get(`/sessions/${sessionId}/players?trace=${trace}`);
        if (this.isError(res))
            throw new Error(res.error);
        return res;
    }
    /**
     * Returns the player for this guild in this session.
     * @param {string} sessionId - The session to get the player from
     * @param {string} guildId - The guild id of the player
     * @param {boolean} trace - Whether to include the trace
     * @returns {RestPlayer} The player
     */
    async getPlayer(sessionId, guildId, trace = false) {
        const res = await this.get(`/sessions/${sessionId}/player/${guildId}?trace=${trace}`);
        if (this.isError(res))
            throw new Error(res.error);
        return res;
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
    async updatePlayer(sessionId, guildId, options, noReplace = false, trace = false) {
        const res = await this.patch(`/sessions/${sessionId}/player/${guildId}?noReplace=${noReplace}?trace=${trace}`, JSON.stringify(options));
        if (this.isError(res))
            throw new Error(res.error);
        return res;
    }
    /**
     * Deletes the player for this guild.
     * @param {string} sessionId - The session to delete the player from
     * @param {string} guildId - The guild id of the player
     * @param {boolean} trace - Whether to include the trace
     * @returns {void}
     */
    async deletePlayer(sessionId, guildId, trace = false) {
        const res = await this.delete(`/sessions/${sessionId}/player/${guildId}?trace=${trace}`);
        if (this.isError(res))
            throw new Error(res.error);
    }
    /**
     * Updates the session with a resuming key and timeout.
     * @param {string} sessionId - The session to update
     * @param {string} resumingKey - The resuming key
     * @param {number} timeout - The timeout
     * @param {boolean} trace - Whether to include the trace
     * @returns {RestSessionInfo} The session info
     */
    async updateSession(sessionId, resumingKey, timeout, trace = false) {
        const res = await this.patch(`/sessions/${sessionId}?trace=${trace}`, JSON.stringify({ resumingKey, timeout }));
        if (this.isError(res))
            throw new Error(res.error);
        return res;
    }
    /**
     * Loads a track
     * @param {string} identifier - The track identifier
     * @returns {RestTrackLoadResult} The track load result
     */
    async loadTracks(identifier) {
        const res = await this.get(`/loadtracks?identifier=${identifier}`);
        if (this.isError(res))
            throw new Error(res.error);
        return res;
    }
    /**
     * Decode a single track into its info, where BASE64 is the encoded base64 data.
     * @param {string} base64 - The base64 data
     * @param {boolean} trace - Whether to include the trace
     * @returns {RestTrackDecode} The decoded track
     */
    async decodeTrack(base64, trace = false) {
        const res = await this.get(`/decodetrack?encodedTrack=${base64}?trace=${trace}`);
        if (this.isError(res))
            throw new Error(res.error);
        return res;
    }
    /**
     * Decode multiple tracks
     * @param {string[]} trackData - The track data
     * @param {boolean} trace - Whether to include the trace
     * @returns {RestTrack[]} The decoded tracks
     */
    async decodeTracks(trackData, trace = false) {
        const res = await this.post(`/decodetracks?trace=${trace}`, JSON.stringify(trackData));
        if (this.isError(res))
            throw new Error(res.error);
        return res;
    }
    /**
     * Get lavalink info
     * @param {boolean} trace - Whether to include the trace
     * @returns {RestInfo} The info
     */
    async getInfo(trace = false) {
        const res = await this.get(`/info?trace=${trace}`);
        if (this.isError(res))
            throw new Error(res.error);
        return res;
    }
    /**
     * Get lavalink stats
     * @param {boolean} trace - Whether to include the trace
     * @returns {RestLavalinkStats} The stats
     */
    async getStats(trace = false) {
        const res = await this.get(`/stats?trace=${trace}`);
        if (this.isError(res))
            throw new Error(res.error);
        return res;
    }
    /**
     * Get lavalink version
     * @returns {string} The version
     */
    async getVersion() {
        const res = await this.request("GET", "/version", null, true);
        return res;
    }
}
exports.CosmiREST = CosmiREST;
