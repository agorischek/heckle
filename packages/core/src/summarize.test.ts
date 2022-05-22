import { summarize } from './summarize';
import { HealthCheckResultSet } from './types';

test('Should summarize a healthy result set', async () => {
  const name = 'My Service';
  const resultSet: HealthCheckResultSet = {
    a: {
      healthy: true,
      description: 'A works',
    },
    b: {
      healthy: true,
      description: 'B works',
    },
  };
  const summary = summarize(resultSet, name);

  expect(summary.name).toBe('My Service');
  expect(summary.healthy).toBe(true);
  expect(summary.errors?.length).toBe(0);
});

test('Should summarize an unhealthy result set', async () => {
  const name = 'My Service';
  const resultSet: HealthCheckResultSet = {
    a: {
      healthy: true,
      description: 'A works',
    },
    b: {
      healthy: false,
      description: 'B works',
      error: "B doesn't work",
    },
  };
  const summary = summarize(resultSet, name);

  expect(summary.name).toBe('My Service');
  expect(summary.healthy).toBe(false);
  expect(summary.errors?.length).toBeGreaterThan(0);
});
