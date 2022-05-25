import { TelemetryClient } from 'applicationinsights';

export function flush(client: TelemetryClient) {
  return new Promise((resolve, reject) => {
    function callback(message: string) {
      const outcome = JSON.parse(message);
      if (outcome.errors?.length > 0) {
        console.error(`Couldn't log to App Insights: ${outcome.errors}`);
        reject(message);
      } else {
        console.log(
          `Logged ${outcome.itemsReceived} availability results to App Insights`
        );
        resolve(message);
      }
    }
    client.flush({ callback });
  });
}
