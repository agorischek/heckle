const { run } = require("../heckle");

async function checkHealth(context, config) {
  const result = await run(context.bindingData.operation, config);
  return result;
}

module.exports = checkHealth;
