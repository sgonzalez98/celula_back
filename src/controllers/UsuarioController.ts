import { Request, Response } from "express";

class UsuarioController {

  public index(request: Request, response: Response) :Response {
    return response.send("Hola");
  }
}

export default UsuarioController;