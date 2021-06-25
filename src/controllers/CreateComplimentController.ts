import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";


class CreateComplimentController {
  async handle(request: Request, response: Response) {
    // Recebe informações de elogio do corpo da requisição
    const { tag_id, user_receiver, message } = request.body;
    const { user_id } = request;
    // Instancia service do elogio
    const createComplimentService = new CreateComplimentService();
    // Executa função do service para criar elogio
    const compliment = await createComplimentService.execute({
      tag_id,
      user_receiver,
      user_sender: user_id, // Usa id de usuário da autenticação
      message,
    });
    // Retorna elogio em formato json
    return response.json(compliment);
  }
}

export { CreateComplimentController };