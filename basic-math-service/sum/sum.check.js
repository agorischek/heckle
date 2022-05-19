const { check, call, ensure } = require("../../heckle/heckle");
const { expect } = require("chai");

module.exports = check("Sum calculates correctly", async () => {
  const reply = await call(`sum?a=1&b=2`);
  ensure(reply).successful();
  expect(reply.data).to.equal(3, "Sum calculates incorrectly (1 + 2)");
});
