import fetch from 'node-fetch';
import got from 'got';
import { Target } from './Target';
import axios from 'axios';

import secrets from './secrets.json';

export async function provoke(target: Target, action?: string, id?: string) {
  const url = buildUrl(target, action, id);

  const response = await axios.get(url, {
    validateStatus: function (status: number) {
      return Boolean(status);
    },
  });

  return response.data;
}

function buildUrl(target: Target, action?: string, id?: string) {
  const url = new URL(typeof target === 'string' ? target : target.endpoint);

  url.pathname = `${url.pathname}${actionSegment(action)}`;

  if (typeof target !== 'string' && target.params) {
    Object.keys(target.params).forEach((param) => {
      if (target.params?.[param] && !url.searchParams.has(param))
        url.searchParams.set(param, target.params[param]);
    });
  }

  return url.toString();
}

const target = {
  name: 'production',
  endpoint: 'https://basic-math-service.azurewebsites.net/_health/',
  params: {
    code: secrets.code,
  },
};

async function run() {
  // const summary = await provoke(target);
  // console.log(summary);
}

run();

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
