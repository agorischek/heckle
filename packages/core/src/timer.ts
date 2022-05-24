import { performance } from 'perf_hooks';

export function timer() {
  const start = performance.now();
  return function () {
    const duration = Math.round(performance.now() - start);
    return duration;
  };
}
