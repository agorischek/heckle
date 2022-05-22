import { AxiosResponse } from 'axios';

export function ensure(reply: AxiosResponse) {
  return {
    informational: function (message: string) {
      if (!String(reply.status).match(/^1../))
        throw (
          message || `Expected status ${reply.status} to be Informational (1xx)`
        );
    },
    successful: function (message: string) {
      if (!String(reply.status).match(/^2../))
        throw (
          message || `Expected status ${reply.status} to be Successful (2xx)`
        );
    },
    redirection: function (message: string) {
      if (!String(reply.status).match(/^3../))
        throw (
          message || `Expected status ${reply.status} to be Redirection (3xx)`
        );
    },
    clientError: function (message: string) {
      if (!String(reply.status).match(/^4../))
        throw (
          message || `Expected status ${reply.status} to be Client Error (4xx)`
        );
    },
    serverError: function (message: string) {
      if (!String(reply.status).match(/^5../))
        throw (
          message || `Expected status ${reply.status} to be Server Error (5xx)`
        );
    },
  };
}
