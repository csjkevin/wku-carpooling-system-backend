import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { User } from '../entity/user';
import { Repository } from 'typeorm';
import { UserDTO } from '../dto/user';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userRepository: Repository<User>;

  async createUser(options: UserDTO) {
    const user = await this.userRepository.save(options);
    return user;
  }

  async deleteUser(options: UserDTO) {
    const user = await this.userRepository.findOneBy({
      id: options.id,
    });
    if (user) {
      await this.userRepository.remove(user);
    }
  }

  async updateUser(options: UserDTO) {
    const user = await this.userRepository.findOneBy({
      id: options.id,
    });
    if (user) {
      for (const key in options) {
        user[key] = options[key];
      }
      await this.userRepository.save(user);
    }
  }

  async getUser(options: UserDTO) {
    const user = await this.userRepository.findOneBy(options);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.find();
    return users;
  }
}
