import { Timer } from './Timer';
import { HealthCheck, HealthCheckFunction } from './types';

export function check(
  description: string,
  fn: HealthCheckFunction
): HealthCheck {
  const healthCheck = async () => {
    const timer = new Timer();
    try {
      await fn();
      const duration = timer.stop();
      return {
        healthy: true,
        duration,
        description: description,
      };
    } catch (error) {
      const duration = timer.stop();
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
