import { HealthCheckResultSet, HealthCheckSuite } from './types';

export async function evaluate(suite: HealthCheckSuite, name?: string) {
  const names: string[] = name ? [name] : Object.keys(suite);

  const results: HealthCheckResultSet = {};
  for await (const name of names) {
    const result = await suite[name]();
    results[name] = result;
  }

  return results;
}
