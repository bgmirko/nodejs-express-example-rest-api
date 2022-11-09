import db from "../database/models";
import { User } from "../database/modelsTypes";

export class UserService {
  // fetch Users with pagination
  static async getUsers(query): Promise<{ count: number; rows: [User] }> {
    return db.User.findAndCountAll({
      attributes: { exclude: ["deleteAt"] },
      include: [{ model: db.Book, as: "Books" }],
      offset: query?.cursor ?? 0,
      limit: query?.limit ?? 10,
    });
  }

  static async createUser(user: User): Promise<User> {
    return db.User.create({
      ...user,
    });
  }

  static async getUserById(id: string): Promise<User> {
    return db.User.findOne({
      where: {
        uuid: id,
      },
      attributes: { exclude: ["password"] },
      raw: true,
    });
  }

  static async softDeleteUser(id: string): Promise<boolean> {
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
    await db.User.update(
      {
        ...userData,
      },
      {
        where: {
          uuid: id,
        }
      }
    );

    return this.getUserById(id);
  }

  /*
   * Deactivate User data
   */
  static async deactivateUser(uuid: string): Promise<User> {
    const result = await db.User.update(
      {
        active: false,
      },
      {
        where: {
          uuid
        },
      }
    );

    return this.getUserById(uuid);
  }

  static async getUserByUsername(username: string): Promise<User> {
    return db.User.findOne({
      where: {
        username,
      },
      raw: true,
    });
  }
}
