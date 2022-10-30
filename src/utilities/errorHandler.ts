import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function errorHandler(error: ErrorRequestHandler, request: Request, response: Response, next: NextFunction) {

  // jwt authentication error
  if (error.name === 'UnauthorizedError') {
    return response.status(401).json({ message: "Usuario no autorizado" })
  }

  //  validation error
  if (error.name === 'ValidationError') {
    return response.status(401).json({ message: error })
  }

  // default to 500 server error
  if (error) {
    return response.status(500).json({ message: error });
  }
}