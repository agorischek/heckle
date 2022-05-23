import { performance } from 'perf_hooks';

export class Timer {
  start: number;
  stop: () => number;
  constructor() {
    this.start = performance.now();
    this.stop = function () {
      const duration = parseFloat((performance.now() - this.start).toFixed(2));
      return duration;
    };
  }
}
