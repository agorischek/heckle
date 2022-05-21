import Joi from 'joi';
import { RunConfig } from '../types';

import { targetConfigSchema } from './targetSchema';

const { object, string } = Joi.types();

export const runConfigSchema = object.keys({
  targets: object.pattern(string, targetConfigSchema),
});

export function isValidRunConfig(input: unknown): input is RunConfig {
  const result = runConfigSchema.validate(input);
  return !result.error;
}
