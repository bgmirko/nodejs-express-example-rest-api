import {UserService} from './userService';
import bcrypt from 'bcryptjs';
import {
  generateAccessToken,
  generateRefreshAccessToken,
} from '../utils/jwtToken';
import {TokenData, TokenUserPayload} from '../utils/types';
import {Service} from 'typedi';
import {CustomError} from '../utils/customError';
import jwt from 'jsonwebtoken';

@Service()
export class AuthService {
  constructor(private userService: UserService) {}

  async loginUser(
    username: string,
    password: string,
  ): Promise<{accessToken: string; refreshToken: string}> {
    const user = await this.userService.getUserByUsername(username);

    if (user == null) {
      throw new CustomError('Username or password are not correct', 400);
    }

    if (!user.active) {
      throw new CustomError('Your account is deactivated', 400);
    }

    if (await bcrypt.compare(password, user.password)) {
      const userTokenData: TokenUserPayload = {
        uuid: user.uuid,
        role: user.role,
      };
      const accessToken = generateAccessToken(userTokenData);
      const refreshToken = generateRefreshAccessToken(userTokenData);

      return {
        accessToken,
        refreshToken,
      };
    }
  }

  checkRefreshToken(
    refreshToken: string,
  ): Promise<{accessToken: string; refreshToken: string}> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err: any, userTokenData: TokenData) => {
          if (err) {
            reject(new CustomError(err.message ?? 'Validation error', 401));
          } else {
            const tokenUserPayload: TokenUserPayload = {
              uuid: userTokenData.uuid,
              role: userTokenData.role,
            };

            // TODO refresh token should be stored in database

            // if refresh token is valid create new token and refresh token
            const newAccessToken = generateAccessToken(tokenUserPayload);
            const newRefreshToken = generateRefreshAccessToken(tokenUserPayload);

            resolve({
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            });
          }
        },
      );
    });
  }
}
