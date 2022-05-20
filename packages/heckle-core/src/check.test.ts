import { check } from './check';

test("Health check should return a healthy result when the check doesn't throw", async () => {
  const example = check('Example', () => true);
  const result = await example();

  expect(result.healthy).toBe(true);
  expect(result.description).toBe('Example');
  expect(result.error).toBe(undefined);
});

test('Health check should return an unhealthy result with the check throws', async () => {
  const example = check('Example', () => {
    throw 'Problem!';
  });
  const result = await example();

  expect(result.healthy).toBe(false);
  expect(result.description).toBe('Example');
  expect(result.error).toBe('Problem!');
});
