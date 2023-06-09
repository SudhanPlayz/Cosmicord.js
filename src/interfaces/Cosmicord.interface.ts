import { CosmiNode, CosmiPlayer, CosmiTrack } from "../lib";
import {
  CosmiNodeOptions,
  NodeStats,
  RestLoadResultType,
  RestPlaylistInfo,
  SearchFrom,
  TrackStuckEventPayload,
} from "./";

export interface CosmiEvents {
  debug: [string];
  payload: [any];

  nodeConnected: [CosmiNode];
  nodeDestroyed: [CosmiNode];
  nodeStats: [CosmiNode, NodeStats];
  nodeError: [CosmiNode, Error];

  playerCreated: [CosmiNode, CosmiPlayer];
  playerDestoryed: [CosmiNode, CosmiPlayer];
  playerMoved: [CosmiNode, CosmiPlayer, string, string];

  trackStart: [CosmiPlayer, CosmiTrack];
  trackEnd: [CosmiPlayer, CosmiTrack, string];
  trackError: [CosmiPlayer, Error];
  trackStruck: [CosmiPlayer, TrackStuckEventPayload];

  queueEnd: [CosmiPlayer];
}

export interface VoiceState {
  op: "voiceUpdate";
  guildId: string;
  event: VoiceServer;
  sessionId?: string;
}

export interface VoiceServer {
  token: string;
  guild_id: string;
  endpoint: string;
}

export interface VoiceState {
  guild_id: string;
  user_id: string;
  session_id: string;
  channel_id: string;
}

export interface VoicePacket {
  t?: "VOICE_SERVER_UPDATE" | "VOICE_STATE_UPDATE";
  d: VoiceState | VoiceServer;
}

export interface DiscordVoicePayload {
  op: number;
  d: {
    guild_id: string;
    channel_id: string | null;
    self_mute: boolean;
    self_deaf: boolean;
  };
}

export interface CosmiOptions {
  /**
   * Sends voice packets to discord.
   * @param id The id of the guild.
   * @param payload The payload to send.
   */
  send: (id: string, payload: DiscordVoicePayload) => void;

  /**
   * The nodes to use.
   * You can also use the `createNode` method to create a node.
   */
  nodes?: CosmiNodeOptions[];

  /**
   * The discord client id.
   */
  clientId?: string;
}

export interface CosmiSearchQuery {
  /**
   * The query to search for.
   */
  query: string;

  /**
   * The source to search from.
   */
  source?: SearchFrom;
}

export interface CosmiLoadedTracks {
  /**
   * The load type
   */
  loadType: RestLoadResultType;

  /**
   * The playlist info
   */
  playlistInfo?: RestPlaylistInfo;

  /**
   * The tracks loaded
   */
  tracks: CosmiTrack[];

  /**
   * The exception message if load failed
   */
  exception?: string;
}
