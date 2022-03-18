import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";

// Validator Requests
import indexRequest from "../validators/usuarioController/indexRequest";
import registerRequest from "../validators/usuarioController/registerRequest";
import loginRequest from "../validators/usuarioController/loginRequest";

// Creamos router de Express
const router = Router();

// Instanciamos Controladores
const usuarioController = new UsuarioController();

router.get('/', indexRequest, usuarioController.index);
// router.get('/:id', indexRequest, usuarioController.index);
router.post('/login', loginRequest, usuarioController.login);
router.post('/register', registerRequest, usuarioController.register);
// router.put('/update/:id', indexRequest, usuarioController.index);

export default router;