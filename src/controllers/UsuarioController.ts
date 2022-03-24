import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import Usuario from "../models/usuario";
import { validateRequest } from "../utilities";
import { StatusCodes } from "http-status-codes";
import { internalErrors } from "../errors";
import jwt from 'jsonwebtoken';
import { jwtSecret } from "../config/global";

class UsuarioController {

  /**
   * @swagger
   *  paths:
   *    /usuario:
   *      get:
   *        summary: Endpoint para recuperar los usuarios registrados.
   *        description: Retorna un json con los usuarios registrados
   *        securitySchemes:
   *          authorization: { scheme: bearer, bearerFormat: JWT }
   *        security:
   *          - authorization: []
   *        responses:
   *          '200': { description: Un Array JSON con el valor final. }
   *          '400': { description: Los parametros del body son erroneos. }
   *          '401': { description: Usuario no autenticado. }
   *          '500': { description: Error de servidor. }
   */
  public async index(request: Request, response: Response) {
    console.log("Entra a request");
    try {
      const userList = await Usuario.find().select('-clave');

      if(!userList) {
        response.status(500).json({ success: false });
      }

      return response.status(200).send(userList);
    } catch (error) {
      return internalErrors(error, response);
    }
  }

  /**
   * @swagger
   *  paths:
   *    /usuario/{id}:
   *      post:
   *        summary: Endpoint para buscar un usuario especifico.
   *        description: Retorna un json con el usuario buscado
   *        securitySchemes:
   *          authorization: { scheme: bearer, bearerFormat: JWT }
   *        security:
   *          - authorization: []
   *        parameters:
   *          - in: path
   *            name: id
   *            required: true
   *            schema: { type: integer }
   *        responses:
   *          '200': { description: Un Array JSON con el valor final. }
   *          '400': { description: Los parametros del body son erroneos. }
   *          '401': { description: Usuario no autenticado. }
   *          '500': { description: Error de servidor. }
   */
  public async find(request: Request, response: Response) {
    try {
      validateRequest(request);

      const user = await Usuario.findById(request.params.id).select('-clave');

      if(!user) {
        response.status(500).json({ success: false, message: 'El usuario con el id enviado no existe' });
      }

      return response.status(200).send(user);
    } catch (error) {
      return internalErrors(error, response);
    }
  }

  /**
   * @swagger
   *  paths:
   *    /usuario/login:
   *      post:
   *        summary: Endpoint para realizar el inicio de sesión
   *        description: Retorna un json con su respectiva informacion
   *        requestBody:
   *          content:
   *            Application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  usuario: { type: 'string', example: 'carlos' }
   *                  clave: { type: 'string', example: '123' }
   *        responses:
   *          '200': { description: Un Array JSON con el valor final. }
   *          '400': { description: Los parametros del body son erroneos. }
   *          '401': { description: Usuario no autenticado. }
   *          '500': { description: Error de servidor. }
   */
  public async login(request: Request, response: Response) {
    try {
      validateRequest(request);

      const user = await Usuario.findOne({ usuario: request.body.usuario, estado: 'Activo' });
      if (!user) {
        throw new Error("No se encontro el usuario indicado o no esta activo");
      }

      if (!bcrypt.compareSync(request.body.clave, user.clave)) {
        throw new Error("Credenciales incorrectas");
      }

      const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, jwtSecret, { expiresIn: '1d' });
      return response.status(StatusCodes.OK).json({ nombre: user.nombre, token });
    } catch (error) {
      return internalErrors(error, response);
    }
  }

  /**
   * @swagger
   *  paths:
   *    /usuario/register:
   *      post:
   *        summary: Endpoint para registrar usuarios
   *        description: Registra un usuario con los datos necesarios de este
   *        securitySchemes:
   *          authorization: { scheme: bearer, bearerFormat: JWT }
   *        security:
   *          - authorization: []
   *        requestBody:
   *          content:
   *            Application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  nombre: { type: 'string', example: 'Juan' }
   *                  usuario: { type: 'string', example: 'juan' }
   *                  clave: { type: 'string', example: 'clave123' }
   *                  isAdmin: { type: 'boolean', example: true }
   *        responses:
   *          '200': { description: Un Array JSON con el valor final. }
   *          '400': { description: Los parametros del body son erroneos. }
   *          '401': { description: Usuario no autenticado. }
   *          '500': { description: Error de servidor. }
   */
     public async register(request: Request, response: Response) {

      try {
        validateRequest(request);

        const passwordHash = bcrypt.hashSync(request.body.clave, 10);

        const usuario = new Usuario({
          nombre: String(request.body.nombre).toLowerCase(),
          usuario: String(request.body.usuario).toLowerCase(),
          clave: passwordHash,
          isAdmin: request.body.isAdmin,
          estado: 'Activo',
        });

        const resp = await usuario.save();

        if (!resp) {
          throw new Error("El usuario no pudo ser creado");
        }

        return response.status(StatusCodes.CREATED).send(resp);
      } catch (error) {
        return internalErrors(error, response);
      }
    }

  /**
   * @swagger
   *  paths:
   *    /usuario:
   *      put:
   *        summary: Endpoint para actualizar los usuarios registrados.
   *        description: Retorna un json informando con la respectiva informacion
   *        securitySchemes:
   *          authorization: { scheme: bearer, bearerFormat: JWT }
   *        security:
   *          - authorization: []
   *        requestBody:
   *          content:
   *            Application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  nombre: { type: 'string', example: 'Juan' }
   *                  usuario: { type: 'string', example: 'juan' }
   *                  clave: { type: 'string', example: 'clave123' }
   *                  isAdmin: { type: 'boolean', example: true }
   *                  estado: { type: 'string', example: 'Activo | Inactivo' }
   *        responses:
   *          '200': { description: Un Array JSON con el valor final. }
   *          '400': { description: Los parametros del body son erroneos. }
   *          '401': { description: Usuario no autenticado. }
   *          '500': { description: Error de servidor. }
   */
  public async update(request: Request, response: Response) {
    try {
      validateRequest(request);

      const user = await Usuario.findById(request.params.id);
      if (!user) {
        throw new Error("No se encontro el usuario indicado");
      }

      user.nombre = String(request.body.nombre).toLowerCase();
      user.usuario = String(request.body.usuario).toLowerCase();
      user.isAdmin = request.body.isAdmin;
      user.estado = request.body.estado;

      if (request.body.clave) {
        user.clave = bcrypt.hashSync(request.body.clave, 10);
      }

      const resp = await user.save();
      if (!resp) {
        throw new Error("El usuario no pudo ser creado");
      }

      return response.status(StatusCodes.OK).send(resp);
    } catch (error) {
      return internalErrors(error, response);
    }
  }
}

export default UsuarioController;