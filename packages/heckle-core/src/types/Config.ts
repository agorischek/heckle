import { HealthCheck } from './HealthCheck';

export type Config = {
  name?: string;
  root?: string;
  params?: {
    [key: string]: string;
  };
  codes?: {
    [key: string]: number;
  };
  checks: {
    [key: string]: HealthCheck;
  };
};
