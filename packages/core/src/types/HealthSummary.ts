import { HealthCheckResultSet } from '.';

export type HealthSummary = {
  name?: string;
  healthy: boolean;
  errors?: string[];
  checks: HealthCheckResultSet;
};
