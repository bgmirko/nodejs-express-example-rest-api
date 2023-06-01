import type {Request, Response} from 'express';
import {Service} from 'typedi';
import {AuthService} from '../services/authService';
import {CustomError} from '../utils/customError';

@Service()
export class AuthController {
  constructor(private authService: AuthService) {}

  async loginUser(req: Request, res: Response) {
    try {
      const password: string = req.body.password;
      const username: string = req.body.username;

      const {accessToken, refreshToken} = await this.authService.loginUser(
        username,
        password,
      );

      res.json({
        success: true,
        accessToken,
        refreshToken,
        message: 'User login successfully',
      });
    } catch (error) {
      res.status(error.statusCode ?? 500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      if (!req.body.refreshToken) {
        throw new CustomError('refreshToken missing', 401);
      }

      const { accessToken, refreshToken } = await this.authService.checkRefreshToken(req.body.refreshToken);
        
      res.json({
        success: true,
        accessToken,
        refreshToken,
        message: 'Token refreshed successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
