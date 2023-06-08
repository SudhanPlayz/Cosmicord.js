import { RestTrack } from "../interfaces";

export class CosmiTrack {
  /** The duration of the track. */
  public duration: number;

  /** The requester ID of the track. */
  public requesterId?: string;

  /** The encoded track. */
  public encoded?: string;

  /** The track identifier. */
  public identifier: string;

  /** Whether the track is seekable. */
  public isSeekable: boolean;

  /** The author of the track. */
  public author: string;

  /** The length of the track. */
  public length: number;

  /** Whether the track is a stream or not. */
  public isStream: boolean;

  /** The position of the track. */
  public position: number;

  /** The title of the track. */
  public title: string;

  /** The source name of the track. */
  public sourceName: string;

  /** The uri of the track. */
  public uri?: string;

  /** The thumbnail of the track. */
  public get thumbnail(): string {
    return `https://img.youtube.com/vi/${this.identifier}/mqdefault.jpg`;
  }

  /** Creates a new track. */
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

  /** Returns the thumbnail of the track. */
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
