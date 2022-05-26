import { Context } from '@azure/functions';

export class Printer {
  log: (message: unknown) => void;
  constructor(context?: Context) {
    if (context) {
      this.log = context.log;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      this.log = () => {};
    }
  }
}
