import { BookService } from "../services/bookService";
import type { Request, Response } from "express";

export class BookController {
  static async getBooks(req: Request, res: Response) {
    try {
      const { rows, count } = await BookService.getBooks(req.query);
      res.json({
        success: true,
        data: {
          books: rows,
          totalCount: count,
        },
        message: "List of books fetch successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async createBook(req: Request, res: Response) {
    try {
      const book = await BookService.createBook(req.body);
      res.json({
        success: true,
        book: book,
        message: "Book is created successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async deleteBook(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const book = await BookService.getBookById(id);
      if (!book) {
        return res.status(400).json({
          success: false,
          message: "Book doesn't exists",
        });
      }
      await BookService.deleteBook(id);
      res.json({
        success: true,
        message: "Book is deleted successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async updateBook(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const book = await BookService.getBookById(id);
      if (!book) {
        return res.status(400).json({
          success: false,
          message: "Book doesn't exists",
        });
      }
      const updatedBook = await BookService.updateBook(id, req.body);
      res.json({
        success: true,
        data: {
          book: updatedBook,
        },
        message: "Book is updated successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}
