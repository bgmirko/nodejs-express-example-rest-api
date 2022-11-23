import {User} from '../database/modelsTypes';

export class UserService {
  // TODO implement type
  private db;

  constructor(database){
    this.db = database;
  } 
  // fetch Users with pagination
  async getUsers(query): Promise<{count: number; rows: [User]}> {
    return this.db.User.findAndCountAll({
      attributes: {exclude: ['deleteAt']},
      include: [{model: this.db.Book, as: 'Books'}],
      offset: query?.cursor ?? 0,
      limit: query?.limit ?? 10,
    });
  }

  async createUser(user: User): Promise<User> {
    return this.db.User.create({
      ...user,
    });
  }

  async getUserById(id: string): Promise<User> {
    return this.db.User.findOne({
      where: {
        uuid: id,
      },
      attributes: {exclude: ['password']},
      raw: true,
    });
  }

  async softDeleteUser(id: string): Promise<boolean> {
    return this.db.User.destroy({
      where: {
        uuid: id,
      },
    });
  }

  /*
   * Update User data
   */
  async updateUser(id: string, userData: any): Promise<User> {
    await this.db.User.update(
      {
        ...userData,
      },
      {
        where: {
          uuid: id,
        },
      },
    );

    return this.getUserById(id);
  }

  /*
   * Deactivate User data
   */
  async deactivateUser(uuid: string): Promise<User> {
    const result = await this.db.User.update(
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
    return this.db.User.findOne({
      where: {
        username,
      },
      raw: true,
    });
  }
}
