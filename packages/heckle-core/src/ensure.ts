import { AxiosResponse } from 'axios';

export function ensure(reply: AxiosResponse) {
  return {
    informational: function () {
      if (!String(reply.status).match(/^1../))
        throw `Expected status ${reply.status} to be Informational (1xx)`;
    },
    successful: function () {
      if (!String(reply.status).match(/^2../))
        throw `Expected status ${reply.status} to be Successful (2xx)`;
    },
    redirection: function () {
      if (!String(reply.status).match(/^3../))
        throw `Expected status ${reply.status} to be Redirection (3xx)`;
    },
    clientError: function () {
      if (!String(reply.status).match(/^4../))
        throw `Expected status ${reply.status} to be Client Error (4xx)`;
    },
    serverError: function () {
      if (!String(reply.status).match(/^5../))
        throw `Expected status ${reply.status} to be Server Error (5xx)`;
    },
  };
}
