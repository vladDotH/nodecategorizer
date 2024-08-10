import { BadRequest } from "http-errors";
import Joi from "joi";
import * as uuid from "uuid";

export function validate<T>(schema: Joi.Schema<T>, data: any) {
  const res = schema.validate(data);
  if (res.error) {
    throw BadRequest(res.error.message);
  }
  return res.value;
}

export const uuidValidator = Joi.string()
  .messages({ uuid: "Invalid UUID" })
  .custom((value, helpers) => {
    if (uuid.validate(value)) return value;
    else return helpers.error("uuid");
  });
