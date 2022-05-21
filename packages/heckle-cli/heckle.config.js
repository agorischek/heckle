/* eslint-disable @typescript-eslint/no-var-requires */
const secrets = require('../../secrets.json');

module.exports = {
  targets: {
    prod: {
      endpoint: 'https://bing.com',
      params: {
        code: secrets.code,
      },
    },
    local: 'http://localhost:7071/_health',
  },
};
