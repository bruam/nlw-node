import { getCustomRepository } from 'typeorm';
import { sign } from "jsonwebtoken";
import { compare } from 'bcryptjs';

import { UserRepositories } from '../repositories/UserRepositories';


interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {

  async execute({email, password}: IAuthenticateRequest) {
    const userRepositories = getCustomRepository(UserRepositories);
    // Verificar se email existe
    const user = await userRepositories.findOne({
      email
    });

    if(!user) {
      throw new Error("Email/Password incorrect");
    }
    // Verificar se senha correta
    // 12345 / $2a$08$IxSRPBPcelhnUGzSqaB5qezPmKg9S4gabLHBJZpVUjKhOz4S/NBxy
    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }
    // Gerar token
    const token = sign(
      {
        email: user.email
      },
      "1dc40a7ec5018b9ab04b59ea44efde29", // segredo criado com gerado de md5
      { 
        subject: user.id,
        expiresIn: "1d", // token expira em 1 dia
      }
    );
    return token;
  }
}

export { AuthenticateUserService };