import { evaluate } from './evaluate';
import { summarize } from './summarize';
import { Config } from './types';

export async function run(config: Config) {
  const { checks, name } = config;
  const results = await evaluate(checks);
  const summary = summarize(results, name);

  return summary;
}
