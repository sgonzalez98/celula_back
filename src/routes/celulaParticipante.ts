import { Router } from "express";
import CelulaParticipanteController from "../controllers/CelulaParticipanteController";
import { findRequest, indexRequest, registerRequest, updateRequest } from "../validators/celulaParticipanteController";

// Creamos router de Express
const router = Router();

// Instanciamos Controladores
const celulaParticipanteController = new CelulaParticipanteController();

router.get('/', indexRequest, celulaParticipanteController.index);
router.get('/:id', findRequest, celulaParticipanteController.find);
router.post('/', registerRequest, celulaParticipanteController.register);
router.put('/:id', updateRequest, celulaParticipanteController.update);
router.delete('/:id', findRequest, celulaParticipanteController.delete);

export default router;