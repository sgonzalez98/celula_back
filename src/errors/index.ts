import { Response } from "express";
import { StatusCodes } from "http-status-codes";


// Error personalizado para request validate
class ValidateRequestError extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = 'ValidateRequestError';
  }
}

// Funcion para manejo de errores
function internalErrors (error: unknown | Error | ValidateRequestError, response: Response) : Response {
  if (error instanceof ValidateRequestError) {
    return response.status(StatusCodes.BAD_REQUEST).json({ success: false, message: JSON.parse(error.message) });
  }
  if (error instanceof Error) {
    return response.status(StatusCodes.CONFLICT).json({ success: false, message: error.message });
  }
  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Ocurrio un error en el servidor");
};

export { internalErrors, ValidateRequestError };