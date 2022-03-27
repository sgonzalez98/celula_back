import { Request, Response } from "express";
import { validateRequest } from "../utilities";
import { StatusCodes } from "http-status-codes";
import { internalErrors } from "../errors";
import CelulaDesarrollo from "../models/celulaDesarrollo";

class CelulaDesarrolloController {

  /**
   * @swagger
   *  paths:
   *    /celuladesarrollo:
   *      get:
   *        summary: Endpoint para recuperar los desarrollos de una celula.
   *        description: Retorna un json con los desarrollos de celulas registrados
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

      const CelulaDesarrolloList = await CelulaDesarrollo.find({ celulaId: request.body.celulaId });

      if(!CelulaDesarrolloList) {
        response.status(500).json({ success: false });
      }

      return response.status(200).send(CelulaDesarrolloList);
    } catch (error) {
      return internalErrors(error, response);
    }
  }

  /**
   * @swagger
   *  paths:
   *    /celuladesarrollo/{id}:
   *      get:
   *        summary: Endpoint para buscar un desarrollo de una celula en especifico.
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

      const celulaDesarrollo = await CelulaDesarrollo.findById(request.params.id);

      if(!celulaDesarrollo) {
        response.status(500).json({ success: false, message: 'El desarrollo de la celula con el id enviado no existe' });
      }

      return response.status(200).send(celulaDesarrollo);
    } catch (error) {
      return internalErrors(error, response);
    }
  }

  /**
   * @swagger
   *  paths:
   *    /celuladesarrollo:
   *      post:
   *        summary: Endpoint para registrar desarrollos de celulas
   *        description: Registra un desarrollo de celula con los datos necesarios
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
   *                  fecha: { type: 'date', example: '2022-03-22 18:00' }
   *                  tema: { type: 'string', example: 'Celula sobre el camino que realizo en jerico' }
   *                  textosBiblicos: { type: 'string', example: 'Juan 4:11-15, Lucas 7:1-3' }
   *                  observacion: { type: 'string', example: 'Alguna observación' }
   *        responses:
   *          '200': { description: Un Array JSON con el valor final. }
   *          '400': { description: Los parametros del body son erroneos. }
   *          '401': { description: Usuario no autenticado. }
   *          '500': { description: Error de servidor. }
   */
  public async register(request: Request, response: Response) {

    try {
      validateRequest(request);

      const celulaDesarrollo = new CelulaDesarrollo({
        celulaId: request.body.celulaId,
        fecha: request.body.fecha,
        tema: request.body.tema,
        textosBiblicos: request.body.textosBiblicos,
        observacion: request.body.observacion,
      });

      const resp = await celulaDesarrollo.save();

      if (!resp) {
        throw new Error("El desarrollo de la celula no pudo ser creado");
      }

      return response.status(StatusCodes.CREATED).send(resp);
    } catch (error) {
      return internalErrors(error, response);
    }
  }

  /**
   * @swagger
   *  paths:
   *    /celuladesarrollo:
   *      put:
   *        summary: Endpoint para actualizar el desarrollo de celulas registradas.
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
   *                  fecha: { type: 'date', example: '2022-03-22 18:00' }
   *                  tema: { type: 'string', example: 'Celula sobre el camino que realizo en jerico' }
   *                  textosBiblicos: { type: 'string', example: 'Juan 4:11-15, Lucas 7:1-3' }
   *                  observacion: { type: 'string', example: 'Alguna observación' }
   *        responses:
   *          '200': { description: Un Array JSON con el valor final. }
   *          '400': { description: Los parametros del body son erroneos. }
   *          '401': { description: Usuario no autenticado. }
   *          '500': { description: Error de servidor. }
   */
  public async update(request: Request, response: Response) {
    try {
      validateRequest(request);

      const celulaDesarrollo = await CelulaDesarrollo.findById(request.params.id);
      if (!celulaDesarrollo) {
        throw new Error("No se encontro el participante de celula indicado");
      }

      celulaDesarrollo.celulaId = request.body.celulaId;
      celulaDesarrollo.fecha = request.body.fecha;
      celulaDesarrollo.tema = request.body.tema;
      celulaDesarrollo.textosBiblicos = request.body.textosBiblicos;
      celulaDesarrollo.observacion = request.body.observacion;

      const resp = await celulaDesarrollo.save();
      if (!resp) {
        throw new Error("El desarrollo de celula no pudo ser creado");
      }

      return response.status(StatusCodes.OK).send(resp);
    } catch (error) {
      return internalErrors(error, response);
    }
  }

  /**
   * @swagger
   *  paths:
   *    /celuladesarrollo/{id}:
   *      delete:
   *        summary: Endpoint para eliminar un desarrollo de celula especifico.
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
      CelulaDesarrollo.findByIdAndRemove(request.params.id).then((celulaDesarrollo) => {
        if (celulaDesarrollo) {
            return response.status(StatusCodes.OK).json({ success: true, message: 'Desarrollo de celula eliminado correctamente' });
        } else {
            return response.status(StatusCodes.NOT_FOUND).json({ success: false, message: "Desarrollo de celula no encontrado" });
        }
      }).catch((err) => {
        return internalErrors(err, response);
      });
    }
}



export default CelulaDesarrolloController;