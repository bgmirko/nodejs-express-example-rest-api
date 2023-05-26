import express, {Router} from 'express';
import type {Request, Response} from 'express';
import {UserController} from '../controllers/userController';
import {authenticateUserToken} from '../middleware/authenticateToken';
import {isAdmin} from '../middleware/isAdmin';
import {RequestCustom} from '../utils/types';
import {Service} from 'typedi';

@Service()
export class UserRouter {
  private router: Router;

  constructor(private userController: UserController) {
    this.router = express.Router();
    this.initRouter();
  }

  initRouter() {
    this.router.get('/', async (req: Request, res: Response) => {
      await this.userController.getUsers(req, res);
    });
    this.router.post(
      '/',
      authenticateUserToken,
      isAdmin,
      async (req: Request, res: Response) => {
        await this.userController.createUser(req, res);
      },
    );
    this.router.delete(
      '/:id',
      authenticateUserToken,
      isAdmin,
      async (req: Request, res: Response) => {
        await this.userController.softDeleteUser(req, res);
      },
    );
    this.router.put(
      '/:id',
      authenticateUserToken,
      isAdmin,
      async (req: Request, res: Response) => {
        await this.userController.updateUser(req, res);
      },
    );
    this.router.post(
      '/deactivate',
      authenticateUserToken,
      async (req: RequestCustom, res: Response) => {
        await this.userController.deactivateUser(req, res);
      },
    );
    this.router.post('/login', async (req: Request, res: Response) => {
      await this.userController.loginUser(req, res);
    });
    this.router.post('/refresh_token', async (req: Request, res: Response) => {
      await this.userController.refreshToken(req, res);
    });
  }

  public getRouter() {
    return this.router;
  }
}

/**
 * @openapi
 * '/users':
 *  get:
 *     tags:
 *     - User
 *     summary: Fetch users
 *     description: Fetch users with pagination
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
 * '/users/new':
 *  post:
 *     security:
 *     - Bearer: []
 *     tags:
 *     - User
 *     summary: Create new user
 *     description: Create existing user. To use this route user should be logged in and have Admin role right
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      400:
 *        description: Bad request
 */

/**
 * @openapi
 * '/users/delete/{id}':
 *  delete:
 *     tags:
 *     - User
 *     summary: Delete User
 *     description: Only logged in user with admin role can delete user, user will be soft deleted.
 *     parameters:
 *      - name: id
 *        in: path
 *        description: user id (UID)
 *        default: 956b086d-f22d-43a3-8966-77d412555cc6
 *        required: true
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad request
 */

/**
 * @openapi
 * '/users/update/{id}':
 *  put:
 *     tags:
 *     - User
 *     summary: Update existing user
 *     description: Update existing user. To use this route user should be logged in and have Admin role right
 *     parameters:
 *      - name: id
 *        in: path
 *        description: user id (UID)
 *        default: 956b086d-f22d-43a3-8966-77d412555cc6
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/UpdateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad request
 */

/**
 * @openapi
 * '/users/deactivate':
 *  post:
 *     security:
 *     - Bearer: []
 *     tags:
 *     - User
 *     summary: Deactivate user (self)
 *     description: Only logged in user can deactivate his account. If Admin wonts to deactivate other account he can use update user route
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad request
 */

/**
 * @openapi
 * '/users/login':
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
 * '/users/refresh_token':
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
