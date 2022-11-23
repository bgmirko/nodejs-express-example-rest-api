import {Book} from '../database/modelsTypes';

export class BookService {
  // TODO implement type
  private db;

  constructor(database){
    this.db = database;
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
  async updateBook(id: number, bookData: any): Promise<Book> {
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
