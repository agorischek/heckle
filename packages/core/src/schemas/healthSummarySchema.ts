import Joi from 'joi';

import { HealthSummary } from '../types';

const { array, boolean, number, object, string } = Joi.types();

export const healthSummarySchema = object.keys({
  name: string,
  healthy: boolean,
  errors: array.items(string),
  duration: number,
  checks: object.pattern(
    string,
    object.keys({
      healthy: boolean.required(),
      description: string.required(),
      error: string,
      duration: number,
    })
  ),
});

export function isValidHealthSummary(input: unknown): input is HealthSummary {
  const result = healthSummarySchema.validate(input);
  return !result.error;
}
