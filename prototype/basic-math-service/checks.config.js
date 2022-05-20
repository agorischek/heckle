const difference = require("./difference/difference.check.js");
const product = require("./product/product.check.js");
const sum = require("./sum/sum.check.js");
const quotient = require("./quotient/quotient.check.js");

module.exports = {
  name: "Basic Math Service",
  root: process.env.SELF_URL || "http://localhost:7071/",
  params: {
    code: process.env.SELF_KEY,
  },
  codes: {
    healthy: 200,
    unhealthy: 500,
  },
  checks: { difference, product, quotient, sum },
};
