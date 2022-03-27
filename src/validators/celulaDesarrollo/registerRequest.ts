import { body, ValidationChain } from 'express-validator';

const registerRequest: ValidationChain[] = [
  body('celulaId')
    .exists().withMessage('La celulaId es requerido')
    .isString().withMessage('La celulaId debe de ser de tipo texto'),
  body('fecha')
    .exists().withMessage('El fecha es requerida')
    .isDate().withMessage('El fecha debe de ser de tipo fecha'),
  body('tema')
    .exists().withMessage('El tema es requerido')
    .isString().withMessage('El tema debe de ser de tipo texto'),
  body('textosBiblicos')
    .exists().withMessage('Los textosBiblicos son requeridos')
    .isString().withMessage('Los textosBiblicos debe de ser de tipo texto'),
  body('observacion')
    .exists().withMessage('La observacion es requerida')
    .isString().withMessage('La observacion debe de ser de tipo texto'),
];

export default registerRequest;
