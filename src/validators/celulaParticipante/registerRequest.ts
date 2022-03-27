import { body, ValidationChain } from 'express-validator';

const registerRequest: ValidationChain[] = [
  body('celulaId')
    .exists().withMessage('La celulaId es requerido')
    .isString().withMessage('La celulaId debe de ser de tipo texto'),
  body('nombre')
    .exists().withMessage('El nombre es requerido')
    .isString().withMessage('El nombre debe de ser de tipo texto'),
  body('telefono')
    .exists().withMessage('El telefono es requerido')
    .isString().withMessage('La telefono debe de ser de tipo texto'),
  body('edad')
    .exists().withMessage('La edad es requerida')
    .isInt().withMessage('La edad debe de ser de tipo entero'),
];

export default registerRequest;
