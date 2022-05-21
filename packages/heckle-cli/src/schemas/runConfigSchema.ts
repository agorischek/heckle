import Joi from 'joi';

import { targetSchema } from './targetSchema';

const { object, string } = Joi.types();

export const runConfigSchema = object.keys({
  targets: object.pattern(string, targetSchema),
});
