import { TelemetryClient } from 'applicationinsights';
import { Printer } from '../utils';

export function flush(client: TelemetryClient, print: Printer) {
  return new Promise((resolve, reject) => {
    print.log('Flushing App Insights cache...');
    function callback(message: string) {
      const outcome = JSON.parse(message);
      if (outcome.errors?.length > 0) {
        print.log(`Couldn't log to App Insights: ${outcome.errors}`);
        reject(message);
      } else {
        print.log(
          `Logged ${outcome.itemsReceived} availability results to App Insights.`
        );
        resolve(message);
      }
    }
    client.flush({ callback });
  });
}
