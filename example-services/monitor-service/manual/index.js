const monitor = require("@heckle/health").appInsights;

module.exports = async function (context) {
  context.log("Running health check suite(s)");

  await monitor();

  context.log("JavaScript timer trigger function ran!");
};
