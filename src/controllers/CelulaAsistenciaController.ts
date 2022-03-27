import { Request, Response } from "express";
import { validateRequest } from "../utilities";
import { StatusCodes } from "http-status-codes";
import { internalErrors } from "../errors";
import CelulaAsistencia from "../models/celulaAsistencia";

class CelulaAsistenciaController {

  /**
   * @swagger
   *  paths:
   *    /celulaasistencia:
   *      get:
   *        summary: Endpoint para recuperar las asistencias de una celula.
   *        description: Retorna un json con las asistencias de celulas registradas
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
   *                  celulaDesarrolloId: { type: 'string', example: '6233e5020f69906b6db8a91c' }
   *        responses:
   *          '200': { description: Un Array JSON con el valor final. }
   *          '400': { description: Los parametros del body son erroneos. }
   *          '401': { description: Usuario no autenticado. }
   *          '500': { description: Error de servidor. }
   */
  public async index(request: Request, response: Response) {
    try {
      validateRequest(request);

      const celulaAsistenciaList = await CelulaAsistencia.find({ celulaDesarrolloId: request.body.celulaDesarrolloId });

      if(!celulaAsistenciaList) {
        response.status(500).json({ success: false });
      }

      return response.status(200).send(celulaAsistenciaList);
    } catch (error) {
      return internalErrors(error, response);
    }
  }

  /**
   * @swagger
   *  paths:
   *    /celulaasistencia:
   *      post:
   *        summary: Endpoint para registrar asistencias de celulas
   *        description: Registra una asistencia de celula con los datos necesarios
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
   *                  celulaDesarrolloId: { type: 'string', example: '6233e5020f69906b6db8a91c' }
   *                  celulaParcicipanteId: { type: 'string', example: '6233e5020f69906b6db8a91c' }
   *        responses:
   *          '200': { description: Un Array JSON con el valor final. }
   *          '400': { description: Los parametros del body son erroneos. }
   *          '401': { description: Usuario no autenticado. }
   *          '500': { description: Error de servidor. }
   */
  public async register(request: Request, response: Response) {

    try {
      validateRequest(request);

      const celulaAsistencia = new CelulaAsistencia({
        celulaDesarrolloId: request.body.celulaDesarrolloId,
        celulaParcicipanteId: request.body.celulaParcicipanteId,
      });

      const resp = await celulaAsistencia.save();

      if (!resp) {
        throw new Error("La asistencia de la celula desarrollo no pudo ser creado");
      }

      return response.status(StatusCodes.CREATED).send(resp);
    } catch (error) {
      return internalErrors(error, response);
    }
  }

  /**
   * @swagger
   *  paths:
   *    /celulaasistencia/{id}:
   *      delete:
   *        summary: Endpoint para eliminar una asistencia de celula especifico.
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
      CelulaAsistencia.findByIdAndRemove(request.params.id).then((celulaAsistencia) => {
        if (celulaAsistencia) {
            return response.status(StatusCodes.OK).json({ success: true, message: 'Asistencia de celula eliminado correctamente' });
        } else {
            return response.status(StatusCodes.NOT_FOUND).json({ success: false, message: "Asistencia de celula no encontrado" });
        }
      }).catch((err) => {
        return internalErrors(err, response);
      });
    }
}



export default CelulaAsistenciaController;