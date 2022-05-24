import { HealthCheckResultSet } from '.';

export type HealthSummary = {
  name?: string;
  healthy: boolean;
  errors?: string[];
  duration: number;
  checks: HealthCheckResultSet;
};
