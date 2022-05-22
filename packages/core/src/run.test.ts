import { run } from './run';
import { check } from './check';
import { Config, HealthSummary } from './types';

test('Should run', async () => {
  const config: Config = {
    name: 'My Service',
    checks: {
      a: check('Example', () => true),
      b: check('Example', () => {
        throw 'Problem!';
      }),
    },
  };
  const summary: HealthSummary = await run(config);

  expect(summary.name).toBe('My Service');
  expect(summary.healthy).toBe(false);
  expect(summary.errors?.length).toBe(1);
});
