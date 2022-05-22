/* eslint-disable @typescript-eslint/no-var-requires */
const { check, call, ensure } = require('@heckle/heckle');
const { expect } = require('chai');

module.exports = check('Product calculates correctly', async () => {
  const reply = await call(`product?a=1&b=2`);
  ensure(reply).successful(`Product returns ${reply.status} (1 × 2)`);
  expect(reply.data).to.equal(2, `Product calculates incorrectly (1 × 2)`);
});
