module.exports = {
  location: "Seattle, WA",
  prefixNames: false,
  suite: {
    display: "Health checks run",
  },
  targets: {
    basicMathService: {
      telemetryKey: process.env.MONITOR_BASIC_MATH_SERVICE_TELEMETRY_STRING,
      name: "Basic Math Service",
      endpoint: "https://basic-math-service.azurewebsites.net/_health/",
      params: {
        code: process.env.MONITOR_BASIC_MATH_SERVICE_TELEMETRY_STRING,
      },
    },
  },
};
