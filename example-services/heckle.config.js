/* eslint-disable @typescript-eslint/no-var-requires */
const secrets = require('../../secrets.json');

module.exports = {
  targets: {
    prod: {
      endpoint: 'https://basic-math-service.azurewebsites.net/_health/',
      params: {
        code: secrets.code,
      },
    },
    local: 'http://localhost:7071/_health',
  },
};
