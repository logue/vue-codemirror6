/** Build information meta data */
export type Meta = {
  /** Version */
  version: string;
  /** Build date */
  date: string;
};

export const Meta: Meta = {
  version: __APP_VERSION__,
  date: __BUILD_DATE__,
};
