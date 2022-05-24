import chalk from 'chalk';

import { HealthReport } from '../types/HealthReport';

export function printReport(report: HealthReport) {
  if (report.unhealthy.count === 0) {
    console.log(
      `${chalk.green.bold(
        `All ${report.count} checks passed!`
      )} ${chalk.gray.bold(`${report.duration}ms`)}`
    );
  } else if (report.unhealthy.count === report.count) {
    console.log(
      `${chalk.red.bold(
        `All ${report.count} checks failed.`
      )} ${chalk.gray.bold(`${report.duration}ms`)}`
    );
  } else {
    console.log(
      chalk.red.bold(
        `${report.unhealthy.count} out of ${report.count} checks failed.`
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
          `(${check}) ${chalk.bold(`${checkResult.duration}ms`)}`
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
          `(${check}) ${chalk.bold(`${checkResult.duration}ms`)}`
        )}`
      );
    });
    console.log();
  }
}
