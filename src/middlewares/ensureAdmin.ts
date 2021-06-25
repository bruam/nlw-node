import { getCustomRepository } from 'typeorm';
import { Request, Response, NextFunction } from "express";
import { UserRepositories } from '../repositories/UserRepositories';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Recupera id do usuário a partir da requisição
  const { user_id } = request;
  
  const usersRepositories = getCustomRepository(UserRepositories);

  const { admin } = await usersRepositories.findOne(user_id);
  
  // Verifica se usuário admin
  
  if(admin) {
    return next();
  }

  return response.status(401).json({
    error: "Unauthorized",
  });
}