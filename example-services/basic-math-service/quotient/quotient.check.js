/* eslint-disable @typescript-eslint/no-var-requires */
const { check, call, ensure } = require('@heckle/heckle');
const { expect } = require('chai');

module.exports = check('Quotient calculates correctly', async () => {
  const reply = await call(`quotient?a=1&b=2`);
  ensure(reply).successful();
  expect(reply.data).to.equal(0.5, 'Quotient calculates incorrectly (1 ÷ 2)');
});
