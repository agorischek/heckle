#!/usr/bin/env node

const { program } = require("commander");

const heckle = require("./heckle");

program.argument("<target>").action((target, options) => {
  console.log("The target is " + target);
  const config = require(target);
  console.log(config);
});

program.parse();
