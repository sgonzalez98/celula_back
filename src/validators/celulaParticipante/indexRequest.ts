import { ValidationChain, query } from 'express-validator';

const indexRequest: ValidationChain[] = [
  query('celulaId')
    .exists().withMessage('La celulaId es requerido')
    .isString().withMessage('La celulaId debe de ser de tipo texto'),
];

export default indexRequest;
