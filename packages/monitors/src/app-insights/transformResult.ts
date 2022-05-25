import { AvailabilityTelemetry } from 'applicationinsights/out/Declarations/Contracts';

import { HealthCheckResult } from '@heckle/core';

import { id } from '../utils';
import { MonitorConfig } from '../types';

export function transformResult(
  checkResult: HealthCheckResult,
  monitorConfig: MonitorConfig,
  targetId: string
): AvailabilityTelemetry {
  const target = monitorConfig.targets[targetId];
  const testName = monitorConfig.prefixNames
    ? `${target.name}: ${checkResult.description}`
    : checkResult.description;
  return {
    id: id(),
    name: testName,
    duration: checkResult.duration,
    runLocation: monitorConfig.location,
    success: checkResult.healthy,
    message: checkResult.error || checkResult.description,
  };
}
