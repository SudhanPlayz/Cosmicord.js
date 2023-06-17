"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VibratoFilter = exports.VibrateFilter = exports.VaporwaveFilter = exports.TremoloFilter = exports.TreblebassFilter = exports.TelevisionFilter = exports.SuperBassFilter = exports.SoftFilter = exports.SlowMotionFilter = exports.PopFilter = exports.NightcoreFilter = exports.EarRapeFilter = exports.DoubleTimeFilter = exports.DaycoreFilter = exports.DarthvaderFilter = exports.ChipmunkFilter = exports.ChinaFilter = exports.BassBoostFilter = exports.BassFilter = exports.ThreeDFilter = void 0;
exports.ThreeDFilter = {
    rotation: {
        rotationHz: 0.2,
    },
};
exports.BassFilter = {
    equalizer: [
        { bands: 0, gain: 0.1 },
        { bands: 1, gain: 0.1 },
        { bands: 2, gain: 0.05 },
        { bands: 3, gain: 0.05 },
        { bands: 4, gain: -0.05 },
        { bands: 5, gain: -0.05 },
        { bands: 6, gain: 0 },
        { bands: 7, gain: -0.05 },
        { bands: 8, gain: -0.05 },
        { bands: 9, gain: 0 },
        { bands: 10, gain: 0.05 },
        { bands: 11, gain: 0.05 },
        { bands: 12, gain: 0.1 },
        { bands: 13, gain: 0.1 },
    ],
};
exports.BassBoostFilter = {
    equalizer: [
        { bands: 0, gain: 0.1 },
        { bands: 1, gain: 0.1 },
        { bands: 2, gain: 0.05 },
        { bands: 3, gain: 0.05 },
        { bands: 4, gain: -0.05 },
        { bands: 5, gain: -0.05 },
        { bands: 6, gain: 0 },
        { bands: 7, gain: -0.05 },
        { bands: 8, gain: -0.05 },
        { bands: 9, gain: 0 },
        { bands: 10, gain: 0.05 },
        { bands: 11, gain: 0.05 },
        { bands: 12, gain: 0.1 },
        { bands: 13, gain: 0.1 },
    ],
};
exports.ChinaFilter = {
    timescale: {
        speed: 0.75,
        pitch: 1.25,
        rate: 1.25,
    },
};
exports.ChipmunkFilter = {
    timescale: {
        speed: 1.05,
        pitch: 1.35,
        rate: 1.25,
    },
};
exports.DarthvaderFilter = {
    timescale: {
        speed: 0.975,
        pitch: 0.5,
        rate: 0.8,
    },
};
exports.DaycoreFilter = {
    equalizer: [
        { bands: 0, gain: 0 },
        { bands: 1, gain: 0 },
        { bands: 2, gain: 0 },
        { bands: 3, gain: 0 },
        { bands: 4, gain: 0 },
        { bands: 5, gain: 0 },
        { bands: 6, gain: 0 },
        { bands: 7, gain: 0 },
        { bands: 8, gain: -0.25 },
        { bands: 9, gain: -0.25 },
        { bands: 10, gain: -0.25 },
        { bands: 11, gain: -0.25 },
        { bands: 12, gain: -0.25 },
        { bands: 13, gain: -0.25 },
    ],
    timescale: {
        pitch: 0.63,
        rate: 1.05,
    },
};
exports.DoubleTimeFilter = {
    timescale: {
        speed: 1.165,
    },
};
exports.EarRapeFilter = {
    volume: 1.5,
};
exports.NightcoreFilter = {
    timescale: {
        pitch: 1.125,
        rate: 1.05,
        speed: 1.165,
    },
};
exports.PopFilter = {
    equalizer: [
        { bands: 0, gain: 0.65 },
        { bands: 1, gain: 0.45 },
        { bands: 2, gain: -0.45 },
        { bands: 3, gain: -0.65 },
        { bands: 4, gain: -0.35 },
        { bands: 5, gain: 0.45 },
        { bands: 6, gain: 0.55 },
        { bands: 7, gain: 0.6 },
        { bands: 8, gain: 0.6 },
        { bands: 9, gain: 0.6 },
        { bands: 10, gain: 0 },
        { bands: 11, gain: 0 },
        { bands: 12, gain: 0 },
        { bands: 13, gain: 0 },
    ],
};
exports.SlowMotionFilter = {
    timescale: {
        speed: 0.5,
        pitch: 1.0,
        rate: 0.8,
    },
};
exports.SoftFilter = {
    equalizer: [
        { bands: 0, gain: 0 },
        { bands: 1, gain: 0 },
        { bands: 2, gain: 0 },
        { bands: 3, gain: 0 },
        { bands: 4, gain: 0 },
        { bands: 5, gain: 0 },
        { bands: 6, gain: 0 },
        { bands: 7, gain: 0 },
        { bands: 8, gain: -0.25 },
        { bands: 9, gain: -0.25 },
        { bands: 10, gain: -0.25 },
        { bands: 11, gain: -0.25 },
        { bands: 12, gain: -0.25 },
        { bands: 13, gain: -0.25 },
    ],
};
exports.SuperBassFilter = {
    equalizer: [
        { bands: 0, gain: 0.2 },
        { bands: 1, gain: 0.3 },
        { bands: 2, gain: 0 },
        { bands: 3, gain: 0.8 },
        { bands: 4, gain: 0 },
        { bands: 5, gain: 0.5 },
        { bands: 6, gain: 0 },
        { bands: 7, gain: -0.5 },
        { bands: 8, gain: 0 },
        { bands: 9, gain: 0 },
        { bands: 10, gain: 0 },
        { bands: 11, gain: 0 },
        { bands: 12, gain: 0 },
        { bands: 13, gain: 0 },
    ],
};
exports.TelevisionFilter = {
    equalizer: [
        { bands: 0, gain: 0 },
        { bands: 1, gain: 0 },
        { bands: 2, gain: 0 },
        { bands: 3, gain: 0 },
        { bands: 4, gain: 0 },
        { bands: 5, gain: 0 },
        { bands: 6, gain: 0 },
        { bands: 7, gain: 0.65 },
        { bands: 8, gain: 0.65 },
        { bands: 9, gain: 0.65 },
        { bands: 10, gain: 0.65 },
        { bands: 11, gain: 0.65 },
        { bands: 12, gain: 0.65 },
        { bands: 13, gain: 0.65 },
    ],
};
exports.TreblebassFilter = {
    equalizer: [
        { bands: 0, gain: 0.6 },
        { bands: 1, gain: 0.67 },
        { bands: 2, gain: 0.67 },
        { bands: 3, gain: 0 },
        { bands: 4, gain: -0.5 },
        { bands: 5, gain: 0.15 },
        { bands: 6, gain: -0.45 },
        { bands: 7, gain: 0.23 },
        { bands: 8, gain: 0.35 },
        { bands: 9, gain: 0.45 },
        { bands: 10, gain: 0.55 },
        { bands: 11, gain: 0.6 },
        { bands: 12, gain: 0.55 },
        { bands: 13, gain: 0 },
    ],
};
exports.TremoloFilter = {
    tremolo: {
        frequency: 4.0,
        depth: 0.75,
    },
};
exports.VaporwaveFilter = {
    equalizer: [
        { bands: 0, gain: 0 },
        { bands: 1, gain: 0 },
        { bands: 2, gain: 0 },
        { bands: 3, gain: 0 },
        { bands: 4, gain: 0 },
        { bands: 5, gain: 0 },
        { bands: 6, gain: 0 },
        { bands: 7, gain: 0 },
        { bands: 8, gain: 0.15 },
        { bands: 9, gain: 0.15 },
        { bands: 10, gain: 0.15 },
        { bands: 11, gain: 0.15 },
        { bands: 12, gain: 0.15 },
        { bands: 13, gain: 0.15 },
    ],
    timescale: {
        pitch: 0.55,
    },
};
exports.VibrateFilter = {
    vibrato: {
        frequency: 4.0,
        depth: 0.75,
    },
    tremolo: {
        frequency: 4.0,
        depth: 0.75,
    },
};
exports.VibratoFilter = {
    vibrato: {
        frequency: 4.0,
        depth: 0.75,
    },
};
