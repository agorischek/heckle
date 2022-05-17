#!/usr/bin/env node

const { program } = require("commander");

const chalk = require("chalk");

const { run } = require("./heckle");

program.argument("<target>").action(async (target, options) => {
  // console.log("The target is " + target);
  const config = require(target);
  // console.log(config);
  // console.log("Checking health...");
  const result = await run(config);
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
        `${chalk.hex(hex.good).bold("✔")} ${checkResult.description}`
      );
  });
  console.log();
  console.log(chalk.white.bold.bgHex(hex.bad)(" UNHEALTHY "));
  Object.keys(result.checks).forEach((check) => {
    const checkResult = result.checks[check];
    if (!checkResult.healthy)
      console.log(`${chalk.hex(hex.bad).bold("×")} ${checkResult.error}`);
  });
});

program.parse();
