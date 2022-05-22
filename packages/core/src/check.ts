import { HealthCheck, HealthCheckFunction } from './types';

export function check(
  description: string,
  fn: HealthCheckFunction
): HealthCheck {
  const healthCheck = async () => {
    try {
      await fn();
      return {
        healthy: true,
        description: description,
      };
    } catch (error) {
      const errorMessage =
        typeof error === 'string'
          ? error
          : error instanceof Error
          ? error.message
          : String(error);
      return {
        healthy: false,
        description: description,
        error: errorMessage,
      };
    }
  };
  return healthCheck;
}
