export const CLIP_VALIDITY = {
  "10m": "10 minutes",
  "1h": "1 hour",
  "1d": "1 day",
};

export type ClipValidity = keyof typeof CLIP_VALIDITY;

export type IClip = {
  validity: string;
  content: string;
};
