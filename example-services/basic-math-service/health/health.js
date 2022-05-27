/* eslint-disable @typescript-eslint/no-var-requires */
const run = require('@heckle/health').azureFunctions;

module.exports = async function (context) {
  context.res = await run(context);
};
