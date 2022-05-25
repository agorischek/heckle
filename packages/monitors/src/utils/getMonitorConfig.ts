import { cosmiconfig } from 'cosmiconfig';
import { MonitorConfig } from '../types';

export async function getMonitorConfig(): Promise<MonitorConfig> {
  const searchPlaces = [`monitor.config.js`, `monitor.config.cjs`];
  const explorer = cosmiconfig('checks', { searchPlaces });
  const result = await explorer.search();
  if (!result?.config) throw 'No config found';
  return result.config;
}
