import { getConfig, run } from '@heckle/core';
import { Context } from '@azure/functions';

export async function health(context: Context) {
  const config = await getConfig();

  const result = await run(config);

  const status = result.healthy
    ? config?.codes?.healthy || 200
    : config?.codes?.unhealthy || 500;

  return {
    status,
    body: result,
  };
}
