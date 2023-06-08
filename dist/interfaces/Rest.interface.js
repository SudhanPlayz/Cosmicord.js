"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestLoadResultType = exports.RestSeverity = exports.SearchFrom = void 0;
var SearchFrom;
(function (SearchFrom) {
    SearchFrom["YouTube"] = "ytsearch:";
    SearchFrom["SoundCloud"] = "scsearch:";
    SearchFrom["YouTubeMusic"] = "ytmsearch:";
})(SearchFrom = exports.SearchFrom || (exports.SearchFrom = {}));
var RestSeverity;
(function (RestSeverity) {
    /**
     * The cause is known and expected, indicates that there is nothing wrong with the library itself
     */
    RestSeverity["Common"] = "COMMON";
    /**
     * The cause might not be exactly known, but is possibly caused by outside factors. For example when an outside service responds in a format that we do not expect
     */
    RestSeverity["Suspicous"] = "SUSPICIOUS";
    /**
     * If the probable cause is an issue with the library or when there is no way to tell what the cause might be. This is the default level and other levels are used in cases where the thrower has more in-depth knowledge about the error
     */
    RestSeverity["Fault"] = "FAULT";
})(RestSeverity = exports.RestSeverity || (exports.RestSeverity = {}));
var RestLoadResultType;
(function (RestLoadResultType) {
    RestLoadResultType["TrackLoaded"] = "TRACK_LOADED";
    RestLoadResultType["PlaylistLoaded"] = "PLAYLIST_LOADED";
    RestLoadResultType["SearchResults"] = "SEARCH_RESULT";
    RestLoadResultType["NoMatches"] = "NO_MATCHES";
    RestLoadResultType["LoadFailed"] = "LOAD_FAILED";
})(RestLoadResultType = exports.RestLoadResultType || (exports.RestLoadResultType = {}));
