export type TargetConfig =
  | string
  | {
      name?: string;
      endpoint: string;
      params?: {
        [key: string]: string;
      };
      headers?: {
        [key: string]: string;
      };
    };
