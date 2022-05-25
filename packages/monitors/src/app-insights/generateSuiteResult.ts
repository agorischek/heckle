import { HealthSummary } from '@heckle/core';
import { AvailabilityTelemetry } from 'applicationinsights/out/Declarations/Contracts';
import { MonitorConfig } from '../types';

import { id } from '../utils';

export function generateSuiteResult(
  summary: HealthSummary,
  monitorConfig: MonitorConfig,
  targetId: string
): AvailabilityTelemetry {
  const target = monitorConfig.targets[targetId];
  const description = monitorConfig.suite.display || 'Health checks complete';
  const checkCount = Object.keys(summary.checks).length;
  const testName = monitorConfig.prefixNames
    ? `${target.name}: ${description}`
    : description;

  const suiteResult: AvailabilityTelemetry = {
    id: id(),
    name: testName,
    duration: summary.duration,
    runLocation: monitorConfig.location,
    success: true,
    message: `${checkCount} health checks ran.`,
  };
  return suiteResult;
}
