import axios from 'axios';

import { TargetConfig } from './types/TargetConfig';

export class Target {
  name?: string;
  displayEndpoint?: string;
  endpoint: string;
  params?: {
    [key: string]: string;
  };
  headers?: {
    [key: string]: string;
  };

  constructor(config: TargetConfig) {
    this.endpoint = typeof config === 'string' ? config : config.endpoint;
    this.displayEndpoint = this.endpoint.match(/^([^?]*)/)?.[1];
  }

  async provoke(action?: string, id?: string) {
    const url = this.buildUrl(action, id);

    const retort = await axios.get(url, {
      validateStatus: function (status: number) {
        return Boolean(status);
      },
    });

    return retort.data;
  }

  buildUrl(action?: string, id?: string) {
    const url = new URL(this.endpoint);

    url.pathname =
      action && id
        ? `${url.pathname}${actionSegment(action)}/${id}`
        : action
        ? `${url.pathname}${actionSegment(action)}`
        : url.pathname;

    if (this.params) {
      Object.keys(this.params).forEach((param) => {
        if (this.params?.[param] && !url.searchParams.has(param))
          url.searchParams.set(param, this.params[param]);
      });
    }

    return url.toString();
  }
}

function actionSegment(action: string | undefined) {
  switch (action) {
    case undefined:
      return '';
    case 'ping':
      return 'ping';
    case 'list':
      return 'checks';
    case 'check':
      return 'checks';
    default:
      return '';
  }
}
