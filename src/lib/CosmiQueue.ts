import { CosmiTrack } from "./CosmiTrack";

export class CosmiQueue extends Array<CosmiTrack> {
  /**
   * The current track.
   * @type {CosmiTrack}
   */
  public current?: CosmiTrack;

  /**
   * The previous track.
   * @type {CosmiTrack}
   */
  public previous?: CosmiTrack;

  /**
   * The duration of the queue.
   * @returns {number}
   */
  public duration() {
    return this.reduce(
      (acc, cur) => acc + cur.duration,
      this.current?.duration || 0
    );
  }

  /**
   * Clears the queue.
   * @returns {void}
   */
  public clear() {
    this.length = 0;
  }

  /**
   * Shuffles the queue.
   * @returns {void}
   */
  public shuffle() {
    this.sort(() => Math.random() - 0.5);
  }

  /**
   * Adds a track (or multiple tracks) to the queue.
   * @param {CosmiTrack | CosmiTrack[]} tracks - The track(s) to add.
   * @returns {CosmiQueue}
   */
  public add(tracks: CosmiTrack | CosmiTrack[]) {
    if (!this.current) {
      if (Array.isArray(tracks)) {
        this.current = tracks[0];
        tracks.shift();
        this.push(...tracks);
      } else {
        this.current = tracks;
      }

      return this;
    }

    if (Array.isArray(tracks)) {
      this.push(...tracks);
    } else {
      this.push(tracks);
    }
  }

  /**
   * Removes a track
   * @param {number} position - The position of the track to remove.
   * @returns {CosmiTrack}
   */
  public remove(position: number): CosmiTrack;

  /**
   * Removes a range of tracks.
   * @param {number} start - The start position.
   * @param {number} end - The end position.
   * @returns {CosmiTrack[]}
   */
  public remove(start: number, end: number): CosmiTrack[];

  /**
   * Removes a track or a range of tracks.
   * @param {number} startOrPosition - The start position or the position of the track to remove.
   * @param {number} [end] - The end position.
   * @returns {CosmiTrack | CosmiTrack[]}
   */
  public remove(
    startOrPosition: number,
    end?: number
  ): CosmiTrack | CosmiTrack[] {
    if (
      startOrPosition !== null &&
      (startOrPosition < 0 || startOrPosition >= this.length)
    )
      throw new RangeError(
        "Start/Position must be a number between 0 and the queue length."
      );

    if (end !== null && (end < 0 || end > this.length))
      throw new RangeError(
        "End must be a number between 0 and the queue length."
      );

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
