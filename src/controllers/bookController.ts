import {BookService} from '../services/bookService';
import type {Request, Response} from 'express';
import {Book} from '../database/modelsTypes';
import {TokenUserPayload} from '../utils/types';
import {RequestCustom} from '../utils/types';
import {RoleType} from '../utils/enums';
import db from '../database/models';
export class BookController {
  private bookService: BookService

  constructor(){
    this.bookService = new BookService(db);
  }

  async getBooks(req: Request, res: Response) {
    try {
      const {rows, count} = await this.bookService.getBooks(req.query);
      res.json({
        success: true,
        data: {
          books: rows,
          totalCount: count,
        },
        message: 'List of books fetch successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async createBook(req: Request, res: Response) {
    try {
      const book: Book = await this.bookService.createBook(req.body);
      res.json({
        success: true,
        book: book,
        message: 'Book is created successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteBook(req: RequestCustom, res: Response) {
    try {
      const id: number = parseInt(req.params.id);
      const book: Book = await this.bookService.getBookById(id);
      if (!book) {
        return res.status(400).json({
          success: false,
          message: "Book doesn't exists",
        });
      }
      const userData: TokenUserPayload = req.user;
      if (userData.role === RoleType.Author && book.userUid !== userData.uuid) {
        return res.status(400).json({
          success: false,
          message: 'Author Role can delete only own books',
        });
      }
      await this.bookService.deleteBook(id);
      res.json({
        success: true,
        message: 'Book is deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateBook(req: RequestCustom, res: Response) {
    try {
      const id: number = parseInt(req.params.id);
      const book: Book = await this.bookService.getBookById(id);
      if (!book) {
        return res.status(400).json({
          success: false,
          message: "Book doesn't exists",
        });
      }
      const userData: TokenUserPayload = req.user;
      if (userData.role === RoleType.Author && book.userUid !== userData.uuid) {
        return res.status(400).json({
          success: false,
          message: 'Author Role can delete only own books',
        });
      }
      const updatedBook: Book = await this.bookService.updateBook(id, req.body);
      res.json({
        success: true,
        data: {
          book: updatedBook,
        },
        message: 'Book is updated successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
