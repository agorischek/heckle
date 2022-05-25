import { TelemetryClient } from 'applicationinsights';

import { Target } from '@heckle/core';
import { MonitorConfig } from '../types';
import { generateSuiteResult } from './generateSuiteResult';
import { transformResult } from './transformResult';
import { flush } from './flush';

export async function monitorTarget(
  monitorConfig: MonitorConfig,
  targetId: string
) {
  const targetConfig = monitorConfig.targets[targetId];
  const target = new Target(targetConfig);

  const telemetry = new TelemetryClient(targetConfig.telemetryKey);

  const summary = await target.provoke();

  const suiteResult = generateSuiteResult(summary, monitorConfig, targetId);

  const availabilityResults = [suiteResult].concat(
    Object.values(summary.checks).map((checkResult) =>
      transformResult(checkResult, monitorConfig, targetId)
    )
  );

  availabilityResults.forEach((result) => telemetry.trackAvailability(result));

  await flush(telemetry);
}
