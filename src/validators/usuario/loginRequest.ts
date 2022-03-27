import { body, ValidationChain } from 'express-validator';

const loginRequest: ValidationChain[] = [
  body('usuario')
    .exists().withMessage('El usuario es requerido')
    .isString().withMessage('El usuario debe de ser de tipo texto'),
  body('clave')
    .exists().withMessage('La clave es requerida')
    .isString().withMessage('La clave debe de ser de tipo texto'),
];

export default loginRequest;
