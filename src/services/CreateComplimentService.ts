import { getCustomRepository } from 'typeorm';
import { ComplimentRepositories } from '../repositories/ComplimentsRepositories';
import { UserRepositories } from '../repositories/UserRepositories';


interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {

  async execute({tag_id, user_sender, user_receiver, message}:IComplimentRequest) {
    const complimentRepositories = getCustomRepository(ComplimentRepositories);
    const userRepositories = getCustomRepository(UserRepositories);

    // Verifica se usuário não esta enviando elogio para ele mesmo
    if(user_sender === user_receiver) {
      throw new Error("Incorrect User Receiver!");
    }

    // Verifica se user existe a partir do id
    const userReceiverExists = await userRepositories.findOne(user_receiver);

    // Verifica se usuário existe
    if(!userReceiverExists) {
      throw new Error("User Receiver does not exists!");
    }

    // Com tudo validado, poe criar o elogio
    const compliment = complimentRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message
    });
    
    await complimentRepositories.save(compliment); // Salva elogio

    return compliment; // Retorna elogio
  }
}

export { CreateComplimentService };