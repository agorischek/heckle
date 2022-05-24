import { summarize } from './summarize';
import { HealthCheckResultSet } from './types';

test('Should summarize a healthy result set', async () => {
  const name = 'My Service';
  const duration = 300;
  const resultSet: HealthCheckResultSet = {
    a: {
      healthy: true,
      description: 'A works',
      duration: 500,
    },
    b: {
      healthy: true,
      description: 'B works',
      duration: 400,
    },
  };
  const summary = summarize(resultSet, duration, name);

  expect(summary.name).toBe('My Service');
  expect(summary.healthy).toBe(true);
  expect(summary.errors?.length).toBe(0);
});

test('Should summarize an unhealthy result set', async () => {
  const name = 'My Service';
  const duration = 300;
  const resultSet: HealthCheckResultSet = {
    a: {
      healthy: true,
      description: 'A works',
      duration: 300,
    },
    b: {
      healthy: false,
      description: 'B works',
      duration: 200,
      error: "B doesn't work",
    },
  };
  const summary = summarize(resultSet, duration, name);

  expect(summary.name).toBe('My Service');
  expect(summary.healthy).toBe(false);
  expect(summary.errors?.length).toBeGreaterThan(0);
});
