#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import { cosmiconfig } from 'cosmiconfig';

import { health, provoke, Target } from 'heckle-core';
import { RunConfig } from './types';
import { HealthSummary, TargetConfig } from 'heckle-core/src/types';
import { HealthReport } from './types/HealthReport';

async function run(name: string) {
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

  console.log();
  console.log(
    `${chalk.bold(`Health Check:`)} ${chalk.gray(target.displayEndpoint)}`
  );
  console.log();

  const reponse = await target.provoke(operation);
  const summary = reponse.data as unknown as HealthSummary;

  // console.log(summary);

  if (!summary) {
    console.error(chalk.red('Service not found'));
    console.log();
    process.exit(1);
  }

  const report = new HealthReport(summary);

  if (report.unhealthy.count === 0) {
    console.log(chalk.green.bold(`All ${report.count} checks passed`));
  } else if (report.unhealthy.count === report.count) {
    console.log(chalk.red.bold(`All ${report.count} checks failed`));
  } else {
    console.log(
      chalk.red.bold(
        `${report.unhealthy.count} out of ${report.count} checks failed`
      )
    );
  }
  console.log();

  if (report.healthy.count > 0) {
    console.log(chalk.white.bold.bgGreen(' HEALTHY '));

    Object.keys(report.healthy.checks).forEach((check) => {
      const checkResult = report.healthy.checks[check];
      console.log(
        `${chalk.green.bold('✔')} ${checkResult.description} ${chalk.gray(
          `(${check})`
        )}`
      );
    });
    console.log();
  }
  if (report.unhealthy.count > 0) {
    console.log(chalk.white.bold.bgRed(' UNHEALTHY '));

    Object.keys(report.unhealthy.checks).forEach((check) => {
      const checkResult = report.unhealthy.checks[check];

      console.log(
        `${chalk.red.bold('×')} ${checkResult.error} ${chalk.gray(
          `(${check})`
        )}`
      );
    });
    console.log();
  }
}

program.argument('name').action(run);

program.parse();
