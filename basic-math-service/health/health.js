const { azureFunctionsHost, run } = require("../../heckle/heckle");

const healthCheckConfig = require("./checks");

module.exports = async function (context, req) {
  context.res = await azureFunctionsHost(context, healthCheckConfig);
};
