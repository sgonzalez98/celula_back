import { body, param, ValidationChain } from 'express-validator';

const updateRequest: ValidationChain[] = [
  param('id')
    .exists().withMessage('El id es requerido')
    .isString().withMessage('El id debe de ser de tipo texto'),
  body('ministerio')
    .exists().withMessage('El ministerio es requerido')
    .isString().withMessage('El nombre debe de ser de tipo texto'),
  body('lugar')
    .exists().withMessage('El lugar es requerido')
    .isString().withMessage('El lugar debe de ser de tipo texto'),
  body('dia')
    .exists().withMessage('El dia es requerido')
    .isString().withMessage('La dia debe de ser de tipo texto'),
  body('hora')
    .exists().withMessage('La hora es requerida')
    .isString().withMessage('La hora debe de ser de tipo texto'),
  body('descripcion')
    .exists().withMessage('La descripcion es requerida')
    .isString().withMessage('La descripcion debe de ser de tipo texto'),
  body('estado')
    .exists().withMessage('El estado es requerido')
    .isString().withMessage('El estado debe de ser de tipo texto'),
];

export default updateRequest;
