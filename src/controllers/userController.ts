import {UserService} from '../services/userService';
import type {Request, Response} from 'express';
import User from '../database/models/user';

import {TokenUserPayload, RequestCustom} from '../utils/types';
import {RoleType} from '../utils/enums';
import {Service} from 'typedi';

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
}
