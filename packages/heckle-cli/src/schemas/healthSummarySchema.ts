import Joi from 'joi';

import { HealthSummary } from '@heckle/core';

const { array, boolean, object, string } = Joi.types();

export const healthSummarySchema = object.keys({
  name: string,
  healthy: boolean,
  errors: array.items(string),
  checks: object.pattern(
    string,
    object.keys({
      healthy: boolean.required(),
      description: string.required(),
      error: string,
    })
  ),
});

export function isValidHealthSummary(input: unknown): input is HealthSummary {
  const result = healthSummarySchema.validate(input);
  return !result.error;
}
