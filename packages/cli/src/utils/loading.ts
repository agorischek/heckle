import ora from 'ora';
import chalk from 'chalk';

export function spinner(message?: string) {
  return ora({
    text: chalk.gray(message || 'Running...'),
    spinner: 'dots8',
    color: 'gray',
  });
}
