"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmiQueue = void 0;
class CosmiQueue extends Array {
    /** The current track. */
    current;
    /** The previous track. */
    previous;
    /** The duration of the queue. */
    duration() {
        return this.reduce((acc, cur) => acc + cur.duration, this.current?.duration || 0);
    }
    /** Clears the queue. */
    clear() {
        this.length = 0;
    }
    /** Shuffles the queue. */
    shuffle() {
        this.sort(() => Math.random() - 0.5);
    }
    /** Adds a track to the queue. */
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
    /** Removes the track at the specified position or the tracks in the specified range. */
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
