import { getConfig, run as heckle } from '@heckle/core';
import { Context } from '@azure/functions';

export async function run(context: Context) {
  const config = await getConfig();

  const result = await heckle(config);

  const status = result.healthy
    ? config?.codes?.healthy || 200
    : config?.codes?.unhealthy || 500;

  return {
    status,
    body: result,
  };
}
