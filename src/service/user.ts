import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { User } from '../entity/user';
import { Repository } from 'typeorm';
import { UserDTO } from '../dto/user';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userRepository: Repository<User>;

  async create(options: UserDTO) {
    const res = await this.userRepository.save(options);
    return res;
  }

  async delete(options: UserDTO) {
    const res = await this.userRepository.findOneBy({
      id: options.id,
    });
    if (res) {
      await this.userRepository.remove(res);
    }
  }

  async update(options: UserDTO) {
    const res = await this.userRepository.findOneBy({
      id: options.id,
    });
    if (res) {
      for (const key in options) {
        res[key] = options[key];
      }
      await this.userRepository.save(res);
    }
  }

  async get(options: UserDTO) {
    const res = await this.userRepository.findOneBy(options);
    return res;
  }

  async getAll() {
    const res = await this.userRepository.find();
    return res;
  }
}
