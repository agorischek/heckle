import { check } from './check';
import { evaluate } from './evaluate';

test('Health run a health check suite', async () => {
  const suite = {
    a: check('Example', () => true),
    b: check('Example', () => {
      throw 'Problem!';
    }),
  };
  const resultSet = await evaluate(suite);

  expect(resultSet.a.healthy).toBe(true);
  expect(resultSet.b.healthy).toBe(false);
});
