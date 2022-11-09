import { Request, Response } from "express";
import { validateRequest } from "../utilities";
import { StatusCodes } from "http-status-codes";
import { internalErrors } from "../errors";
import CelulaParticipante from "../models/celulaParticipante";

class CelulaParticipanteController {

  /**
   * @swagger
   *  paths:
   *    /celulaparticipante:
   *      get:
   *        summary: Endpoint para recuperar los participantes de una celula.
   *        description: Retorna un json con los participantes de celulas registrados
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
   *                  celulaId: { type: 'string', example: '6233e5020f69906b6db8a91c' }
   *        responses:
   *          '200': { description: Un Array JSON con el valor final. }
   *          '400': { description: Los parametros del body son erroneos. }
   *          '401': { description: Usuario no autenticado. }
   *          '500': { description: Error de servidor. }
   */
  public async index(request: Request, response: Response) {
    try {
      validateRequest(request);

      const celulaParticipanteList = await CelulaParticipante.find({ celulaId: request.query.celulaId });

      if(!celulaParticipanteList) {
        response.status(500).json({ success: false });
      }

      return response.status(200).send(celulaParticipanteList);
    } catch (error) {
      return internalErrors(error, response);
    }
  }

  /**
   * @swagger
   *  paths:
   *    /celulaparticipante/{id}:
   *      get:
   *        summary: Endpoint para buscar un participante de una celula en especifico.
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

      const celulaParticipante = await CelulaParticipante.findById(request.params.id);

      if(!celulaParticipante) {
        response.status(500).json({ success: false, message: 'El participante de la celula con el id enviado no existe' });
      }

      return response.status(200).send(celulaParticipante);
    } catch (error) {
      return internalErrors(error, response);
    }
  }

  /**
   * @swagger
   *  paths:
   *    /celulaparticipante:
   *      post:
   *        summary: Endpoint para registrar participantes de celulas
   *        description: Registra un participante de celula con los datos necesarios
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
   *                  celulaId: { type: 'string', example: '6233e5020f69906b6db8a91c' }
   *                  nombre: { type: 'string', example: 'Juan Carmona' }
   *                  telefono: { type: 'string', example: '3104563235' }
   *                  edad: { type: 'integer', example: 17 }
   *        responses:
   *          '200': { description: Un Array JSON con el valor final. }
   *          '400': { description: Los parametros del body son erroneos. }
   *          '401': { description: Usuario no autenticado. }
   *          '500': { description: Error de servidor. }
   */
  public async register(request: Request, response: Response) {

    try {
      validateRequest(request);

      const celulaParticipante = new CelulaParticipante({
        celulaId: request.body.celulaId,
        nombre: request.body.nombre,
        telefono: request.body.telefono,
        edad: request.body.edad,
      });

      const resp = await celulaParticipante.save();

      if (!resp) {
        throw new Error("El participante de la celula no pudo ser creado");
      }

      return response.status(StatusCodes.CREATED).send(resp);
    } catch (error) {
      return internalErrors(error, response);
    }
  }

  /**
   * @swagger
   *  paths:
   *    /celulaparticipante:
   *      put:
   *        summary: Endpoint para actualizar el participante de celulas registradas.
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
   *                  celulaId: { type: 'string', example: '6233e5020f69906b6db8a91c' }
   *                  nombre: { type: 'string', example: 'Juan Carmona' }
   *                  telefono: { type: 'string', example: '3104563235' }
   *                  edad: { type: 'integer', example: 17 }
   *        responses:
   *          '200': { description: Un Array JSON con el valor final. }
   *          '400': { description: Los parametros del body son erroneos. }
   *          '401': { description: Usuario no autenticado. }
   *          '500': { description: Error de servidor. }
   */
  public async update(request: Request, response: Response) {
    try {
      validateRequest(request);

      const celulaParticipante = await CelulaParticipante.findById(request.params.id);
      if (!celulaParticipante) {
        throw new Error("No se encontro el participante de celula indicado");
      }

      celulaParticipante.celulaId = request.body.celulaId;
      celulaParticipante.nombre = request.body.nombre;
      celulaParticipante.telefono = request.body.telefono;
      celulaParticipante.edad = request.body.edad;

      const resp = await celulaParticipante.save();
      if (!resp) {
        throw new Error("El participante de celula no pudo ser creado");
      }

      return response.status(StatusCodes.OK).send(resp);
    } catch (error) {
      return internalErrors(error, response);
    }
  }

  /**
   * @swagger
   *  paths:
   *    /celulaparticipante/{id}:
   *      delete:
   *        summary: Endpoint para eliminar un participante de celula especifico.
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
      CelulaParticipante.findByIdAndRemove(request.params.id).then((celulaParticipante) => {
        if (celulaParticipante) {
            return response.status(StatusCodes.OK).json({ success: true, message: 'Participante de celula eliminado correctamente' });
        } else {
            return response.status(StatusCodes.NOT_FOUND).json({ success: false, message: "Participante de celula no encontrado" });
        }
      }).catch((err) => {
        return internalErrors(err, response);
      });
    }
}



export default CelulaParticipanteController;