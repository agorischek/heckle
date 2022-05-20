const checkHealth = require("../../heckle/hosts/azure-functions");

module.exports = async function (context) {
  context.res = await checkHealth(context);
};
