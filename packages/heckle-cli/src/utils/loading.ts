import ora from 'ora';
import chalk from 'chalk';

export function loading(message: string) {
  return ora({
    text: chalk.gray(message),
    spinner: 'dots8',
    color: 'gray',
  }).start();
}
