#!/usr/bin/env node

const { program } = require("commander");

const chalk = require("chalk");

const { run, loadConfig } = require("./heckle");

program
  .argument("[target]")
  .argument("[operation]")
  .action(async (target, operation, options) => {
    const { config } = await loadConfig();

    console.log();
    console.log(chalk.bold(`${config.name} Health Check`));
    console.log(chalk.gray(target));
    console.log();

    // throw "cool";

    const result = await run(operation, target);

    // console.log(result);
    // if (result.healthy) console.log("✅ Healthy");
    // else console.log("⛔️ Unhealthy");
    // if (result.errors.length > 0) {
    //   console.log("Errors\n------\n");
    //   result.errors.forEach(error, (error) => {
    //     console.log(error);
    //   });
    // }

    const hex = {
      good: "#0dd332",
      bad: "#d30d1c",
    };

    console.log(chalk.white.bold.bgHex(hex.good)(" HEALTHY "));
    Object.keys(result.checks).forEach((check) => {
      const checkResult = result.checks[check];
      if (checkResult.healthy)
        console.log(
          `${chalk.hex(hex.good).bold("✔")} ${
            checkResult.description
          } ${chalk.gray(`(${check})`)}`
        );
    });
    console.log();
    console.log(chalk.white.bold.bgHex(hex.bad)(" UNHEALTHY "));
    Object.keys(result.checks).forEach((check) => {
      const checkResult = result.checks[check];
      if (!checkResult.healthy)
        console.log(
          `${chalk.hex(hex.bad).bold("×")} ${checkResult.error} ${chalk.gray(
            `(${check})`
          )}`
        );
    });
    console.log();
  });

program.parse();
