import {BaseRepository} from './_base';
import Book from '../models/book';

export class BookRepository extends BaseRepository<Book> {
  constructor() {
    super(Book);
  }

  // Add additional user-specific methods if needed
}

export default BookRepository;