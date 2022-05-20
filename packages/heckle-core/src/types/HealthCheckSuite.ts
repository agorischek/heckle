import { HealthCheck } from './HealthCheck';

export type HealthCheckSuite = {
  [key: string]: HealthCheck;
};
