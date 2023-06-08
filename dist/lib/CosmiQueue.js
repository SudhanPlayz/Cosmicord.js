"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmiQueue = void 0;
class CosmiQueue extends Array {
    /**
     * The current track.
     * @type {CosmiTrack}
     */
    current;
    /**
     * The previous track.
     * @type {CosmiTrack}
     */
    previous;
    /**
     * The duration of the queue.
     * @returns {number}
     */
    duration() {
        return this.reduce((acc, cur) => acc + cur.duration, this.current?.duration || 0);
    }
    /**
     * Clears the queue.
     * @returns {void}
     */
    clear() {
        this.length = 0;
    }
    /**
     * Shuffles the queue.
     * @returns {void}
     */
    shuffle() {
        this.sort(() => Math.random() - 0.5);
    }
    /**
     * Adds a track (or multiple tracks) to the queue.
     * @param {CosmiTrack | CosmiTrack[]} tracks - The track(s) to add.
     * @returns {CosmiQueue}
     */
    add(tracks) {
        if (!this.current) {
            if (Array.isArray(tracks)) {
                this.current = tracks[0];
                tracks.shift();
                this.push(...tracks);
            }
            else {
                this.current = tracks;
            }
            return this;
        }
        if (Array.isArray(tracks)) {
            this.push(...tracks);
        }
        else {
            this.push(tracks);
        }
    }
    /**
     * Removes a track or a range of tracks.
     * @param {number} startOrPosition - The start position or the position of the track to remove.
     * @param {number} [end] - The end position.
     * @returns {CosmiTrack | CosmiTrack[]}
     */
    remove(startOrPosition, end) {
        if (startOrPosition !== null &&
            (startOrPosition < 0 || startOrPosition >= this.length))
            throw new RangeError("Start/Position must be a number between 0 and the queue length.");
        if (end !== null && (end < 0 || end > this.length))
            throw new RangeError("End must be a number between 0 and the queue length.");
        if (end === null) {
            const track = this[startOrPosition];
            this.splice(startOrPosition, 1);
            return track;
        }
        const tracks = this.slice(startOrPosition, end);
        this.splice(startOrPosition, end - startOrPosition);
        return tracks;
    }
}
exports.CosmiQueue = CosmiQueue;
