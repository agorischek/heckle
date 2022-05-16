// const expect = require('chai').expect
const { expect } = require('chai');
const { check, call, ensure, verify, HealthError } = require('../heckle/heckle.js')

module.exports = {
  root: process.env.root,
  checks: {
    product: check("Product calculates correctly", async () => {
      const reply = await call("http://localhost:7071/product?a=1&b=2");
      ensure(reply).successful();
      expect(reply.data).to.equal(2, "The product operation result was incorrect")
    }),
    sum: check("Sum calculates correctly", async () => {
      const reply = await call("http://localhost:7071/sum?a=1&b=2");
      ensure(reply).successful();
      expect(reply.data).to.equal(3, "The sum operation result was incorrect")
    }),
    difference: check("Difference calculates correctly", async () => {
      const reply = await call("http://localhost:7071/difference?a=1&b=2");
      ensure(reply).successful();
      expect(reply.data).to.equal(-1, "The difference operation result was incorrect")
    }),
    quotient: check("Quotient calculates correctly", async () => {
      const reply = await call("http://localhost:7071/quotient?a=1&b=2");
      ensure(reply).successful();
      expect(reply.data).to.equal(0.5, "The quotient operation result was incorrect")
    }),
  }
}
