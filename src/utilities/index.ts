import { Request } from 'express';
import { Schema } from 'mongoose';
import { validationResult } from 'express-validator';
import IResponseValidator from '../interfaces/IResponseValidator';
import { ValidateRequestError } from '../errors';


// Declaracion de metodo toJSON mongoose
export const mongoToJson = (schema: Schema) => {
  return schema.method('toJSON', function obj() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __v, _id: id, ...object } = this.toObject();
    return { id, ...object };
  });
};


// Validaciones de request body
export const validator = (request: Request): IResponseValidator => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return {
      message: 'Los datos enviados no son validos',
      hasErrors: true,
      errors: errors.array()
    };
  }
  return { hasErrors: false };
};


// Validate Request method
export function validateRequest(request: Request) : void {
  const validateRequest: IResponseValidator = validator(request);
  if (validateRequest.hasErrors) {
    throw new ValidateRequestError(JSON.stringify(validateRequest));
  }
}