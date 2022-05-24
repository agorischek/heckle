import { evaluate } from './evaluate';
import { summarize } from './summarize';
import { timer } from './timer';
import { Config } from './types';

export async function run(config: Config, id?: string) {
  const { checks, name } = config;

  const time = timer();
  const results = await evaluate(checks, id);
  const duration = time();
  console.log(duration);
  const summary = summarize(results, duration, name);

  return summary;
}
