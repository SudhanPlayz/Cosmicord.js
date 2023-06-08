import { CosmiTrack } from "./CosmiTrack";
export declare class CosmiQueue extends Array<CosmiTrack> {
    /** The current track. */
    current?: CosmiTrack;
    /** The previous track. */
    previous?: CosmiTrack;
    /** The duration of the queue. */
    duration(): number;
    /** Clears the queue. */
    clear(): void;
    /** Shuffles the queue. */
    shuffle(): void;
    /** Adds a track to the queue. */
    add(tracks: CosmiTrack | CosmiTrack[]): this;
    /** Removes the track at the specified position. */
    remove(position: number): CosmiTrack;
    /** Removes the tracks in the specified range. */
    remove(start: number, end: number): CosmiTrack[];
}
