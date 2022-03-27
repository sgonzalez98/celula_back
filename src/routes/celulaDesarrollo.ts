import { Router } from "express";
import CelulaDesarrolloController from "../controllers/CelulaDesarrolloController";
import { findRequest, indexRequest, registerRequest, updateRequest } from "../validators/celulaDesarrollo";

// Creamos router de Express
const router = Router();

// Instanciamos Controladores
const celulaDesarrolloController = new CelulaDesarrolloController();

router.get('/', indexRequest, celulaDesarrolloController.index);
router.get('/:id', findRequest, celulaDesarrolloController.find);
router.post('/', registerRequest, celulaDesarrolloController.register);
router.put('/:id', updateRequest, celulaDesarrolloController.update);
router.delete('/:id', findRequest, celulaDesarrolloController.delete);

export default router;