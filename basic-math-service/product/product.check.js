const { check, call, ensure } = require("../../heckle/heckle");
const { expect } = require("chai");

const productHealthCheck = check("Product calculates correctly", async () => {
  const reply = await call("http://localhost:7071/product?a=1&b=2");
  ensure(reply).successful();
  expect(reply.data).to.equal(2, "Product of 1 and 2 calculated incorrectly");
});

module.exports = productHealthCheck;
