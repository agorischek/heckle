import { timer } from './timer';
import { HealthCheck, HealthCheckFunction } from './types';

export function check(
  description: string,
  fn: HealthCheckFunction
): HealthCheck {
  const healthCheck = async () => {
    const time = timer();
    try {
      await fn();
      const duration = time();
      return {
        healthy: true,
        duration,
        description: description,
      };
    } catch (error) {
      const duration = time();
      const errorMessage =
        typeof error === 'string'
          ? error
          : error instanceof Error
          ? error.message
          : String(error);
      return {
        healthy: false,
        duration,
        description: description,
        error: errorMessage,
      };
    }
  };
  return healthCheck;
}
