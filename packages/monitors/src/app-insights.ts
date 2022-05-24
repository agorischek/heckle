import { getConfig, run } from '@heckle/core';

export async function monitor() {
  const config = await getConfig();

  const result = await run(config);
}
