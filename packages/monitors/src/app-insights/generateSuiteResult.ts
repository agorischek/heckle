import { HealthSummary } from '@heckle/core';
import { AvailabilityTelemetry } from 'applicationinsights/out/Declarations/Contracts';
import { MonitorConfig } from '../types';

import { id } from '../utils';

export function generateSuiteResult(
  summary: HealthSummary | null,
  monitorConfig: MonitorConfig,
  targetId: string,
  duration: number
): AvailabilityTelemetry {
  const target = monitorConfig.targets[targetId];
  const description = monitorConfig.suite.display || 'Health checks complete';

  const testName = monitorConfig.prefixNames
    ? `${target.name}: ${description}`
    : description;

  if (summary) {
    const checkCount = Object.keys(summary.checks).length;

    const suiteResult: AvailabilityTelemetry = {
      id: id(),
      name: testName,
      duration: duration,
      runLocation: monitorConfig.location,
      success: true,
      message: `${checkCount} health checks ran.`,
    };
    return suiteResult;
  } else {
    const suiteResult: AvailabilityTelemetry = {
      id: id(),
      name: testName,
      duration: duration,
      runLocation: monitorConfig.location,
      success: false,
      message: `0 health checks ran.`,
    };
    return suiteResult;
  }
}
