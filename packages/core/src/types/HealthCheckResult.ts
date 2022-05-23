export type HealthCheckResult = {
  healthy: boolean;
  description: string;
  duration: number;
  error?: string;
};
