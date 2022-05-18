const difference = require("./difference/difference.check.js");
const product = require("./product/product.check.js");
const sum = require("./sum/sum.check.js");
const quotient = require("./quotient/quotient.check.js");

module.exports = {
  name: "Basic Math Service",
  root: "http://localhost:7071/",
  codes: {
    healthy: 200,
    unhealthy: 500,
  },
  checks: { difference, product, quotient, sum },
};
