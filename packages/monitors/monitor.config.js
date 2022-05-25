/* eslint-disable @typescript-eslint/no-var-requires */
const secrets = require('./secrets.json');

module.exports = {
  location: 'Seattle, WA',
  prefixNames: false,
  suite: {
    display: 'Health checks run',
  },
  targets: {
    basicMathService: {
      telemetryKey: secrets.appInsightsConnectionString,
      name: 'Basic Math Service',
      endpoint: 'https://basic-math-service.azurewebsites.net/_health/',
      params: {
        code: secrets.targetCode,
      },
    },
  },
};
