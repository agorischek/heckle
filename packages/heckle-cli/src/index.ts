#!/usr/bin/env node

import { program } from 'commander';

import { run } from './run';

program.argument('name').action(run);

program.parse();
