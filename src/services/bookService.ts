import {Service} from 'typedi';
import Book from '../database/models/book';
import { ModelStatic } from 'sequelize';
import BookRepository from '../database/repositories/book';

@Service()
export class BookService {
  private bookRepository: BookRepository;
  private model: ModelStatic<Book>
  private idKeyName: string;

  constructor() {
    this.bookRepository = new BookRepository();
    this.model = this.bookRepository.getModel();
    this.idKeyName = Book.primaryKeyAttribute;
  }
  // fetch books with pagination
  async getBooks(query): Promise<{count: number; rows: Book[]}> {
    const options = {
      attributes: {exclude: ['userId']},
    };
    return this.bookRepository.findAndCountAll(options, query);
  }

  async getBookById(id: number): Promise<Book> {
    const options = { raw: true}
    return this.bookRepository.getById(this.idKeyName, id, options);
  }

  async createBook(book: Book): Promise<Book> {
    return this.bookRepository.create(book);
  }

  async deleteBook(id: number): Promise<number> {
    return this.bookRepository.delete(this.idKeyName, id);
  }

  /*
   * Update Book data
   */
  async updateBook(id: number, bookData: Partial<Book>): Promise<Book> {
    await this.bookRepository.update(this.idKeyName, id, bookData);

    return this.getBookById(id);
  }
}
