import {Service} from 'typedi';
import {Book} from '../database/modelsTypes';
import db from '../database/models';

@Service()
export class BookService {
  // TODO implement type
  private db;

  // TODO inject database
  constructor() {
    this.db = db;
  }
  // fetch books with pagination
  async getBooks(query): Promise<{count: number; rows: [Book]}> {
    return this.db.Book.findAndCountAll({
      attributes: {exclude: ['userId']},
      offset: query?.cursor ?? 0,
      limit: query?.limit ?? 10,
    });
  }

  async createBook(book: Book): Promise<Book> {
    return this.db.Book.create({
      ...book,
    });
  }

  async getBookById(id: number): Promise<Book> {
    return this.db.Book.findOne({
      where: {
        id,
      },
      raw: true,
    });
  }

  async deleteBook(id: number): Promise<boolean> {
    return this.db.Book.destroy({
      where: {
        id,
      },
    });
  }

  /*
   * Update Book data
   */
  async updateBook(id: number, bookData: Partial<Book>): Promise<Book> {
    const result = await this.db.Book.update(
      {
        ...bookData,
      },
      {
        where: {
          id,
        },
      },
    );

    return this.getBookById(id);
  }
}
