import { TelemetryClient } from 'applicationinsights';

import { Target } from '@heckle/core';
import { MonitorConfig } from '../types';
import { generateSuiteResult } from './generateSuiteResult';
import { transformResult } from './transformResult';
import { flush } from './flush';
import { Printer } from '../utils';

export async function monitorTarget(
  monitorConfig: MonitorConfig,
  targetId: string,
  print: Printer
) {
  try {
    const targetConfig = monitorConfig.targets[targetId];
    const target = new Target(targetConfig);
    print.log(`Provoking target ${target.name} (${target.endpoint})...`);

    const telemetry = new TelemetryClient(targetConfig.telemetryKey);

    const summary = await target.provoke();

    print.log(`Recieved health summary: ${JSON.stringify(summary)}`);

    const suiteResult = generateSuiteResult(summary, monitorConfig, targetId);

    const availabilityResults = [suiteResult].concat(
      Object.values(summary.checks).map((checkResult) =>
        transformResult(checkResult, monitorConfig, targetId)
      )
    );

    availabilityResults.forEach((result) =>
      telemetry.trackAvailability(result)
    );

    await flush(telemetry, print);
  } catch (error) {
    print.log(`Couldn't complete monitoring: ${error}`);
  }
}
