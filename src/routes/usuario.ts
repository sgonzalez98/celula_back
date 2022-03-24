import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";
import { loginRequest, registerRequest, findRequest, updateRequest } from '../validators/usuarioController';

// Creamos router de Express
const router = Router();

// Instanciamos Controladores
const usuarioController = new UsuarioController();

router.get('/', usuarioController.index);
router.get('/:id', findRequest, usuarioController.find);
router.post('/login', loginRequest, usuarioController.login);
router.post('/register', registerRequest, usuarioController.register);
router.put('/update/:id', updateRequest, usuarioController.update);

export default router;