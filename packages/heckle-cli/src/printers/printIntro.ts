import chalk from 'chalk';

import { Target } from '@heckle/core';

export function printIntro(target: Target) {
  console.log(
    `${chalk.bold(`Health Check:`)} ${chalk.gray(target.displayEndpoint)}`
  );
  console.log();
}
