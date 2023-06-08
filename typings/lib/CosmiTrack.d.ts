import { RestTrack } from "../interfaces";
export declare class CosmiTrack {
    /** The duration of the track. */
    duration: number;
    /** The requester ID of the track. */
    requesterId?: string;
    /** The encoded track. */
    encoded?: string;
    /** The track identifier. */
    identifier: string;
    /** Whether the track is seekable. */
    isSeekable: boolean;
    /** The author of the track. */
    author: string;
    /** The length of the track. */
    length: number;
    /** Whether the track is a stream or not. */
    isStream: boolean;
    /** The position of the track. */
    position: number;
    /** The title of the track. */
    title: string;
    /** The source name of the track. */
    sourceName: string;
    /** The uri of the track. */
    uri?: string;
    /** The thumbnail of the track. */
    get thumbnail(): string;
    /** Creates a new track. */
    constructor(data: RestTrack, requesterId?: string);
    /** Returns the thumbnail of the track. */
    displayThumbnail(size?: "default" | "mqdefault" | "hqdefault" | "sddefault" | "maxresdefault"): string;
}
