/* eslint-disable @typescript-eslint/no-var-requires */
const { check, call, ensure } = require('@heckle/health');
const { expect } = require('chai');

module.exports = check('Sum calculates correctly', async () => {
  const reply = await call(`sum?a=1&b=2`);
  ensure(reply).successful(`Sum returns ${reply.status} (1 + 2)`);
  expect(reply.data).to.equal(3, 'Sum calculates incorrectly (1 + 2)');
});
