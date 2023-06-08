"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmiTrack = void 0;
class CosmiTrack {
    /**
     * The track duration in milliseconds
     * @type {number}
     */
    duration;
    /**
     * The requester ID
     * @type {string}
     */
    requesterId;
    /**
     * The encoded track
     * @type {string}
     */
    encoded;
    /**
     * The track identifier
     * @type {string}
     */
    identifier;
    /**
     * Whether the track is seekable or not
     * @type {boolean}
     */
    isSeekable;
    /**
     * The track author
     * @type {string}
     */
    author;
    /**
     * The track length
     * @type {number}
     */
    length;
    /**
     * Whether the track is a stream or not
     * @type {boolean}
     */
    isStream;
    /**
     * The track position
     * @type {number}
     */
    position;
    /**
     * The track title
     * @type {string}
     */
    title;
    /**
     * The track source name
     * @type {string}
     */
    sourceName;
    /**
     * The track uri
     * @type {string}
     */
    uri;
    /**
     * The track thumbnail
     * @returns {string}
     */
    get thumbnail() {
        return `https://img.youtube.com/vi/${this.identifier}/mqdefault.jpg`;
    }
    constructor(data, requesterId) {
        this.duration = data.info.length;
        this.encoded = data.encoded;
        this.identifier = data.info.identifier;
        this.isSeekable = data.info.isSeekable;
        this.author = data.info.author;
        this.length = data.info.length;
        this.isStream = data.info.isStream;
        this.position = data.info.position;
        this.title = data.info.title;
        this.sourceName = data.info.sourceName;
        this.uri = data.info.uri;
        this.requesterId = requesterId;
    }
    /**
     * Displays the thumbnail of the track.
     * @param {"default" | "mqdefault" | "hqdefault" | "sddefault" | "maxresdefault"} size - The size of the thumbnail.
     * @returns {string}
     */
    displayThumbnail(size = "default") {
        return `https://img.youtube.com/vi/${this.identifier}/${size}.jpg`;
    }
}
exports.CosmiTrack = CosmiTrack;
