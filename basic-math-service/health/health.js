const checkHealth = require("../../heckle/hosts/azure-functions");

const healthCheckConfig = require("./checks");

module.exports = async function (context) {
  context.res = await checkHealth(context, healthCheckConfig);
};
