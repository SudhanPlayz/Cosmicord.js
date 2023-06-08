import { CosmiTrack } from "./CosmiTrack";
export declare class CosmiQueue extends Array<CosmiTrack> {
    /**
     * The current track.
     * @type {CosmiTrack}
     */
    current?: CosmiTrack;
    /**
     * The previous track.
     * @type {CosmiTrack}
     */
    previous?: CosmiTrack;
    /**
     * The duration of the queue.
     * @returns {number}
     */
    duration(): number;
    /**
     * Clears the queue.
     * @returns {void}
     */
    clear(): void;
    /**
     * Shuffles the queue.
     * @returns {void}
     */
    shuffle(): void;
    /**
     * Adds a track (or multiple tracks) to the queue.
     * @param {CosmiTrack | CosmiTrack[]} tracks - The track(s) to add.
     * @returns {CosmiQueue}
     */
    add(tracks: CosmiTrack | CosmiTrack[]): this;
    /**
     * Removes a track
     * @param {number} position - The position of the track to remove.
     * @returns {CosmiTrack}
     */
    remove(position: number): CosmiTrack;
    /**
     * Removes a range of tracks.
     * @param {number} start - The start position.
     * @param {number} end - The end position.
     * @returns {CosmiTrack[]}
     */
    remove(start: number, end: number): CosmiTrack[];
}
