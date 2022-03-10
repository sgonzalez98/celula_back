import { body, ValidationChain } from 'express-validator';

const indexRequest: ValidationChain[] = [
  body('fecha')
    .exists()
    .withMessage('El campo fecha es requerido')
    .isDate()
    .withMessage('El fecha debe de ser de tipo fecha'),
];

export default indexRequest;
