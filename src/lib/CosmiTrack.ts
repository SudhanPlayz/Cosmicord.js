import { RestTrack } from "../interfaces";

export class CosmiTrack {
  /**
   * The track duration in milliseconds
   * @type {number}
   */
  public duration: number;

  /**
   * The requester ID
   * @type {string}
   */
  public requesterId?: string;

  /**
   * The encoded track
   * @type {string}
   */
  public encoded?: string;

  /**
   * The track identifier
   * @type {string}
   */
  public identifier: string;

  /**
   * Whether the track is seekable or not
   * @type {boolean}
   */
  public isSeekable: boolean;

  /**
   * The track author
   * @type {string}
   */
  public author: string;

  /**
   * The track length
   * @type {number}
   */
  public length: number;

  /**
   * Whether the track is a stream or not
   * @type {boolean}
   */
  public isStream: boolean;

  /**
   * The track position
   * @type {number}
   */
  public position: number;

  /**
   * The track title
   * @type {string}
   */
  public title: string;

  /**
   * The track source name
   * @type {string}
   */
  public sourceName: string;

  /**
   * The track uri
   * @type {string}
   */
  public uri?: string;

  /**
   * The track thumbnail
   * @returns {string}
   */
  public get thumbnail(): string {
    return `https://img.youtube.com/vi/${this.identifier}/mqdefault.jpg`;
  }

  constructor(data: RestTrack, requesterId?: string) {
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
  public displayThumbnail(
    size:
      | "default"
      | "mqdefault"
      | "hqdefault"
      | "sddefault"
      | "maxresdefault" = "default"
  ) {
    return `https://img.youtube.com/vi/${this.identifier}/${size}.jpg`;
  }
}
