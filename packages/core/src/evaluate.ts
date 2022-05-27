import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckResultSet,
  HealthCheckSuite,
  Labelled,
} from './types';

export async function evaluate(suite: HealthCheckSuite, id?: string) {
  const labelledChecks: Labelled<HealthCheck>[] = id
    ? [[id, suite[id]]]
    : Object.entries(suite);

  async function runLabelledCheck(
    check: Labelled<HealthCheck>
  ): Promise<Labelled<HealthCheckResult>> {
    const result = await check[1]();
    return [check[0], result];
  }

  const labelledResults: Labelled<HealthCheckResult>[] = await Promise.all(
    labelledChecks.map((labelledCheck) => runLabelledCheck(labelledCheck))
  );

  const results: HealthCheckResultSet = labelledResults.reduce(
    (acc: HealthCheckResultSet, result: Labelled<HealthCheckResult>) => {
      acc[result[0]] = result[1];
      return acc;
    },
    {}
  );

  return results;
}
