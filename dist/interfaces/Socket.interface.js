"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackEndReason = exports.TrackExceptionSeverity = void 0;
var TrackExceptionSeverity;
(function (TrackExceptionSeverity) {
    TrackExceptionSeverity["Common"] = "COMMON";
    TrackExceptionSeverity["Suspected"] = "SUSPICIOUS";
    TrackExceptionSeverity["Fault"] = "FAULT";
})(TrackExceptionSeverity || (exports.TrackExceptionSeverity = TrackExceptionSeverity = {}));
var TrackEndReason;
(function (TrackEndReason) {
    TrackEndReason["Finished"] = "FINISHED";
    TrackEndReason["LoadFailed"] = "LOAD_FAILED";
    TrackEndReason["Stopped"] = "STOPPED";
    TrackEndReason["Replaced"] = "REPLACED";
    TrackEndReason["Cleanup"] = "CLEANUP";
})(TrackEndReason || (exports.TrackEndReason = TrackEndReason = {}));
