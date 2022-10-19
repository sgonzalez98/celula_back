import { ValidationChain, body } from 'express-validator';

const indexRequest: ValidationChain[] = [
  body('celulaDesarrolloId')
    .exists().withMessage('La celulaDesarrolloId es requerido')
    .isString().withMessage('La celulaDesarrolloId debe de ser de tipo texto'),
];

export default indexRequest;
