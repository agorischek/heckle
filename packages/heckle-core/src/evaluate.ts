import { HealthCheckResultSet, HealthCheckSuite } from './types';

export async function evaluate(suite: HealthCheckSuite, name?: string) {
  const results: HealthCheckResultSet = {};

  if (name) {
    const result = await suite[name]();
    results[name] = result;
  } else {
    const names = Object.keys(suite);
    for await (const name of names) {
      const result = await suite[name]();
      results[name] = result;
    }
  }

  return results;
}
