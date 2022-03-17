import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import Usuario from "../models/usuario";
import { validateRequest } from "../utilities";
import { StatusCodes } from "http-status-codes";
import { internalErrors } from "errors";

class UsuarioController {

  /**
   * @swagger
   *  paths:
   *    /usuario:
   *      get:
   *        summary: Endpoint para recuperar los usuarios registrados.
   *        description: Retorna un json con los usuarios registrados
   *        securitySchemes:
   *          authorization: 
   *            scheme: bearer
   *            bearerFormat: JWT
   *        security:
   *          - authorization: []
   *        responses:
   *          '200': { description: Un Array JSON con el valor final. }
   *          '400': { description: Los parametros del body son erroneos. }
   *          '401': { description: Usuario no autenticado. }
   *          '500': { description: Error de servidor. }
   */
  public index(request: Request, response: Response) : Response {
    const userList = Usuario.find().select('-clave');

    if(!userList) {
      response.status(500).json({ success: false });
    }

    return response.status(200).send(userList);
  }

  /**
   * @swagger
   *  paths:
   *    /usuario/{id}:
   *      post:
   *        summary: Endpoint para recuperar los usuarios registrados.
   *        description: Retorna un json informando el estado del proceso
   *        securitySchemes:
   *          authorization: 
   *            scheme: bearer
   *            bearerFormat: JWT  
   *        parameters:
   *          - in: path
   *            name: id
   *            required: true
   *            schema:
   *              type: integer
   *        responses:
   *          '200': { description: Un Array JSON con el valor final. }
   *          '400': { description: Los parametros del body son erroneos. }
   *          '401': { description: Usuario no autenticado. }
   *          '500': { description: Error de servidor. }
   */
  public find(request: Request, response: Response) : Response {
    const user = Usuario.findById(request.params.id).select('-clave');

    if(!user) {
      response.status(500).json({ success: false, message: 'El usuario con el id enviado no existe' });
    }

    return response.status(200).send(user);
  }

  /**
   * @swagger
   *  paths:
   *    /usuario/login:
   *      post:
   *        summary: Endpoint para recuperar los usuarios registrados.
   *        description: Retorna un json informando el estado del proceso
   *        requestBody:
   *          content:
   *            Application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  producto_id: { type: 'integer', example: 4 }
   *                  cliente_id: { type: 'integer', example: 2 }
   *                  bodega_id: { type: 'integer', example: 30 }
   *                  sitioentrega_id: { type: 'integer', example: 3 }
   *                  sucursal_id: { type: 'integer', example: 4 }
   *                  cantidad: { type: 'numeric', example: 213.34 }
   *                  valor: { type: 'numeric', example: 423.324 }
   *                  fecha: { type: 'date', example: "2021-05-08" }
   *        responses:
   *          '200': { description: Un Array JSON con el valor final. }
   *          '400': { description: Los parametros del body son erroneos. }
   *          '401': { description: Usuario no autenticado. }
   *          '500': { description: Error de servidor. }
   */
  public login(request: Request, response: Response) : Response {
    return response.send('Hola');
  }

  /**
   * @swagger
   *  paths:
   *    /usuario:
   *      post:
   *        summary: Endpoint para recuperar los usuarios registrados.
   *        description: Retorna un json informando el estado del proceso
   *        requestBody:
   *          content:
   *            Application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  producto_id: { type: 'integer', example: 4 }
   *                  cliente_id: { type: 'integer', example: 2 }
   *                  bodega_id: { type: 'integer', example: 30 }
   *                  sitioentrega_id: { type: 'integer', example: 3 }
   *                  sucursal_id: { type: 'integer', example: 4 }
   *                  cantidad: { type: 'numeric', example: 213.34 }
   *                  valor: { type: 'numeric', example: 423.324 }
   *                  fecha: { type: 'date', example: "2021-05-08" }
   *        responses:
   *          '200': { description: Un Array JSON con el valor final. }
   *          '400': { description: Los parametros del body son erroneos. }
   *          '401': { description: Usuario no autenticado. }
   *          '500': { description: Error de servidor. }
   */
     public register(request: Request, response: Response) : Response {

      try {
        validateRequest(request);
    
        const passwordHash = bcrypt.hashSync(request.body.clave, 10);

        const usuario = new Usuario({
          nombre: request.body.nombre,
          usuario: request.body.usuario,
          clave: passwordHash,
          isAdmin: request.body.isAdmin,
          estado: 'Activo',
        });

        const resp = usuario.save()
        .then((user) => {
          return user;
        }).catch((err: Error) => {
          throw new Error("El usuario no pudo ser creado" + err.message);
        });

        if (!resp) {
          throw new Error("El usuario no pudo ser creado");
        }

        return response.status(StatusCodes.CREATED).send(usuario);
      } catch (error) {
        return internalErrors(error, response);
      }
    }

  /**
   * @swagger
   *  paths:
   *    /usuario:
   *      put:
   *        summary: Endpoint para recuperar los usuarios registrados.
   *        description: Retorna un json informando el estado del proceso
   *        requestBody:
   *          content:
   *            Application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  producto_id: { type: 'integer', example: 4 }
   *                  cliente_id: { type: 'integer', example: 2 }
   *                  bodega_id: { type: 'integer', example: 30 }
   *                  sitioentrega_id: { type: 'integer', example: 3 }
   *                  sucursal_id: { type: 'integer', example: 4 }
   *                  cantidad: { type: 'numeric', example: 213.34 }
   *                  valor: { type: 'numeric', example: 423.324 }
   *                  fecha: { type: 'date', example: "2021-05-08" }
   *        responses:
   *          '200': { description: Un Array JSON con el valor final. }
   *          '400': { description: Los parametros del body son erroneos. }
   *          '401': { description: Usuario no autenticado. }
   *          '500': { description: Error de servidor. }
   */
  public update(request: Request, response: Response) : Response {
    return response.send('Hola');
  }
}

export default UsuarioController;