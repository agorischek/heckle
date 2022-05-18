const { check, call, ensure } = require("../../heckle/heckle");
const { expect } = require("chai");

module.exports = check("Product calculates correctly", async () => {
  const a = 1;
  const b = 2;
  const reply = await call(`product?a=${a}&b=${b}`);
  ensure(reply).successful();
  expect(reply.data).to.equal(
    2,
    `Product calculates incorrectly for ${a} × ${b}`
  );
});
