import { HealthCheckResultSet, HealthCheckSuite } from './types';

export async function evaluate(suite: HealthCheckSuite, id?: string) {
  const ids: string[] = id ? [id] : Object.keys(suite);

  const results: HealthCheckResultSet = {};
  for await (const id of ids) {
    const result = await suite[id]();
    results[id] = result;
  }

  return results;
}
