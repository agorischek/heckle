const { check, call, ensure } = require("../../heckle/heckle");
const { expect } = require("chai");

const quotientHealthCheck = check("Quotient calculates correctly", async () => {
  const reply = await call("http://localhost:7071/quotient?a=1&b=2");
  ensure(reply).successful();
  expect(reply.data).to.equal(
    0.5,
    "Quotient of 1 and 2 calculated incorrectly"
  );
});

module.exports = quotientHealthCheck;
