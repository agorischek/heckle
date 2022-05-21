import chalk from 'chalk';
import { cosmiconfig } from 'cosmiconfig';

import { health, provoke, Target } from 'heckle-core';
import { printIntro, printReport } from './printers';
import { RunConfig } from './types';
import { HealthSummary, TargetConfig } from 'heckle-core/src/types';
import { HealthReport } from './types/HealthReport';

export async function run(name: string) {
  const explorer = cosmiconfig('heckle');
  const c = await explorer.search();
  const config = c?.config as RunConfig;

  const t = config?.targets?.[name] as TargetConfig;

  const target = new Target(t);
  const operation = undefined;

  if (!target) {
    console.error(`Target "${name}" not found!`);
    console.log();
    process.exit(1);
  }

  printIntro(target);

  const reponse = await target.provoke(operation);
  const summary = reponse as unknown as HealthSummary;

  if (!summary) {
    console.error(chalk.red('Service not found'));
    console.log();
    process.exit(1);
  }

  const report = new HealthReport(summary);

  printReport(report);
}
