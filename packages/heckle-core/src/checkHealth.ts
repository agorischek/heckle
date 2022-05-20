import { getConfig } from './getConfig';
import { run } from './run';

export async function checkHealth() {
  const config = await getConfig();
  const healthResult = await run(config);
  return healthResult;
}
