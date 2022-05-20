import { getConfig } from './getConfig';
import { run } from './run';
import { HealthSummary } from './types';

export async function health(): Promise<HealthSummary> {
  const config = await getConfig();
  const summary = await run(config);
  return summary;
}
