import { ValidationError } from 'express-validator';

/**
 * Interface response validator para la request.
 */
interface IResponseValidator {
  hasErrors: boolean;
  message?: string;
  errors?: ValidationError[];
}

export default IResponseValidator;
