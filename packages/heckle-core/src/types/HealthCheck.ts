import { HealthCheckResult } from '.';

export type HealthCheck = () => Promise<HealthCheckResult>;
