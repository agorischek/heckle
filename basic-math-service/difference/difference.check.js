const { check, call, ensure } = require("../../heckle/heckle");
const { expect } = require("chai");

module.exports = check("Difference calculates correctly", async () => {
  const reply = await call("difference?a=1&b=2");
  ensure(reply).successful();
  expect(reply.data).to.equal(
    -1,
    "Difference of 1 and 2 calculated incorrectly"
  );
});
