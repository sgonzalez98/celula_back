import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function errorHandler(error: ErrorRequestHandler, request: Request, response: Response, next: NextFunction) {
  if (error.name === 'UnauthorizedError') {
    // jwt authentication error
    return response.status(401).json({message: "Usuario no autorizado"})
  }

  if (error.name === 'ValidationError') {
    //  validation error
    return response.status(401).json({message: error})
  }

  // default to 500 server error
  return response.status(500).json(error);
}