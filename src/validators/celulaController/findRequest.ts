import { ValidationChain, param } from 'express-validator';

const findRequest: ValidationChain[] = [
  param('id')
    .exists().withMessage('El id es requerido')
    .isString().withMessage('El id debe de ser de tipo texto'),
];

export default findRequest;
