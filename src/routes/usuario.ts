import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";
import { loginRequest, registerRequest, findRequest, updateRequest } from '../validators/usuario';

// Creamos router de Express
const router = Router();

// Instanciamos Controladores
const usuarioController = new UsuarioController();

router.get('/', usuarioController.index);
router.get('/:id', findRequest, usuarioController.find);
router.put('/:id', updateRequest, usuarioController.update);
router.delete('/:id', findRequest, usuarioController.delete);
router.post('/login', loginRequest, usuarioController.login);
router.post('/register', registerRequest, usuarioController.register);

export default router;