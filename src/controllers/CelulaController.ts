import { Request, Response } from "express";
import { validateRequest } from "../utilities";
import { StatusCodes } from "http-status-codes";
import { internalErrors } from "../errors";
import Celula from "../models/celula";

class CelulaController {

  /**
   * @swagger
   *  paths:
   *    /celula:
   *      get:
   *        summary: Endpoint para recuperar las celulas registradas.
   *        description: Retorna un json con las celulas registradas
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
   *                  usuarioId: { type: 'string', example: '6233e5020f69906b6db8a91c' }
   *        responses:
   *          '200': { description: Un Array JSON con el valor final. }
   *          '400': { description: Los parametros del body son erroneos. }
   *          '401': { description: Usuario no autenticado. }
   *          '500': { description: Error de servidor. }
   */
  public async index(request: Request, response: Response) {
    try {
      validateRequest(request);

      const celulaList = await Celula.find({ usuarioId: request.query.usuarioId });

      if(!celulaList) {
        response.status(500).json({ success: false });
      }

      return response.status(200).send(celulaList);
    } catch (error) {
      return internalErrors(error, response);
    }
  }

  /**
   * @swagger
   *  paths:
   *    /celula/{id}:
   *      get:
   *        summary: Endpoint para buscar una celula en especifico.
   *        description: Retorna un json con los datos obtenidos
   *        securitySchemes:
   *          authorization: { scheme: bearer, bearerFormat: JWT }
   *        security:
   *          - authorization: []
   *        parameters:
   *          - in: path
   *            name: id
   *            required: true
   *            schema: { type: string }
   *        responses:
   *          '200': { description: Un Array JSON con el valor final. }
   *          '400': { description: Los parametros del body son erroneos. }
   *          '401': { description: Usuario no autenticado. }
   *          '500': { description: Error de servidor. }
   */
  public async find(request: Request, response: Response) {
    try {
      validateRequest(request);

      const celula = await Celula.findById(request.params.id);

      if(!celula) {
        response.status(500).json({ success: false, message: 'La celula con el id enviado no existe' });
      }

      return response.status(200).send(celula);
    } catch (error) {
      return internalErrors(error, response);
    }
  }

  /**
   * @swagger
   *  paths:
   *    /celula:
   *      post:
   *        summary: Endpoint para registrar celulas
   *        description: Registra una celula con los datos necesarios de esta
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
   *                  ministerio: { type: 'string', example: 'Adolecentes' }
   *                  usuarioId: { type: 'string', example: '6233e5020f69906b6db8a91c' }
   *                  lugar: { type: 'string', example: 'Vereda la Chapa' }
   *                  dia: { type: 'string', example: 'Lunes' }
   *                  hora: { type: 'string', example: '08:00 AM' }
   *                  descripcion: { type: 'string', example: 'Celula de adolecentes' }
   *        responses:
   *          '200': { description: Un Array JSON con el valor final. }
   *          '400': { description: Los parametros del body son erroneos. }
   *          '401': { description: Usuario no autenticado. }
   *          '500': { description: Error de servidor. }
   */
  public async register(request: Request, response: Response) {

    try {
      validateRequest(request);

      const celula = new Celula({
        ministerio: request.body.ministerio,
        usuarioId: request.body.usuarioId,
        lugar: request.body.lugar,
        dia: request.body.dia,
        hora: request.body.hora,
        descripcion: request.body.descripcion,
        estado: 'Activo',
      });

      const resp = await celula.save();

      if (!resp) {
        throw new Error("La celula no pudo ser creada");
      }

      return response.status(StatusCodes.CREATED).send(resp);
    } catch (error) {
      return internalErrors(error, response);
    }
  }

  /**
   * @swagger
   *  paths:
   *    /celula:
   *      put:
   *        summary: Endpoint para actualizar las celulas registradas.
   *        description: Retorna un json informando con la respectiva informacion
   *        securitySchemes:
   *          authorization: { scheme: bearer, bearerFormat: JWT }
   *        security:
   *          - authorization: []
   *        parameters:
   *          - in: path
   *            name: id
   *            required: true
   *            schema: { type: string }
   *        requestBody:
   *          content:
   *            Application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  ministerio: { type: 'string', example: 'Adolecentes' }
   *                  lugar: { type: 'string', example: 'Vereda la Chapa' }
   *                  dia: { type: 'string', example: 'Lunes' }
   *                  hora: { type: 'string', example: '08:00 AM' }
   *                  descripcion: { type: 'string', example: 'Celula de adolecentes' }
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

      const celula = await Celula.findById(request.params.id);
      if (!celula) {
        throw new Error("No se encontro la celula indicada");
      }

      celula.ministerio = request.body.ministerio;
      celula.lugar = request.body.lugar;
      celula.dia = request.body.dia;
      celula.hora = request.body.hora;
      celula.descripcion = request.body.descripcion;
      celula.estado = request.body.estado;

      const resp = await celula.save();
      if (!resp) {
        throw new Error("La celula no pudo ser creada");
      }

      return response.status(StatusCodes.OK).send(resp);
    } catch (error) {
      return internalErrors(error, response);
    }
  }

  /**
   * @swagger
   *  paths:
   *    /celula/{id}:
   *      delete:
   *        summary: Endpoint para eliminar una celula especifica.
   *        description: Retorna un json con la respuesta
   *        securitySchemes:
   *          authorization: { scheme: bearer, bearerFormat: JWT }
   *        security:
   *          - authorization: []
   *        parameters:
   *          - in: path
   *            name: id
   *            required: true
   *            schema: { type: string }
   *        responses:
   *          '200': { description: Un Array JSON con el valor final. }
   *          '400': { description: Los parametros del body son erroneos. }
   *          '401': { description: Usuario no autenticado. }
   *          '500': { description: Error de servidor. }
   */
     public delete(request: Request, response: Response) {
      Celula.findByIdAndRemove(request.params.id).then((celula) => {
        if (celula) {
            return response.status(StatusCodes.OK).json({ success: true, message: 'La celula se elimino correctamente' });
        } else {
            return response.status(StatusCodes.NOT_FOUND).json({ success: false, message: "Celula no encontrada" });
        }
      }).catch((err) => {
        return internalErrors(err, response);
      });
    }
}



export default CelulaController;