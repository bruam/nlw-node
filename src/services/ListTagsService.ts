import { getCustomRepository } from 'typeorm';
import { TagsRepositories } from '../repositories/TagsRepositories';
import { classToPlain } from "class-transformer";

class ListTagsService {
  async execute() {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    const tags = await tagsRepositories.find();
    // Adicionando # na frente do nome das tags
    //tags = tags.map((tag) => ({ ...tag, nameCustom: `#${tag.name}`}));

    return classToPlain(tags); // Cria novos objetos com o name_custom
  }
}

export { ListTagsService };