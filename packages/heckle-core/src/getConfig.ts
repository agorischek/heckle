import { cosmiconfig } from 'cosmiconfig';
import { Config } from './types';

export async function getConfig(): Promise<Config> {
  const searchPlaces = [`checks.config.js`, `checks.config.cjs`];
  const explorer = cosmiconfig('checks', { searchPlaces });
  const result = await explorer.search();
  if (!result?.config) throw 'No config round';
  return result.config;
}
