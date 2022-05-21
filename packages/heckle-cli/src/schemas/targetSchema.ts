import Joi from 'joi';

const { object, string } = Joi.types();

export const targetSchema = object.keys({
  name: string,
  displayEndpoint: string,
  endpoint: string.required(),
  params: object.pattern(string, string),
  headers: object.pattern(string, string),
});
