import express from 'express';
import type {Request, Response} from 'express';
import {BookController} from '../controllers/bookController';
import {authenticateUserToken} from '../middleware/authenticateToken';
import {RequestCustom} from '../utils/types';
import {authorPermissionCreateBook} from '../middleware/authorPermissionCreateBook';
import {Router} from 'express';
import { Service } from 'typedi';

@Service()
export class BookRouter {
  private router: Router;

  constructor(private bookController: BookController) {
    this.router = express.Router();
    this.initRouts();
  }

  initRouts() {
    this.router.get('/books', async (req: Request, res: Response) => {
      await this.bookController.getBooks(req, res);
    });
    this.router.post(
      '/books/new',
      authenticateUserToken,
      authorPermissionCreateBook,
      async (req: Request, res: Response) => {
        await this.bookController.createBook(req, res);
      },
    );
    this.router.delete(
      '/books/delete/:id',
      authenticateUserToken,
      async (req: RequestCustom, res: Response) => {
        await this.bookController.deleteBook(req, res);
      },
    );
    this.router.put(
      '/books/update/:id',
      authenticateUserToken,
      async (req: RequestCustom, res: Response) => {
        await this.bookController.updateBook(req, res);
      },
    );
  }

  getRouter() {
    return this.router;
  }
}

/**
 * @openapi
 * '/books':
 *  get:
 *     tags:
 *     - Books
 *     summary: Fetch books
 *     description: Fetch books with pagination
 *     parameters:
 *      - name: cursor
 *        in: path
 *        description: Cursor position (number) for pagination
 *        default: 0
 *        required: false
 *      - name: cursor
 *        in: limit
 *        description: Limit (number) how many rows to fetch (for pagination)
 *        default: 10
 *        required: false
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad request
 */

/**
 * @openapi
 * '/books/new':
 *  post:
 *     security:
 *     - Bearer: []
 *     tags:
 *     - Books
 *     summary: Create new book
 *     description: User need to be logged in. Author and Admin has different rights when use this route
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateBookInput'
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad request
 */

/**
 * @openapi
 * '/books/delete/{id}':
 *  delete:
 *     tags:
 *     - Books
 *     summary: Delete Book
 *     description: Only logged in user can delete book, admin and authors have different rights.
 *     parameters:
 *      - name: id
 *        in: path
 *        description: book ID
 *        default: 5
 *        required: true
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad request
 */

/**
 * @openapi
 * '/books/update/{id}':
 *  put:
 *     tags:
 *     - Books
 *     summary: Update existing book
 *     description: Update existing book. To use this route user should be logged, Admin and Authors have different rights.
 *     parameters:
 *      - name: id
 *        in: path
 *        description: book ID
 *        default: 5
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/UpdateBookInput'
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad request
 */
