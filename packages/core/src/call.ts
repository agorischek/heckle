import axios from 'axios';

import { getConfig } from './getConfig';

export async function call(route: string, method = 'get', payload: unknown) {
  const config = await getConfig();
  const base = config.root ? `${config.root}${route}` : route;
  const url = new URL(base);
  if (config.params) {
    Object.keys(config.params).forEach((param) => {
      if (config.params?.[param] && !url.searchParams.has(param))
        url.searchParams.set(param, config.params[param]);
    });
  }
  const target = url.toString();

  const response = await axios.request({
    method,
    url: target,
    data: payload,
    validateStatus: function (status: number) {
      return Boolean(status);
    },
  });
  return response;
}
