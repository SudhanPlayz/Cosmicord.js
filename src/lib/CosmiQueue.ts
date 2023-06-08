import { CosmiTrack } from "./CosmiTrack";

export class CosmiQueue extends Array<CosmiTrack> {
  /** The current track. */
  public current?: CosmiTrack;

  /** The previous track. */
  public previous?: CosmiTrack;

  /** The duration of the queue. */
  public duration() {
    return this.reduce(
      (acc, cur) => acc + cur.duration,
      this.current?.duration || 0
    );
  }

  /** Clears the queue. */
  public clear() {
    this.length = 0;
  }

  /** Shuffles the queue. */
  public shuffle() {
    this.sort(() => Math.random() - 0.5);
  }

  /** Adds a track to the queue. */
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

  /** Removes the track at the specified position. */
  public remove(position: number): CosmiTrack;

  /** Removes the tracks in the specified range. */
  public remove(start: number, end: number): CosmiTrack[];

  /** Removes the track at the specified position or the tracks in the specified range. */
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
