export type RestResult<T> = T | RestError;
export declare enum SearchFrom {
    YouTube = "ytsearch:",
    SoundCloud = "scsearch:",
    YouTubeMusic = "ytmsearch:"
}
export interface RestError {
    /**
     * The timestamp of the error (in milliseconds since the epoch)
     */
    timestamp: number;
    /**
     * The HTTP status code
     */
    status: number;
    /**
     * The HTTP status code message
     */
    error: string;
    /**
     * The error message
     */
    message: string;
    /**
     * The stack trace of the error when trace=true as query param has been sent
     */
    trace?: string;
}
export declare enum RestSeverity {
    /**
     * The cause is known and expected, indicates that there is nothing wrong with the library itself
     */
    Common = "COMMON",
    /**
     * The cause might not be exactly known, but is possibly caused by outside factors. For example when an outside service responds in a format that we do not expect
     */
    Suspicous = "SUSPICIOUS",
    /**
     * If the probable cause is an issue with the library or when there is no way to tell what the cause might be. This is the default level and other levels are used in cases where the thrower has more in-depth knowledge about the error
     */
    Fault = "FAULT"
}
export interface RestException {
    /**
     * The severity of the exception
     */
    severity: RestSeverity;
    /**
     * The cause of the exception
     */
    cause: string;
    /**
     * The message of the exception
     */
    message?: string;
}
export interface RestLavalinkStats {
    /** The amount of players on the node. */
    players: number;
    /** The amount of playing players on the node. */
    playingPlayers: number;
    /** The uptime of the node. */
    uptime: number;
    /** The memory stats of the node. */
    memory: {
        /** The free memory of the node. */
        free: number;
        /** The used memory of the node. */
        used: number;
        /** The allocated memory of the node. */
        allocated: number;
        /** The reservable memory of the node. */
        reservable: number;
    };
    /** The cpu stats of the node. */
    cpu: {
        /** The amount of cores the node has. */
        cores: number;
        /** The system load of the node. */
        systemLoad: number;
        /** The lavalink load of the node. */
        lavalinkLoad: number;
    };
    /** The frame stats of the node. */
    frameStats?: {
        /** The amount of frames sent to Discord. */
        sent: number;
        /** The amount of frames that were nulled. */
        nulled: number;
        /** The amount of frames that were deficit. */
        deficit: number;
    };
}
export interface RestSessionInfo {
    /**
     * Resume key to use when reconnecting
     */
    resumeKey?: string;
    /**
     * The timeout in seconds (default is 60s)
     */
    timeout: number;
}
export interface RestVersion {
    /**
     * The semver version of the library
     */
    semver: string;
    /**
     * The major version of the library
     */
    major: number;
    /**
     * The minor version of the library
     */
    minor: number;
    /**
     * The patch version of the library
     */
    patch: number;
    /**
     * The pre-release version of the library
     */
    preRelease?: string;
}
export interface RestGit {
    /**
     * The branch of the library
     */
    branch: string;
    /**
     * The commit hash of the library
     */
    commit: string;
    /**
     * The commit time of the library
     */
    commitTime: number;
}
export interface RestPlugin {
    /**
     * The name of the plugin
     */
    name: string;
    /**
     * The version of the plugin
     */
    version: string;
}
export interface RestInfo {
    /**
     * The version of the library
     */
    version: RestVersion;
    /**
     * The build time
     */
    buildTime: string;
    /**
     * The git info
     */
    git: RestGit;
    /**
     * The JVM version
     */
    jvm: string;
    /**
     * The Lavaplayer version being used by this server
     */
    lavaplayer: string;
    /**
     * Source managers being used by this server
     */
    sourceManagers: string[];
    /**
     * Filters being used by this server
     */
    filters: string[];
    /**
     * The plugins being used by this server
     */
    plugins: RestPlugin[];
}
export declare enum RestLoadResultType {
    TrackLoaded = "TRACK_LOADED",
    PlaylistLoaded = "PLAYLIST_LOADED",
    SearchResults = "SEARCH_RESULT",
    NoMatches = "NO_MATCHES",
    LoadFailed = "LOAD_FAILED"
}
export interface RestPlaylistInfo {
    /**
     * Name of the loaded playlist
     */
    name?: string;
    /**
     * The selected track index
     */
    selectedTrack?: number;
}
export interface RestTrackLoadResult {
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
    tracks: RestTrack[];
    /**
     * The exception message if load failed
     */
    exception?: string;
}
export interface RestPlayer {
    /**
     * The guild id of the player
     */
    guildId: string;
    /**
     * Volume of the player
     */
    volume: number;
    /**
     * Whether the player is paused
     */
    paused: boolean;
    /**
     * The voice state of the player
     */
    voiceState: RestVoiceState;
    /**
     * The filters used by the player
     */
    filters: Filters;
    /**
     * The track currently playing
     */
    track?: RestTrack;
}
export interface RestPlayerUpdate {
    /**
     * The encoded track data base64 to play
     */
    encodedTrack?: string;
    /**
     * identifier of the track to play
     */
    identifier?: string;
    /**
     * Track position in milliseconds
     */
    position?: number;
    /**
     * The end time of the track in milliseconds
     */
    endTime?: number;
    /**
     * Volume of the player
     */
    volume?: number;
    /**
     * Whether the player is paused
     */
    paused?: boolean;
    /**
     * The filters used by the player
     */
    filters?: Filters;
    /**
     * The rest voice state of the player
     */
    voiceState?: RestVoiceState;
}
export interface RestVoiceState {
    /**
     * The Discord voice token to authenticate with
     */
    token: string;
    /**
     * The Discord voice endpoint to connect to
     */
    endpoint: string;
    /**
     * The Discord voice session id to authenticate with
     */
    sessionId: string;
    /**
     * Whether the player is connected. Response only
     */
    connected?: boolean;
    /**
     * Roundtrip latency in milliseconds to the voice gateway (-1 if not connected). Response only
     */
    ping?: number;
}
/** The track object from rest */
export interface RestTrack {
    /** The base64 encoded track data */
    encoded: string;
    /** Info about the track */
    info: RestTrackInfo;
    /** The base64 encoded track data (DEPRECATED as of v3.7.0 and marked for removal in v4) */
    track?: string;
}
/**
 * The rest track info object
 */
export interface RestTrackInfo {
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
/**
 * Rest track decoding object
 */
export interface RestTrackDecode {
    /**
     * The track object
     */
    track: RestTrack;
    /**
     * The track info object
     */
    info: RestTrackInfo;
}
/** The equalizer filter object */
export interface Equalizer {
    /** Set the band (0 - 14) */
    bands?: number;
    /** Set the gain (-0.25 - 1.0) */
    gain?: number;
}
/** The karaoke filter object */
export interface Karaoke {
    /** Set the level between 0.0 - 1.0 (0.0 - no effect, 1.0 - full effecr) */
    level?: number;
    /** Set the mono level between 0.0 - 1.0 (0.0 - no effect, 1.0 - full effect) */
    monoLevel?: number;
    /** Set the filter band */
    filterBand?: number;
    /** Set the filter width */
    filterWidth?: number;
}
/** The timescale filter object */
export interface Timescale {
    /** Set the speed (0.0 ≤ x) */
    speed?: number;
    /** Set the pitch (0.0 ≤ x) */
    pitch?: number;
    /** Set the rate (0.0 ≤ x) */
    rate?: number;
}
/** The tremolo filter object */
export interface Tremolo {
    /** Set the frequency (0.0 < x) */
    frequency?: number;
    /** Set the depth (0.0 ≤ x ≤ 1.0) */
    depth?: number;
}
/** The vibrato filter object */
export interface Vibrato {
    /** Set the frequency (0.0 < x ≤ 14.0) */
    frequency?: number;
    /** Set the depth (0.0 ≤ x ≤ 1.0) */
    depth?: number;
}
/** The rotation filter object */
export interface Rotation {
    /** The frequency of the audio rotating around the listener */
    rotationHz?: number;
}
/** The distortion filter object */
export interface Distortion {
    /** Set the sin offset */
    sinOffset?: number;
    /** Set the sin scale */
    sinScale?: number;
    /** Set the cos offset */
    cosOffset?: number;
    /** Set the cos scale */
    cosScale?: number;
    /** Set the tan offset */
    tanOffset?: number;
    /** Set the tan scale */
    tanScale?: number;
    /** Set the offset */
    offset?: number;
    /** Set the scale */
    scale?: number;
}
/** The channel mix filter object */
export interface ChannelMix {
    /** The left to left channel mix factor (0.0 ≤ x ≤ 1.0) */
    leftToLeft?: number;
    /** The left to right channel mix factor (0.0 ≤ x ≤ 1.0) */
    leftToRight?: number;
    /** The right to left channel mix factor (0.0 ≤ x ≤ 1.0) */
    rightToLeft?: number;
    /** The right to right channel mix factor (0.0 ≤ x ≤ 1.0) */
    rightToRight?: number;
}
/** The low pass filter object */
export interface LowPass {
    /** The smoothing factor (1.0 < x) */
    smoothing?: number;
}
/** The filters */
export interface Filters {
    /** Adjust the volume of the player from 0.0 to 5.0 (Values > 1.0 may cause clipping) */
    volume?: number;
    /** The equalizer filter */
    equalizer?: Equalizer[];
    /** The karaoke filter */
    karaoke?: Karaoke;
    /** The timescale filter */
    timescale?: Timescale;
    /** The tremolo filter */
    tremolo?: Tremolo;
    /** The vibrato filter */
    vibrato?: Vibrato;
    /** The rotation filter */
    rotation?: Rotation;
    /** The distortion filter */
    distortion?: Distortion;
    /** The channel mix filter */
    channelMix?: ChannelMix;
    /** The low pass filter */
    lowPass?: LowPass;
}
