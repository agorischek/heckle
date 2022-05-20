import { HealthCheckResult } from './HealthCheckResult';

export type HealthCheckResultSet = {
  [key: string]: HealthCheckResultSet | HealthCheckResult;
};
