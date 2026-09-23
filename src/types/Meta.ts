/** Build information meta data */
export type Meta = {
  /** Version */
  version: string;
  /** Build date */
  date: string;
};

export const Meta: Meta = {
  version: import.meta.env.APP_VERSION,
  date: import.meta.env.BUILD_DATE,
};
