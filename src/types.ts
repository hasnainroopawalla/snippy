export const CLIP_VALIDITY = {
  "10m": "10 minutes",
  "1h": "1 hour",
  "1d": "1 day",
};

export type ClipValidity = keyof typeof CLIP_VALIDITY;

export type IClip = {
  /* The unique integer identifier of the clip in the DB */
  id: string;
  /* The unique, human readable identifier of the clip */
  //   slug: string;
  /* The validity of the clip after which the clip is deleted from the DB */
  //   validity: string;
  /* The raw string content of the clip */
  content: string;
  /* The timestamp of when the clip was created */
  createdAt: string;
};
