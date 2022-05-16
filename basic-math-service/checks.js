// const expect = require('chai').expect
const { expect } = require("chai");
const {
  check,
  call,
  ensure,
  verify,
  HealthError,
} = require("../heckle/heckle.js");

module.exports = {
  root: process.env.root,
  checks: {
    product: check("Product calculates correctly", async () => {
      const reply = await call("http://localhost:7071/product?a=1&b=2");
      ensure(reply).successful();
      expect(reply.data).to.equal(2, "Product calculated incorrectly");
    }),
    sum: check("Sum calculates correctly", async () => {
      const reply = await call("http://localhost:7071/sum?a=1&b=2");
      ensure(reply).successful();
      expect(reply.data).to.equal(3, "Sum calculated incorrectly");
    }),
    difference: check("Difference calculates correctly", async () => {
      const reply = await call("http://localhost:7071/difference?a=1&b=2");
      ensure(reply).successful();
      expect(reply.data).to.equal(-1, "Difference calculated incorrectly");
    }),
    quotient: check("Quotient calculates correctly", async () => {
      const reply = await call("http://localhost:7071/quotient?a=1&b=2");
      ensure(reply).successful();
      expect(reply.data).to.equal(0.5, "Quotient calculated incorrectly");
    }),
  },
};
