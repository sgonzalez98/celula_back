import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";

import indexRequest from "../validators/usuarioController/indexRequest";
import registerRequest from "../validators/usuarioController/registerRequest";

// Creamos router de Express
const router = Router();

// Instanciamos Controladores
const usuarioController = new UsuarioController();

router.get('/', indexRequest, usuarioController.index);
// router.get('/:id', indexRequest, usuarioController.index);
// router.post('/login', indexRequest, usuarioController.index);
router.post('/register', registerRequest, usuarioController.register);
// router.put('/update/:id', indexRequest, usuarioController.index);

export default router;