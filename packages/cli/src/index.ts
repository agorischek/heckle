#!/usr/bin/env node

import { program } from 'commander';

import { run } from './run';
import { exit, spinner } from './utils';

export async function cli() {
  const loading = spinner();

  async function main(name: string) {
    try {
      await run(name, loading);
    } catch (error) {
      loading.stop();
      exit(error);
    }
  }

  program.argument('name').action(main);

  program.parseAsync();
}

cli();
