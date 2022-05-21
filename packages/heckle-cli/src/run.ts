import { cosmiconfig } from 'cosmiconfig';

import { Target } from '@heckle/core';

import { printIntro, printReport } from './printers';
import { HealthReport } from './types';
import { isValidRunConfig } from './schemas';
import { loading } from './utils';
import { isValidHealthSummary } from './schemas/healthSummarySchema';

export async function run(name: string) {
  const runConfigFinder = cosmiconfig('heckle');
  const runConfigFinderResult = await runConfigFinder.search();
  const loadedConfig = runConfigFinderResult?.config;
  const config = isValidRunConfig(loadedConfig) ? loadedConfig : undefined;
  if (!config) throw new Error("Couldn't find valid config!");

  const operation = undefined;

  const targetConfig = config.targets[name];
  const target = new Target(targetConfig);
  if (!target) throw new Error(`Target "${name}" not found!`);

  printIntro(target);

  const spinner = loading('Running health checks...');

  const response = await target.provoke(operation);
  const summary = isValidHealthSummary(response) ? response : undefined;
  if (!summary) {
    spinner.stop();
    throw new Error('Target service not found!');
  }

  const report = new HealthReport(summary);

  spinner.stop();
  printReport(report);
}
