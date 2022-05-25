import { TargetConfig } from '@heckle/core';
import Joi from 'joi';

const { alternatives, object, string } = Joi.types();

const simpleTargetConfigSchema = string;

const fullTargetConfigSchema = object.keys({
  name: string,
  displayEndpoint: string,
  endpoint: string.required(),
  params: object.pattern(string, string),
  headers: object.pattern(string, string),
});

export const targetConfigSchema = alternatives.try(
  simpleTargetConfigSchema,
  fullTargetConfigSchema
);

export function isValidTargetConfig(input: unknown): input is TargetConfig {
  const result = targetConfigSchema.validate(input);
  return !result.error;
}
