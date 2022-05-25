import { monitorTarget } from './monitorTarget';
import { getMonitorConfig } from '../utils';

export async function monitor() {
  const monitorConfig = await getMonitorConfig();

  const targetIds = Object.keys(monitorConfig.targets);

  for await (const targetId of targetIds) {
    await monitorTarget(monitorConfig, targetId);
  }

  process.exit();
}
