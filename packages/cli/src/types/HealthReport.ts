import { HealthCheckResult, HealthSummary } from '@heckle/core';

export class HealthReport {
  count: number;
  healthy: { count: number; checks: { [key: string]: HealthCheckResult } };
  unhealthy: { count: number; checks: { [key: string]: HealthCheckResult } };

  constructor(summary: HealthSummary) {
    this.count = 0;
    this.healthy = { count: 0, checks: {} };
    this.unhealthy = { count: 0, checks: {} };

    Object.keys(summary.checks).forEach((check: string) => {
      this.count++;
      const checkResult = summary.checks[check];
      if (checkResult.healthy) {
        this.healthy.count++;
        this.healthy.checks[check] = checkResult;
      } else {
        this.unhealthy.count++;
        this.unhealthy.checks[check] = checkResult;
      }
    });
  }
}
