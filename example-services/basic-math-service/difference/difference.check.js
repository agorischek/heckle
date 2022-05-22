/* eslint-disable @typescript-eslint/no-var-requires */
const { check, call, ensure } = require('@heckle/heckle');
const { expect } = require('chai');

module.exports = check('Difference calculates correctly', async () => {
  const reply = await call(`difference?a=1&b=2`);
  ensure(reply).successful(`Difference returns ${reply.status} (1 - 2)`);
  expect(reply.data).to.equal(-1, 'Difference calculates incorrectly (1 - 2)');
});
