import { body, ValidationChain } from 'express-validator';

const registerRequest: ValidationChain[] = [
  body('nombre')
    .exists().withMessage('El nombre es requerido')
    .isString().withMessage('El nombre debe de ser de tipo texto'),
  body('usuario')
    .exists().withMessage('El usuario es requerido')
    .isString().withMessage('El usuario debe de ser de tipo texto'),
  body('clave')
    .exists().withMessage('La clave es requerido')
    .isString().withMessage('La clave debe de ser de tipo texto'),
  body('isAdmin')
    .exists().withMessage('El isAdmin es requerido')
    .isBoolean().withMessage('El isAdmin debe de ser de tipo boolean'),
];

export default registerRequest;
