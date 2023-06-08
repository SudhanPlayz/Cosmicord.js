import { RestTrack } from "../interfaces";
export declare class CosmiTrack {
    /**
     * The track duration in milliseconds
     * @type {number}
     */
    duration: number;
    /**
     * The requester ID
     * @type {string}
     */
    requesterId?: string;
    /**
     * The encoded track
     * @type {string}
     */
    encoded?: string;
    /**
     * The track identifier
     * @type {string}
     */
    identifier: string;
    /**
     * Whether the track is seekable or not
     * @type {boolean}
     */
    isSeekable: boolean;
    /**
     * The track author
     * @type {string}
     */
    author: string;
    /**
     * The track length
     * @type {number}
     */
    length: number;
    /**
     * Whether the track is a stream or not
     * @type {boolean}
     */
    isStream: boolean;
    /**
     * The track position
     * @type {number}
     */
    position: number;
    /**
     * The track title
     * @type {string}
     */
    title: string;
    /**
     * The track source name
     * @type {string}
     */
    sourceName: string;
    /**
     * The track uri
     * @type {string}
     */
    uri?: string;
    /**
     * The track thumbnail
     * @returns {string}
     */
    get thumbnail(): string;
    constructor(data: RestTrack, requesterId?: string);
    /**
     * Displays the thumbnail of the track.
     * @param {"default" | "mqdefault" | "hqdefault" | "sddefault" | "maxresdefault"} size - The size of the thumbnail.
     * @returns {string}
     */
    displayThumbnail(size?: "default" | "mqdefault" | "hqdefault" | "sddefault" | "maxresdefault"): string;
}
