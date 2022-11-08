import db from "../database/models";
import { User } from "../database/modelsTypes";

export class UserService {
  // fetch Users with pagination
  static async getUsers(query): Promise<{count: number, rows: [User]}> {
    return db.User.findAndCountAll({
      attributes: { exclude: ["deleteAt"] },
      include: [{model: db.Book, as: "Books"}],
      offset: query?.cursor ?? 0,
      limit: query?.limit ?? 10,
    });
  }

  static async createUser(user: User): Promise<User> {
    return db.User.create(
      {
        ...user
      },
    );
  }

  static async getUserById(id: string): Promise<User> {
    return db.User.findOne({
      where: {
        uuid: id,
      },
      raw: true,
    });
  }

  static async deleteUser(id: string): Promise<boolean> {
    return db.User.destroy({
      where: {
        uuid: id,
      },
    });
  }

  /*
   * Update User data
   */
  static async updateUser(id: string, userData: User): Promise<User> {
    const result = await db.User.update(
      {
        ...userData,
      },
      {
        where: {
          uuid: id,
        },
      }
    );

    return this.getUserById(id);
  }
}
