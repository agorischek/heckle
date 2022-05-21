import chalk from 'chalk';
import { cosmiconfig } from 'cosmiconfig';

import { health, provoke, Target, HealthSummary } from '@heckle/core';
import { printIntro, printReport } from './printers';
import { HealthReport } from './types/HealthReport';
import { isValidRunConfig } from './schemas';
import { loading } from './utils';

export async function run(name: string) {
  const runConfigFinder = cosmiconfig('heckle');
  const runConfigFinderResult = await runConfigFinder.search();
  const loadedConfig = runConfigFinderResult?.config;
  const config = isValidRunConfig(loadedConfig) ? loadedConfig : undefined;
  if (!config) throw new Error("Couldn't find valid config!");

  const targetConfig = config.targets[name];
  const target = new Target(targetConfig);

  const operation = undefined;

  if (!target) throw new Error(`Target "${name}" not found!`);

  printIntro(target);

  const spinner = loading('Running health checks...');

  const reponse = await target.provoke(operation);
  const summary = reponse as unknown as HealthSummary;

  if (!summary) {
    console.error(chalk.red('Service not found'));
    console.log();
    process.exit(1);
  }

  const report = new HealthReport(summary);

  spinner.stop();
  printReport(report);
}
