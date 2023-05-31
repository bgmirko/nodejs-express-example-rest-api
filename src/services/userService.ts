import User from '../database/models/user';
import {Service} from 'typedi';
import UserRepository from '../database/repositories/user';
import {IRequestQuery} from '../utils/types';
import Book from '../database/models/book';
import { ModelStatic } from 'sequelize';

@Service()
export class UserService {
  private userRepository: UserRepository;
  private model: ModelStatic<User>
  private idKeyName: string;

  constructor() {
    this.userRepository = new UserRepository();
    this.model = this.userRepository.getModel();
    this.idKeyName = User.primaryKeyAttribute;
  }

  // fetch Users with pagination
  async getUsers(query: IRequestQuery): Promise<{count: number; rows: User[]}> {
    const options = {
      attributes: {exclude: ['deleteAt']},
      include: [{model: Book, as: 'books'}],
    };
    return this.userRepository.findAndCountAll(options, query);
  }

  async getUserById(id: string): Promise<User> {
    const options = {
      attributes: {exclude: ['password']},
      raw: true,
    };
    return this.userRepository.getById(this.idKeyName, id, options);
  }

  async createUser(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  async softDeleteUser(id: string): Promise<number> {
    return this.userRepository.delete(this.idKeyName, id);
  }

  /*
   * Update User data
   */
  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(this.idKeyName, id, userData);

    return this.getUserById(id);
  }

  /*
   * Deactivate User data
   */
  async deactivateUser(uuid: string): Promise<User> {
    await this.model.update(
      {
        active: false,
      },
      {
        where: {
          uuid,
        },
      },
    );

    return this.getUserById(uuid);
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.model.findOne({
      where: {
        username,
      },
      raw: true,
    });
  }
}
