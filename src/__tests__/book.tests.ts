import db from "../database/models";
import { BookService } from "../services/bookService";
import { Book } from "../database/modelsTypes";

describe("Book tests", () => {
  beforeEach(async () => {
    await db.sequelize.sync({ force: true });
    await db.User.create({
      uuid: "956b086d-f22d-43a3-8966-77d412555c3e",
      firstName: "Petar",
      lastName: "Petrovic",
      password: "test123",
      email: "petar@gmail.com",
      username: "petar80",
      active: true,
      role: "Admin",
    });
    await db.Book.create({
      id: 1,
      userUid: "956b086d-f22d-43a3-8966-77d412555c3e",
      title: "Book Title",
      description: "Book description",
      genre: "Classic",
      publisher: "Vulcan",
      numberOfPages: 300,
    });
  });

  it("After book is deleted, it shouldn't be possible to fetch it", async () => {
    const book: Book = await BookService.getBookById(1);
    await BookService.deleteBook(book.id);
    const bookRefetch: Book = await BookService.getBookById(1);
    expect(bookRefetch).toBeNull();
  });

  it("After book title is changed in db to New Title book should have New Title title on fetch", async () => {
    const book: Book = await BookService.getBookById(1);
    const bookData = {
      title: "New Title",
    };
    const updatedBook = await BookService.updateBook(book.id, bookData);
    expect(updatedBook.title).toBe("New Title");
  });

  it("After book is created it should be exists in database", async () => {
    const book: Book = await BookService.getBookById(1);
    expect(book).toBeDefined();
  });
});
