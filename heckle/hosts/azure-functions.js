const { run } = require("../heckle");

async function checkHealth(context, config) {
  const result = await run(config, context.bindingData.operation);
  const status = healthy ? 200 : 500;
  return {
    status,
    body: result,
  };
}

module.exports = checkHealth;
