import { Router } from "express";
import CelulaAsistenciaController from "../controllers/CelulaAsistenciaController";
import { findRequest, indexRequest, registerRequest } from "../validators/celulaAsistencia";

// Creamos router de Express
const router = Router();

// Instanciamos Controladores
const celulaAsistenciaController = new CelulaAsistenciaController();

router.get('/', indexRequest, celulaAsistenciaController.index);
router.post('/', registerRequest, celulaAsistenciaController.register);
router.delete('/:id', findRequest, celulaAsistenciaController.delete);

export default router;