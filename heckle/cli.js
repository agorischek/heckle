#!/usr/bin/env node

const { program } = require("commander");

const chalk = require("chalk");

const { run, loadConfig } = require("./heckle");

program
  .argument("[target]")
  .argument("[operation]")
  .action(async (target, operation, options) => {
    const { config, filePath } = await loadConfig();

    console.log();
    console.log(chalk.bold(`${config.name} Health Check`));
    if (target) console.log(chalk.gray(target));
    console.log();

    const result = await run(operation, target);

    if (!result) {
      console.error(chalk.red("Service not found"));
      console.log();
      process.exit(1);
    }

    const hex = {
      good: "#0dd332",
      bad: "#d30d1c",
    };

    const summary = Object.keys(result.checks).reduce(
      (acc, check) => {
        acc.count++;
        const checkResult = result.checks[check];
        if (checkResult.healthy) {
          acc.healthy.count++;
          acc.healthy.checks[check] = checkResult;
        } else {
          acc.unhealthy.count++;
          acc.unhealthy.checks[check] = checkResult;
        }
        return acc;
      },
      {
        count: 0,
        healthy: { count: 0, checks: {} },
        unhealthy: { count: 0, checks: {} },
      }
    );

    // console.log(summary);
    if (summary.unhealthy.count === 0) {
      console.log(chalk.green.bold(`All ${summary.count} checks passed`));
    } else if (summary.unhealthy.count === summary.count) {
      console.log(chalk.red.bold(`All ${summary.count} checks failed`));
    } else {
      console.log(
        chalk.red.bold(
          `${summary.unhealthy.count} out of ${summary.count} checks failed`
        )
      );
    }
    console.log();

    if (summary.healthy.count > 0) {
      console.log(chalk.white.bold.bgGreen(" HEALTHY "));

      Object.keys(summary.healthy.checks).forEach((check) => {
        const checkResult = summary.healthy.checks[check];
        console.log(
          `${chalk.green.bold("✔")} ${checkResult.description} ${chalk.gray(
            `(${check})`
          )}`
        );
      });
      console.log();
    }
    if (summary.unhealthy.count > 0) {
      console.log(chalk.white.bold.bgRed(" UNHEALTHY "));

      Object.keys(summary.unhealthy.checks).forEach((check) => {
        const checkResult = summary.unhealthy.checks[check];

        console.log(
          `${chalk.red.bold("×")} ${checkResult.error} ${chalk.gray(
            `(${check})`
          )}`
        );
      });
      console.log();
    }
  });

program.parse();
