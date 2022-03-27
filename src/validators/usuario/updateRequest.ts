import { body, param, ValidationChain } from 'express-validator';

const updateRequest: ValidationChain[] = [
  param('id')
    .exists().withMessage('El id es requerido')
    .isString().withMessage('El id debe de ser de tipo texto'),
  body('nombre')
    .exists().withMessage('El nombre es requerido')
    .isString().withMessage('El nombre debe de ser de tipo texto'),
  body('usuario')
    .exists().withMessage('El usuario es requerido')
    .isString().withMessage('El usuario debe de ser de tipo texto'),
  body('clave')
    .optional()
    .isString().withMessage('La clave debe de ser de tipo texto'),
  body('isAdmin')
    .exists().withMessage('El isAdmin es requerido')
    .isBoolean().withMessage('El isAdmin debe de ser de tipo boolean'),
  body('estado')
    .exists().withMessage('El estado es requerido')
    .isString().withMessage('El estado debe de ser de tipo texto'),
];

export default updateRequest;
