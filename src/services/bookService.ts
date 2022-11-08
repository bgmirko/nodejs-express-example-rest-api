import db from "../database/models";
import { Book } from "../database/modelsTypes";

export class BookService {
  // fetch books with pagination
  static async getBooks(query): Promise<{count: number, rows: [Book]}> {
    return db.Book.findAndCountAll({
      attributes: { exclude: ["userId"] },
      offset: query?.cursor ?? 0,
      limit: query?.limit ?? 10,
    });
  }

  static async createBook(book: Book): Promise<Book> {
    return db.Book.create(
      {
        ...book
      },
    );
  }

  static async getBookById(id: number): Promise<Book> {
    return db.Book.findOne({
      where: {
        id,
      },
      raw: true,
    });
  }

  static async deleteBook(id: number): Promise<boolean> {
    return db.Book.destroy({
      where: {
        id,
      },
    });
  }

  /*
   * Update Book data
   */
  static async updateBook(id: number, bookData: Book): Promise<Book> {
    const result = await db.Book.update(
      {
        ...bookData,
      },
      {
        where: {
          id,
        },
      }
    );

    return this.getBookById(id);
  }
}
