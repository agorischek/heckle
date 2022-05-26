import { Context } from '@azure/functions';

import { monitorTarget } from './monitorTarget';
import { getMonitorConfig, Printer } from '../utils';

export async function monitor(context?: Context) {
  const print = new Printer(context);

  try {
    const monitorConfig = await getMonitorConfig();

    const targetIds = Object.keys(monitorConfig.targets);

    print.log(
      `Loaded Monitor Config with ${
        targetIds.length
      } target(s): ${targetIds.join(', ')}`
    );

    for await (const targetId of targetIds) {
      try {
        await monitorTarget(monitorConfig, targetId, print);
      } catch (error) {
        print.log(
          `Couldn't complete monitoring of ${monitorConfig.targets[targetId].name}: ${error}`
        );
      }
    }

    print.log('Finished provoking targets; exiting.');
    if (context) context.done();
  } catch (error) {
    print.log(`Couldn't complete monitoring: ${error}`);
  }
}
