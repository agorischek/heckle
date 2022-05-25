import * as appInsights from 'applicationinsights';
import { AvailabilityTelemetry } from 'applicationinsights/out/Declarations/Contracts';
import { v4 as uuid } from 'uuid';

import { HealthCheckResult, Target } from '@heckle/core';

import { transformResult } from './transformResult';
import { generateSuiteResult } from './generateSuiteResult';
import { getMonitorConfig } from '../utils';
import { exit } from './exit';

async function run() {
  const monitorConfig = await getMonitorConfig();

  const targetId = 'basicMathService';
  const targetConfig = monitorConfig.targets[targetId];
  const target = new Target(targetConfig);

  appInsights.setup(targetConfig.telemetryKey);
  const telemetry = appInsights.defaultClient;

  const summary = await target.provoke();

  const suiteResult = generateSuiteResult(summary, monitorConfig, targetId);

  const availabilityResults = [suiteResult].concat(
    Object.values(summary.checks).map((checkResult) =>
      transformResult(checkResult, monitorConfig, targetId)
    )
  );

  availabilityResults.forEach((result) => telemetry.trackAvailability(result));

  telemetry.flush({
    callback: exit,
  });
}

run();
