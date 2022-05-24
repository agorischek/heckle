import { performance } from 'perf_hooks';

export function timer() {
  const start = performance.now();
  return function () {
    const duration = parseFloat((performance.now() - start).toFixed(2));
    return duration;
  };
}
