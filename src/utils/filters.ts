import { Filters } from "../interfaces";

export const ThreeDFilter: Filters = {
  rotation: {
    rotationHz: 0.2,
  },
};

export const BassFilter: Filters = {
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

export const BassBoostFilter: Filters = {
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

export const ChinaFilter: Filters = {
  timescale: {
    speed: 0.75,
    pitch: 1.25,
    rate: 1.25,
  },
};

export const ChipmunkFilter: Filters = {
  timescale: {
    speed: 1.05,
    pitch: 1.35,
    rate: 1.25,
  },
};

export const DarthvaderFilter: Filters = {
  timescale: {
    speed: 0.975,
    pitch: 0.5,
    rate: 0.8,
  },
};

export const DaycoreFilter: Filters = {
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

export const DoubleTimeFilter: Filters = {
  timescale: {
    speed: 1.165,
  },
};

export const EarRapeFilter: Filters = {
  volume: 1.5,
};

export const NightcoreFilter: Filters = {
  timescale: {
    pitch: 1.125,
    rate: 1.05,
    speed: 1.165,
  },
};

export const PopFilter: Filters = {
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

export const SlowMotionFilter: Filters = {
  timescale: {
    speed: 0.5,
    pitch: 1.0,
    rate: 0.8,
  },
};

export const SoftFilter: Filters = {
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

export const SuperBassFilter: Filters = {
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

export const TelevisionFilter: Filters = {
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

export const TreblebassFilter: Filters = {
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

export const TremoloFilter: Filters = {
  tremolo: {
    frequency: 4.0,
    depth: 0.75,
  },
};

export const VaporwaveFilter: Filters = {
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

export const VibrateFilter: Filters = {
  vibrato: {
    frequency: 4.0,
    depth: 0.75,
  },
  tremolo: {
    frequency: 4.0,
    depth: 0.75,
  },
};

export const VibratoFilter: Filters = {
  vibrato: {
    frequency: 4.0,
    depth: 0.75,
  },
};
