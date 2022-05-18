const { run } = require("../heckle");

async function checkHealth(context, config) {
  const result = await run(context.bindingData.operation);

  const status = healthy
    ? config.codes.healthy || 200
    : config.codes.unhealthy || 500;

  return {
    status,
    body: result,
  };
}

module.exports = checkHealth;
