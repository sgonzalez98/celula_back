import { body, ValidationChain } from 'express-validator';

const registerRequest: ValidationChain[] = [
  body('celulaDesarrolloId')
    .exists().withMessage('La celulaDesarrolloId es requerido')
    .isString().withMessage('La celulaDesarrolloId debe de ser de tipo texto'),
  body('celulaParcicipanteId')
    .exists().withMessage('La celulaParcicipanteId es requerido')
    .isString().withMessage('La celulaParcicipanteId debe de ser de tipo texto'),
];

export default registerRequest;
