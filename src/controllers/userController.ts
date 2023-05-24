import {UserService} from '../services/userService';
import type {Request, Response} from 'express';
import {User} from '../database/modelsTypes';
import bcrypt from 'bcryptjs';
import {
  generateAccessToken,
  generateRefreshAccessToken,
} from '../utils/jwtToken';
import {TokenUserPayload, TokenData, RequestCustom} from '../utils/types';
import jwt from 'jsonwebtoken';
import {RoleType} from '../utils/enums';
import { Service } from 'typedi';

@Service()
export class UserController {
  constructor(private userService: UserService) {}

  async getUsers(req: Request, res: Response) {
    try {
      const {rows, count} = await this.userService.getUsers(req.query);
      res.json({
        success: true,
        data: {
          users: rows,
          totalCount: count,
        },
        message: 'List of users fetch successfully',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const user: User = await this.userService.createUser(req.body);
      res.json({
        success: true,
        user: user,
        message: 'User is created successfully',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async softDeleteUser(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const user: User = await this.userService.getUserById(id);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User doesn't exists",
        });
      }
      if (user.role === RoleType.Admin && user.active) {
        return res.status(400).json({
          success: false,
          message:
            'You are not able to delete user with Admin role which is active',
        });
      }
      await this.userService.softDeleteUser(id);
      res.json({
        success: true,
        message: 'User is deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const user: User = await this.userService.getUserById(id);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User doesn't exists",
        });
      }
      const updatedUser: User = await this.userService.updateUser(id, req.body);
      res.json({
        success: true,
        data: {
          user: updatedUser,
        },
        message: 'User is updated successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deactivateUser(req: RequestCustom, res: Response) {
    try {
      const userData: TokenUserPayload = req.user;
      const updatedUser: User = await this.userService.deactivateUser(
        userData.uuid,
      );
      res.json({
        success: true,
        data: {
          user: updatedUser,
        },
        message: 'User is deactivated successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const password: string = req.body.password;
      const username: string = req.body.username;

      const user: User = await this.userService.getUserByUsername(username);

      if (user == null) {
        return res.status(400).json({
          success: false,
          message: 'Username or password are not correct',
        });
      }

      if (!user.active) {
        return res.status(400).json({
          success: false,
          message: 'Your account is deactivated',
        });
      }

      if (await bcrypt.compare(password, user.password)) {
        const userTokenData: TokenUserPayload = {
          uuid: user.uuid,
          role: user.role,
        };
        const accessToken = generateAccessToken(userTokenData);
        const refreshToken = generateRefreshAccessToken(userTokenData);
        res.json({
          success: true,
          accessToken,
          refreshToken,
          message: 'User login successfully',
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Username or password are not correct',
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      if (!req.body.refreshToken) {
        throw new Error('refreshToken missing');
      }

      jwt.verify(
        req.body.refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err: any, userTokenData: TokenData) => {
          if (err) {
            return res.sendStatus(401);
          }

          const tokenUserPayload: TokenUserPayload = {
            uuid: userTokenData.uuid,
            role: userTokenData.role,
          };

          // TODO refresh token should be stored in database

          // if refresh token is valid create new token and refresh token
          const accessToken: string = generateAccessToken(tokenUserPayload);
          const refreshToken: string =
            generateRefreshAccessToken(tokenUserPayload);
          res.json({
            success: true,
            accessToken,
            refreshToken,
            message: 'Token refreshed successfully',
          });
        },
      );
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
