import {
  HealthCheckResult,
  HealthCheckResultSet,
  HealthSummary,
} from './types';

export function summarize(
  results: HealthCheckResultSet,
  service?: string
): HealthSummary {
  function extractErrors(acc: string[], result: HealthCheckResult) {
    return result.error && acc.indexOf(result.error) < 0
      ? acc.concat(result.error)
      : acc;
  }
  const errors: string[] = Object.values(results).reduce(extractErrors, []);

  const healthy = errors.length === 0;

  const summary = {
    name: service,
    healthy,
    errors,
    checks: results,
  };
  return summary;
}
