"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmiTrack = void 0;
class CosmiTrack {
    /** The duration of the track. */
    duration;
    /** The requester ID of the track. */
    requesterId;
    /** The encoded track. */
    encoded;
    /** The track identifier. */
    identifier;
    /** Whether the track is seekable. */
    isSeekable;
    /** The author of the track. */
    author;
    /** The length of the track. */
    length;
    /** Whether the track is a stream or not. */
    isStream;
    /** The position of the track. */
    position;
    /** The title of the track. */
    title;
    /** The source name of the track. */
    sourceName;
    /** The uri of the track. */
    uri;
    /** The thumbnail of the track. */
    get thumbnail() {
        return `https://img.youtube.com/vi/${this.identifier}/mqdefault.jpg`;
    }
    /** Creates a new track. */
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
    /** Returns the thumbnail of the track. */
    displayThumbnail(size = "default") {
        return `https://img.youtube.com/vi/${this.identifier}/${size}.jpg`;
    }
}
exports.CosmiTrack = CosmiTrack;
