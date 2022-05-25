import { cosmiconfig } from 'cosmiconfig';
import { Ora } from 'ora';

import { Target } from '@heckle/core';

import { printIntro, printNewline, printReport } from './printers';
import { HealthReport } from './types';
import { isValidRunConfig } from './schemas';

export async function run(name: string, loading: Ora) {
  printNewline();

  const runConfigFinder = cosmiconfig('heckle');
  const runConfigFinderResult = await runConfigFinder.search();
  const loadedConfig = runConfigFinderResult?.config;
  const config = isValidRunConfig(loadedConfig) ? loadedConfig : undefined;
  if (!config) throw new Error("Couldn't find valid run config!");

  const operation = undefined;

  const targetConfig = config.targets[name];
  if (!targetConfig)
    throw new Error(`Target "${name}" not found! Check your run config file.`);
  const target = new Target(targetConfig);

  printIntro(target);

  loading.start();

  const summary = await target.provoke(operation);

  if (!summary) {
    throw new Error('Target service not found!');
  }

  const report = new HealthReport(summary);

  loading.stop();
  printReport(report);
}
