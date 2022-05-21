#!/usr/bin/env node

import { program } from 'commander';

import { run } from './run';
import { exit } from './utils';

async function main(name: string) {
  try {
    await run(name);
  } catch (error) {
    exit(error);
  }
}

program.argument('name').action(main);

program.parseAsync();
