import express, {Router} from 'express';
import type {Request, Response} from 'express';
import {AuthController} from '../controllers/authController';
import {Service} from 'typedi';

@Service()
export class AuthRouter {
  private router: Router;

  constructor(private authController: AuthController) {
    this.router = express.Router();
    this.initRouter();
  }

  initRouter() {
    this.router.post('/login', async (req: Request, res: Response) => {
      await this.authController.loginUser(req, res);
    });
    this.router.post('/refresh_token', async (req: Request, res: Response) => {
      await this.authController.refreshToken(req, res);
    });
  }

  public getRouter() {
    return this.router;
  }
}

/**
 * @openapi
 * '/auth/login':
 *  post:
 *     tags:
 *     - User
 *     summary: Login
 *     description: User Login
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginResponse'
 *      400:
 *        description: Bad request
 */

/**
 * @openapi
 * '/auth/refresh_token':
 *  post:
 *     tags:
 *     - User
 *     summary: Refresh token
 *     description: Use this route to refresh token when token time expire
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/RefreshTokenInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginResponse'
 *      400:
 *        description: Bad request
 */
