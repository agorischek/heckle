import chalk from 'chalk';

export function exit(message: unknown) {
  console.error(chalk.red(message));
  console.log();
  process.exit(1);
}
