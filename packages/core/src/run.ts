import { evaluate } from './evaluate';
import { summarize } from './summarize';
import { Config } from './types';

export async function run(config: Config, id?: string) {
  const { checks, name } = config;
  const results = await evaluate(checks, id);
  const summary = summarize(results, name);

  return summary;
}
