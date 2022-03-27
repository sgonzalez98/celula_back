import { ValidationChain, body } from 'express-validator';

const indexRequest: ValidationChain[] = [
  body('usuarioId')
    .exists().withMessage('El usuarioId es requerido')
    .isString().withMessage('El usuarioId debe de ser de tipo texto'),
];

export default indexRequest;
