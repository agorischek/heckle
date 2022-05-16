const { run } = require("../../heckle/heckle");

module.exports = async function (context, req) {
  const config = require("../checks");

  const result = await run(context.bindingData.operation, config.checks);

  context.res = result;
};
