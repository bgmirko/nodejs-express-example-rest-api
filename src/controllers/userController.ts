import { UserService } from "../services/userService";
import type { Request, Response } from "express";
import { User } from '../database/modelsTypes'

export class UserController {
  static async getUsers(req: Request, res: Response) {
    try {
      const { rows, count } = await UserService.getUsers(req.query);
      res.json({
        success: true,
        data: {
          users: rows,
          totalCount: count,
        },
        message: "List of users fetch successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const user: User = await UserService.createUser(req.body);
      res.json({
        success: true,
        user: user,
        message: "User is created successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const user: User = await UserService.getUserById(id);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User doesn't exists",
        });
      }
      await UserService.deleteUser(id);
      res.json({
        success: true,
        message: "User is deleted successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const user: User = await UserService.getUserById(id);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User doesn't exists",
        });
      }
      const updatedUser: User = await UserService.updateUser(id, req.body);
      res.json({
        success: true,
        data: {
          user: updatedUser,
        },
        message: "User is updated successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}
