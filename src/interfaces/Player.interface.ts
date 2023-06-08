import { Filters } from ".";

export interface CosmiPlayerOptions {
  /** The guild id of the player */
  guildId: string;

  /** The text channel id of the player */
  textChannel: string;

  /** The voice channel id of the player */
  voiceChannel: string;

  /** The volume of the player, range 0-1000, in percentage */
  volume?: number;

  /** If the player should mute itself. */
  selfMute?: boolean;
  
  /** If the player should deaf itself. */
  selfDeafen?: boolean;

  /** The filters used by the player */
  filters?: Filters;
}

export enum PlayerState {
  Connected = "CONNECTED",
  Connecting = "CONNECTING",
  Disconnected = "DISCONNECTED",
  Disconnecting = "DISCONNECTING",
  Destroying = "DESTROYING",
  Destroyed = "DESTROYED",
}

/** The options for the track */
export interface TrackOptions {
  /** The track identifier */
  identifier: string;

  /** Whether the track is seekable */
  isSeekable: boolean;

  /** The track author */
  author: string;

  /** The track length in milliseconds */
  length: number;

  /** Whether the track is a stream */
  isStream: boolean;

  /** The track position in milliseconds */
  position: number;

  /** The track title */
  title: string;

  /** The track source name */
  sourceName: string;

  /** The track uri */
  uri?: string;
}
