import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //Receber token
  const authToken = request.headers.authorization;
  // Validar se token esta preenchido
  if(!authToken) {
    return response.status(401).end();
  }
  // Separa a palavra Bearer do token e atribui a constante token
  const [, token] = authToken.split(" ");
  try {
    // Validar se token é valido usando o segredo
    const { sub } = verify(
      token, 
      "1dc40a7ec5018b9ab04b59ea44efde29"
    ) as IPayload;

    request.user_id = sub

    return next();
  } catch (err) {
    return response.status(401).end();
  }

  // Recuperar informações do usuário
}