const { run, loadConfig } = require("../heckle");

async function checkHealth(context) {
  const result = await run(context.bindingData.operation);

  const { config } = await loadConfig();

  const status = result.healthy
    ? config.codes.healthy || 200
    : config.codes.unhealthy || 500;

  return {
    status,
    body: result,
  };
}

module.exports = checkHealth;
