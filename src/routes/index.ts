import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";
import indexRequest from "../validators/usuarioController/indexRequest";

// Creamos router de Express
const router = Router();

// Instanciamos Controladores
const usuarioController = new UsuarioController();

router.get('/', indexRequest, usuarioController.index);