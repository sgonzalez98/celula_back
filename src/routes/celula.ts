import { Router } from "express";
import CelulaController from "../controllers/CelulaController";
import { findRequest, indexRequest, registerRequest } from "../validators/celulaController";

// Creamos router de Express
const router = Router();

// Instanciamos Controladores
const celulaController = new CelulaController();

router.get('/', indexRequest, celulaController.index);
router.get('/:id', findRequest, celulaController.find);
router.post('/', registerRequest, celulaController.register);
// router.put('/:id', updateRequest, celulaController.update);
// router.delete('/:id', findRequest, celulaController.delete);

export default router;